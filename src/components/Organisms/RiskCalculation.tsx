import useRiskProfileStore from "@/stores/riskProfiles";
import Dropdown from "../Atoms/Dropdown";
import { useEffect, useState } from "react";
import { CURRENCY_LIST } from "@/utils/constants";
import { z } from "zod";
import useErroneousValue from "@/utils/hooks/useErroneousValue";
import RiskTable from "./RiskTable";
import { RiskProfile } from "./RiskProfileForm";

interface Props {}

export interface Asset {
  label: string;
  value: string;
  currency: CURRENCY_LIST;
}

export interface RiskCalculationRow {
  riskPercentage: number;
  riskInCurrency: number;
  lotSize: number;
}

const INDICES: Asset[] = [
  {
    label: "GER40 (DAX)",
    value: "GER40",
    currency: "EUR",
  },
  {
    label: "US500 (S&P 500)",
    value: "SP500",
    currency: "USD",
  },
  {
    label: "US30 (Dow Jones)",
    value: "US30",
    currency: "USD",
  },
  {
    label: "US100 (Nasdaq)",
    value: "US100",
    currency: "USD",
  },
];
const FOREX_PAIRS: string[] = ["EURUSD", "GBPUSD"];

const findConversionPair = (
  accountCurrency: CURRENCY_LIST,
  assetCurrency: CURRENCY_LIST
) => {
  if (accountCurrency === assetCurrency) {
    return undefined;
  }

  return FOREX_PAIRS.find(
    (pair) => pair.includes(accountCurrency) && pair.includes(assetCurrency)
  );
};

const calculateRisk = (
  rp: RiskProfile,
  conversionRate: number,
  stopInPips: number
): RiskCalculationRow[] => {
  const sortedRisk = rp.riskPercentages.sort();
  return sortedRisk.map((risk) => {
    const riskInCurrency = (risk / 100) * rp.amount;
    return {
      riskPercentage: risk,
      riskInCurrency,
      lotSize: ((riskInCurrency * conversionRate) / (stopInPips * 10)) * 10,
    };
  });
};

const calculateConversionRate = (
  accountCurrency: CURRENCY_LIST,
  currencyPair: string | undefined,
  rate: string
) => {
  if (!currencyPair) return 1;

  if (currencyPair.startsWith(accountCurrency)) {
    return parseFloat(rate);
  }
  return 1 / parseFloat(rate);
};

const RiskCalculation = ({}: Props) => {
  const [riskProfile] = useRiskProfileStore((state) => [
    state.riskProfiles.find((rp) => rp.id === state.activeRiskProfile),
  ]);
  const [selectedAsset, setSelectedAsset] = useState<Asset>(INDICES[0]);
  const [stopSize, setStopSize, stopSizeError, setStopSizeError] =
    useErroneousValue<string>();

  const [
    conversionRate,
    setConversionRate,
    conversionRateError,
    setConversionRateError,
  ] = useErroneousValue<string>();

  const [riskCalculation, setRiskCalculation] = useState<RiskCalculationRow[]>(
    []
  );

  const onStopSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validationRes = z.coerce
      .number({
        invalid_type_error: "Stop in pips must be a number",
      })
      .int("Stop in pips must be a whole number")
      .positive("Stop in pips must be a positive number")
      .safeParse(e.target.value);

    setStopSize(e.target.value == "" ? undefined : e.target.value);

    if (!validationRes.success) {
      setStopSizeError(validationRes.error.flatten().formErrors[0]);
      return;
    }

    setStopSizeError(undefined);
  };

  const onConversionRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validationRes = z.coerce
      .number({
        invalid_type_error: "Conversion rate must be a number",
      })
      .positive("Conversion rate must be a positive number")
      .safeParse(e.target.value);

    setConversionRate(e.target.value === "" ? undefined : e.target.value);

    if (!validationRes.success) {
      setConversionRateError(validationRes.error.flatten().formErrors[0]);
      return;
    }

    setConversionRateError(undefined);
  };

  const currencyConversionPair =
    riskProfile &&
    findConversionPair(riskProfile.currency, selectedAsset.currency);

  const isCalcFormValid = () => {
    if (!riskProfile || !stopSize || stopSizeError) {
      return false;
    }

    if (riskProfile.currency !== selectedAsset.currency && !conversionRate) {
      return false;
    }

    return true;
  };

  const shouldShowRiskTable =
    riskProfile && isCalcFormValid() && riskCalculation.length > 0;

  useEffect(() => {
    if (!currencyConversionPair) {
      setConversionRate(undefined);
      setConversionRateError(undefined);
    }
  }, [currencyConversionPair, setConversionRate, setConversionRateError]);

  useEffect(() => {
    setRiskCalculation([]);
  }, [riskProfile]);

  useEffect(() => {
    setRiskCalculation([]);
  }, [stopSize, conversionRate]);

  return (
    <div className="notification mt-5">
      <h4 className="title is-4">Risk Calculator</h4>
      <div>
        <div className="field">
          <label className="label">Asset</label>
          <div className="control">
            <Dropdown
              placeholder={"Select Indice"}
              options={INDICES}
              onSelect={(e) =>
                setSelectedAsset(
                  INDICES.find((i) => i.value === e.target.value) as Asset
                )
              }
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Stop Size</label>
          <div className="control">
            <input
              className={`input ${stopSizeError && "is-danger"}`}
              type="number"
              placeholder="Stop in pips e.g. 15 (Include spread in this too!)"
              onChange={onStopSizeChange}
              value={stopSize}
            />
          </div>
          {stopSizeError && <p className="help is-danger">{stopSizeError}</p>}
        </div>

        {riskProfile && riskProfile?.currency !== selectedAsset.currency && (
          <div className="field">
            <label className="label">
              Current conversion rate ({currencyConversionPair})
            </label>
            <div className="control">
              <input
                className={`input ${conversionRateError && "is-danger"}`}
                type="number"
                placeholder={`Enter the current rate of '${currencyConversionPair}' currency pair`}
                onChange={onConversionRateChange}
                value={conversionRate}
              />
            </div>
            {conversionRateError && (
              <p className="help is-danger">{conversionRateError}</p>
            )}
          </div>
        )}

        <button
          className="button"
          disabled={!isCalcFormValid()}
          onClick={() => {
            setRiskCalculation(
              calculateRisk(
                riskProfile as RiskProfile,
                calculateConversionRate(
                  (riskProfile as RiskProfile).currency,
                  currencyConversionPair as string,
                  conversionRate as string
                ),
                Number(stopSize)
              )
            );
          }}
        >
          Calculate
        </button>

        {shouldShowRiskTable && (
          <RiskTable
            currency={riskProfile.currency}
            riskCalculations={riskCalculation}
          />
        )}
      </div>
    </div>
  );
};

export default RiskCalculation;

import { CURRENCY_LIST, CURRENCY_MAP } from "@/utils/constants";
import { RiskCalculationRow } from "@/components/Organisms/RiskCalculation";
import formatCurrency from "@/utils/formatCurrency";

interface Props {
  currency: CURRENCY_LIST;
  riskCalculations: RiskCalculationRow[];
}

const RiskTable = ({ currency, riskCalculations }: Props) => {
  return (
    <table className="table mt-5 is-hoverable is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Risk (%)</th>
          <th>Risk ({CURRENCY_MAP[currency]}) </th>
          <th>Lot Size</th>
        </tr>
      </thead>

      <tbody>
        {riskCalculations.map((row) => (
          <tr key={row.riskPercentage}>
            <th>{row.riskPercentage}</th>
            <td>{formatCurrency(row.riskInCurrency, currency)}</td>
            <td>{row.lotSize.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RiskTable;

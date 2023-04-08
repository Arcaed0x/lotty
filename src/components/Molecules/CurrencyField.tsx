import FieldWithAddons from "../Atoms/FieldWithAddons";
import { ReactHookFormLink } from "@/utils/react-hook-form.types";

export interface CurrencyFieldValue {
  currency: string;
  amount?: number;
}

interface Props {
  title?: string;
  placeholder: string;
  currencyLink: ReactHookFormLink;
  amountLink: ReactHookFormLink;
}

const CURRENCY_OPTIONS: { value: string; optionValue: string }[] = [
  { value: "USD", optionValue: "$(USD)" },
  { value: "GBP", optionValue: "£(GBP)" },
  { value: "EUR", optionValue: "€(EUR)" },
];

const CurrencyField = ({
  placeholder,
  title,
  currencyLink,
  amountLink,
}: Props) => {
  return (
    <div className="field">
      {title && <label className="label">{title}</label>}
      <div className="control">
        <FieldWithAddons>
          <div className="control">
            <span className="select">
              <select {...currencyLink.register}>
                {CURRENCY_OPTIONS.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.optionValue}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <p className="control is-expanded">
            <input
              className={`input ${amountLink.error ? "is-danger" : ""}`}
              placeholder={placeholder}
              type="number"
              pattern="^\d+(\.\d{1,2})?$"
              step={0.01}
              {...amountLink.register}
            />
          </p>
        </FieldWithAddons>
        {amountLink.error && (
          <p className="help is-danger">{amountLink.error?.message}</p>
        )}
      </div>
    </div>
  );
};
export default CurrencyField;

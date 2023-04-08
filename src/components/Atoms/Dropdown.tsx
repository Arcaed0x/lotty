import { CURRENCY_LIST } from "@/utils/constants";
import { Asset } from "@/components/Organisms/RiskCalculation";

interface Props {
  placeholder: string;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Asset[];
  selected?: string;
}

const Dropdown = ({ placeholder, onSelect, options, selected }: Props) => {
  return (
    <div className="field">
      <p className="control">
        <span className="select">
          <select
            placeholder={placeholder}
            value={selected}
            onChange={onSelect}
          >
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </p>
    </div>
  );
};

export default Dropdown;

import { useState } from "react";
import { z } from "zod";

type Props = {
  title?: string;
  placeholder: string;
  buttonText: string;
  onAdd: (data: RiskTagInputFormValues) => void;
  onDelete: (data: RiskTagInputFormValues) => void;
  value: number[];
};

const RiskTagInputSchema = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.coerce
    .number({ invalid_type_error: "Risk Amount must be a number" })
    .positive("Risk Amount must be positive")
    .max(99, "Please enter a value below 99")
    .refine(
      (value) => /^\d+(\.\d{1,2})?$/.test(String(value)),
      "Risk amount must be to 2 decimal places"
    )
);

type RiskTagInputFormValues = z.infer<typeof RiskTagInputSchema>;

const RiskTagInputField = ({
  title,
  placeholder,
  buttonText,
  onAdd,
  onDelete,
  value,
}: Props) => {
  const [risk, setRisk] = useState<number | undefined>(0);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const res = RiskTagInputSchema.safeParse(value);
    setRisk(value === "" ? 0 : Number(value));
    if (!res.success) {
      setError(res.error.flatten().formErrors[0]);
      return;
    }

    setError(undefined);
  };

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (risk) {
      onAdd(risk);
    }

    setRisk(0);
  };

  return (
    <div className="field">
      {title && <label className="label">{title}</label>}
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className={`input ${error ? "is-danger" : ""}`}
            type="number"
            placeholder={placeholder}
            onChange={onChange}
            value={risk == 0 ? "" : risk}
            pattern="^\d+(\.\d{1,2})?$"
            step={0.01}
          />
        </div>

        <p className="control">
          <a className="button is-static">&#37;</a>
        </p>
        <div className="control">
          <button className="button" disabled={!!error} onClick={onAddClick}>
            {buttonText}
          </button>
        </div>
      </div>
      {error && <p className="help is-danger">{error}</p>}
      <div className="container">
        <div className="field is-grouped is-grouped-multiline">
          {value.map((tag) => (
            <div className="control" key={tag}>
              <div className="tags has-addons">
                <a className="tag ">{tag}&#37;</a>
                <a className="tag is-delete" onClick={() => onDelete(tag)}></a>
              </div>
            </div>
          ))}

          {value.length === 0 && (
            <div className="notification is-info is-light is-expanded">
              Please enter at least 1 risk amount e.g &apos;1%&apos;
            </div>
          )}
        </div>
      </div>

      <br />
    </div>
  );
};

export default RiskTagInputField;

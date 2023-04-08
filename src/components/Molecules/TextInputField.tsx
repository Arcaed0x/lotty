import { ReactHookFormLink } from "@/utils/react-hook-form.types";

type Props = {
  placeholder: string;
  title: string;
} & ReactHookFormLink;

const TextInputField = ({ placeholder, title, register, error }: Props) => {
  return (
    <div className="field">
      {title && <label className="label">{title}</label>}
      <div className="control is-expanded">
        <input
          className={`input ${error ? "is-danger" : ""}`}
          type="text"
          placeholder={placeholder}
          {...register}
        />

        {error && <p className="help is-danger">{error?.message}</p>}
      </div>
    </div>
  );
};

export default TextInputField;

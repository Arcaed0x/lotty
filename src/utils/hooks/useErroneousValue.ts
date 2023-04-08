import { useState } from "react";

const useErroneousValue = <T>(defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [error, setError] = useState<string | undefined>();

  return [value, setValue, error, setError] as const;
};

export default useErroneousValue;

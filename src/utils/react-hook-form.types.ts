import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface ReactHookFormLink {
    error?: FieldError;
    register: UseFormRegisterReturn<any>;
}
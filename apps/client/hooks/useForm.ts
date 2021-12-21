import {
  MutableRefObject,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { emailRegExp } from "../utils/emailRegExp";

interface useFormReturned {
  register: (name: string) => {};
  handleSubmit: () => SubmitResult;
}

interface SubmitResult {
  errors: {
    type: string;
    ref: HTMLInputElement;
  }[];
  values: { [key: string]: string } | null;
  refs: HTMLInputElement[];
}

const useForm = (): useFormReturned => {
  const [inputRef, setInputRef] =
    useState<MutableRefObject<HTMLInputElement>>();
  const refs: HTMLInputElement[] = [];
  const register = (
    name: string
  ): {
    inputRef: MutableRefObject<HTMLInputElement | null>;
    type: string;
    setInputRef: Dispatch<
      SetStateAction<MutableRefObject<HTMLInputElement> | undefined>
    >;
  } => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    refs.push(inputRef.current!);
    return {
      inputRef,
      type: name,
      setInputRef,
    };
  };

  const handleSubmit = (): SubmitResult => {
    let errors: {
      type: string;
      ref: HTMLInputElement;
    }[] = [];

    refs.forEach((ref) => {
      if (!ref.value.length) {
        errors.push({
          type: "empty",
          ref,
        });
      } else if (ref.name.toLocaleLowerCase() === "email") {
        if (!ref.value.match(emailRegExp))
          errors.push({
            type: "invalid_email",
            ref,
          });
      } else if (ref.name === "password") {
        let passThrough = true;

        if (ref.value.length < 5) {
          passThrough = false;
          errors.push({
            type: "short_password_5",
            ref,
          });
        }
      }
    });

    const values = errors.length
      ? null
      : refs
          .map((ref) => {
            return {
              [ref.name]: ref.value,
            };
          })
          .reduce((prev, next) => {
            return { ...prev, ...next };
          });

    return {
      refs,
      errors,
      values,
    };
  };

  return { register, handleSubmit };
};

export { useForm };

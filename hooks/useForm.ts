import {
  MutableRefObject,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

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

  const emailRegEx =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
      } else if (ref.name === "email") {
        if (!ref.value.match(emailRegEx))
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

import { MutableRefObject, useRef } from "react";

interface useFormReturned {
  register: (name: string) => {};
  handleSubmit: Function;
}

const useForm = (): useFormReturned => {
  const refs: HTMLInputElement[] = [];
  const register = (
    name: string
  ): { inputRef: MutableRefObject<HTMLInputElement | null>; type: string } => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    refs.push(inputRef.current!);
    return {
      inputRef,
      type: name,
    };
  };

  const handleSubmit = (): { [key: string]: string } => {
    return refs
      .map((ref) => {
        return {
          [ref.name]: ref.value,
        };
      })
      .reduce((prev, next) => {
        return { ...prev, ...next };
      });
  };

  return { register, handleSubmit };
};

export { useForm };

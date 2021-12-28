import { useState, MutableRefObject, Dispatch, SetStateAction } from "react";

type Area = MutableRefObject<HTMLTextAreaElement> | null | undefined;

interface HandlerReturns {
  errors: {
    type: string;
    ref: Area;
  }[];

  values: { [key: string]: string } | null | undefined;
  refs: Area[];
}

const useTextareaValidator = (showInput?: boolean) => {
  const refs: Area[] = [];

  const register = (): {
    setAreaRef: Dispatch<SetStateAction<Area>>;
    show: boolean;
  } => {
    const [areaRef, setAreaRef] = useState<Area>();

    refs.push(areaRef);
    return {
      setAreaRef,
      show: showInput == undefined || showInput == true,
    };
  };

  const handleTextareaSubmit = (): HandlerReturns => {
    let errors: {
      type: string;
      ref: MutableRefObject<HTMLTextAreaElement>;
    }[] = [];

    refs.forEach((ref) => {
      if (!ref?.current.value.length) {
        errors.push({
          type: "empty",
          ref: ref!,
        });
      }
    });

    const values = errors.length
      ? null
      : refs
          .map((ref) => {
            if (!ref) return;

            return {
              [ref.current.placeholder]: ref.current.value,
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

  const handleResults = (object: HandlerReturns): null | string => {
    let returnResult: null | string = null;

    for (let ref of object.refs) {
      let entry = ref?.current!;
      entry.classList.remove("error");
    }

    if (object.errors.length) {
      returnResult =
        "Please, fill in indicated fields before submitting the report.";

      for (let err of object.errors) {
        let entry = err.ref?.current!;
        entry.classList.add("error");
      }
    }

    return returnResult;
  };

  return { register, handleTextareaSubmit, handleResults };
};

export { useTextareaValidator };

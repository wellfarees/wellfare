interface InputProps {
  name: string;
  value: string;
}

export interface ResultingObject {
  [key: string]: string;
}
export function mapRefsIntoValues<T extends InputProps>(
  refs: T[]
): ResultingObject {
  const createdObject: ResultingObject = {};
  refs
    .map((ref) => {
      return {
        [ref.name]: ref.value,
      };
    })
    .forEach((field) => {
      const key = Object.keys(field)[0];
      createdObject[key] = field[key];
    });

  return createdObject;
}

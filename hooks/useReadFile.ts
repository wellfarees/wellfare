import { useState } from "react";

const useReadFile = (file: string): [boolean, string] => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  fetch(file, { mode: "no-cors" }).then(async (response) => {
    let res = await response.text();
    setOutput(res);
    setLoading(false);
  });

  return [loading, output];
};

export { useReadFile };

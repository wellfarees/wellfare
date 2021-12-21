import { useState } from "react";

const _fetchFile = (fileName: string, cb?: Function): Promise<string> => {
  return fetch(fileName, { mode: "no-cors" }).then(async (response) => {
    let res = await response.text();
    cb && cb(res);
    return res;
  });
};

const useReadFile = (file: string): [boolean, string] => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  _fetchFile(file, (resText: string) => {
    setOutput(resText);
    setLoading(false);
  });

  return [loading, output];
};

const staticFileFetch = (file: string): Promise<string> => {
  return _fetchFile(file);
};

export { useReadFile, staticFileFetch };

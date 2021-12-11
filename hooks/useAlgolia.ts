import algoliasearch, { SearchClient } from "algoliasearch/lite";
import { useEffect, useState } from "react";

type ReturnClient = SearchClient | null;

export const useAlgolia = (): ReturnClient => {
  const [client, setClient] = useState<ReturnClient>(null);

  useEffect(() => {
    const searchKey = localStorage.getItem("algolia-search");
    if (!searchKey) throw new Error("Algolia search key is not present.");
    setClient(algoliasearch("0KJ0CAO9FH", searchKey));
  }, []);

  return client;
};

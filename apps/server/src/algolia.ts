// import algoliasearch from "algoliasearch";

// const APP_ID = process.env.ALGOLIA_APP!;
// const ALGOLIA_SECRET = process.env.ALGOLIA_SECRET!;
// const client = algoliasearch(APP_ID, ALGOLIA_SECRET);

// Contributions branch exclusive [CBE]
export const client = {
  initIndex: (..._args: any) => {
    return {
      setSettings: (..._vargs: any) => {},
      saveObject: (..._vargs: any) => {},
      search: <_T>(..._vargs: any): Promise<any> => {
        return new Promise(() => {
          return Promise.resolve({
            hits: [],
          });
        });
      },
    };
  },
  generateSecuredApiKey: (..._args: any) => "secure-string",
};

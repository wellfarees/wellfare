import algoliasearch from "algoliasearch";

const APP_ID = process.env.ALGOLIA_APP!;
const ALGOLIA_SECRET = process.env.ALGOLIA_SECRET!;

export const client = algoliasearch(APP_ID, ALGOLIA_SECRET);

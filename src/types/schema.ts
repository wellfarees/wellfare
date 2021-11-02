export interface Query {
  root: string;
}

export interface Mutation {
  root: string;
}

export interface userRecord {
  id: string;
  date: number;
  description: string;
  contents: string;
  emoji: Emoji;
  emojiId: string;
  User: User;
  userDbid: string;
}

export interface User {
  dbid: string;
  id: number;
  config: Configuration;
  configurationId: string;
  records: userRecord[];
  information: Information;
}

export interface Information {
  id: string;
  name: string;
  email: string;
}

export interface Configuration {
  id: string;
  darkMode: boolean;
  reducedMotion: boolean;
  fontSize: number;
  User: User[];
}

export interface Emoji {
  id: string;
  emoji: string;
  description: string;
  Record: userRecord[];
}

export interface UserSchema {
  id: string;
  config: {
    theme: "light" | "dark";
    fontSize: number;
    reducedMotion: boolean;
  };
}

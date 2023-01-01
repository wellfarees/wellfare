interface Developer {
  name: string;
  roles: string[];
  image: string;
  url: string;
}

export interface DevelopersQueryInterface {
  company: {
    developers: Developer[];
  };
}

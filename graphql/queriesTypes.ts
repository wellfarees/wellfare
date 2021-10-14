interface Developer {
  name: string;
  roles: string[];
  image: string;
}

export interface DevelopersQueryInterface {
  company: {
    developers: Developer[];
  };
}

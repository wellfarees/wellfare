interface Developer {
  name: string;
  roles: string[];
}

export interface DevelopersQueryInterface {
  company: {
    developers: Developer[];
  };
}

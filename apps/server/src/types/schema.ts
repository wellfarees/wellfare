import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChangePassword = {
  current: Scalars['String'];
  new: Scalars['String'];
};

export type Configuration = {
  __typename?: 'Configuration';
  darkMode: Scalars['Boolean'];
  fontSize: Scalars['Int'];
  id: Scalars['String'];
  reducedMotion: Scalars['Boolean'];
};

export type Emoji = {
  __typename?: 'Emoji';
  Record: Array<Maybe<Record>>;
  description?: Maybe<Scalars['String']>;
  emoji: Scalars['String'];
  id: Scalars['String'];
};

export type Information = {
  __typename?: 'Information';
  User: Array<Maybe<User>>;
  dbid: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  pfp?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

export type JwtUser = {
  __typename?: 'JWTUser';
  jwt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAffirmations: User;
  addRecord?: Maybe<Array<Maybe<Record>>>;
  createUser?: Maybe<JwtUser>;
  editAppearance: User;
  editInformation?: Maybe<Information>;
  resendVerificationEmail: Success;
  resetPassword: Success;
  root?: Maybe<Scalars['String']>;
  verifyUser?: Maybe<Information>;
};


export type MutationAddAffirmationsArgs = {
  affirmations: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAddRecordArgs = {
  contents: Scalars['String'];
  emoji: Scalars['String'];
  feelings: Scalars['String'];
  gratefulness: Scalars['String'];
  token: Scalars['String'];
  unease: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEditAppearanceArgs = {
  darkMode?: Maybe<Scalars['Boolean']>;
  fontSize?: Maybe<Scalars['Int']>;
  reducedMotion?: Maybe<Scalars['Boolean']>;
  token: Scalars['String'];
};


export type MutationEditInformationArgs = {
  changePassword?: Maybe<ChangePassword>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  pfp?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};


export type MutationResendVerificationEmailArgs = {
  token: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  image: Scalars['String'];
  name: Scalars['String'];
  roles: Array<Maybe<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  company?: Maybe<Roles>;
  getUser?: Maybe<User>;
  login?: Maybe<JwtUser>;
  ping: Scalars['String'];
  root?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  token: Scalars['String'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Record = {
  __typename?: 'Record';
  User: User;
  contents: Scalars['String'];
  date: Scalars['Float'];
  emoji: Scalars['String'];
  feelings: Scalars['String'];
  gratefulness: Scalars['String'];
  id: Scalars['String'];
  unease: Scalars['String'];
  userId: Scalars['Int'];
};

export type Roles = {
  __typename?: 'Roles';
  developers: Array<Maybe<Person>>;
};

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  affirmations: Scalars['String'];
  config: Configuration;
  configurationId: Scalars['String'];
  id: Scalars['Int'];
  information: Information;
  informationId: Scalars['String'];
  records: Array<Maybe<Record>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChangePassword: ChangePassword;
  Configuration: ResolverTypeWrapper<Configuration>;
  Emoji: ResolverTypeWrapper<Emoji>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Information: ResolverTypeWrapper<Information>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JWTUser: ResolverTypeWrapper<JwtUser>;
  Mutation: ResolverTypeWrapper<{}>;
  Person: ResolverTypeWrapper<Person>;
  Query: ResolverTypeWrapper<{}>;
  Record: ResolverTypeWrapper<Record>;
  Roles: ResolverTypeWrapper<Roles>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Success: ResolverTypeWrapper<Success>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ChangePassword: ChangePassword;
  Configuration: Configuration;
  Emoji: Emoji;
  Float: Scalars['Float'];
  Information: Information;
  Int: Scalars['Int'];
  JWTUser: JwtUser;
  Mutation: {};
  Person: Person;
  Query: {};
  Record: Record;
  Roles: Roles;
  String: Scalars['String'];
  Success: Success;
  User: User;
};

export type ConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Configuration'] = ResolversParentTypes['Configuration']> = {
  darkMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fontSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reducedMotion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmojiResolvers<ContextType = any, ParentType extends ResolversParentTypes['Emoji'] = ResolversParentTypes['Emoji']> = {
  Record?: Resolver<Array<Maybe<ResolversTypes['Record']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Information'] = ResolversParentTypes['Information']> = {
  User?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  dbid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pfp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JwtUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['JWTUser'] = ResolversParentTypes['JWTUser']> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAffirmations?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddAffirmationsArgs, 'affirmations' | 'token'>>;
  addRecord?: Resolver<Maybe<Array<Maybe<ResolversTypes['Record']>>>, ParentType, ContextType, RequireFields<MutationAddRecordArgs, 'contents' | 'emoji' | 'feelings' | 'gratefulness' | 'token' | 'unease'>>;
  createUser?: Resolver<Maybe<ResolversTypes['JWTUser']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'name' | 'password'>>;
  editAppearance?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditAppearanceArgs, 'token'>>;
  editInformation?: Resolver<Maybe<ResolversTypes['Information']>, ParentType, ContextType, RequireFields<MutationEditInformationArgs, 'token'>>;
  resendVerificationEmail?: Resolver<ResolversTypes['Success'], ParentType, ContextType, RequireFields<MutationResendVerificationEmailArgs, 'token'>>;
  resetPassword?: Resolver<ResolversTypes['Success'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verifyUser?: Resolver<Maybe<ResolversTypes['Information']>, ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  company?: Resolver<Maybe<ResolversTypes['Roles']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'token'>>;
  login?: Resolver<Maybe<ResolversTypes['JWTUser']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Record'] = ResolversParentTypes['Record']> = {
  User?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  contents?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feelings?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gratefulness?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unease?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Roles'] = ResolversParentTypes['Roles']> = {
  developers?: Resolver<Array<Maybe<ResolversTypes['Person']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['Success'] = ResolversParentTypes['Success']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  affirmations?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  config?: Resolver<ResolversTypes['Configuration'], ParentType, ContextType>;
  configurationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  information?: Resolver<ResolversTypes['Information'], ParentType, ContextType>;
  informationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  records?: Resolver<Array<Maybe<ResolversTypes['Record']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Configuration?: ConfigurationResolvers<ContextType>;
  Emoji?: EmojiResolvers<ContextType>;
  Information?: InformationResolvers<ContextType>;
  JWTUser?: JwtUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Record?: RecordResolvers<ContextType>;
  Roles?: RolesResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreatePostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  haveSkill: Scalars['String']['input'];
  type: PostType;
  wantSkill: Scalars['String']['input'];
};

export type LoginInput = {
  message: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  loginWithWallet: LoginResponse;
  refreshTokens: LoginResponse;
  removePost: Post;
  updatePost: Post;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationLoginWithWalletArgs = {
  input: LoginInput;
};


export type MutationRefreshTokensArgs = {
  input: RefreshTokenInput;
};


export type MutationRemovePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  haveSkill: Scalars['String']['output'];
  id: Scalars['String']['output'];
  status: PostStatus;
  tags?: Maybe<Array<PostTag>>;
  type: PostType;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
  wantSkill: Scalars['String']['output'];
};

/** The status of the post */
export enum PostStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Matched = 'MATCHED'
}

export type PostTag = {
  __typename?: 'PostTag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** The type of the post */
export enum PostType {
  Item = 'ITEM',
  Skill = 'SKILL'
}

export type Query = {
  __typename?: 'Query';
  getCurrentUser: User;
  hello: Scalars['String']['output'];
  myPosts: Array<Post>;
  post: Post;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type UpdatePostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  haveSkill?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  status?: InputMaybe<PostStatus>;
  type?: InputMaybe<PostType>;
  wantSkill?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wallet: Scalars['String']['output'];
};

export type LoginWithWalletMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginWithWalletMutation = { __typename?: 'Mutation', loginWithWallet: { __typename?: 'LoginResponse', refreshToken: string, accessToken: string, user: { __typename?: 'User', avatarUrl?: string | null, bio?: string | null, createdAt: any, id: string, name?: string | null, role: string, updatedAt: any, wallet: string } } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', createdAt: any, description?: string | null, haveSkill: string, id: string, status: PostStatus, type: PostType, userId: string, wantSkill: string, tags?: Array<{ __typename?: 'PostTag', id: string, name: string }> | null, user?: { __typename?: 'User', id: string, wallet: string } | null }> };


export const LoginWithWalletDocument = gql`
    mutation LoginWithWallet($input: LoginInput!) {
  loginWithWallet(input: $input) {
    user {
      avatarUrl
      bio
      createdAt
      id
      name
      role
      updatedAt
      wallet
    }
    refreshToken
    accessToken
  }
}
    `;
export type LoginWithWalletMutationFn = Apollo.MutationFunction<LoginWithWalletMutation, LoginWithWalletMutationVariables>;

/**
 * __useLoginWithWalletMutation__
 *
 * To run a mutation, you first call `useLoginWithWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithWalletMutation, { data, loading, error }] = useLoginWithWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginWithWalletMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithWalletMutation, LoginWithWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithWalletMutation, LoginWithWalletMutationVariables>(LoginWithWalletDocument, options);
      }
export type LoginWithWalletMutationHookResult = ReturnType<typeof useLoginWithWalletMutation>;
export type LoginWithWalletMutationResult = Apollo.MutationResult<LoginWithWalletMutation>;
export type LoginWithWalletMutationOptions = Apollo.BaseMutationOptions<LoginWithWalletMutation, LoginWithWalletMutationVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    createdAt
    description
    haveSkill
    id
    status
    tags {
      id
      name
    }
    type
    user {
      id
      wallet
    }
    userId
    wantSkill
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export function usePostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsSuspenseQueryHookResult = ReturnType<typeof usePostsSuspenseQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
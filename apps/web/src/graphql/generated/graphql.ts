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

export type ActiveDealsResponse = {
  __typename?: 'ActiveDealsResponse';
  dealsAsA?: Maybe<Array<Deal>>;
  dealsAsB?: Maybe<Array<Deal>>;
};

export type CreateDealInput = {
  postAId: Scalars['String']['input'];
  postBId?: InputMaybe<Scalars['String']['input']>;
  userBId: Scalars['String']['input'];
};

export type CreatePostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  haveSkill: Scalars['String']['input'];
  tags?: InputMaybe<Array<CreateTagInput>>;
  type: PostType;
  wantSkill: Scalars['String']['input'];
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type Deal = {
  __typename?: 'Deal';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  postA?: Maybe<Post>;
  postAId?: Maybe<Scalars['String']['output']>;
  postB?: Maybe<Post>;
  postBId?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Array<Review>>;
  status: DealStatus;
  type: DealType;
  userA?: Maybe<User>;
  userAId: Scalars['String']['output'];
  userB?: Maybe<User>;
  userBId: Scalars['String']['output'];
};

/** The status of the deal */
export enum DealStatus {
  Agreed = 'AGREED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

/** The type of the deal */
export enum DealType {
  ItemSwap = 'ITEM_SWAP',
  SkillSwap = 'SKILL_SWAP'
}

export type DealsResponse = {
  __typename?: 'DealsResponse';
  dealsAsA?: Maybe<Array<Deal>>;
  dealsAsB?: Maybe<Array<Deal>>;
};

export type GetBadgesByWalletInput = {
  wallet: Scalars['String']['input'];
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

export enum MatchMethod {
  Embedding = 'EMBEDDING',
  Exact = 'EXACT',
  Gpt = 'GPT',
  Partial = 'PARTIAL',
  Tag = 'TAG'
}

export type MatchingSuggestion = {
  __typename?: 'MatchingSuggestion';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  method: MatchMethod;
  score?: Maybe<Scalars['Float']['output']>;
  sourcePost: Post;
  sourcePostId: Scalars['String']['output'];
  targetPost: Post;
  targetPostId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptDeal: Deal;
  cancelDeal: Deal;
  completeDeal: Deal;
  createDeal: Deal;
  createPost: Post;
  createTag: PostTag;
  loginWithWallet: LoginResponse;
  mintSkillBadge: Scalars['String']['output'];
  refreshMatches: Post;
  refreshTokens: LoginResponse;
  rejectDeal: Deal;
  removePost: Post;
  updateAvatar: User;
  updatePost: Post;
};


export type MutationAcceptDealArgs = {
  dealId: Scalars['String']['input'];
};


export type MutationCancelDealArgs = {
  dealId: Scalars['String']['input'];
};


export type MutationCompleteDealArgs = {
  dealId: Scalars['String']['input'];
};


export type MutationCreateDealArgs = {
  input: CreateDealInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationLoginWithWalletArgs = {
  input: LoginInput;
};


export type MutationMintSkillBadgeArgs = {
  recipient: Scalars['String']['input'];
  skillName: Scalars['String']['input'];
};


export type MutationRefreshMatchesArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationRefreshTokensArgs = {
  input: RefreshTokenInput;
};


export type MutationRejectDealArgs = {
  dealId: Scalars['String']['input'];
};


export type MutationRemovePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAvatarArgs = {
  avatarUrl: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime']['output'];
  dealsAsPostA?: Maybe<Array<Deal>>;
  dealsAsPostB?: Maybe<Array<Deal>>;
  description?: Maybe<Scalars['String']['output']>;
  haveSkill: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  matchAsSource?: Maybe<Array<MatchingSuggestion>>;
  matchAsTarget?: Maybe<Array<MatchingSuggestion>>;
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
  deal: Deal;
  getActiveDeals: ActiveDealsResponse;
  getBadgesByWallet: Array<SkillBadgeDto>;
  getCurrentUser: User;
  getDealsByWallet: DealsResponse;
  hello: Scalars['String']['output'];
  myPosts: Array<Post>;
  post: Post;
  posts: Array<Post>;
  postsByWallet: Array<Post>;
  userByWallet: User;
};


export type QueryDealArgs = {
  dealId: Scalars['String']['input'];
};


export type QueryGetActiveDealsArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryGetBadgesByWalletArgs = {
  input: GetBadgesByWalletInput;
};


export type QueryGetDealsByWalletArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsByWalletArgs = {
  wallet: Scalars['String']['input'];
};


export type QueryUserByWalletArgs = {
  wallet: Scalars['String']['input'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deal?: Maybe<Deal>;
  dealId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  reviewee?: Maybe<User>;
  revieweeId: Scalars['String']['output'];
  reviewer?: Maybe<User>;
  reviewerId: Scalars['String']['output'];
};

export type SkillBadgeDto = {
  __typename?: 'SkillBadgeDto';
  id: Scalars['String']['output'];
  mintedAt: Scalars['DateTime']['output'];
  skillName: Scalars['String']['output'];
  suiObjectId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  verifierId: Scalars['String']['output'];
};

export type UpdatePostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  haveSkill?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  status?: InputMaybe<PostStatus>;
  tags?: InputMaybe<Array<CreateTagInput>>;
  type?: InputMaybe<PostType>;
  wantSkill?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dealsAsA?: Maybe<Array<Deal>>;
  dealsAsB?: Maybe<Array<Deal>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wallet: Scalars['String']['output'];
};

export type LoginWithWalletMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginWithWalletMutation = { __typename?: 'Mutation', loginWithWallet: { __typename?: 'LoginResponse', refreshToken: string, accessToken: string, user: { __typename?: 'User', avatarUrl?: string | null, bio?: string | null, createdAt: any, id: string, name?: string | null, role: string, updatedAt: any, wallet: string } } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null, bio?: string | null, role: string, createdAt: any, updatedAt: any, dealsAsA?: Array<{ __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null } | null }> | null, dealsAsB?: Array<{ __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null } | null }> | null } };

export type GetBadgesByWalletQueryVariables = Exact<{
  input: GetBadgesByWalletInput;
}>;


export type GetBadgesByWalletQuery = { __typename?: 'Query', getBadgesByWallet: Array<{ __typename?: 'SkillBadgeDto', id: string, userId: string, verifierId: string, skillName: string, suiObjectId: string, mintedAt: any }> };

export type DealQueryVariables = Exact<{
  dealId: Scalars['String']['input'];
}>;


export type DealQuery = { __typename?: 'Query', deal: { __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, reviews?: Array<{ __typename?: 'Review', id: string, rating: number, comment?: string | null, createdAt: any, reviewer?: { __typename?: 'User', id: string, wallet: string, name?: string | null } | null, reviewee?: { __typename?: 'User', id: string, wallet: string, name?: string | null } | null }> | null } };

export type GetDealsByWalletQueryVariables = Exact<{
  wallet: Scalars['String']['input'];
}>;


export type GetDealsByWalletQuery = { __typename?: 'Query', getDealsByWallet: { __typename?: 'DealsResponse', dealsAsA?: Array<{ __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null }> | null, dealsAsB?: Array<{ __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null }> | null } };

export type GetActiveDealsQueryVariables = Exact<{
  wallet: Scalars['String']['input'];
}>;


export type GetActiveDealsQuery = { __typename?: 'Query', getActiveDeals: { __typename?: 'ActiveDealsResponse', dealsAsA?: Array<{ __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null }> | null, dealsAsB?: Array<{ __typename?: 'Deal', id: string, status: DealStatus, type: DealType, createdAt: any, completedAt?: any | null, userA?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, userB?: { __typename?: 'User', id: string, wallet: string, name?: string | null, avatarUrl?: string | null } | null, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null }> | null } };

export type AcceptDealMutationVariables = Exact<{
  dealId: Scalars['String']['input'];
}>;


export type AcceptDealMutation = { __typename?: 'Mutation', acceptDeal: { __typename?: 'Deal', id: string, status: DealStatus } };

export type RejectDealMutationVariables = Exact<{
  dealId: Scalars['String']['input'];
}>;


export type RejectDealMutation = { __typename?: 'Mutation', rejectDeal: { __typename?: 'Deal', id: string, status: DealStatus } };

export type CancelDealMutationVariables = Exact<{
  dealId: Scalars['String']['input'];
}>;


export type CancelDealMutation = { __typename?: 'Mutation', cancelDeal: { __typename?: 'Deal', id: string, status: DealStatus } };

export type CompleteDealMutationVariables = Exact<{
  dealId: Scalars['String']['input'];
}>;


export type CompleteDealMutation = { __typename?: 'Mutation', completeDeal: { __typename?: 'Deal', id: string, status: DealStatus } };

export type RefreshMatchesMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type RefreshMatchesMutation = { __typename?: 'Mutation', refreshMatches: { __typename?: 'Post', id: string } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', createdAt: any, description?: string | null, haveSkill: string, id: string, status: PostStatus, type: PostType, userId: string, wantSkill: string, tags?: Array<{ __typename?: 'PostTag', id: string, name: string }> | null, user?: { __typename?: 'User', id: string, wallet: string } | null }> };

export type PostsByWalletQueryVariables = Exact<{
  wallet: Scalars['String']['input'];
}>;


export type PostsByWalletQuery = { __typename?: 'Query', postsByWallet: Array<{ __typename?: 'Post', createdAt: any, description?: string | null, haveSkill: string, id: string, status: PostStatus, type: PostType, userId: string, wantSkill: string, tags?: Array<{ __typename?: 'PostTag', id: string, name: string }> | null, user?: { __typename?: 'User', id: string, wallet: string } | null }> };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, user?: { __typename?: 'User', wallet: string } | null } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, status: PostStatus, tags?: Array<{ __typename?: 'PostTag', id: string, name: string }> | null, user?: { __typename?: 'User', wallet: string } | null } };

export type CreateDealMutationVariables = Exact<{
  input: CreateDealInput;
}>;


export type CreateDealMutation = { __typename?: 'Mutation', createDeal: { __typename?: 'Deal', id: string, type: DealType, status: DealStatus, createdAt: any, postA?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, postB?: { __typename?: 'Post', id: string, haveSkill: string, wantSkill: string, description?: string | null, type: PostType, user?: { __typename?: 'User', wallet: string } | null } | null, userA?: { __typename?: 'User', id: string, wallet: string } | null, userB?: { __typename?: 'User', id: string, wallet: string } | null } };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'PostTag', id: string, name: string } };

export type PostQueryVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', wantSkill: string, haveSkill: string, type: PostType, status: PostStatus, description?: string | null, createdAt: any, user?: { __typename?: 'User', wallet: string, id: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null, matchAsTarget?: Array<{ __typename?: 'MatchingSuggestion', score?: number | null, method: MatchMethod, createdAt: any, id: string, targetPost: { __typename?: 'Post', id: string, wantSkill: string, haveSkill: string, description?: string | null, createdAt: any, status: PostStatus, type: PostType, user?: { __typename?: 'User', wallet: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null }, sourcePost: { __typename?: 'Post', id: string, wantSkill: string, haveSkill: string, description?: string | null, createdAt: any, status: PostStatus, type: PostType, user?: { __typename?: 'User', wallet: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null } }> | null, matchAsSource?: Array<{ __typename?: 'MatchingSuggestion', score?: number | null, method: MatchMethod, createdAt: any, id: string, targetPost: { __typename?: 'Post', id: string, wantSkill: string, haveSkill: string, description?: string | null, createdAt: any, status: PostStatus, type: PostType, user?: { __typename?: 'User', wallet: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null }, sourcePost: { __typename?: 'Post', id: string, wantSkill: string, haveSkill: string, description?: string | null, createdAt: any, status: PostStatus, type: PostType, user?: { __typename?: 'User', wallet: string } | null, tags?: Array<{ __typename?: 'PostTag', name: string }> | null } }> | null, dealsAsPostA?: Array<{ __typename?: 'Deal', type: DealType, status: DealStatus, completedAt?: any | null, postAId?: string | null, postBId?: string | null, createdAt: any, id: string, userA?: { __typename?: 'User', wallet: string } | null, userB?: { __typename?: 'User', wallet: string } | null, reviews?: Array<{ __typename?: 'Review', rating: number, createdAt: any, comment?: string | null, reviewer?: { __typename?: 'User', wallet: string } | null, reviewee?: { __typename?: 'User', wallet: string } | null }> | null }> | null, dealsAsPostB?: Array<{ __typename?: 'Deal', type: DealType, status: DealStatus, completedAt?: any | null, postAId?: string | null, postBId?: string | null, createdAt: any, id: string, userA?: { __typename?: 'User', wallet: string } | null, userB?: { __typename?: 'User', wallet: string } | null, reviews?: Array<{ __typename?: 'Review', rating: number, createdAt: any, comment?: string | null, reviewer?: { __typename?: 'User', wallet: string } | null, reviewee?: { __typename?: 'User', wallet: string } | null }> | null }> | null } };


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
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    wallet
    name
    avatarUrl
    bio
    role
    createdAt
    updatedAt
    dealsAsA {
      id
      status
      type
      createdAt
      completedAt
      userA {
        id
        wallet
        name
        avatarUrl
      }
      userB {
        id
        wallet
        name
        avatarUrl
      }
      postA {
        id
        haveSkill
        wantSkill
        description
      }
      postB {
        id
        haveSkill
        wantSkill
        description
      }
    }
    dealsAsB {
      id
      status
      type
      createdAt
      completedAt
      userA {
        id
        wallet
        name
        avatarUrl
      }
      userB {
        id
        wallet
        name
        avatarUrl
      }
      postA {
        id
        haveSkill
        wantSkill
        description
      }
      postB {
        id
        haveSkill
        wantSkill
        description
      }
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetBadgesByWalletDocument = gql`
    query GetBadgesByWallet($input: GetBadgesByWalletInput!) {
  getBadgesByWallet(input: $input) {
    id
    userId
    verifierId
    skillName
    suiObjectId
    mintedAt
  }
}
    `;

/**
 * __useGetBadgesByWalletQuery__
 *
 * To run a query within a React component, call `useGetBadgesByWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBadgesByWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBadgesByWalletQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBadgesByWalletQuery(baseOptions: Apollo.QueryHookOptions<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables> & ({ variables: GetBadgesByWalletQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables>(GetBadgesByWalletDocument, options);
      }
export function useGetBadgesByWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables>(GetBadgesByWalletDocument, options);
        }
export function useGetBadgesByWalletSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables>(GetBadgesByWalletDocument, options);
        }
export type GetBadgesByWalletQueryHookResult = ReturnType<typeof useGetBadgesByWalletQuery>;
export type GetBadgesByWalletLazyQueryHookResult = ReturnType<typeof useGetBadgesByWalletLazyQuery>;
export type GetBadgesByWalletSuspenseQueryHookResult = ReturnType<typeof useGetBadgesByWalletSuspenseQuery>;
export type GetBadgesByWalletQueryResult = Apollo.QueryResult<GetBadgesByWalletQuery, GetBadgesByWalletQueryVariables>;
export const DealDocument = gql`
    query Deal($dealId: String!) {
  deal(dealId: $dealId) {
    id
    status
    type
    createdAt
    completedAt
    userA {
      id
      wallet
      name
      avatarUrl
    }
    userB {
      id
      wallet
      name
      avatarUrl
    }
    postA {
      id
      haveSkill
      wantSkill
      description
      type
      user {
        wallet
      }
    }
    postB {
      id
      haveSkill
      wantSkill
      description
      type
      user {
        wallet
      }
    }
    reviews {
      id
      rating
      comment
      createdAt
      reviewer {
        id
        wallet
        name
      }
      reviewee {
        id
        wallet
        name
      }
    }
  }
}
    `;

/**
 * __useDealQuery__
 *
 * To run a query within a React component, call `useDealQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealQuery({
 *   variables: {
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useDealQuery(baseOptions: Apollo.QueryHookOptions<DealQuery, DealQueryVariables> & ({ variables: DealQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DealQuery, DealQueryVariables>(DealDocument, options);
      }
export function useDealLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DealQuery, DealQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DealQuery, DealQueryVariables>(DealDocument, options);
        }
export function useDealSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DealQuery, DealQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DealQuery, DealQueryVariables>(DealDocument, options);
        }
export type DealQueryHookResult = ReturnType<typeof useDealQuery>;
export type DealLazyQueryHookResult = ReturnType<typeof useDealLazyQuery>;
export type DealSuspenseQueryHookResult = ReturnType<typeof useDealSuspenseQuery>;
export type DealQueryResult = Apollo.QueryResult<DealQuery, DealQueryVariables>;
export const GetDealsByWalletDocument = gql`
    query GetDealsByWallet($wallet: String!) {
  getDealsByWallet(wallet: $wallet) {
    dealsAsA {
      id
      status
      type
      createdAt
      completedAt
      userA {
        id
        wallet
        name
        avatarUrl
      }
      userB {
        id
        wallet
        name
        avatarUrl
      }
      postA {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
      postB {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
    }
    dealsAsB {
      id
      status
      type
      createdAt
      completedAt
      userA {
        id
        wallet
        name
        avatarUrl
      }
      userB {
        id
        wallet
        name
        avatarUrl
      }
      postA {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
      postB {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
    }
  }
}
    `;

/**
 * __useGetDealsByWalletQuery__
 *
 * To run a query within a React component, call `useGetDealsByWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDealsByWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDealsByWalletQuery({
 *   variables: {
 *      wallet: // value for 'wallet'
 *   },
 * });
 */
export function useGetDealsByWalletQuery(baseOptions: Apollo.QueryHookOptions<GetDealsByWalletQuery, GetDealsByWalletQueryVariables> & ({ variables: GetDealsByWalletQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDealsByWalletQuery, GetDealsByWalletQueryVariables>(GetDealsByWalletDocument, options);
      }
export function useGetDealsByWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDealsByWalletQuery, GetDealsByWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDealsByWalletQuery, GetDealsByWalletQueryVariables>(GetDealsByWalletDocument, options);
        }
export function useGetDealsByWalletSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDealsByWalletQuery, GetDealsByWalletQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDealsByWalletQuery, GetDealsByWalletQueryVariables>(GetDealsByWalletDocument, options);
        }
export type GetDealsByWalletQueryHookResult = ReturnType<typeof useGetDealsByWalletQuery>;
export type GetDealsByWalletLazyQueryHookResult = ReturnType<typeof useGetDealsByWalletLazyQuery>;
export type GetDealsByWalletSuspenseQueryHookResult = ReturnType<typeof useGetDealsByWalletSuspenseQuery>;
export type GetDealsByWalletQueryResult = Apollo.QueryResult<GetDealsByWalletQuery, GetDealsByWalletQueryVariables>;
export const GetActiveDealsDocument = gql`
    query GetActiveDeals($wallet: String!) {
  getActiveDeals(wallet: $wallet) {
    dealsAsA {
      id
      status
      type
      createdAt
      completedAt
      userA {
        id
        wallet
        name
        avatarUrl
      }
      userB {
        id
        wallet
        name
        avatarUrl
      }
      postA {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
      postB {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
    }
    dealsAsB {
      id
      status
      type
      createdAt
      completedAt
      userA {
        id
        wallet
        name
        avatarUrl
      }
      userB {
        id
        wallet
        name
        avatarUrl
      }
      postA {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
      postB {
        id
        haveSkill
        wantSkill
        description
        type
        user {
          wallet
        }
      }
    }
  }
}
    `;

/**
 * __useGetActiveDealsQuery__
 *
 * To run a query within a React component, call `useGetActiveDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveDealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveDealsQuery({
 *   variables: {
 *      wallet: // value for 'wallet'
 *   },
 * });
 */
export function useGetActiveDealsQuery(baseOptions: Apollo.QueryHookOptions<GetActiveDealsQuery, GetActiveDealsQueryVariables> & ({ variables: GetActiveDealsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveDealsQuery, GetActiveDealsQueryVariables>(GetActiveDealsDocument, options);
      }
export function useGetActiveDealsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveDealsQuery, GetActiveDealsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveDealsQuery, GetActiveDealsQueryVariables>(GetActiveDealsDocument, options);
        }
export function useGetActiveDealsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetActiveDealsQuery, GetActiveDealsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActiveDealsQuery, GetActiveDealsQueryVariables>(GetActiveDealsDocument, options);
        }
export type GetActiveDealsQueryHookResult = ReturnType<typeof useGetActiveDealsQuery>;
export type GetActiveDealsLazyQueryHookResult = ReturnType<typeof useGetActiveDealsLazyQuery>;
export type GetActiveDealsSuspenseQueryHookResult = ReturnType<typeof useGetActiveDealsSuspenseQuery>;
export type GetActiveDealsQueryResult = Apollo.QueryResult<GetActiveDealsQuery, GetActiveDealsQueryVariables>;
export const AcceptDealDocument = gql`
    mutation AcceptDeal($dealId: String!) {
  acceptDeal(dealId: $dealId) {
    id
    status
  }
}
    `;
export type AcceptDealMutationFn = Apollo.MutationFunction<AcceptDealMutation, AcceptDealMutationVariables>;

/**
 * __useAcceptDealMutation__
 *
 * To run a mutation, you first call `useAcceptDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptDealMutation, { data, loading, error }] = useAcceptDealMutation({
 *   variables: {
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useAcceptDealMutation(baseOptions?: Apollo.MutationHookOptions<AcceptDealMutation, AcceptDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptDealMutation, AcceptDealMutationVariables>(AcceptDealDocument, options);
      }
export type AcceptDealMutationHookResult = ReturnType<typeof useAcceptDealMutation>;
export type AcceptDealMutationResult = Apollo.MutationResult<AcceptDealMutation>;
export type AcceptDealMutationOptions = Apollo.BaseMutationOptions<AcceptDealMutation, AcceptDealMutationVariables>;
export const RejectDealDocument = gql`
    mutation RejectDeal($dealId: String!) {
  rejectDeal(dealId: $dealId) {
    id
    status
  }
}
    `;
export type RejectDealMutationFn = Apollo.MutationFunction<RejectDealMutation, RejectDealMutationVariables>;

/**
 * __useRejectDealMutation__
 *
 * To run a mutation, you first call `useRejectDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectDealMutation, { data, loading, error }] = useRejectDealMutation({
 *   variables: {
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useRejectDealMutation(baseOptions?: Apollo.MutationHookOptions<RejectDealMutation, RejectDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectDealMutation, RejectDealMutationVariables>(RejectDealDocument, options);
      }
export type RejectDealMutationHookResult = ReturnType<typeof useRejectDealMutation>;
export type RejectDealMutationResult = Apollo.MutationResult<RejectDealMutation>;
export type RejectDealMutationOptions = Apollo.BaseMutationOptions<RejectDealMutation, RejectDealMutationVariables>;
export const CancelDealDocument = gql`
    mutation CancelDeal($dealId: String!) {
  cancelDeal(dealId: $dealId) {
    id
    status
  }
}
    `;
export type CancelDealMutationFn = Apollo.MutationFunction<CancelDealMutation, CancelDealMutationVariables>;

/**
 * __useCancelDealMutation__
 *
 * To run a mutation, you first call `useCancelDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelDealMutation, { data, loading, error }] = useCancelDealMutation({
 *   variables: {
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useCancelDealMutation(baseOptions?: Apollo.MutationHookOptions<CancelDealMutation, CancelDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelDealMutation, CancelDealMutationVariables>(CancelDealDocument, options);
      }
export type CancelDealMutationHookResult = ReturnType<typeof useCancelDealMutation>;
export type CancelDealMutationResult = Apollo.MutationResult<CancelDealMutation>;
export type CancelDealMutationOptions = Apollo.BaseMutationOptions<CancelDealMutation, CancelDealMutationVariables>;
export const CompleteDealDocument = gql`
    mutation CompleteDeal($dealId: String!) {
  completeDeal(dealId: $dealId) {
    id
    status
  }
}
    `;
export type CompleteDealMutationFn = Apollo.MutationFunction<CompleteDealMutation, CompleteDealMutationVariables>;

/**
 * __useCompleteDealMutation__
 *
 * To run a mutation, you first call `useCompleteDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeDealMutation, { data, loading, error }] = useCompleteDealMutation({
 *   variables: {
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useCompleteDealMutation(baseOptions?: Apollo.MutationHookOptions<CompleteDealMutation, CompleteDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteDealMutation, CompleteDealMutationVariables>(CompleteDealDocument, options);
      }
export type CompleteDealMutationHookResult = ReturnType<typeof useCompleteDealMutation>;
export type CompleteDealMutationResult = Apollo.MutationResult<CompleteDealMutation>;
export type CompleteDealMutationOptions = Apollo.BaseMutationOptions<CompleteDealMutation, CompleteDealMutationVariables>;
export const RefreshMatchesDocument = gql`
    mutation RefreshMatches($postId: ID!) {
  refreshMatches(postId: $postId) {
    id
  }
}
    `;
export type RefreshMatchesMutationFn = Apollo.MutationFunction<RefreshMatchesMutation, RefreshMatchesMutationVariables>;

/**
 * __useRefreshMatchesMutation__
 *
 * To run a mutation, you first call `useRefreshMatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMatchesMutation, { data, loading, error }] = useRefreshMatchesMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRefreshMatchesMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMatchesMutation, RefreshMatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMatchesMutation, RefreshMatchesMutationVariables>(RefreshMatchesDocument, options);
      }
export type RefreshMatchesMutationHookResult = ReturnType<typeof useRefreshMatchesMutation>;
export type RefreshMatchesMutationResult = Apollo.MutationResult<RefreshMatchesMutation>;
export type RefreshMatchesMutationOptions = Apollo.BaseMutationOptions<RefreshMatchesMutation, RefreshMatchesMutationVariables>;
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
export const PostsByWalletDocument = gql`
    query PostsByWallet($wallet: String!) {
  postsByWallet(wallet: $wallet) {
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
 * __usePostsByWalletQuery__
 *
 * To run a query within a React component, call `usePostsByWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByWalletQuery({
 *   variables: {
 *      wallet: // value for 'wallet'
 *   },
 * });
 */
export function usePostsByWalletQuery(baseOptions: Apollo.QueryHookOptions<PostsByWalletQuery, PostsByWalletQueryVariables> & ({ variables: PostsByWalletQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByWalletQuery, PostsByWalletQueryVariables>(PostsByWalletDocument, options);
      }
export function usePostsByWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByWalletQuery, PostsByWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByWalletQuery, PostsByWalletQueryVariables>(PostsByWalletDocument, options);
        }
export function usePostsByWalletSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsByWalletQuery, PostsByWalletQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByWalletQuery, PostsByWalletQueryVariables>(PostsByWalletDocument, options);
        }
export type PostsByWalletQueryHookResult = ReturnType<typeof usePostsByWalletQuery>;
export type PostsByWalletLazyQueryHookResult = ReturnType<typeof usePostsByWalletLazyQuery>;
export type PostsByWalletSuspenseQueryHookResult = ReturnType<typeof usePostsByWalletSuspenseQuery>;
export type PostsByWalletQueryResult = Apollo.QueryResult<PostsByWalletQuery, PostsByWalletQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    user {
      wallet
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    haveSkill
    wantSkill
    description
    type
    tags {
      id
      name
    }
    status
    user {
      wallet
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreateDealDocument = gql`
    mutation CreateDeal($input: CreateDealInput!) {
  createDeal(input: $input) {
    id
    postA {
      id
      haveSkill
      wantSkill
      description
      type
      user {
        wallet
      }
    }
    postB {
      id
      haveSkill
      wantSkill
      description
      type
      user {
        wallet
      }
    }
    userA {
      id
      wallet
    }
    userB {
      id
      wallet
    }
    type
    status
    createdAt
  }
}
    `;
export type CreateDealMutationFn = Apollo.MutationFunction<CreateDealMutation, CreateDealMutationVariables>;

/**
 * __useCreateDealMutation__
 *
 * To run a mutation, you first call `useCreateDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDealMutation, { data, loading, error }] = useCreateDealMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDealMutation(baseOptions?: Apollo.MutationHookOptions<CreateDealMutation, CreateDealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDealMutation, CreateDealMutationVariables>(CreateDealDocument, options);
      }
export type CreateDealMutationHookResult = ReturnType<typeof useCreateDealMutation>;
export type CreateDealMutationResult = Apollo.MutationResult<CreateDealMutation>;
export type CreateDealMutationOptions = Apollo.BaseMutationOptions<CreateDealMutation, CreateDealMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    id
    name
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const PostDocument = gql`
    query Post($postId: ID!) {
  post(id: $postId) {
    wantSkill
    haveSkill
    user {
      wallet
      id
    }
    type
    tags {
      name
    }
    status
    description
    createdAt
    matchAsTarget {
      targetPost {
        id
        wantSkill
        haveSkill
        description
        createdAt
        user {
          wallet
        }
        status
        tags {
          name
        }
        type
      }
      score
      method
      createdAt
      id
      sourcePost {
        id
        wantSkill
        haveSkill
        description
        createdAt
        user {
          wallet
        }
        status
        tags {
          name
        }
        type
      }
    }
    matchAsSource {
      targetPost {
        id
        wantSkill
        haveSkill
        description
        createdAt
        user {
          wallet
        }
        status
        tags {
          name
        }
        type
      }
      score
      method
      createdAt
      id
      sourcePost {
        id
        wantSkill
        haveSkill
        description
        createdAt
        user {
          wallet
        }
        status
        tags {
          name
        }
        type
      }
    }
    dealsAsPostA {
      userA {
        wallet
      }
      userB {
        wallet
      }
      type
      status
      reviews {
        reviewer {
          wallet
        }
        rating
        reviewee {
          wallet
        }
        createdAt
        comment
      }
      completedAt
      postAId
      postBId
      createdAt
      id
    }
    dealsAsPostB {
      userA {
        wallet
      }
      userB {
        wallet
      }
      type
      status
      reviews {
        reviewer {
          wallet
        }
        rating
        reviewee {
          wallet
        }
        createdAt
        comment
      }
      completedAt
      postAId
      postBId
      createdAt
      id
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export function usePostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostSuspenseQueryHookResult = ReturnType<typeof usePostSuspenseQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
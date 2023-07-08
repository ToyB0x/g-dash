/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query prs($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        pullRequests(\n          orderBy: { field: UPDATED_AT, direction: DESC }\n          states: MERGED\n          first: 100\n        ) {\n          edges {\n            cursor\n            node {\n              id\n              author {\n                __typename\n                avatarUrl\n                ... on User {\n                  id\n                  login\n                  name\n                }\n              }\n              comments {\n                totalCount\n              }\n              # TODO: pagination\n              reviews(first: 100) {\n                nodes {\n                  id\n                  url\n                  author {\n                    login\n                  }\n                }\n              }\n              # TODO: pagination\n              commits(first: 100) {\n                totalCount\n                nodes {\n                  id\n                  commit {\n                    id\n                    url\n                    committedDate\n                    author {\n                      user {\n                        id\n                        login\n                        name\n                        avatarUrl\n                      }\n                    }\n                  }\n                }\n              }\n              createdAt\n              merged\n              mergedAt\n              additions\n              deletions\n              changedFiles\n              closed\n              closedAt\n              title\n              url\n            }\n          }\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  ": types.PrsDocument,
    "\n    query paginatePrs($owner: String!, $name: String!, $after: String) {\n      rateLimit {\n        limit\n        cost\n        remaining\n      }\n      repository(owner: $owner, name: $name) {\n        pullRequests(\n          orderBy: { field: CREATED_AT, direction: DESC }\n          after: $after\n          first: 100\n        ) {\n          edges {\n            cursor\n            node {\n              id\n              author {\n                __typename\n                avatarUrl\n                ... on User {\n                  id\n                  login\n                  name\n                }\n              }\n              comments {\n                totalCount\n              }\n              # TODO: pagination\n              reviews(first: 100) {\n                nodes {\n                  id\n                  url\n                  author {\n                    login\n                  }\n                }\n              }\n              # TODO: pagination\n              commits(first: 100) {\n                totalCount\n                nodes {\n                  id\n                  commit {\n                    id\n                    url\n                    committedDate\n                    author {\n                      user {\n                        id\n                        login\n                        name\n                        avatarUrl\n                      }\n                    }\n                  }\n                }\n              }\n              createdAt\n              merged\n              mergedAt\n              additions\n              deletions\n              changedFiles\n              closed\n              closedAt\n              title\n              url\n            }\n          }\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  ": types.PaginatePrsDocument,
    "\n    query repositories($organization: String!) {\n      organization(login: $organization) {\n        id\n        login\n        repositories(\n          orderBy: { field: PUSHED_AT, direction: DESC }\n          first: 100\n        ) {\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            node {\n              id\n              name\n              pushedAt\n              releases(\n                first: 100\n                orderBy: { field: CREATED_AT, direction: DESC }\n              ) {\n                nodes {\n                  id\n                  tagName\n                  url\n                  publishedAt\n                }\n              }\n              hasVulnerabilityAlertsEnabled\n              vulnerabilityAlerts(first: 100, states: [OPEN]) {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.RepositoriesDocument,
    "\n    query paginateRepositories($organization: String!, $after: String) {\n      organization(login: $organization) {\n        id\n        login\n        repositories(\n          orderBy: { field: PUSHED_AT, direction: DESC }\n          after: $after\n          first: 100\n        ) {\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            node {\n              id\n              name\n              pushedAt\n              releases(\n                first: 100\n                orderBy: { field: CREATED_AT, direction: DESC }\n              ) {\n                nodes {\n                  id\n                  tagName\n                  url\n                  publishedAt\n                }\n              }\n              hasVulnerabilityAlertsEnabled\n              vulnerabilityAlerts(first: 100, states: [OPEN]) {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  ": types.PaginateRepositoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query prs($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        pullRequests(\n          orderBy: { field: UPDATED_AT, direction: DESC }\n          states: MERGED\n          first: 100\n        ) {\n          edges {\n            cursor\n            node {\n              id\n              author {\n                __typename\n                avatarUrl\n                ... on User {\n                  id\n                  login\n                  name\n                }\n              }\n              comments {\n                totalCount\n              }\n              # TODO: pagination\n              reviews(first: 100) {\n                nodes {\n                  id\n                  url\n                  author {\n                    login\n                  }\n                }\n              }\n              # TODO: pagination\n              commits(first: 100) {\n                totalCount\n                nodes {\n                  id\n                  commit {\n                    id\n                    url\n                    committedDate\n                    author {\n                      user {\n                        id\n                        login\n                        name\n                        avatarUrl\n                      }\n                    }\n                  }\n                }\n              }\n              createdAt\n              merged\n              mergedAt\n              additions\n              deletions\n              changedFiles\n              closed\n              closedAt\n              title\n              url\n            }\n          }\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query prs($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        pullRequests(\n          orderBy: { field: UPDATED_AT, direction: DESC }\n          states: MERGED\n          first: 100\n        ) {\n          edges {\n            cursor\n            node {\n              id\n              author {\n                __typename\n                avatarUrl\n                ... on User {\n                  id\n                  login\n                  name\n                }\n              }\n              comments {\n                totalCount\n              }\n              # TODO: pagination\n              reviews(first: 100) {\n                nodes {\n                  id\n                  url\n                  author {\n                    login\n                  }\n                }\n              }\n              # TODO: pagination\n              commits(first: 100) {\n                totalCount\n                nodes {\n                  id\n                  commit {\n                    id\n                    url\n                    committedDate\n                    author {\n                      user {\n                        id\n                        login\n                        name\n                        avatarUrl\n                      }\n                    }\n                  }\n                }\n              }\n              createdAt\n              merged\n              mergedAt\n              additions\n              deletions\n              changedFiles\n              closed\n              closedAt\n              title\n              url\n            }\n          }\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query paginatePrs($owner: String!, $name: String!, $after: String) {\n      rateLimit {\n        limit\n        cost\n        remaining\n      }\n      repository(owner: $owner, name: $name) {\n        pullRequests(\n          orderBy: { field: CREATED_AT, direction: DESC }\n          after: $after\n          first: 100\n        ) {\n          edges {\n            cursor\n            node {\n              id\n              author {\n                __typename\n                avatarUrl\n                ... on User {\n                  id\n                  login\n                  name\n                }\n              }\n              comments {\n                totalCount\n              }\n              # TODO: pagination\n              reviews(first: 100) {\n                nodes {\n                  id\n                  url\n                  author {\n                    login\n                  }\n                }\n              }\n              # TODO: pagination\n              commits(first: 100) {\n                totalCount\n                nodes {\n                  id\n                  commit {\n                    id\n                    url\n                    committedDate\n                    author {\n                      user {\n                        id\n                        login\n                        name\n                        avatarUrl\n                      }\n                    }\n                  }\n                }\n              }\n              createdAt\n              merged\n              mergedAt\n              additions\n              deletions\n              changedFiles\n              closed\n              closedAt\n              title\n              url\n            }\n          }\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query paginatePrs($owner: String!, $name: String!, $after: String) {\n      rateLimit {\n        limit\n        cost\n        remaining\n      }\n      repository(owner: $owner, name: $name) {\n        pullRequests(\n          orderBy: { field: CREATED_AT, direction: DESC }\n          after: $after\n          first: 100\n        ) {\n          edges {\n            cursor\n            node {\n              id\n              author {\n                __typename\n                avatarUrl\n                ... on User {\n                  id\n                  login\n                  name\n                }\n              }\n              comments {\n                totalCount\n              }\n              # TODO: pagination\n              reviews(first: 100) {\n                nodes {\n                  id\n                  url\n                  author {\n                    login\n                  }\n                }\n              }\n              # TODO: pagination\n              commits(first: 100) {\n                totalCount\n                nodes {\n                  id\n                  commit {\n                    id\n                    url\n                    committedDate\n                    author {\n                      user {\n                        id\n                        login\n                        name\n                        avatarUrl\n                      }\n                    }\n                  }\n                }\n              }\n              createdAt\n              merged\n              mergedAt\n              additions\n              deletions\n              changedFiles\n              closed\n              closedAt\n              title\n              url\n            }\n          }\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query repositories($organization: String!) {\n      organization(login: $organization) {\n        id\n        login\n        repositories(\n          orderBy: { field: PUSHED_AT, direction: DESC }\n          first: 100\n        ) {\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            node {\n              id\n              name\n              pushedAt\n              releases(\n                first: 100\n                orderBy: { field: CREATED_AT, direction: DESC }\n              ) {\n                nodes {\n                  id\n                  tagName\n                  url\n                  publishedAt\n                }\n              }\n              hasVulnerabilityAlertsEnabled\n              vulnerabilityAlerts(first: 100, states: [OPEN]) {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query repositories($organization: String!) {\n      organization(login: $organization) {\n        id\n        login\n        repositories(\n          orderBy: { field: PUSHED_AT, direction: DESC }\n          first: 100\n        ) {\n          totalCount\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            node {\n              id\n              name\n              pushedAt\n              releases(\n                first: 100\n                orderBy: { field: CREATED_AT, direction: DESC }\n              ) {\n                nodes {\n                  id\n                  tagName\n                  url\n                  publishedAt\n                }\n              }\n              hasVulnerabilityAlertsEnabled\n              vulnerabilityAlerts(first: 100, states: [OPEN]) {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query paginateRepositories($organization: String!, $after: String) {\n      organization(login: $organization) {\n        id\n        login\n        repositories(\n          orderBy: { field: PUSHED_AT, direction: DESC }\n          after: $after\n          first: 100\n        ) {\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            node {\n              id\n              name\n              pushedAt\n              releases(\n                first: 100\n                orderBy: { field: CREATED_AT, direction: DESC }\n              ) {\n                nodes {\n                  id\n                  tagName\n                  url\n                  publishedAt\n                }\n              }\n              hasVulnerabilityAlertsEnabled\n              vulnerabilityAlerts(first: 100, states: [OPEN]) {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query paginateRepositories($organization: String!, $after: String) {\n      organization(login: $organization) {\n        id\n        login\n        repositories(\n          orderBy: { field: PUSHED_AT, direction: DESC }\n          after: $after\n          first: 100\n        ) {\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n          edges {\n            node {\n              id\n              name\n              pushedAt\n              releases(\n                first: 100\n                orderBy: { field: CREATED_AT, direction: DESC }\n              ) {\n                nodes {\n                  id\n                  tagName\n                  url\n                  publishedAt\n                }\n              }\n              hasVulnerabilityAlertsEnabled\n              vulnerabilityAlerts(first: 100, states: [OPEN]) {\n                totalCount\n              }\n            }\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
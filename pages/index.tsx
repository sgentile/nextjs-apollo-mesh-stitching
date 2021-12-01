import { gql } from "@apollo/client";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContractsQuery } from "../gen/graphql-types";

export const QUERY_ORGS = gql`
  query Contracts {
    contracts(orderBy: { name: asc }) {
      id
      name
      userId
    }
  }
`;

// export const QUERY_POSTS = gql`
//   query Posts {
//     posts {
//       id
//       title
//       content
//       user {
//         id
//         name
//       }
//     }
//   }
// `;

export default function Home() {
  const { data } = useContractsQuery();
  // const { data: posts } = usePostsQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>List of Contracts</h3>
        {data?.contracts.map(({ id, name }) => (
          <div key={id}>{name}</div>
        ))}
        {/* <h3>List of Posts</h3>
        {posts?.posts.map(({ id, title, content, user }) => (
          <div key={id}>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            <div>User: {user?.name}</div>
          </div>
        ))} */}
        <div style={{ marginTop: "20px", fontStyle: "italic" }}>
          GraphQL endpoint is located <a href="/api/graphql">here</a>
        </div>
      </main>
    </div>
  );
}

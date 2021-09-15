import { IPost } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";

import Reply from "../components/Reply";
import { API_ROOT, DEFAULT_TITLE, POSTS_PER_TOPIC_PAGE } from "../config";

function Topic(): JSX.Element {
  const { id, page } = useParams();
  const realPage = page ?? 1;
  const auth = useAuth();
  const { data, error, isError, isLoading }: UseQueryResult<IPost[]> = useQuery(
    ["topic", id, realPage],
    () =>
      ky
        .get(
          `${API_ROOT}/Topic/${id}/post?from=${
            (realPage - 1) * POSTS_PER_TOPIC_PAGE
          }&size=${POSTS_PER_TOPIC_PAGE}`,
          { headers: { Authorization: `Bearer ${auth.user?.access_token}` } }
        )
        .json(),
    { keepPreviousData: true }
  );

  useTitle(data?.[0].title ?? DEFAULT_TITLE);

  if (isError) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <aside className="sticky top-20 left-4 z-40 w-48 h-12 flex-none hidden md:block">
        <p>test</p>
        <p>test</p>
      </aside>
      <main className="w-full flex-auto flex flex-col space-y-6 mx-6 md:mx-0">
        {data?.map((post) => (
          <div key={post.id}>
            <Reply post={post} />
          </div>
        ))}
      </main>
      <aside className="w-60 hidden md:block">test3</aside>
    </div>
  );
}

export default Topic;

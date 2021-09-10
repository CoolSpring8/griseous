import bbobReactRender from "@bbob/react/es/render";
import { IPost } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";

import { API_ROOT, DEFAULT_TITLE, POSTS_PER_TOPIC_PAGE } from "../config";
import { ubbOptions, ubbPreset } from "../utils/Ubb";

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
    <div className="w-full flex">
      <aside className="static z-40 inset-4 w-48 height-auto flex-none">
        <p>tset</p>
        <p>tes</p>
      </aside>
      <main className="w-full flex-auto static">
        {data?.map((post) => (
          <div key={post.id}>
            <p>
              {post.floor}楼 {post.userName}
            </p>
            <div className="whitespace-pre-wrap">
              {bbobReactRender(post.content, ubbPreset(), ubbOptions)}
            </div>
            <hr />
          </div>
        ))}
      </main>
      <aside className="w-60">test3</aside>
    </div>
  );
}

export default Topic;

import { IPost, IUser } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import { Link, useParams } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";

import Loading from "../components/Loading";
import Reply from "../components/Reply";
import { API_ROOT, DEFAULT_TITLE, POSTS_PER_TOPIC_PAGE } from "../config";

function Topic(): JSX.Element {
  const { id, page } = useParams();
  const realPage = page ?? "1";
  const auth = useAuth();
  const { data, error, isError, isLoading }: UseQueryResult<IPost[], Error> =
    useQuery(
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
  const users = data?.map((post) => post.userId).filter(Boolean);
  const userInfo: UseQueryResult<IUser[]> = useQuery(
    ["user", users],
    () =>
      ky
        .get(
          `${API_ROOT}/user?${users?.map((userId) => `id=${userId}`).join("&")}`
        )
        .json(),
    { enabled: !!users }
  );

  useTitle(data?.[0].title ?? DEFAULT_TITLE, { restoreOnUnmount: true });

  if (isError && error) {
    return <p>错误：{error.message}</p>;
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex">
        <aside className="sticky top-20 left-4 z-40 w-48 h-12 flex-none hidden md:block">
          <p>test</p>
          <p>test</p>
          <Link
            to={`/topic/${id}/${Number(realPage) - 1}`}
            className="block w-full h-full"
          />
        </aside>
        <main className="w-full flex-auto flex flex-col space-y-6 mx-6 md:mx-0">
          {data?.map((post) => (
            <div key={post.id}>
              <Reply
                post={post}
                user={userInfo.data?.find((user) => user.id === post.userId)}
              />
            </div>
          ))}
        </main>
        <aside className="w-60 hidden md:block">
          test3
          <Link
            to={`/topic/${id}/${Number(realPage) + 1}`}
            className="block w-full h-full"
          />
        </aside>
      </div>
    </>
  );
}

export default Topic;

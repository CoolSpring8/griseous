import { IPost, ITopic, IUser } from "@cc98/api";
import { SwipeableDrawer } from "@mui/material";
import ky from "ky";
import * as React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useAuth } from "react-oidc-context";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "react-query";

import { API_ROOT, POSTS_PER_TOPIC_PAGE } from "../config";
import Reply from "./Reply";

function TopicDrawer({
  topicId,
  open,
  onOpen = () => {
    /* nop */
  },
  onClose = () => {
    /* nop */
  },
}: {
  topicId: number;
  open: boolean;
  onOpen?: React.ReactEventHandler<Record<string, unknown>>;
  onClose?: React.ReactEventHandler<Record<string, unknown>>;
}): JSX.Element {
  const auth = useAuth();

  const topicInfo: UseQueryResult<ITopic> = useQuery(
    ["topicInfo", topicId],
    () =>
      ky
        .get(`${API_ROOT}/topic/${topicId}`, {
          headers: { Authorization: `Bearer ${auth.user?.access_token}` },
        })
        .json()
  );

  const {
    data,
    error,
    isError,
    fetchNextPage,
    isLoading,
    hasNextPage,
  }: UseInfiniteQueryResult<IPost[], Error> = useInfiniteQuery(
    ["topicPosts", topicId],
    ({ pageParam = 0 }) =>
      ky
        .get(
          `${API_ROOT}/Topic/${topicId}/post?from=${
            pageParam * POSTS_PER_TOPIC_PAGE
          }&size=${POSTS_PER_TOPIC_PAGE}`,
          { headers: { Authorization: `Bearer ${auth.user?.access_token}` } }
        )
        .json(),
    {
      enabled: open && topicInfo.data?.replyCount !== undefined,
      getNextPageParam: (lastPage: IPost[], allPages: IPost[][]) => {
        if (
          allPages.length >=
            Math.ceil((topicInfo.data?.replyCount ?? 0 + 1) / 10) &&
          lastPage.length < POSTS_PER_TOPIC_PAGE
        )
          return undefined;
        return allPages.length;
      },
    }
  );

  // TODO：待查询列表为空（全为匿名）时可不发送请求
  const userInfo: UseInfiniteQueryResult<IUser[]> = useInfiniteQuery(
    ["user", topicId],
    ({ pageParam = data?.pages[0].map((post) => post.userId) }) =>
      ky
        .get(
          `${API_ROOT}/user?${pageParam
            ?.map((userId: number) => `id=${userId}`)
            .filter(Boolean)
            .join("&")}`
        )
        .json(),
    {
      enabled: open && (data?.pages.length ?? 0) >= 1,
    }
  );

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? true,
    onLoadMore: () => {
      // TODO: 第一页数据加载完成后还未显示时，由于加载框还在viewport内，会立即触发一次onLoadMore
      if (isLoading) {
        return;
      }
      fetchNextPage().then((posts) =>
        userInfo.fetchNextPage({
          pageParam: posts.data?.pages
            .flat()
            .map((post) => post.userId)
            .filter(
              (id) =>
                !userInfo.data?.pages
                  .flat()
                  .map((user) => user.id)
                  .includes(id)
            ),
        })
      );
    },
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  if (isError && error) {
    return <p>错误：{error.message}</p>;
  }

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >
      <div className="w-70vw md:w-160 lg:w-200 flex flex-col space-y-6 mx-6">
        {data?.pages.map((page, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={i}>
            {page.map((post) => (
              <div key={post.id}>
                <Reply
                  post={post}
                  user={userInfo.data?.pages
                    .flat()
                    .find((user) => user.id === post.userId)}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef} className="flex justify-center mt-4">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </SwipeableDrawer>
  );
}

export default TopicDrawer;

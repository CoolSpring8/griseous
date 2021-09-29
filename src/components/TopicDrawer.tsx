import { IPost, ITopic, IUser } from "@cc98/api";
import { Button, SwipeableDrawer } from "@mui/material";
import ky from "ky";
import * as React from "react";
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

  const users = data?.pages.map((page) =>
    page.map((post) => post.userId).filter(Boolean)
  );

  const userInfo: UseInfiniteQueryResult<IUser[]> = useInfiniteQuery(
    ["user", topicId],
    ({ pageParam = 0 }) =>
      ky
        .get(
          `${API_ROOT}/user?${users?.[pageParam]
            ?.map((userId) => `id=${userId}`)
            .join("&")}`
        )
        .json(),
    {
      enabled: open && !!users,
      getNextPageParam: (lastPage: IUser[], allPages: IUser[][]) => {
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
                  user={userInfo.data?.pages?.[i]?.find(
                    (user) => user.id === post.userId
                  )}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <Button
        onClick={() => {
          fetchNextPage();
          setTimeout(() => userInfo.fetchNextPage(), 500); // TODO: unreliable workaround
        }}
      >
        下一页
      </Button>
    </SwipeableDrawer>
  );
}

export default TopicDrawer;

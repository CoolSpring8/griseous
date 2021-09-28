import { IPost, IUser } from "@cc98/api";
import { SwipeableDrawer } from "@mui/material";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import useTitle from "react-use/lib/useTitle";

import { API_ROOT, DEFAULT_TITLE, POSTS_PER_TOPIC_PAGE } from "../config";
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
  const page = 1;
  const auth = useAuth();
  const { data, error, isError }: UseQueryResult<IPost[], Error> = useQuery(
    ["topic", topicId, page],
    () =>
      ky
        .get(
          `${API_ROOT}/Topic/${topicId}/post?from=${
            (page - 1) * POSTS_PER_TOPIC_PAGE
          }&size=${POSTS_PER_TOPIC_PAGE}`,
          { headers: { Authorization: `Bearer ${auth.user?.access_token}` } }
        )
        .json(),
    { keepPreviousData: true, enabled: open }
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
    { enabled: open && !!users }
  );

  useTitle(data?.[0].title ?? DEFAULT_TITLE, { restoreOnUnmount: true });

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
      <div className="w-70vw md:w-200 flex flex-col space-y-6 mx-6">
        {data?.map((post) => (
          <div key={post.id}>
            <Reply
              post={post}
              user={userInfo.data?.find((user) => user.id === post.userId)}
            />
          </div>
        ))}
      </div>
    </SwipeableDrawer>
  );
}

export default TopicDrawer;

import { IBasicUser, ITopic } from "@cc98/api";
import { RefreshIcon, RssIcon } from "@heroicons/react/outline";
import { Button } from "@mui/material";
import classNames from "classnames";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import {
  API_ROOT,
  OFFICIAL_FORUM_ROOT,
  TOPICS_PER_NEW_TOPICS_PAGE,
} from "../config";

function NewTopics(): JSX.Element {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const { data, isFetching }: UseQueryResult<ITopic[]> = useQuery(
    ["newTopics", page],
    () =>
      ky
        .get(
          `${API_ROOT}/topic/new?from=${
            (page - 1) * TOPICS_PER_NEW_TOPICS_PAGE
          }&size=${TOPICS_PER_NEW_TOPICS_PAGE}`,
          {
            headers: { Authorization: `Bearer ${auth.user?.access_token}` },
          }
        )
        .json(),
    { enabled: !auth.isLoading && auth.isAuthenticated, keepPreviousData: true }
  );
  const users = data?.map((topic) => topic.userId).filter(Boolean);
  const avatar: UseQueryResult<IBasicUser[]> = useQuery(
    ["basicUser", users],
    () =>
      ky
        .get(
          `${API_ROOT}/user/basic?id=${users
            ?.map((id) => `id=${id}`)
            .join("&")}`
        )
        .json(),
    { enabled: !!users }
  );

  return (
    <div className="shadow-lg rounded-2xl p-8 flex flex-col space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="text-gray-500 text-2xl font-medium flex items-center">
          <RssIcon className="w-6 h-6" />
          <span>新帖</span>
        </div>
        <RefreshIcon
          className={classNames("w-6 h-6 text-blue-400 cursor-pointer", {
            "animate-spin": isFetching && avatar.isFetching,
          })}
          onClick={() => {
            queryClient.invalidateQueries("newTopics");
          }}
        />
      </div>
      {!auth.isAuthenticated ? (
        <div className="text-2xl leading-10 font-medium text-gray-300 text-center pb-2">
          <p>( ° ∀ ° )ﾉﾞ</p>
          <p>登录后才能查看哦</p>
        </div>
      ) : (
        <>
          <div>
            {data?.map((topic) => (
              <div
                key={topic.id}
                className="border-gray-100 border-b-2 flex items-center py-2"
              >
                <div>
                  <img
                    src={
                      topic.isAnonymous
                        ? `${OFFICIAL_FORUM_ROOT}/static/images/心灵头像.gif`
                        : avatar?.data?.find((v) => v.id === topic.userId)
                            ?.portraitUrl
                    }
                    alt=""
                    className="w-12 h-12 rounded-lg"
                  />
                </div>
                <div className="ml-2">
                  <div>
                    <Link to={`/topic/${topic.id}`} className="text-gray-800">
                      {topic.title}
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/user/id/${topic.id}`}
                      className="text-xs font-medium text-gray-400"
                    >
                      {topic.isAnonymous ? "匿名用户" : topic.userName}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <Button
              onClick={() => {
                setPage((p) => p - 1);
              }}
              disabled={page <= 1 || isFetching}
            >
              上一页
            </Button>
            <span className="text-gray-700 text-sm">{page}</span>
            <Button
              onClick={() => {
                setPage((p) => p + 1);
              }}
              disabled={isFetching}
            >
              下一页
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default NewTopics;

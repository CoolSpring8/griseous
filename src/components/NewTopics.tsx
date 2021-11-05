import { IBasicUser, ITopic } from "@cc98/api";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { Button, Slider } from "@mui/material";
import classNames from "classnames";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import {
  API_ROOT,
  NEW_TOPICS_PAGINATION_MAX_SIZE,
  OFFICIAL_FORUM_ROOT,
  TOPICS_PER_NEW_TOPICS_PAGE,
} from "../config";
import { boardInfo } from "../utils/boardInfoJson";
import { rtfFormat } from "../utils/TimeFormat";
import TopicDrawer from "./TopicDrawer";

function NewTopics(): JSX.Element {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTopic, setActiveTopic] = React.useState(0);
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
          `${API_ROOT}/user/basic?${users?.map((id) => `id=${id}`).join("&")}`
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
        <div className="flex items-center">
          {!auth.isAuthenticated ? null : (
            <div className="hidden md:flex">
              <button
                type="button"
                onClick={() => {
                  setPage((p) => p - 1);
                }}
                disabled={page <= 1 || isFetching}
              >
                <ChevronLeftIcon className="w-6 h-6 text-pink-300" />
              </button>
              <Slider
                marks
                valueLabelDisplay="auto"
                value={page}
                min={1}
                max={NEW_TOPICS_PAGINATION_MAX_SIZE}
                onChangeCommitted={(e: Event, value: number) => setPage(value)}
                className="w-72 mx-2"
              />
              <button
                type="button"
                className="w-6"
                onClick={() => {
                  setPage((p) => p + 1);
                }}
                disabled={page >= NEW_TOPICS_PAGINATION_MAX_SIZE || isFetching}
              >
                <ChevronRightIcon className="w-6 h-6 text-pink-300" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setPage(1);
            }}
            className="block md:hidden"
          >
            <ChevronDoubleLeftIcon className="w-6 h-6 text-pink-300" />
          </button>
          <button
            type="button"
            onClick={() => {
              queryClient.invalidateQueries("newTopics");
            }}
            className="ml-8"
          >
            <RefreshIcon
              className={classNames("w-6 h-6 text-blue-400", {
                "animate-spin": isFetching && avatar.isFetching,
              })}
            />
          </button>
        </div>
      </div>
      {!auth.isAuthenticated ? (
        <div className="text-2xl leading-10 font-medium text-gray-300 text-center pb-2">
          <p>( ° ∀ ° )ﾉﾞ</p>
          <p>校网下授权登录后才能查看哦</p>
        </div>
      ) : (
        <div>
          <div>
            {data?.map((topic) => (
              <div
                key={topic.id}
                className="border-gray-100 border-b-2 flex items-center py-3"
              >
                <div className="flex-shrink-0">
                  <img
                    src={
                      topic.isAnonymous
                        ? `${OFFICIAL_FORUM_ROOT}/static/images/心灵头像.gif`
                        : avatar?.data?.find((v) => v.id === topic.userId)
                            ?.portraitUrl
                    }
                    alt=""
                    className="w-12 h-12 rounded-lg bg-purple-300"
                  />
                </div>
                <div className="ml-2 self-stretch flex flex-col space-y-1">
                  <div>
                    <button
                      type="button"
                      className="text-gray-600 text-left"
                      onClick={() => {
                        setActiveTopic(topic.id);
                        setDrawerOpen(true);
                      }}
                    >
                      {topic.title}
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <div className="bg-gray-100 rounded-lg p-1 mr-1.5 whitespace-nowrap">
                      <Link to={`/board/${topic.boardId}`}>
                        {boardInfo.find((b) => b.id === topic.boardId)?.name ??
                          "未知版面"}
                      </Link>
                    </div>
                    <div className="space-x-1.5 mr-2.5">
                      <span className="font-semibold">
                        <Link to={`/user/id/${topic.id}`}>
                          {topic.isAnonymous ? "匿名用户" : topic.userName}
                        </Link>
                      </span>
                      <span>{rtfFormat(topic.time)}</span>
                    </div>
                    {topic.replyCount === 0 ? null : (
                      <>
                        <span className="hidden sm:inline">/</span>
                        <div className="space-x-1.5 ml-2.5 hidden sm:inline">
                          <span className="font-semibold">
                            {topic.isAnonymous
                              ? "匿名用户"
                              : topic.lastPostUser}
                          </span>
                          <span>{rtfFormat(topic.lastPostTime)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {topic.replyCount === 0 ? null : (
                  <div className="ml-auto text-white bg-gray-400 font-bold text-sm px-2 rounded-lg">
                    <Link
                      to={`/topic/${topic.id}/${Math.ceil(
                        topic.replyCount / 10
                      )}#${topic.replyCount % 10}`}
                    >
                      {topic.replyCount}
                    </Link>
                  </div>
                )}
                {activeTopic === topic.id && (
                  <TopicDrawer
                    open={drawerOpen}
                    topicId={topic.id}
                    onOpen={() => {
                      setDrawerOpen(true);
                    }}
                    onClose={() => {
                      setDrawerOpen(false);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-2 space-x-3">
            <Button
              onClick={() => {
                setPage((p) => p - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page <= 1 || isFetching}
            >
              上一页
            </Button>
            <span className="text-gray-700 text-sm">{page}</span>
            <Button
              onClick={() => {
                setPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page >= NEW_TOPICS_PAGINATION_MAX_SIZE || isFetching}
            >
              下一页
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewTopics;

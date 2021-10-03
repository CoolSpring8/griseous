import { ITopic } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import TopicDrawer from "../components/TopicDrawer";
import { API_ROOT, TOPICS_PER_BOARD_PAGE } from "../config";
import useSearchParams from "../hooks/useSearchParams";
import { dtfFormat } from "../utils/TimeFormat";

function Search(): JSX.Element {
  const { q } = useSearchParams();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTopic, setActiveTopic] = React.useState(0);
  const auth = useAuth();
  const { data }: UseQueryResult<ITopic[]> = useQuery(["search", q], () =>
    ky
      .get(
        `${API_ROOT}/topic/search?keyword=${encodeURIComponent(
          q
        )}&size=${TOPICS_PER_BOARD_PAGE}&from=0`,
        { headers: { Authorization: `Bearer ${auth.user?.access_token}` } }
      )
      .json()
  );

  return (
    <div className="px-8 lg:px-64">
      <div className="shadow-lg rounded-2xl bg-white flex flex-col p-8">
        {data?.map((topic) => (
          <div
            key={topic.id}
            className="border-gray-100 border-b-2 flex flex-col justify-between py-4"
          >
            <div className="space-x-2 mb-3 flex items-start">
              <button
                type="button"
                onClick={() => {
                  setActiveTopic(topic.id);
                  setDrawerOpen(true);
                }}
                className="text-2xl text-left"
              >
                {topic.title}
              </button>
            </div>
            <div className="flex flex-col text-sm">
              <p className="space-x-1">
                <Link to={`/user/${topic.userId}`}>
                  {topic.isAnonymous ? "匿名" : topic.userName}
                </Link>
                <span>发布于</span>
                <span>{dtfFormat(topic.time)}</span>
              </p>
              {topic.replyCount === 0 ? null : (
                <p className="space-x-1">
                  <span>{topic.lastPostUser}</span>
                  <span>最后回复于</span>
                  <span>{dtfFormat(topic.lastPostTime)}</span>
                </p>
              )}
            </div>
            <div className="space-x-1">
              <span className="text-sm mt-2">
                共 {topic.replyCount} 个回复，{topic.hitCount} 次浏览
              </span>
              <Link
                to={`/board/${topic.boardId}`}
                className="shadow-sm rounded bg-green-50 text-green-500 font-bold p-1 text-center"
              >
                {topic.boardName}
              </Link>
            </div>
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
    </div>
  );
}

export default Search;

import { IIndex } from "@cc98/api";
import { FireIcon } from "@heroicons/react/outline";
import ky from "ky";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import { API_ROOT } from "../config";
import TopicDrawer from "./TopicDrawer";

function HotTopics(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTopic, setActiveTopic] = React.useState(0);
  const { data }: UseQueryResult<IIndex> = useQuery("hotTopic", () =>
    ky.get(`${API_ROOT}/config/index`).json()
  );

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white flex flex-col">
      <div className="flex items-center text-gray-500 text-2xl font-medium mb-2">
        <FireIcon className="w-6 h-6" />
        <span>十大</span>
      </div>
      <div className="">
        {data?.hotTopic.map((t, index) => (
          <div
            key={t.id}
            className="even:bg-gray-100 rounded py-2 px-1 flex gap-2"
          >
            <span className="text-lg font-semibold text-gray-400 mr-1">
              {`${index + 1}`.padStart(2, "0")}
            </span>
            <button
              type="button"
              className="text-sm text-gray-600 text-left"
              onClick={() => {
                setActiveTopic(t.id);
                setDrawerOpen(true);
              }}
            >
              {t.title}
            </button>
            <span className="text-xs text-gray-400 bg-gray-200 rounded py-0.5 px-1 whitespace-nowrap ml-auto self-center">
              <Link to={`/board/${t.boardId}`}>{t.boardName}</Link>
            </span>
            {activeTopic === t.id && (
              <TopicDrawer
                open={drawerOpen}
                topicId={t.id}
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

export default HotTopics;

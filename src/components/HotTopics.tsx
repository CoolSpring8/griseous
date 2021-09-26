import { IIndex } from "@cc98/api";
import { FireIcon } from "@heroicons/react/outline";
import ky from "ky";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import { API_ROOT } from "../config";

function HotTopics(): JSX.Element {
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
            className="even:bg-gray-100 rounded py-1 flex items-center"
          >
            <span className="text-xl text-gray-400 mr-3">{index + 1}</span>
            <Link to={`/topic/${t.id}`} className="text-sm text-gray-800">
              {t.title}
            </Link>
            <span className="text-xs text-gray-400 bg-gray-200 rounded py-0.5 px-1 whitespace-nowrap ml-auto">
              <Link to={`/board/${t.boardId}`}>{t.boardName}</Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotTopics;

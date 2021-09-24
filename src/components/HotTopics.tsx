import { IIndex } from "@cc98/api";
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
    <div>
      <ul className="p-6 rounded-2xl shadow-lg bg-white">
        {data?.hotTopic.map((t) => (
          <li key={t.id}>
            <Link to={`/topic/${t.id}`}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotTopics;

import { IIndex } from "@cc98/api";
import ky from "ky";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";

import { API_ROOT } from "../config";

function HotTopic(): JSX.Element {
  const { data }: UseQueryResult<IIndex> = useQuery("hotTopic", () =>
    ky.get(`${API_ROOT}/config/index`).json()
  );

  return (
    <div>
      {data?.hotTopic.map((t) => (
        <p key={t.id}>{t.title}</p>
      ))}
    </div>
  );
}

export default HotTopic;

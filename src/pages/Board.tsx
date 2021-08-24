import { useReactOidc } from "@axa-fr/react-oidc-context";
import { IBoard, ITopic } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Link, useParams } from "react-router-dom";

import { API_ROOT, TOPICS_PER_BOARD_PAGE } from "../config";

function Board(): JSX.Element {
  const { id, page } = useParams();
  const realPage = page ?? 1;
  const { oidcUser } = useReactOidc();
  const boardInfo: UseQueryResult<IBoard> = useQuery(["boardInfo", id], () =>
    ky
      .get(`${API_ROOT}/board/${id}`, {
        headers: { Authorization: `Bearer ${oidcUser.access_token}` },
      })
      .json()
  );
  const topTopics: UseQueryResult<ITopic[]> = useQuery(
    ["boardTopTopics", id],
    () =>
      ky
        .get(`${API_ROOT}/topic/toptopics?boardid=${id}`, {
          headers: { Authorization: `Bearer ${oidcUser.access_token}` },
        })
        .json()
  );
  const topics: UseQueryResult<ITopic[]> = useQuery(
    ["boardTopics", id, page],
    () =>
      ky
        .get(
          `${API_ROOT}/board/${id}/topic?from=${
            (realPage - 1) * TOPICS_PER_BOARD_PAGE
          }&size=${TOPICS_PER_BOARD_PAGE}`,
          {
            headers: { Authorization: `Bearer ${oidcUser.access_token}` },
          }
        )
        .json()
  );

  return (
    <div>
      <h1>{boardInfo.data?.name}</h1>
      <div>
        {topTopics.data?.map((t) => (
          <Link to={`/topic/${t.id}`} className="block">
            {t.title}
          </Link>
        ))}
      </div>
      <div>
        {topics.data?.map((t) => (
          <Link to={`/topic/${t.id}`} className="block">
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Board;

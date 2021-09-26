import BBCode from "@bbob/react/es/Component";
import { IBoard, ITagGroup, ITopic } from "@cc98/api";
import { Tab } from "@headlessui/react";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import { Link, useParams } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";

import Loading from "../components/Loading";
import { API_ROOT, DEFAULT_TITLE, TOPICS_PER_BOARD_PAGE } from "../config";

function Board(): JSX.Element {
  const { id, page } = useParams();
  const realPage = page ?? 1;
  const auth = useAuth();
  const boardInfo: UseQueryResult<IBoard> = useQuery(["boardInfo", id], () =>
    ky
      .get(`${API_ROOT}/board/${id}`, {
        headers: { Authorization: `Bearer ${auth.user?.access_token}` },
      })
      .json()
  );
  const tags: UseQueryResult<ITagGroup[]> = useQuery(["boardTags", id], () =>
    ky
      .get(`${API_ROOT}/board/${id}/tag`, {
        headers: { Authorization: `Bearer ${auth.user?.access_token}` },
      })
      .json()
  );
  const topTopics: UseQueryResult<ITopic[]> = useQuery(
    ["boardTopTopics", id],
    () =>
      ky
        .get(`${API_ROOT}/topic/toptopics?boardid=${id}`, {
          headers: { Authorization: `Bearer ${auth.user?.access_token}` },
        })
        .json()
  );
  const bestTopics: UseQueryResult<{ count: number; topics: ITopic[] }> =
    useQuery(["boardBestTopics", id, page], () =>
      ky
        .get(
          `${API_ROOT}/topic/best/board/${id}?from=${
            (realPage - 1) * TOPICS_PER_BOARD_PAGE
          }&size=${TOPICS_PER_BOARD_PAGE}`,
          {
            headers: { Authorization: `Bearer ${auth.user?.access_token}` },
          }
        )
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
            headers: { Authorization: `Bearer ${auth.user?.access_token}` },
          }
        )
        .json()
  );

  useTitle(boardInfo.data?.name ?? DEFAULT_TITLE, { restoreOnUnmount: true });

  if (boardInfo.isLoading || topTopics.isLoading || topics.isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <Tab.Group>
          <Tab.List className="space-x-1">
            <Tab>置顶</Tab>
            <Tab>精华</Tab>
            <Tab>全部</Tab>
            {tags.data?.[0]?.tags.map((t) => (
              <Tab>{t.name}</Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {topTopics.data?.map((t) => (
                <Link to={`/topic/${t.id}`} className="block" key={t.id}>
                  {t.title}
                </Link>
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {bestTopics.data?.topics.map((t) => (
                <Link to={`/topic/${t.id}`} className="block" key={t.id}>
                  {t.title}
                </Link>
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {topics.data?.map((t) => (
                <Link to={`/topic/${t.id}`} className="block" key={t.id}>
                  {t.title}
                </Link>
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="col-span-1 flex flex-col space-y-3">
        <h1 className="text-4xl font-bold">{boardInfo.data?.name}</h1>
        <p className="text-gray-500">{boardInfo.data?.description}</p>
        <div className="flex space-x-2">
          <div className="rounded-lg bg-blue-300 text-white px-2 py-0.5">
            主题帖数 {boardInfo.data?.topicCount}
          </div>
          <div className="rounded-lg bg-purple-300 text-white px-2 py-0.5">
            回复数 {boardInfo.data?.postCount}
          </div>
        </div>
        <p className="text-sm text-gray-400">
          版主：{boardInfo.data?.boardMasters.join(" ")}
        </p>
        <div>
          <BBCode>{boardInfo.data?.bigPaper}</BBCode>
        </div>
      </div>
    </div>
  );
}

export default Board;

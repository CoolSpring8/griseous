import { useReactOidc } from "@axa-fr/react-oidc-context";
import presetReact from "@bbob/preset-react";
import bbobReactRenderer from "@bbob/react/es/render";
import { IPost } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";

import { API_ROOT, PAGE_SIZE } from "../config";

function Topic(): JSX.Element {
  const { id, page } = useParams();
  const { oidcUser } = useReactOidc();
  const { data }: UseQueryResult<IPost[]> = useQuery(
    ["topic", id, page],
    () =>
      ky
        .get(
          `${API_ROOT}/Topic/${id}/post?from=${
            ((page ?? 1) - 1) * PAGE_SIZE
          }&size=${PAGE_SIZE}`,
          { headers: { Authorization: `Bearer ${oidcUser.access_token}` } }
        )
        .json(),
    { keepPreviousData: true }
  );

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <p>
            {post.floor}楼 {post.userName}
          </p>
          <div className="whitespace-pre-wrap">
            {bbobReactRenderer(post.content, presetReact())}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Topic;

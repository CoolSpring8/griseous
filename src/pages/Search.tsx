import { IPost } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import { API_ROOT, TOPICS_PER_BOARD_PAGE } from "../config";
import useSearchParams from "../hooks/useSearchParams";

function Search(): JSX.Element {
  const { q } = useSearchParams();
  const auth = useAuth();
  const { data }: UseQueryResult<IPost[]> = useQuery(["search", q], () =>
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
    <div>
      {data?.map((p) => (
        <div>
          <Link to={`/topic/${p.id}`} key={p.id}>
            {p.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Search;

import { IBoardGroup } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import { API_ROOT } from "../config";

function BoardList(): JSX.Element {
  const { data }: UseQueryResult<IBoardGroup[]> = useQuery("boardList", () =>
    ky.get(`${API_ROOT}/Board/all`).json()
  );

  return (
    <div>
      {data?.map((boardGroup) => (
        <div>
          <p>{boardGroup.name}</p>
          {boardGroup.boards.map((b) => (
            <Link to={`/board/${b.id}`}>{b.name} </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BoardList;

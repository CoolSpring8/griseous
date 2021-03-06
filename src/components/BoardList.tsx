import { IBoardGroup } from "@cc98/api";
import ky from "ky";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";

import { API_ROOT } from "../config";

function BoardList({ className }: { className?: string }): JSX.Element {
  const { data }: UseQueryResult<IBoardGroup[]> = useQuery("boardList", () =>
    ky.get(`${API_ROOT}/Board/all`).json()
  );

  return (
    <div className={className}>
      {data?.map((boardGroup) => (
        <div key={boardGroup.id}>
          <p>{boardGroup.name}</p>
          {boardGroup.boards.map((b) => (
            <Link to={`/board/${b.id}`} key={b.id}>
              {b.name}{" "}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BoardList;

import React from "react";

import BoardList from "../components/BoardList";
import HotTopic from "../components/HotTopic";

function Home(): JSX.Element {
  return (
    <div>
      <HotTopic />
      <BoardList />
    </div>
  );
}

export default Home;

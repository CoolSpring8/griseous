import React from "react";

import BoardList from "../components/BoardList";
import HotTopic from "../components/HotTopic";
import MyInfoCard from "../components/MyInfoCard";

function Home(): JSX.Element {
  return (
    <div>
      <MyInfoCard />
      <HotTopic />
      <BoardList />
    </div>
  );
}

export default Home;

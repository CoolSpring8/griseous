import React from "react";

import HotTopic from "../components/HotTopic";
import MyInfoCard from "../components/MyInfoCard";

function Home(): JSX.Element {
  return (
    <div>
      <MyInfoCard />
      <HotTopic />
    </div>
  );
}

export default Home;

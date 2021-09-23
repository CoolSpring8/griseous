import React from "react";

import BoardList from "../components/BoardList";
import HotTopic from "../components/HotTopic";
import MyUserCard from "../components/MyUserCard";
import NewTopics from "../components/NewTopics";

function Home(): JSX.Element {
  return (
    <div className="px-16 grid grid-cols-3">
      <main className="col-span-2">
        <NewTopics />
      </main>
      <aside className="col-span-1">
        <MyUserCard />
        <HotTopic />
        <BoardList />
      </aside>
    </div>
  );
}

export default Home;

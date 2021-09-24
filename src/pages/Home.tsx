import React from "react";

import BoardList from "../components/BoardList";
import HotTopics from "../components/HotTopics";
import MyUserCard from "../components/MyUserCard";
import NewTopics from "../components/NewTopics";

function Home(): JSX.Element {
  return (
    <div className="px-16 grid grid-cols-3 gap-8">
      <main className="col-span-2">
        <NewTopics />
      </main>
      <aside className="col-span-1 space-y-4">
        <MyUserCard />
        <HotTopics />
        <BoardList />
      </aside>
    </div>
  );
}

export default Home;

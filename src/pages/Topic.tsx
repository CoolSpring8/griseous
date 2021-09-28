import * as React from "react";
import { useParams } from "react-router-dom";

import TopicDrawer from "../components/TopicDrawer";

function Topic(): JSX.Element {
  const { id } = useParams();

  return (
    <div>
      <TopicDrawer open topicId={id} />
    </div>
  );
}

export default Topic;

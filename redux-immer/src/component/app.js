import React from "react";
import TimelineMain from "../timeline/container/timelineMain";
import FriendMain from "../friend/container/friendMain";

function App({}) {
  return (
    <div>
      <FriendMain ageLimit={30} />
      <FriendMain ageLimit={15} />
      <TimelineMain />
    </div>
  );
}

export default App;

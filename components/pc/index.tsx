import React from "react";
import NewUserSearch from "../newComponents/newUserSearch";
import PlayerView from "../newComponents/playerView";
import NewPcGameList from "./newPcGameList";
import BookingUsers from "./bookingUsers";

type PropsType = {};

function Index(props: PropsType) {
  return (
    <div>
      <div>
        <PlayerView />
        <NewUserSearch />
      </div>
      <div className={"flex"}>
        <NewPcGameList />
        <BookingUsers />
      </div>
    </div>
  );
}

export default Index;

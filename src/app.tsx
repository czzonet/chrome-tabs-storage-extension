import React from "react";
import style from "./app.less";
import { TabBar } from "./components/TabBar/TabBar";

export function App() {
  return (
    <div className={style.app}>
      <TabBar></TabBar>
    </div>
  );
}

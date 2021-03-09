import React from "react";
import ReactDom from "react-dom";
import { App } from "./app";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

console.log("app start.");

ReactDom.render(<App></App>, document.getElementById("app"));

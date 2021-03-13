import React from "react";
import { Button, Table, Tooltip } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";

export const TableTab = (props) => {
  const { dataSource } = props;

  const columns = [
    {
      title: "标签名",
      dataIndex: "title",
      key: "title",
      render: (text) => text || "",
      ellipsis: true,
    },
    {
      title: "地址",
      dataIndex: "url",
      key: "url",
      width: 100,
      render: (text, record) => {
        return (
          <Tooltip title={record.url}>
            <a href={record.url} target="_blank" rel="noreferrer noopenner">
              <ArrowRightOutlined></ArrowRightOutlined>
            </a>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      // scroll={{ y: 400 }}
      size="small"
      pagination={{ defaultPageSize: 5 }}
    ></Table>
  );
};

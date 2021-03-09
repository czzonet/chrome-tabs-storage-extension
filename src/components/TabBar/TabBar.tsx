import { Button, Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  createTab,
  getColor,
  getStoreTabs,
  getWindowTabs,
  setBackground,
  setStoreTabs,
} from "../../lib";
import { TableTab } from "../TableTab/TableTab";
import style from "./TabBarStyle.scss";

export function TabBar() {
  const [tabStores, setTabStores] = useState([] as TabStore[]);

  /** 存储标签页 */
  const handleSetCurrentTabsToTabStore = async () => {
    /** 获取当前窗口的标签页 */
    const currentTabs = await getWindowTabs();

    const tabs: Tab[] = currentTabs.map((tab, i) => ({
      key: i,
      title: tab.title,
      url: tab.url,
    }));

    console.log("tabs", tabs);

    const newTabStore: TabStore = {
      count: tabs.length,
      date: new Date().valueOf(),
      tabs,
    };

    /** 添加到头部 */
    const newTabStores = tabStores.concat();
    newTabStores.unshift(newTabStore);

    setTabStores(newTabStores);
  };

  /** 刷新 */
  const handleGetTabStore = async () => {
    /** 读取存储 */
    const tabStores: TabStore[] = await getStoreTabs();
    tabStores ? setTabStores(tabStores) : null;
  };

  /** 保存 */
  const handleSetTabStore = async () => {
    /** 设置存储 */
    setStoreTabs(tabStores);
  };

  /** 从存储里读取并打开标签页 */
  const handleReopenTabsFromTabStore = async () => {
    /** 读取存储 */
    const tabStores: TabStore[] = await getStoreTabs();

    if (tabStores) {
      /** 打开标签页 */
      tabStores[0]?.tabs.forEach((tab) => {
        createTab(tab.url);
      });
    }
  };

  /** 删除 */
  const handleDeleteTabStore = async (tabStore: TabStore) => {
    const index = tabStores.findIndex((v) => v == tabStore);

    if (index != -1) {
      const newTabStores = tabStores.concat();
      newTabStores.splice(index, 1);
      setTabStores(newTabStores);
    }
  };

  /** 初始化 */
  const handleEffect = async () => {
    /** 读取存储 */
    const tabStores: TabStore[] = await getStoreTabs();
    console.log("tabStores", tabStores);
    // tabStores ? setTabs(tabStores[0]?.tabs || []) : null;
    tabStores ? setTabStores(tabStores) : null;
  };

  useEffect(() => {
    handleEffect()
      .then()
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  return (
    <div className={style["tab-bar"]}>
      <div className={style["control"]}>
        <Button onClick={handleSetCurrentTabsToTabStore}>添加</Button>
        <div>
          <Button
            className={style["button-refresh"]}
            onClick={handleGetTabStore}
          >
            刷新
          </Button>
          <Button onClick={handleSetTabStore} type="primary">
            保存
          </Button>
        </div>
      </div>
      {tabStores.map((tabStore, i) => {
        return (
          <div key={i} className={style["cards"]}>
            <Card title={new Date(tabStore.date).toLocaleString()}>
              <div className={style.title}>
                <div> {tabStore.count + "个标签页"}</div>
                <div>
                  <Button
                    className={style["button-delete"]}
                    onClick={() => handleDeleteTabStore(tabStore)}
                  >
                    删除
                  </Button>

                  <Button onClick={handleReopenTabsFromTabStore} type="primary">
                    恢复
                  </Button>
                </div>
              </div>
              <TableTab dataSource={tabStore.tabs}></TableTab>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

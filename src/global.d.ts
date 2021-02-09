declare module "*.less" {
  const less: any;
  export default less;
}

declare const chrome: any;

/** 标签页存储 */
declare interface TabStore {
  date: number;
  count: number;
  tabs: Tab[];
}

/** 标签页 */
interface Tab {
  title: string;
  url: string;
  icon?: string;
}

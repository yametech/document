module.exports = {
  title: "Compass文档",
  description: "Hello, my friend!",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/book.png`,
      },
    ],

  ],
  dest: "./dist",
  ga: "",
  evergreen: true,
  sidebarDepth: 2,
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          title: "Kubernetes基础教程",
          collapsable: false,
          children: [
            { title: "简介", path: "/guide/k8s/" },
          ],
        },
        {
          title: "使用指南",
          collapsable: false,
          children: [
            { title: "简介", path: "/guide/basic/brief/" },
            { title: "持续集成", path: "/guide/basic/ci/" },
            { title: "应用部署", path: "/guide/basic/cd/" },
          ],
        },
        {
          title: "进阶教程",
          collapsable: false,
          children: [
            { title: "滚动更新", path: "/guide/advanced/rolling/" },
          ],
        },
      ],
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "GitHub", link: "https://github.com/yametech/compass" },
    ],
  },
};

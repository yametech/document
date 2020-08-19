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
          title: "Kubernetes基础知识",
          collapsable: false,
          children: [
            { title: "大纲", path: "/guide/k8s/" },
            { title: "简介", path: "/guide/k8s/brief/" },
            { title: "基本概念", path: "/guide/k8s/detail/" },
          ],
        },
        {
          title: "Compass使用指南",
          collapsable: false,
          children: [
            { title: "简介", path: "/guide/basic/brief/" },
            { title: "持续集成", path: "/guide/basic/ci/" },
            { title: "应用部署", path: "/guide/basic/cd/" },
          ],
        },
        {
          title: "Compass进阶教程",
          collapsable: false,
          children: [
            { title: "更新应用", path: "/guide/advanced/update/" },
            { title: "模板商店", path: "/guide/advanced/store/" },
            { title: "Git Hook", path: "/guide/advanced/webhook/" },
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

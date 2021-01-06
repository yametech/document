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
            { title: "持续集成最佳实践", path: "/guide/basic/best-practices/" },
            { title: "应用部署", path: "/guide/basic/cd/" },
          ],
        },
        {
          title: "Compass进阶教程11",
          collapsable: false,
          children: [
            { title: "更新应用", path: "/guide/advanced/update/" },
            { title: "模板商店", path: "/guide/advanced/store/" },
            { title: "Git Hook", path: "/guide/advanced/webhook/" },
          ],
        },
        {
          title: "Compass说明文档",
          collapsable: false,
          children: [
            { title: "简介", path: "/guide/instruction/brief/" },
            { title: "集群", path: "/guide/instruction/store/" },
            { title: "节点", path: "/guide/instruction/webhook/" },
            { title: "Tekton流水线", path: "/guide/instruction/webhook/" },
            { title: "工作负载", path: "/guide/instruction/webhook/" },
            { title: "ServiceMesh", path: "/guide/instruction/webhook/" },
            { title: "配置集", path: "/guide/instruction/webhook/" },
            { title: "网络", path: "/guide/instruction/webhook/" },
            { title: "存储", path: "/guide/instruction/webhook/" },
            { title: "事件", path: "/guide/instruction/webhook/" },
            { title: "命令空间", path: "/guide/instruction/webhook/" },
            { title: "OVN配置", path: "/guide/instruction/webhook/" },
            { title: "租户管理", path: "/guide/instruction/webhook/" },
            { title: "应用", path: "/guide/instruction/webhook/" },
            { title: "访问控制", path: "/guide/instruction/webhook/" },
            { title: "自定义资源", path: "/guide/instruction/webhook/" },
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

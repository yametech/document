
# WEB HOOK

::: tip
本文描写如何使用gitea来做钩子，代码提交之后触发pipelineRun启动进行构建。
:::

进入webhook配置菜单

![An image](./images/h1.png)

![An image](./images/h2.png)

![An image](./images/h3.png)

添加钩子的时候 选择 gitea

![An image](./images/h4.png)

复制创建好的hook的url，复制到目标URL 并加上 http://compass.ym      ,必须是http

![An image](./images/h5.png)

![An image](./images/h6.png)

![An image](./images/h7.png)
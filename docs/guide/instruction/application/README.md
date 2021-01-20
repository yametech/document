# 应用


### helm
helm是k8s的另外一个项目,相当于linux的yum。helm仓库里面只有配置清单文件,而没有镜像,镜像还是由镜像仓库来提供。
helm提供了一个应用所需要的所有清单文件.比如对于一个nginx,我们需要一个deployment的清单文件、一个service的清单文件、一个hpa的清单文件,把这三个文件打包到一起,就是一个应用程序的程序包,称之为Chart。

### charts
Chart是一个helm程序包,其实质只是一个模板,我们可以对这个模板进行赋值(value),形成我们自定义的清单文件。chart 是 Helm 的应用打包格式。chart 由一系列文件组成，这些文件描述了 Kubernetes 部署应用时所需要的资源，比如 Service、Deployment、PersistentVolumeClaim、Secret、ConfigMap 等。
单个的 chart 可以非常简单，只用于部署一个服务，比如 Memcached；chart 也可以很复杂，部署整个应用，比如包含 HTTP Servers、 Database、消息中间件、cache 等。
chart 将这些文件放置在预定义的目录结构中，通常整个 chart 被打成 tar 包，而且标注上版本信息，便于 Helm 部署。

### Releases
chart被部署成功后便为release。helm先去检查chart是否存在,如果存在就把chart下载到helm本机当前用户的家目录下,然后helm把Chart和Config交给tiller,tiller和api server交互,api server把chart部署在k8s集群上,就不再叫chart了,而叫release;一个chart赋值不同,完全可以部署出多个release出来。

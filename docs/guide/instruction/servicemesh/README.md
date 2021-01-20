# service Mesh

::: tip

Service Mesh 的本质是提供应用间的流量和安全性管理以及可观察性。Service Mesh 的基础是透明代理，通过 sidecar proxy 拦截到微服务间流量后再通过控制平面配置管理微服务的行为，将流量管理从 Kubernetes 中解耦，Service Mesh 内部的流量无需 kube-proxy 组件的支持，通过为更接近微服务应用层的抽象，管理服务间的流量、安全性和可观察性。

:::

### service mesh
服务网格(service mesh)从总体架构上来讲，是一堆紧挨着各项服务的用户代理，外加一组任务管理流程组成。代理在服务网格中被称为数据层或数据平面（data plane），管理流程被称为控制层或控制平面（control plane）。数据层截获不同服务之间的调用并对其进行“处理”；控制层协调代理的行为，并为运维人员提供 API，用来操控和测量整个网络。更进一步地说，服务网格是一个专用的基础设施层，旨在“在微服务架构中实现可靠、快速和安全的服务间调用”。它不是一个“服务”的网格，而是一个“代理”的网格，服务可以插入这个代理，从而使网络抽象化。在典型的服务网格中，这些代理作为一个 sidecar（边车）被注入到每个服务部署中。服务不直接通过网络调用服务，而是调用它们本地的 sidecar 代理，而 sidecar 代理又代表服务管理请求，从而封装了服务间通信的复杂性。相互连接的 sidecar 代理集实现了所谓的数据平面，这与用于配置代理和收集指标的服务网格组件（控制平面）形成对比。
Service Mesh 的基础设施层主要分为两部分：控制平面与数据平面。
控制平面的特点：
- 不直接解析数据包。
- 与控制平面中的代理通信，下发策略和配置。
- 负责网络行为的可视化。
- 通常提供 API 或者命令行工具可用于配置版本化管理，便于持续集成和部署。
数据平面的特点：
- 通常是按照无状态目标设计的，但实际上为了提高流量转发性能，需要缓存一些数据，因此无状态也是有争议的。
- 直接处理入站和出站数据包，转发、路由、健康检查、负载均衡、认证、鉴权、产生监控数据等。
- 对应用来说透明，即可以做到无感知部署。



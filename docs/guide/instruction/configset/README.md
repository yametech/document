# 配置集

::: tip

应用程序的运行可能会依赖一些配置，而这些配置又是可能会随着需求产生变化的，如果我们的应用程序架构不是应用和配置分离的，那么就会存在当我们需要去修改某些配置项的属性时需要重新构建镜像文件的窘境。现在，ConfigMap组件可以很好的帮助我们实现应用和配置分离，避免因为修改配置项而重新构建镜像。


:::

### Config Maps

ConfigMap 用于保存配置数据的键值对，可以用来保存单个属性，也可以用来保存配置文件。ConfigMap 跟 Secret 很类似，但它可以更方便地处理不包含敏感信息的字符串。

#### ConfigMap 创建
可以使用 kubectl create configmap 从文件、目录或者 key-value 字符串创建等创建 ConfigMap。也可以通过 kubectl create -f file 创建。

#### ConfigMap 使用
ConfigMap 可以通过三种方式在 Pod 中使用，三种分别方式为：设置环境变量、设置容器命令行参数以及在 Volume 中直接挂载文件或目录。
注意
- ConfigMap 必须在 Pod 引用它之前创建。
- 使用 envFrom 时，将会自动忽略无效的键。
- Pod 只能使用同一个命名空间内的 ConfigMap。


### Secrets
Secret 解决了密码、token、密钥等敏感数据的配置问题，而不需要把这些敏感数据暴露到镜像或者 Pod Spec 中。Secret 可以以 Volume 或者环境变量的方式使用。

#### Secret 类型
Secret 有三种类型：
- Opaque：base64 编码格式的 Secret，用来存储密码、密钥等；但数据也通过 base64 --decode 解码得到原始数据，所有加密性很弱。
- kubernetes.io/dockerconfigjson：用来存储私有 docker registry 的认证信息。
- kubernetes.io/service-account-token： 用于被 serviceaccount 引用。serviceaccout 创建时 Kubernetes 会默认创建对应的 secret。Pod 如果使用了 serviceaccount，对应的 secret 会自动挂载到 Pod 的 /run/secrets/kubernetes.io/serviceaccount 目录中。
备注：serviceaccount 用来使得 Pod 能够访问 Kubernetes API。

#### Secret 与 ConfigMap 对比
相同点：
- key/value 的形式
- 属于某个特定的 namespace
- 可以导出到环境变量
- 可以通过目录 / 文件形式挂载 (支持挂载所有 key 和部分 key)
不同点：
- Secret 可以被 ServerAccount 关联 (使用)
- Secret 可以存储 register 的鉴权信息，用在 ImagePullSecret 参数中，用于拉取私有仓库的镜像
- Secret 支持 Base64 加密
- Secret 分为 Opaque，kubernetes.io/Service Account，kubernetes.io/dockerconfigjson 三种类型, Configmap 不区分类型
- Secret 文件存储在 tmpfs 文件系统中，Pod 删除后 Secret 文件也会对应的删除。

### HPA
HPA（Horizontal Pod Autoscaler）是kubernetes（以下简称k8s）的一种资源对象，能够根据某些指标对在statefulSet、replicaController、replicaSet等集合中的pod数量进行动态伸缩，使运行在上面的服务对指标的变化有一定的自适应能力。
#### HPA动态伸缩的原理
HPA在k8s中也由一个controller控制，controller会间隔循环HPA，检查每个HPA中监控的指标是否触发伸缩条件，默认的间隔时间为15s。一旦触发伸缩条件，controller会向k8s发送请求，修改伸缩对象（statefulSet、replicaController、replicaSet）子对象scale中控制pod数量的字段。k8s响应请求，修改scale结构体，然后会刷新一次伸缩对象的pod数量。伸缩对象被修改后，自然会通过list/watch机制增加或减少pod数量，达到动态伸缩的目的。
#### HPA伸缩过程叙述
- 判断当前pod数量是否在HPA设定的pod数量区间中，如果不在，过小返回最小值，过大返回最大值，结束伸缩。
- 判断指标的类型，并向api server发送对应的请求，拿到设定的监控指标。一般来说指标会根据预先设定的指标从以下三个aggregated APIs中获取：metrics.k8s.io、custom.metrics.k8s.io、 external.metrics.k8s.io。其中metrics.k8s.io一般由k8s自带的metrics-server来提供，主要是cpu，memory使用率指标，另外两种需要第三方的adapter来提供。custom.metrics.k8s.io提供自定义指标数据，一般跟k8s集群有关，比如跟特定的pod相关。external.metrics.k8s.io同样提供自定义指标数据，但一般跟k8s集群无关。许多知名的第三方监控平台提供了adapter实现了上述api（如prometheus），可以将监控和adapter一同部署在k8s集群中提供服务，甚至能够替换原来的metrics-server来提供上述三类api指标，达到深度定制监控数据的目的。
- 根据获得的指标，应用相应的算法算出一个伸缩系数，并乘以目前pod数量获得期望pod数量。系数是指标的期望值与目前值的比值，如果大于1表示扩容，小于1表示缩容。指标数值有平均值（AverageValue）、平均使用率（Utilization）、裸值（Value）三种类型，每种类型的数值都有对应的算法。以下几点值得注意：如果系数有小数点，统一进一；系数如果未达到某个容忍值，HPA认为变化太小，会忽略这次变化，容忍值默认为0.1。
HPA扩容算法是一个非常保守的算法。如果出现获取不到指标的情况，扩容时算最小值，缩容时算最大值；如果需要计算平均值，出现pod没准备好的情况，平均数的分母不计入该pod。
一个HPA支持多个指标的监控，HPA会循环获取所有的指标，并计算期望的pod数量，并从期望结果中获得最大的pod数量作为最终的伸缩的pod数量。一个伸缩对象在k8s中允许对应多个HPA，但是只是k8s不会报错而已，事实上HPA彼此不知道自己监控的是同一个伸缩对象，在这个伸缩对象中的pod会被多个HPA无意义地来回修改pod数量，给系统增加消耗，如果想要指定多个监控指标，可以如上述所说，在一个HPA中添加多个监控指标。
- 检查最终的pod数量是否在HPA设定的pod数量范围的区间，如果超过最大值或不足最小值都会修改为最大值或最小值。然后向k8s发出请求，修改伸缩对象的子对象scale的pod数量，结束一个HPA的检查，获取下一个HPA，完成一个伸缩流程。


### Resource Quota
资源配额（Resource Quotas）是用来限制用户资源用量的一种机制。
它的工作原理为：
- 资源配额应用在 Namespace 上，并且每个 Namespace 最多只能有一个 ResourceQuota 对象。
- 开启计算资源配额后，创建容器时必须配置计算资源请求或限制（也可以用 LimitRange 设置默认值）。
- 用户超额后禁止创建新的资源。

#### 资源配额的类型
- 计算资源，包括 cpu 和 memory：
	- cpu, limits.cpu, requests.cpu
	- memory, limits.memory, requests.memory
- 存储资源，包括存储资源的总量以及指定 storage class 的总量。
- 对象数，即可创建的对象的个数。
# Node 进程管理

## [PM2](https://pm2.keymetrics.io/docs/)

PM2（Process Manager 2）是一款专为 Node.js 应用程序设计的进程管理工具，它的主要功能在于确保 Node.js 应用能够在各种环境下高效、稳定地运行，并且具备高可用性。PM2 是一个全方位的 Node.js 应用程序生命周期管理工具，它极大地提高了 Node.js 应用在生产环境下的可靠性和运维效率。

### 特点和功能

#### 1.进程管理

PM2 可以轻松管理和控制 Node.js 应用程序的多个实例，利用操作系统的核心资源创建多进程模型（通过 Node.js 内置的` cluster 模块`），实现负载均衡，从而充分利用多核 CPU 提高性能。

#### 2.持久化

PM2 可以确保即使在服务器重启后，相关的 Node.js 应用程序也会自动启动，并维持原来的进程状态。这意味着一旦设置了 PM2 管理的进程，它们将`作为守护进程始终运行在后台`。

#### 3.零停机重启

当需要更新应用程序代码时，PM2 提供了一种平滑的重启机制，允许应用在不停止服务的情况下完成更新，减少因重启造成的停机时间。

#### 4.错误重载

PM2 会检测应用程序的健康状况，当进程由于任何原因（例如内存泄漏、异常抛出）而变得不稳定或崩溃时，PM2 会自动重启该进程，保证服务的连续性。

#### 5.日志管理

PM2 整合了日志管理功能，可以实时追踪和管理应用产生的日志，支持日志轮转、压缩、以及按应用分别存储日志，方便开发人员进行调试和故障排查。

#### 6.性能监控

内置了监控模块，可实时查看每个进程的 CPU、内存占用情况，还可以通过接口获取详细的统计信息，有助于优化应用程序性能。

#### 7.集群模式

PM2 可以轻松地将应用程序部署到多核环境中，创建一个内部的负载均衡集群，根据 CPU 核心数自动分配工作负载。

#### 8.远程管理

PM2 支持通过 Keymetrics 或其开源替代品进行远程监控和管理，实现对分布在不同服务器上的多个 Node.js 应用的一体化管理。

#### 9.命令行界面

提供了一套简洁易用的命令行接口，使得开发者能够快速便捷地执行诸如启动、停止、重启、删除、列出应用状态等操作。

#### 10.自动化部署

PM2 结合 Git 或其他版本控制系统，可以简化部署流程，实现一键部署或定时部署更新的功能。

### 常用命令

**安装**

```sh
npm install pm2 -g
```

#### 1.启动应用

```shell
pm2 start app.js
# 启动并命名应用
pm2 start app.js --name "app name"
pm2 start app.js --watch
pm2 start app.js --watch --ignore-watch="file1.js,file2.js"
```

#### 2.列出所有应用

```shell
pm2 list
```

#### 3.查看应用详细信息

查看指定应用的详细信息，包括 PID、CPU、内存使用情况等。

```shell
pm2 info <app-name|id>
```

#### 4.监视所有应用资源消耗

```shell
pm2 monit
```

#### 5.查看应用日志

显示应用日志，如果不指定应用名，则显示所有应用的日志。

```shell
pm2 logs [app-name|id]
```

#### 6.重启应用

```shell
pm2 restart [app-name|id]
```

#### 7.停止应用

```shell
pm2 stop [app-name|id]
```

#### 8.删除应用

```shell
pm2 delete <app-name|id>
```

#### 9.保存当前应用列表

保存当前运行的应用列表，确保在服务器重启后能自动加载并启动。

```shell
pm2 save
```

#### 10.开机自启动

根据当前操作系统生成启动脚本，确保 PM2 及相关应用在服务器重启后自动启动。

```shell
pm2 startup
```

#### 11.部署和回滚

这些命令用于部署基于 ecosystem 文件配置的应用程序，setup 用来初始化部署环境，production 指向预定义的环境，revert 用于回滚到历史部署版本。

```shell
pm2 deploy ecosystem.config.js production setup
pm2 deploy ecosystem.config.js production
pm2 deploy ecosystem.config.js production revert 1
```

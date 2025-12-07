# navCards - 增强你的 Docsify 导航体验

`navCards` 是一个功能强大的 Docsify 插件，旨在将传统的 Markdown 列表转换为美观且交互性强的导航卡片。它不仅提供了引人注目的视觉效果，还集成了多项实用功能，极大地提升了用户浏览文档和外部资源的体验。

### 主要特性:
*   **卡片式布局**: 自动将 `div.nav-links` 包裹的 Markdown 列表转换为响应式、网格布局的卡片。
*   **灵活的图标管理**:
    *   **自动抓取 Favicon**: 默认根据链接域名自动加载本地图标或 Google Favicon 服务。
    *   **自定义图标**: 支持通过 Markdown 图片语法 `![](/path/to/your/icon.png)` 为每个卡片指定独有的图标。
    *   **目录与来源控制**: 可通过 `data-icon-dir` 指定本地图标目录，或通过 `data-icon-source` (如 `google`, `site-default`) 控制图标的默认来源。
    *   **智能回退机制**: 当图标加载失败时，插件会自动尝试其他来源（例如，从本地到 Google Favicon 服务），确保图标的可靠显示。
*   **多镜像切换**:
    *   通过 `data-mirrors` 属性，为一组导航链接提供多个镜像源。
    *   用户可以通过生成的单选按钮轻松切换链接到不同的镜像地址。
    *   插件会自动替换链接中的基准字符串，实现无缝切换。

`navCards` 插件让你的 Docsify 站点更具吸引力、更易用，是构建高质量导航页面的理想选择。

---

[navCards.js](navCards.js ':ignore') : 导入插件

# 配置

你可以在 `window.$docsify` 中配置插件的全局默认值。

```javascript
window.$docsify = {
  // ... 其他配置
  navCards: {
    iconDir: 'icons/' // 全局默认图标目录，默认为 'icons/'
  }
};
```


# 示例

使用`nav-links`包裹普通`markdown`的列表即可变成导航卡片

```markdown
<div class="nav-links">
- [cn.vuejs.org](https://cn.vuejs.org/) : 渐进式 JavaScript 框架
- [zh-hans.react.dev](https://zh-hans.react.dev/) : 用于构建 Web 和原生交互界面的库
- [cli.docsifyjs.org](https://cli.docsifyjs.org) : 一个神奇的文档网站生成器
- [v3.tailwindcss.com](https://v3.tailwindcss.com) : 无需离开 HTML 即可快速构建网站
</div>
```

# favicon


优先加载本地`icons`目录下的文件`reverseDomain.png`域名反写图片

<div class="nav-links">

- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架
- [React](https://react.dev) : 用于构建 Web 和原生交互界面的库
- [Docsify](https://docsify.js.org) : 一个神奇的文档网站生成器
- [TailwindCSS](https://tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>


`icons`目录没有指定的图片,不存在跳转原网址`/favicon.ico`,参考[failover](#failover)

<div class="nav-links">

- [cn.vuejs.org](https://cn.vuejs.org/) : 渐进式 JavaScript 框架
- [zh-hans.react.dev](https://zh-hans.react.dev/) : 用于构建 Web 和原生交互界面的库
- [cli.docsifyjs.org](https://cli.docsifyjs.org) : 一个神奇的文档网站生成器
- [v3.tailwindcss.com](https://v3.tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>



## 指定目录

`data-icon-dir="icons3d/"` 指定目录,如 3D风格

<div class="nav-links"  data-icon-dir="icons3d/">

- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架
- [React](https://react.dev) : 用于构建 Web 和原生交互界面的库
- [Docsify](https://docsify.js.org) : 一个神奇的文档网站生成器
- [TailwindCSS](https://tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>


`data-icon-dir="iconsFluffy/"` 指定目录,如 毛茸茸风格

<div class="nav-links"  data-icon-dir="iconsFluffy/">

- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架
- [React](https://react.dev) : 用于构建 Web 和原生交互界面的库
- [Docsify](https://docsify.js.org) : 一个神奇的文档网站生成器
- [TailwindCSS](https://tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>


## 指定图片

`- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架  ![](/icons3d/vuejs.org.png)` 链接自定义具体的图片

<div class="nav-links">

- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架  ![](icons3d/vuejs.org.png)
- [React](https://react.dev) : 用于构建 Web 和原生交互界面的库  ![](iconsFluffy/react.dev.png)
- [Docsify](https://docsify.js.org) : 一个神奇的文档网站生成器  ![](icons3d/docsify.js.org.png)
- [TailwindCSS](https://tailwindcss.com) : 无需离开 HTML 即可快速构建网站  ![](iconsFluffy/tailwindcss.com.png)

</div>



## 指定远端

 `data-icon-source="google"` 使用`www.google.com/s2/favicons`图标

<div class="nav-links" data-icon-source="google">

- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架
- [React](https://react.dev) : 用于构建 Web 和原生交互界面的库
- [Docsify](https://docsify.js.org) : 一个神奇的文档网站生成器
- [TailwindCSS](https://tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>


`data-icon-source="site-default"` 使用原网址`/favicon.ico`图标

<div class="nav-links"  data-icon-source="site-default">

- [Vue.js](https://vuejs.org) : 渐进式 JavaScript 框架
- [React](https://react.dev) : 用于构建 Web 和原生交互界面的库
- [Docsify](https://docsify.js.org) : 一个神奇的文档网站生成器
- [TailwindCSS](https://tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>

## failover

当图标加载失败并触发回退机制时，插件会在浏览器的开发者控制台中打印一条 `curl` 命令（或 `wget` 命令，取决于系统环境），方便你将远程图标下载并缓存到本地，以避免未来再次加载失败。

`data-icon-failover="site-default"`,`icons`目录没有指定的图片,不存在回跳到原网址`/favicon.ico`图标

<div class="nav-links"  data-icon-failover="site-default">

- [cn.vuejs.org](https://cn.vuejs.org/) : 渐进式 JavaScript 框架
- [zh-hans.react.dev](https://zh-hans.react.dev/) : 用于构建 Web 和原生交互界面的库
- [cli.docsifyjs.org](https://cli.docsifyjs.org) : 一个神奇的文档网站生成器
- [v3.tailwindcss.com](https://v3.tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>


`data-icon-failover="google"`,`icons`目录没有指定的图片,不存在回跳到`www.google.com/s2/favicons`

<div class="nav-links"  data-icon-failover="google">

- [cn.vuejs.org](https://cn.vuejs.org/) : 渐进式 JavaScript 框架
- [zh-hans.react.dev](https://zh-hans.react.dev/) : 用于构建 Web 和原生交互界面的库
- [cli.docsifyjs.org](https://cli.docsifyjs.org) : 一个神奇的文档网站生成器
- [v3.tailwindcss.com](https://v3.tailwindcss.com) : 无需离开 HTML 即可快速构建网站

</div>

# mirrors

通过 `data-mirrors` 属性定义镜像列表（逗号分隔）。
插件会生成一个单选按钮组。当切换镜像时，插件会在卡片的链接中查找**镜像列表的第一个项**，并将其替换为**当前选中的镜像项**。

> 注意：确保你的原始链接中包含镜像列表的第一个值，否则替换将不会生效。

`data-mirrors="3.5,3.4,3.3"`    
spring-boot 不同版本文档
<div class="nav-links"  data-mirrors="3.5,3.4,3.3">

- [spring-boot 3.5](https://docs.spring.io/spring-boot/3.5/index.html) : Spring Boot

</div>

`data-mirrors="releases.ubuntu.com/,mirrors.ustc.edu.cn/ubuntu-releases/,mirrors.163.com/ubuntu-releases/,mirrors.huaweicloud.com/ubuntu-releases/,mirrors.aliyun.com/ubuntu-releases/"`    
Ubuntu LTS Releases 不同的镜像地址
<div class="nav-links"  data-mirrors="releases.ubuntu.com/,mirrors.ustc.edu.cn/ubuntu-releases/,mirrors.163.com/ubuntu-releases/,mirrors.huaweicloud.com/ubuntu-releases/,mirrors.aliyun.com/ubuntu-releases/">

- [Ubuntu 24.04 LTS ](https://releases.ubuntu.com/24.04/) : Noble Numbat
- [Ubuntu 22.04 LTS ](https://releases.ubuntu.com/22.04/) : Jammy Jellyfish
- [Ubuntu 20.04 LTS ](https://releases.ubuntu.com/20.04/) : Focal Fossa
- [Ubuntu 18.04 LTS ](https://releases.ubuntu.com/18.04/) : Trusty Tahr

</div>


 
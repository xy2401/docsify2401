/**
 * 全局 Icon 错误处理函数
 * 当本地图标加载 404 时触发，负责：
 * 1. 替换为 Google 在线图标
 * 2. 在控制台打印 wget 命令方便用户缓存
 */
window.__nav_icon_fallback = function (img) {
  // 防止重复触发
  if (img.dataset.hasError) return;
  img.dataset.hasError = "true";

  const domain = img.dataset.domain;
  const localPath = img.dataset.local;

  // 获取备用源
  const googleRemote = img.dataset.remoteGoogle;
  const siteRemote = img.dataset.remoteSite;
  const remote = img.dataset.remote;
  const fallbackUrl = remote;

  // 1. 马上替换为在线图标，保证用户看到的界面是正常的
  if (img.src !== fallbackUrl) {
    img.src = fallbackUrl;
  }

  // 2. 控制台输出 wget 命令
  //console.groupCollapsed(`%c[Icon Missing] ${domain}`, "color: #e67e22; font-weight: bold;");
  console.log(`本地文件缺失: ${localPath}`);
  console.log(`已自动切换至在线源 (Google S2)。`);
  console.log(`%c如需缓存，请在项目根目录终端执行:`, "color: #42b983; font-weight: bold;");

  // 生成命令 (Windows PowerShell 可能需要用 Curl，这里默认生成 Linux/Mac/GitBash 通用的 wget)
  //const cmd = `wget -O "${localPath}" "${fallbackUrl}"`;
  const cmd = `curl -L -o "${localPath}" "${fallbackUrl}"`;
  console.log(cmd);

  //console.groupEnd();
};

/**
 * Docsify 插件：将 .nav-links 转换为卡片式导航
 */
window.navCardsPlugin = function (hook, vm) {
  // 0. 注入 CSS 样式 (仅需注入一次)
  const styleId = 'nav-cards-plugin-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
 /* 1. 网格容器：自动适应宽度，每列最小 240px */
 .nav-grid-container {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
     gap: 15px;
     padding: 15px 0;
 }

 /* 2. 卡片主体 */
 .nav-card {
     display: flex;
     align-items: flex-start;
     padding: 12px;
     background-color: var(--content-bg, #fff);
     /* 适配可能的暗色变量 */
     border: 1px solid #eee;
     border-radius: 6px;
     text-decoration: none !important;
     /* 强制去掉下划线 */
     color: inherit !important;
     transition: all 0.2s ease;
     overflow: hidden;
 }

 /* 悬停效果 */
 .nav-card:hover {
     transform: translateY(-2px);
     box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
     border-color: #42b983;
     /* Docsify 标志绿 */
 }

 /* 3. 左侧图标区域 */
 .nav-card-head {
     flex-shrink: 0;
     margin-right: 12px;
     width: 32px;
     height: 32px;
     display: flex;
     align-items: center;
     justify-content: center;
 }

 /* 图片本身 */
 .nav-card-icon {
     width: 32px;
     height: 32px;
     object-fit: contain;
     border-radius: 4px;
 }

 /* 占位符（当没有域名时） */
 .nav-card-icon-placeholder {
     width: 32px;
     height: 32px;
     background: #f5f5f5;
     color: #999;
     border-radius: 4px;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 16px;
 }

 /* 4. 右侧内容区域 */
 .nav-card-body {
     flex: 1;
     min-width: 0;
     /* 修复 Flex 子项溢出问题 */
 }

 /* 标题 */
 .nav-card-title {
     font-weight: bold;
     font-size: 15px;
     margin-bottom: 4px;
     line-height: 1.2;
     color: #333;
 }

 /* 描述文字 */
 .nav-card-desc {
     font-size: 12px;
     color: #7f8c8d;
     line-height: 1.4;
     /* 文本超长省略 - 限制为 1 行 */
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
 }

 /* 5. 暗黑模式适配 (跟随 Docsify 的 dark 类) */
 body.dark .nav-card {
     background-color: #2b2b2b;
     border-color: #3e3e3e;
 }

 body.dark .nav-card-title {
     color: #f0f0f0;
 }

 body.dark .nav-card-desc {
     color: #aaa;
 }

 /* 6. 镜像源选择器 */
 .nav-mirrors-selector {
     display: flex;
     flex-wrap: wrap;
     gap: 8px;
     /* 稍微缩小间距 */
     margin-bottom: 15px;
     padding: 8px;
     /* 增加内边距 */
     background: var(--content-bg-light, rgba(0, 0, 0, 0.05));
     /* 使用变量，更亮一点的背景 */
     border-radius: 8px;
     /* 稍微大一点的圆角 */
     border: 1px solid var(--border-color, #eee);
     /* 添加边框 */
 }

 .nav-mirror-item {
     position: relative;
     /* 用于定位隐藏的 input */
     display: flex;
     align-items: center;
     font-size: 13px;
     cursor: pointer;
     user-select: none;
     padding: 6px 12px;
     /* 按钮内边距 */
     border-radius: 5px;
     /* 按钮圆角 */
     background-color: var(--button-bg, #f5f5f5);
     /* 按钮背景 */
     color: var(--text-color, #333);
     /* 按钮文字颜色 */
     border: 1px solid var(--button-border, #ddd);
     /* 按钮边框 */
     transition: all 0.2s ease;
 }

 .nav-mirror-item:hover {
     background-color: var(--button-hover-bg, #eaeaea);
     border-color: var(--button-hover-border, #ccc);
 }

 .nav-mirror-item input {
     position: absolute;
     opacity: 0;
     /* 隐藏原生 radio */
     width: 1px;
     height: 1px;
     margin: 0;
     padding: 0;
     overflow: hidden;
 }

 /* 选中状态的样式 */
 .nav-mirror-item.is-checked {
     background-color: #42b983;
     /* Docsify 标志绿 */
     color: white;
     border-color: #42b983;
 }

 /* 改善可访问性: 键盘焦点样式 */
 .nav-mirror-item input:focus+span,
 .nav-mirror-item input:focus-visible+span {
     outline: 2px solid #42b983;
     outline-offset: 2px;
 }

 body.dark .nav-mirrors-selector {
     background: rgba(255, 255, 255, 0.08);
     border-color: #444;
 }

 body.dark .nav-mirror-item {
     background-color: #3e3e3e;
     color: #f0f0f0;
     border-color: #555;
 }

 body.dark .nav-mirror-item:hover {
     background-color: #4a4a4a;
     border-color: #666;
 }

 body.dark .nav-mirror-item input:checked+span {
     background-color: #42b983;
     color: white;
     border-color: #42b983;
 }
          `;

      

          document.head.appendChild(style);

        }

  hook.doneEach(function () {
    
    // 获取全局配置
    const pluginConfig = vm.config.navCards || {};
    const defaultIconDir = pluginConfig.iconDir || 'icons/';

    const ICON_EXT = '.png';

    // 1. 查找所有 .nav-links 容器
    const containers = document.querySelectorAll('.nav-links');

    containers.forEach(container => {


      // 配置：图标目录和后缀
      // 优先级: 标签 data-icon-dir > 全局配置 > 默认 'icons/'
      const ICON_DIR = container.dataset.iconDir || defaultIconDir;

      // 2. 获取内部列表
      const list = container.querySelector('ul');
      if (!list) return;

      // 3. 创建网格容器
      const grid = document.createElement('div');
      grid.className = 'nav-grid-container';

      // 镜像配置
      const mirrorsAttr = container.dataset.mirrors;
      let mirrors = [];
      if (mirrorsAttr) {
          mirrors = mirrorsAttr.split(',').map(s => s.trim()).filter(s => s);
      }
      
      // 处理镜像选择器 UI
      let mirrorSelector = null;
      if (mirrors.length > 0) {
          mirrorSelector = document.createElement('div');
          mirrorSelector.className = 'nav-mirrors-selector';
          const groupId = `nav-mirror-group-${Math.random().toString(36).substr(2, 9)}`;
          
          mirrors.forEach((m, i) => {
              const label = document.createElement('label');
              label.className = 'nav-mirror-item';
              
              const radio = document.createElement('input');
              radio.type = 'radio';
              radio.name = groupId;
              radio.value = i;
              radio.checked = i === 0; // 默认选中第一个
              if (radio.checked) {
                  label.classList.add('is-checked'); // 默认选中时添加类
              }
              
              // 事件监听：切换镜像
              radio.addEventListener('change', () => {
                 // 移除同组所有 label 的选中样式
                 mirrorSelector.querySelectorAll('.nav-mirror-item').forEach(item => {
                     item.classList.remove('is-checked');
                 });
                 // 给当前选中的 label 添加选中样式
                 label.classList.add('is-checked');

                 const targetMirror = mirrors[i];
                 const sourceMirror = mirrors[0]; // 总是以第一个为基准进行替换
                 
                 // 找到该容器下的所有卡片
                 const cards = grid.querySelectorAll('.nav-card');
                 cards.forEach(card => {
                     const originalHref = card.dataset.href;
                     if (originalHref) {
                         if (originalHref.includes(sourceMirror)) {
                             card.href = originalHref.replace(sourceMirror, targetMirror);
                         }
                     }
                 });
              });

              label.appendChild(radio);
              label.appendChild(document.createElement('span')).textContent = m; // Wrap text in span for styling
              mirrorSelector.appendChild(label);
          });
      }

      // 4. 遍历列表项转换
      list.querySelectorAll('li').forEach(li => {
        const linkNode = li.querySelector('a');
        if (!linkNode) return;

        const href = linkNode.getAttribute('href');
        const title = linkNode.innerText; // 链接文本作为标题
        const target = linkNode.getAttribute('target') || '_self';

        let fullText = li.innerText.replace(title, '').trim();
        fullText = fullText.replace(/^[:\-：]\s*/, ''); // 去掉开头的 : 或 -

        let desc = fullText;
        let customIconSrc = '';

        // 检查是否包含 Markdown 图片 (Docsify 已将其渲染为 img 标签)
        // 注意：需要排除掉链接内部的图片（如果有的话，虽然这里通常不会有）
        const imgNode = li.querySelector('img');
        if (imgNode && !linkNode.contains(imgNode)) {
          customIconSrc = imgNode.getAttribute('src');
          // 如果有图片节点，原本的 text 可能会被切断，需要更精确获取描述
          // 但为了简单，这里假设有了 img 标签，innerText 里通常不会乱
          // 如果使用 Markdown 图片，innerText 里通常不包含图片地址，所以 desc 不需要额外处理
          // 此时的 desc 仍然是 fullText，包含了图片文本，需要从 desc 中移除 img 对应的文本
          // 由于 li.innerText 已经不包含图片的 src，所以 desc 已经是正确的
        }

        // 解析域名
        let domain = '';
        try {
          domain = new URL(href).hostname;
        } catch (e) { /* 非法URL忽略 */ }

        // 构建图标 HTML
        let iconHtml = '<div class="nav-card-icon-placeholder">🔗</div>';

       // 逻辑：将 www.baidu.com 拆分 -> 反转 -> 拼接 => com.baidu.www
       let reverseDomain = domain.split('.').reverse().join('.');


        const localIconPath = customIconSrc || `${ICON_DIR}${reverseDomain}${ICON_EXT}`;

        const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        const siteDefaultIconPath = `https://${domain}/favicon.ico`; // Best guess for site default


        const iconMap = {
          'local': localIconPath,
          'google': googleFaviconUrl,
          'site-default': siteDefaultIconPath
        };

        const iconSource = container.dataset.iconSource || 'local'; // Default to 'local'
        let initialIconSrc = iconMap[iconSource];

        const iconFailover = container.dataset.iconFailover || 'site-default'; // Default to 'local'
        const remoteIconPath = iconMap[iconFailover];



        iconHtml = `
            <img src="${initialIconSrc}" 
                 class="nav-card-icon" 
                 alt="${title}"
                 data-domain="${domain}"
                 data-local="${localIconPath}" 
                 data-remote="${remoteIconPath}"
                 data-remote-site="${siteDefaultIconPath}"
                 data-remote-google="${googleFaviconUrl}"
                 onerror="window.__nav_icon_fallback(this)">
          `;


        // 组装卡片
        const card = document.createElement('a');
        card.className = 'nav-card';
        card.href = href;
        card.dataset.href = href; // 备份原始链接，用于镜像切换
        card.target = target;
        card.innerHTML = `
          <div class="nav-card-head">${iconHtml}</div>
          <div class="nav-card-body">
            <div class="nav-card-title">${title}</div>
            ${desc ? `<div class="nav-card-desc">${desc}</div>` : ''}
          </div>
        `;

        grid.appendChild(card);
      });

      // 5. 替换原列表
      const wrapper = document.createElement('div');
      if (mirrorSelector) {
          wrapper.appendChild(mirrorSelector);
      }
      wrapper.appendChild(grid);
      
      list.parentNode.replaceChild(wrapper, list);
    });
  });
};
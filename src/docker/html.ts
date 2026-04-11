export function getHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>斗鱼粉丝牌续牌</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231967d2'/%3E%3Cpath d='M18 18h28v28H18z' fill='white' opacity='.15'/%3E%3Cpath d='M24 24h16c4.4 0 8 3.6 8 8s-3.6 8-8 8h-4v8h-8V24zm8 8v8h8c2.2 0 4-1.8 4-4s-1.8-4-4-4h-8z' fill='white'/%3E%3C/svg%3E">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0;min-height:100%}
body{
  font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  background:#eef3f8;
  color:#1f2937;
}
body[data-theme="dark"]{
  background:#0b1220;
  color:#e5eefb;
}
body[data-theme="dark"] .shell{background:#0f172a}
body[data-theme="dark"] .sidebar,
body[data-theme="dark"] .panel,
body[data-theme="dark"] .card,
body[data-theme="dark"] .table-shell,
body[data-theme="dark"] .log-box,
body[data-theme="dark"] .empty,
body[data-theme="dark"] .status-box,
body[data-theme="dark"] .toolbar{
  background:#111c31;
  border-color:#243247;
  color:#e5eefb;
}
body[data-theme="dark"] .muted,
body[data-theme="dark"] .helper,
body[data-theme="dark"] .field-label,
body[data-theme="dark"] .theme-note,
body[data-theme="dark"] .subtle{
  color:#9fb0c7;
}
body[data-theme="dark"] input,
body[data-theme="dark"] textarea,
body[data-theme="dark"] select{
  background:#0b1220;
  color:#e5eefb;
  border-color:#2b3b52;
}
body[data-theme="dark"] .btn-secondary{
  background:#18243a;
  color:#e5eefb;
  border-color:#2b3b52;
}
body[data-theme="dark"] .tab-btn.active,
body[data-theme="dark"] .tab-btn:hover{
  background:#18243a;
  border-color:#35507a;
}
body[data-theme="dark"] .table th{
  background:#152238;
}
body[data-theme="dark"] .table tbody tr:nth-child(even){
  background:rgba(255,255,255,.02);
}
body[data-theme="light"]{
  background:#eef3f8;
  color:#1f2937;
}
.shell{
  min-height:100vh;
  display:flex;
}
.sidebar{
  width:280px;
  flex:0 0 280px;
  background:#fff;
  border-right:1px solid #d7e0ea;
  padding:20px;
}
.brand-title{
  font-size:24px;
  font-weight:700;
  margin:0 0 8px;
}
.brand-copy{
  margin:0 0 20px;
  line-height:1.7;
  color:#607184;
  font-size:13px;
}
.tab-list{
  display:flex;
  flex-direction:column;
  gap:8px;
}
.tab-btn{
  border:1px solid transparent;
  background:transparent;
  color:inherit;
  text-align:left;
  padding:12px 14px;
  border-radius:12px;
  cursor:pointer;
}
.tab-btn.active,
.tab-btn:hover{
  background:#f0f6ff;
  border-color:#cfe0f9;
}
.theme-box{
  margin-top:20px;
  padding:16px;
  border:1px solid #d7e0ea;
  border-radius:14px;
}
.theme-note{
  margin-top:8px;
  color:#607184;
  font-size:12px;
  line-height:1.7;
}
.main{
  flex:1;
  min-width:0;
  padding:20px;
}
.header{
  display:flex;
  justify-content:space-between;
  gap:16px;
  align-items:flex-start;
  margin-bottom:18px;
}
.page-title{
  margin:0;
  font-size:28px;
}
.page-subtitle{
  margin:8px 0 0;
  font-size:13px;
  line-height:1.7;
  color:#607184;
}
.toolbar{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  padding:14px;
  background:#fff;
  border:1px solid #d7e0ea;
  border-radius:14px;
}
.page{display:none}
.page.active{display:block}
.grid{
  display:grid;
  gap:16px;
}
.grid.cols-3{
  grid-template-columns:repeat(3,minmax(0,1fr));
}
.grid.cols-2{
  grid-template-columns:repeat(2,minmax(0,1fr));
}
.card,
.panel,
.table-shell,
.log-box,
.empty,
.status-box{
  background:#fff;
  border:1px solid #d7e0ea;
  border-radius:16px;
}
.card,
.panel,
.status-box,
.empty{
  padding:16px;
}
.section-title{
  margin:0 0 6px;
  font-size:18px;
}
.subtle{
  margin:0;
  color:#607184;
  font-size:13px;
  line-height:1.7;
}
.metric-title{
  font-size:12px;
  color:#607184;
  margin-bottom:10px;
}
.metric-value{
  font-size:28px;
  font-weight:700;
}
.metric-note{
  margin-top:10px;
  color:#607184;
  font-size:13px;
  line-height:1.7;
}
.status-list{
  display:grid;
  gap:12px;
}
.status-item{
  border:1px solid #d7e0ea;
  border-radius:12px;
  padding:12px;
}
.status-name{
  font-weight:600;
  margin-bottom:6px;
}
.status-meta{
  color:#607184;
  font-size:13px;
  line-height:1.7;
}
.pill{
  display:inline-block;
  padding:4px 10px;
  border-radius:999px;
  font-size:12px;
  background:#e9f3ff;
  color:#1967d2;
}
.pill.warn{
  background:#fff3cd;
  color:#a16207;
}
.pill.ok{
  background:#dcfce7;
  color:#166534;
}
.pill.off{
  background:#f1f5f9;
  color:#64748b;
}
.field-block{margin-bottom:16px}
.field-label{
  display:block;
  margin-bottom:6px;
  font-size:12px;
  color:#607184;
}
input,textarea,select{
  width:100%;
  border:1px solid #c7d4e3;
  border-radius:12px;
  padding:10px 12px;
  font:inherit;
}
textarea{
  min-height:140px;
  resize:vertical;
}
.inline{
  display:flex;
  align-items:center;
  gap:8px;
}
.inline input[type="checkbox"]{
  width:auto;
}
.helper{
  color:#607184;
  font-size:13px;
  line-height:1.7;
}
.btn{
  border:1px solid transparent;
  border-radius:12px;
  padding:10px 14px;
  cursor:pointer;
  font:inherit;
}
.btn:disabled{
  opacity:.55;
  cursor:not-allowed;
}
.btn-primary{
  background:#1967d2;
  color:#fff;
}
.btn-secondary{
  background:#fff;
  color:#1f2937;
  border-color:#c7d4e3;
}
.btn-danger{
  background:#dc2626;
  color:#fff;
}
.btn-success{
  background:#15803d;
  color:#fff;
}
.actions{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}
.table-shell{
  overflow:auto;
}
.table{
  width:100%;
  border-collapse:collapse;
  min-width:760px;
}
.table th,
.table td{
  padding:10px 12px;
  border-bottom:1px solid #d7e0ea;
  text-align:left;
  font-size:13px;
}
.table th{
  background:#f8fbff;
  font-size:12px;
  color:#607184;
}
.table tbody tr:nth-child(even){
  background:#fbfdff;
}
.table input[type="number"]{
  min-width:96px;
}
.table input[type="checkbox"]{
  width:auto;
}
.empty{
  color:#607184;
  font-size:13px;
  line-height:1.7;
}
.log-box{
  min-height:260px;
  max-height:62vh;
  overflow:auto;
  padding:16px;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:12px;
  line-height:1.8;
}
.log-line{margin-bottom:6px}
.muted{
  color:#607184;
}
.toast{
  position:fixed;
  top:20px;
  right:20px;
  min-width:220px;
  max-width:420px;
  padding:12px 14px;
  border-radius:12px;
  color:#fff;
  display:none;
  z-index:999;
}
@media (max-width: 960px){
  .shell{display:block}
  .sidebar{
    width:auto;
    border-right:none;
    border-bottom:1px solid #d7e0ea;
  }
  .grid.cols-3,
  .grid.cols-2{
    grid-template-columns:1fr;
  }
}
</style>
</head>
<body data-theme="dark">
<div class="shell">
  <aside class="sidebar">
    <h1 class="brand-title">斗鱼粉丝牌续牌</h1>
    <p class="brand-copy">粉丝牌驱动的 Docker 管理台。登录与领取、保活赠送、双倍赠送三条任务线并行运作。</p>

    <div class="tab-list">
      <button class="tab-btn active" data-action="tab" data-tab="overview">概览</button>
      <button class="tab-btn" data-action="tab" data-tab="cookie">登录与领取</button>
      <button class="tab-btn" data-action="tab" data-tab="keepalive">保活赠送</button>
      <button class="tab-btn" data-action="tab" data-tab="double-card">双倍赠送</button>
      <button class="tab-btn" data-action="tab" data-tab="medals">粉丝牌同步</button>
      <button class="tab-btn" data-action="tab" data-tab="logs">运行日志</button>
    </div>

    <div class="theme-box">
      <label class="field-label" for="theme-mode">主题模式</label>
      <select id="theme-mode">
        <option value="system">跟随系统</option>
        <option value="light">浅色</option>
        <option value="dark">深色</option>
      </select>
      <div class="theme-note" id="theme-note">当前主题由配置加载。</div>
    </div>
  </aside>

  <main class="main">
    <div class="header">
      <div>
        <h2 class="page-title" id="page-title">概览</h2>
        <p class="page-subtitle" id="page-subtitle">先确认登录、领取、保活、双倍和粉丝牌同步是否都在预期状态。</p>
      </div>
      <div class="toolbar">
        <button class="btn btn-secondary" data-action="refresh-overview">刷新概览</button>
        <button class="btn btn-secondary" data-action="sync-fans">同步粉丝牌</button>
        <button class="btn btn-secondary" data-action="tab" data-tab="logs">查看日志</button>
      </div>
    </div>

    <section class="page active" id="page-overview">
      <div class="grid cols-3">
        <div class="card">
          <div class="metric-title">系统就绪</div>
          <div class="metric-value" id="metric-ready">-</div>
          <div class="metric-note" id="metric-ready-note">加载中...</div>
        </div>
        <div class="card">
          <div class="metric-title">登录状态</div>
          <div class="metric-value" id="metric-cookie">-</div>
          <div class="metric-note" id="metric-cookie-note">加载中...</div>
        </div>
        <div class="card">
          <div class="metric-title">显示时区</div>
          <div class="metric-value" id="metric-timezone">-</div>
          <div class="metric-note" id="metric-timezone-note">加载中...</div>
        </div>
      </div>

      <div class="panel" style="margin-top:16px">
        <h3 class="section-title">快捷操作</h3>
        <p class="subtle">首页只保留最常用的动作。没有 Cookie 时会提示先配置登录。</p>
        <div class="actions" style="margin-top:12px">
          <button class="btn btn-primary" data-action="tab" data-tab="cookie">管理登录与领取</button>
          <button class="btn btn-secondary" id="manual-collect-btn" data-action="trigger" data-trigger="collectGift">手动领取</button>
          <button class="btn btn-secondary" id="manual-keepalive-btn" data-action="trigger" data-trigger="keepalive">手动执行保活</button>
          <button class="btn btn-secondary" id="manual-double-btn" data-action="trigger" data-trigger="doubleCard">手动执行双倍</button>
        </div>
      </div>

      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <h3 class="section-title">任务状态</h3>
          <div class="status-list" id="overview-status-list">
            <div class="status-item">
              <div class="status-name">加载中...</div>
            </div>
          </div>
        </div>
        <div class="panel">
          <h3 class="section-title">粉丝牌同步</h3>
          <div class="status-box" id="overview-sync-box">正在加载同步状态...</div>
        </div>
      </div>

      <div class="panel" style="margin-top:16px">
        <h3 class="section-title">最近日志</h3>
        <div class="log-box" id="overview-log-box"></div>
      </div>
    </section>

    <section class="page" id="page-cookie">
      <div class="panel">
        <h3 class="section-title">登录 Cookie</h3>
        <p class="subtle">先保存 Cookie，后续领取、保活、双倍和粉丝牌同步都会基于它运行。</p>
        <div class="field-block" style="margin-top:14px">
          <label class="field-label" for="cookie-input">斗鱼 Cookie</label>
          <textarea id="cookie-input" placeholder="粘贴斗鱼 Cookie"></textarea>
        </div>
        <div class="actions">
          <button class="btn btn-success" data-action="save-cookie">保存 Cookie</button>
        </div>
      </div>

      <div class="panel" style="margin-top:16px">
        <h3 class="section-title">领取任务</h3>
        <p class="subtle">领取任务独立运行，不再嵌入保活或双倍链路。</p>
        <div class="field-block" style="margin-top:14px">
          <label class="inline">
            <input type="checkbox" id="collect-enable">
            <span>启用领取任务</span>
          </label>
        </div>
        <div class="field-block">
          <label class="field-label" for="collect-cron">Cron 表达式</label>
          <input id="collect-cron" type="text">
        </div>
        <div class="actions">
          <button class="btn btn-success" data-action="save-collect">保存领取配置</button>
          <button class="btn btn-secondary" data-action="trigger" data-trigger="collectGift">立即领取</button>
        </div>
      </div>
    </section>

    <section class="page" id="page-keepalive">
      <div class="panel">
        <h3 class="section-title">保活赠送</h3>
        <p class="subtle">房间列表跟随粉丝牌自动同步。没有 Cookie 时，先去登录与领取页保存 Cookie。</p>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-secondary" data-action="sync-fans">刷新粉丝牌并同步</button>
        </div>
        <div class="status-box" id="keepalive-note" style="margin-top:14px">等待加载...</div>
      </div>

      <div class="panel" style="margin-top:16px">
        <div class="field-block">
          <label class="inline">
            <input type="checkbox" id="keepalive-enable">
            <span>启用保活任务</span>
          </label>
        </div>
        <div class="grid cols-2">
          <div class="field-block">
            <label class="field-label" for="keepalive-cron">Cron 表达式</label>
            <input id="keepalive-cron" type="text">
          </div>
          <div class="field-block">
            <label class="field-label" for="keepalive-model">分配模式</label>
            <select id="keepalive-model">
              <option value="1">按百分比</option>
              <option value="2">按固定数量</option>
            </select>
          </div>
        </div>
        <div id="keepalive-table-wrap" style="margin-top:16px"></div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-success" data-action="save-keepalive">保存保活配置</button>
        </div>
      </div>
    </section>

    <section class="page" id="page-double-card">
      <div class="panel">
        <h3 class="section-title">双倍赠送</h3>
        <p class="subtle">双倍任务围绕同一份粉丝牌列表运作，并记录每个房间是否参与。</p>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-secondary" data-action="sync-fans">刷新粉丝牌并同步</button>
        </div>
        <div class="status-box" id="double-note" style="margin-top:14px">等待加载...</div>
      </div>

      <div class="panel" style="margin-top:16px">
        <div class="field-block">
          <label class="inline">
            <input type="checkbox" id="double-enable">
            <span>启用双倍任务</span>
          </label>
        </div>
        <div class="grid cols-2">
          <div class="field-block">
            <label class="field-label" for="double-cron">Cron 表达式</label>
            <input id="double-cron" type="text">
          </div>
          <div class="field-block">
            <label class="field-label" for="double-model">分配模式</label>
            <select id="double-model">
              <option value="1">按百分比</option>
              <option value="2">按固定数量</option>
            </select>
          </div>
        </div>
        <div id="double-table-wrap" style="margin-top:16px"></div>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-success" data-action="save-double">保存双倍配置</button>
        </div>
      </div>
    </section>

    <section class="page" id="page-medals">
      <div class="panel">
        <h3 class="section-title">粉丝牌同步</h3>
        <p class="subtle">展示当前粉丝牌列表和双倍状态，同时作为保活和双倍配置的数据来源。</p>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-secondary" data-action="refresh-fans-status">刷新状态</button>
        </div>
        <div class="status-box" id="fans-status-note" style="margin-top:14px">等待加载...</div>
      </div>
      <div id="fans-status-table-wrap" style="margin-top:16px"></div>
    </section>

    <section class="page" id="page-logs">
      <div class="panel">
        <h3 class="section-title">运行日志</h3>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-secondary" data-action="refresh-logs">手动刷新</button>
          <button class="btn btn-danger" data-action="clear-logs">清空日志</button>
          <label class="inline" style="margin-left:4px">
            <input type="checkbox" id="logs-auto-refresh" checked>
            <span>自动刷新</span>
          </label>
        </div>
        <div class="log-box" id="full-log-box" style="margin-top:16px"></div>
      </div>
    </section>
  </main>
</div>

<div class="toast" id="toast"></div>

<script>
(function () {
  var PAGE_META = {
    overview: {
      title: '概览',
      subtitle: '先确认登录、领取、保活、双倍和粉丝牌同步是否都在预期状态。'
    },
    cookie: {
      title: '登录与领取',
      subtitle: '保存 Cookie，并配置独立的领取任务。'
    },
    keepalive: {
      title: '保活赠送',
      subtitle: '房间列表跟随粉丝牌同步，保活任务只负责赠送。'
    },
    'double-card': {
      title: '双倍赠送',
      subtitle: '双倍任务在粉丝牌列表上维护参与状态与分配值。'
    },
    medals: {
      title: '粉丝牌同步',
      subtitle: '查看当前粉丝牌列表与双倍状态。'
    },
    logs: {
      title: '运行日志',
      subtitle: '查看系统、领取、保活和双倍任务的执行记录。'
    }
  };

  var DEFAULT_RAW_CONFIG = {
    cookie: '',
    ui: { themeMode: 'system' },
    collectGift: { cron: '0 0 0 * * *' },
    keepalive: { cron: '0 0 8 */6 * *', model: 1, send: {} }
  };

  var state = {
    activeTab: 'overview',
    rawConfig: null,
    overview: null,
    managed: null,
    logs: [],
    fansStatus: [],
    fansStatusLoading: false,
    fansStatusLoaded: false,
    managedLoading: false,
    themeMode: 'system'
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getSystemPrefersDark() {
    if (!window.matchMedia) {
      return true;
    }
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      return true;
    }
  }

  function formatDate(value) {
    if (!value) {
      return '无';
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }
    try {
      return new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(date).replace(/\\//g, '-');
    } catch (error) {
      return date.toISOString();
    }
  }

  function toast(message, ok) {
    var node = byId('toast');
    node.textContent = message;
    node.style.display = 'block';
    node.style.background = ok ? '#15803d' : '#dc2626';
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function () {
      node.style.display = 'none';
    }, 3200);
  }

  function getRawConfig() {
    if (state.rawConfig) {
      return state.rawConfig;
    }
    return JSON.parse(JSON.stringify(DEFAULT_RAW_CONFIG));
  }

  function getManagedConfig() {
    if (state.managed && state.managed.config) {
      return state.managed.config;
    }
    return getRawConfig();
  }

  function getManagedFans() {
    if (state.managed && state.managed.fans) {
      return state.managed.fans;
    }
    return [];
  }

  function requestJson(url, options) {
    var opts = options || {};
    return fetch(url, opts).then(function (response) {
      return response.text().then(function (text) {
        var data = text ? JSON.parse(text) : {};
        if (!response.ok) {
          throw new Error(data && data.error ? data.error : '请求失败');
        }
        return data;
      });
    });
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    var buttons = document.querySelectorAll('.tab-btn');
    var i;
    for (i = 0; i < buttons.length; i += 1) {
      var button = buttons[i];
      button.classList.toggle('active', button.getAttribute('data-tab') === tab);
    }

    var pages = document.querySelectorAll('.page');
    for (i = 0; i < pages.length; i += 1) {
      var page = pages[i];
      page.classList.toggle('active', page.id === 'page-' + tab);
    }

    byId('page-title').textContent = PAGE_META[tab].title;
    byId('page-subtitle').textContent = PAGE_META[tab].subtitle;

    if (tab === 'medals' && !state.fansStatusLoaded) {
      loadFansStatus(false);
    }
    if (tab === 'logs') {
      loadLogs();
    }
  }

  function buildStatusPill(label, kind) {
    return '<span class="pill ' + kind + '">' + escapeHtml(label) + '</span>';
  }

  function renderOverview() {
    var overview = state.overview;
    if (!overview) {
      byId('metric-ready').textContent = '-';
      byId('metric-ready-note').textContent = '加载中...';
      byId('metric-cookie').textContent = '-';
      byId('metric-cookie-note').textContent = '加载中...';
      byId('metric-timezone').textContent = '-';
      byId('metric-timezone-note').textContent = '加载中...';
      byId('overview-status-list').innerHTML = '<div class="status-item"><div class="status-name">加载中...</div></div>';
      byId('overview-sync-box').textContent = '正在加载同步状态...';
      byId('overview-log-box').innerHTML = '<div class="empty">暂无日志</div>';
      return;
    }

    byId('metric-ready').textContent = overview.ready ? '已就绪' : '待配置';
    byId('metric-ready-note').textContent = overview.ready ? '已具备运行条件。' : '需要先保存 Cookie 并配置至少一个任务。';
    byId('metric-cookie').textContent = overview.cookieSaved ? '已保存' : '未保存';
    byId('metric-cookie-note').textContent = overview.cookieSaved ? 'Cookie 已保存，可继续同步粉丝牌。' : '请先在登录与领取页保存 Cookie。';
    byId('metric-timezone').textContent = '上海';
    byId('metric-timezone-note').textContent = '页面展示与 Docker 调度统一按 ' + escapeHtml(overview.timezone || 'Asia/Shanghai');

    byId('manual-collect-btn').disabled = !(overview.cookieSaved && overview.collectGiftConfigured);
    byId('manual-keepalive-btn').disabled = !(overview.cookieSaved && overview.keepaliveConfigured);
    byId('manual-double-btn').disabled = !(overview.cookieSaved && overview.doubleCardConfigured);

    var items = [];
    items.push(
      '<div class="status-item"><div class="status-name">领取任务 ' + buildStatusPill(overview.collectGiftConfigured ? '已配置' : '未配置', overview.collectGiftConfigured ? 'ok' : 'off') + '</div><div class="status-meta">运行状态：' + escapeHtml(overview.status.collectGift.running ? '运行中' : '未运行') + '<br>上次执行：' + escapeHtml(formatDate(overview.status.collectGift.lastRun)) + '<br>下次执行：' + escapeHtml(formatDate(overview.status.collectGift.nextRun)) + '</div></div>'
    );
    items.push(
      '<div class="status-item"><div class="status-name">保活任务 ' + buildStatusPill(overview.keepaliveConfigured ? '已配置' : '未配置', overview.keepaliveConfigured ? 'ok' : 'off') + '</div><div class="status-meta">房间数：' + escapeHtml(overview.keepaliveRooms) + '<br>运行状态：' + escapeHtml(overview.status.keepalive.running ? '运行中' : '未运行') + '<br>下次执行：' + escapeHtml(formatDate(overview.status.keepalive.nextRun)) + '</div></div>'
    );
    items.push(
      '<div class="status-item"><div class="status-name">双倍任务 ' + buildStatusPill(overview.doubleCardConfigured ? '已配置' : '未配置', overview.doubleCardConfigured ? 'ok' : 'off') + '</div><div class="status-meta">房间数：' + escapeHtml(overview.doubleCardRooms) + '<br>运行状态：' + escapeHtml(overview.status.doubleCard.running ? '运行中' : '未运行') + '<br>下次执行：' + escapeHtml(formatDate(overview.status.doubleCard.nextRun)) + '</div></div>'
    );
    byId('overview-status-list').innerHTML = items.join('');

    var fans = getManagedFans();
    var rawConfig = getRawConfig();
    if (!rawConfig.cookie) {
      byId('overview-sync-box').textContent = '请先保存 Cookie。保存后这里会同步粉丝牌并自动对齐保活和双倍任务。';
    } else if (state.managedLoading) {
      byId('overview-sync-box').textContent = '正在同步粉丝牌与任务配置...';
    } else {
      byId('overview-sync-box').textContent = '当前已同步 ' + fans.length + ' 个粉丝牌房间。保活和双倍都围绕这份列表运作。';
    }

    renderLogBox('overview-log-box', overview.recentLogs || []);
  }

  function renderLogBox(targetId, logs) {
    var target = byId(targetId);
    if (!logs || !logs.length) {
      target.innerHTML = '<div class="empty">暂无日志</div>';
      return;
    }
    var html = [];
    var i;
    for (i = 0; i < logs.length; i += 1) {
      html.push('<div class="log-line"><span class="muted">[' + escapeHtml(formatDate(logs[i].timestamp)) + ']</span> [' + escapeHtml(logs[i].category) + '] ' + escapeHtml(logs[i].message) + '</div>');
    }
    target.innerHTML = html.join('');
    target.scrollTop = target.scrollHeight;
  }

  function renderCookiePage() {
    var config = getRawConfig();
    byId('cookie-input').value = config.cookie || '';
    byId('collect-enable').checked = Boolean(config.collectGift);
    byId('collect-cron').value = config.collectGift ? config.collectGift.cron : '0 0 0 * * *';
  }

  function renderKeepalivePage() {
    var rawConfig = getRawConfig();
    var config = getManagedConfig().keepalive || rawConfig.keepalive || { cron: '0 0 8 */6 * *', model: 1, send: {} };
    var fans = getManagedFans();
    byId('keepalive-enable').checked = Boolean(getManagedConfig().keepalive || rawConfig.keepalive);
    byId('keepalive-cron').value = config.cron || '0 0 8 */6 * *';
    byId('keepalive-model').value = String(config.model || 1);

    if (!rawConfig.cookie) {
      byId('keepalive-note').textContent = '请先保存 Cookie。没有 Cookie 时无法同步粉丝牌，也不会生成保活房间列表。';
      byId('keepalive-table-wrap').innerHTML = '<div class="empty">保存 Cookie 后再同步粉丝牌，这里才会出现房间列表。</div>';
      return;
    }

    if (state.managedLoading) {
      byId('keepalive-note').textContent = '正在同步粉丝牌与保活配置...';
      byId('keepalive-table-wrap').innerHTML = '<div class="empty">请稍候...</div>';
      return;
    }

    if (!fans.length) {
      byId('keepalive-note').textContent = '当前没有可用粉丝牌。';
      byId('keepalive-table-wrap').innerHTML = '<div class="empty">同步后如果仍为空，说明当前账号没有可用粉丝牌数据。</div>';
      return;
    }

    byId('keepalive-note').textContent = '当前已同步 ' + fans.length + ' 个粉丝牌房间。';
    byId('keepalive-table-wrap').innerHTML = buildSendTable(fans, config, false, 'keepalive-value');
  }

  function renderDoublePage() {
    var rawConfig = getRawConfig();
    var config = getManagedConfig().doubleCard || rawConfig.doubleCard || { cron: '0 0 */4 * * *', model: 1, send: {}, enabled: {} };
    var fans = getManagedFans();
    byId('double-enable').checked = Boolean(getManagedConfig().doubleCard || rawConfig.doubleCard);
    byId('double-cron').value = config.cron || '0 0 */4 * * *';
    byId('double-model').value = String(config.model || 1);

    if (!rawConfig.cookie) {
      byId('double-note').textContent = '请先保存 Cookie。没有 Cookie 时无法同步粉丝牌，也不会生成双倍房间列表。';
      byId('double-table-wrap').innerHTML = '<div class="empty">保存 Cookie 后再同步粉丝牌，这里才会出现房间列表。</div>';
      return;
    }

    if (state.managedLoading) {
      byId('double-note').textContent = '正在同步粉丝牌与双倍配置...';
      byId('double-table-wrap').innerHTML = '<div class="empty">请稍候...</div>';
      return;
    }

    if (!fans.length) {
      byId('double-note').textContent = '当前没有可用粉丝牌。';
      byId('double-table-wrap').innerHTML = '<div class="empty">同步后如果仍为空，说明当前账号没有可用粉丝牌数据。</div>';
      return;
    }

    var enabledCount = 0;
    var i;
    for (i = 0; i < fans.length; i += 1) {
      var roomKey = String(fans[i].roomId);
      if (config.enabled && config.enabled[roomKey]) {
        enabledCount += 1;
      }
    }
    byId('double-note').textContent = '当前已勾选 ' + enabledCount + ' / ' + fans.length + ' 个房间参与双倍。';
    byId('double-table-wrap').innerHTML = buildSendTable(fans, config, true, 'double-value');
  }

  function buildSendTable(fans, config, withEnabled, valueClass) {
    var model = Number(config.model || 1);
    var rows = [];
    var i;
    for (i = 0; i < fans.length; i += 1) {
      var fan = fans[i];
      var key = String(fan.roomId);
      var sendItem = config.send && config.send[key] ? config.send[key] : {
        roomId: fan.roomId,
        number: 0,
        percentage: 1
      };
      var value = model === 2 ? Number(sendItem.number || 0) : Number(sendItem.percentage || 0);
      rows.push('<tr>');
      rows.push('<td>' + escapeHtml(i + 1) + '</td>');
      if (withEnabled) {
        rows.push('<td><input type="checkbox" class="double-enabled" data-room-id="' + escapeHtml(fan.roomId) + '"' + (config.enabled && config.enabled[key] ? ' checked' : '') + '></td>');
      }
      rows.push('<td>' + escapeHtml(fan.name) + '</td>');
      rows.push('<td>' + escapeHtml(fan.roomId) + '</td>');
      rows.push('<td>' + escapeHtml(fan.level) + '</td>');
      rows.push('<td>' + escapeHtml(fan.rank) + '</td>');
      rows.push('<td>' + escapeHtml(fan.today) + '</td>');
      rows.push('<td>' + escapeHtml(fan.intimacy) + '</td>');
      rows.push('<td><input type="number" class="' + valueClass + '" data-room-id="' + escapeHtml(fan.roomId) + '" value="' + escapeHtml(value) + '"></td>');
      rows.push('</tr>');
    }

    var header = '<tr><th>序号</th>';
    if (withEnabled) {
      header += '<th>参与</th>';
    }
    header += '<th>主播名称</th><th>房间号</th><th>等级</th><th>排名</th><th>今日亲密度</th><th>亲密度</th><th>' + (model === 2 ? '数量' : '百分比') + '</th></tr>';

    return '<div class="table-shell"><table class="table"><thead>' + header + '</thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }

  function renderFansStatusPage() {
    var rawConfig = getRawConfig();
    if (!rawConfig.cookie) {
      byId('fans-status-note').textContent = '请先保存 Cookie。';
      byId('fans-status-table-wrap').innerHTML = '<div class="empty">保存 Cookie 后才能查询粉丝牌状态。</div>';
      return;
    }

    if (state.fansStatusLoading) {
      byId('fans-status-note').textContent = '正在刷新粉丝牌状态...';
      byId('fans-status-table-wrap').innerHTML = '<div class="empty">请稍候...</div>';
      return;
    }

    if (!state.fansStatusLoaded) {
      byId('fans-status-note').textContent = '尚未加载粉丝牌状态。';
      byId('fans-status-table-wrap').innerHTML = '<div class="empty">点击“刷新状态”开始加载。</div>';
      return;
    }

    if (!state.fansStatus.length) {
      byId('fans-status-note').textContent = '当前没有可展示的粉丝牌数据。';
      byId('fans-status-table-wrap').innerHTML = '<div class="empty">当前没有可展示的粉丝牌数据。</div>';
      return;
    }

    byId('fans-status-note').textContent = '当前共 ' + state.fansStatus.length + ' 个粉丝牌房间。';
    var rows = [];
    var i;
    for (i = 0; i < state.fansStatus.length; i += 1) {
      var item = state.fansStatus[i];
      rows.push('<tr>');
      rows.push('<td>' + escapeHtml(i + 1) + '</td>');
      rows.push('<td>' + escapeHtml(item.name) + '</td>');
      rows.push('<td>' + escapeHtml(item.roomId) + '</td>');
      rows.push('<td>' + escapeHtml(item.level) + '</td>');
      rows.push('<td>' + escapeHtml(item.rank) + '</td>');
      rows.push('<td>' + escapeHtml(item.today) + '</td>');
      rows.push('<td>' + escapeHtml(item.intimacy) + '</td>');
      rows.push('<td>' + buildStatusPill(item.doubleActive ? '双倍中' : '未开启', item.doubleActive ? 'ok' : 'off') + '</td>');
      rows.push('</tr>');
    }
    byId('fans-status-table-wrap').innerHTML = '<div class="table-shell"><table class="table"><thead><tr><th>序号</th><th>主播名称</th><th>房间号</th><th>等级</th><th>排名</th><th>今日亲密度</th><th>亲密度</th><th>双倍状态</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }

  function renderLogsPage() {
    renderLogBox('full-log-box', state.logs || []);
  }

  function renderTheme() {
    var config = getRawConfig();
    var mode = 'system';
    if (config.ui && config.ui.themeMode) {
      mode = config.ui.themeMode;
    }
    state.themeMode = mode;
    byId('theme-mode').value = mode;
    var resolved = mode === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : mode;
    document.body.setAttribute('data-theme', resolved);
    byId('theme-note').textContent = mode === 'system'
      ? '当前跟随系统，系统为 ' + (getSystemPrefersDark() ? '深色' : '浅色')
      : '当前固定为 ' + (mode === 'dark' ? '深色' : '浅色') + ' 模式';
  }

  function renderAll() {
    renderTheme();
    renderOverview();
    renderCookiePage();
    renderKeepalivePage();
    renderDoublePage();
    renderFansStatusPage();
    renderLogsPage();
  }

  function loadRawConfig() {
    return requestJson('/api/config/raw').then(function (data) {
      state.rawConfig = data.exists ? data.data : JSON.parse(JSON.stringify(DEFAULT_RAW_CONFIG));
      renderAll();
    }).catch(function (error) {
      toast('加载配置失败：' + error.message, false);
    });
  }

  function loadOverview() {
    return requestJson('/api/overview').then(function (data) {
      state.overview = data;
      renderOverview();
    }).catch(function (error) {
      toast('加载概览失败：' + error.message, false);
    });
  }

  function loadLogs() {
    return requestJson('/api/logs').then(function (data) {
      state.logs = data;
      renderLogsPage();
      if (state.overview && state.activeTab === 'overview') {
        renderLogBox('overview-log-box', data.slice(data.length > 10 ? data.length - 10 : 0));
      }
    }).catch(function (error) {
      toast('加载日志失败：' + error.message, false);
    });
  }

  function syncFans(showToast) {
    var rawConfig = getRawConfig();
    if (!rawConfig.cookie) {
      toast('请先保存 Cookie', false);
      renderAll();
      return Promise.resolve();
    }

    state.managedLoading = true;
    renderAll();
    return requestJson('/api/fans/reconcile', {
      method: 'POST'
    }).then(function (data) {
      state.managed = data;
      state.rawConfig = data.config;
      state.managedLoading = false;
      renderAll();
      loadOverview();
      if (showToast) {
        toast('粉丝牌与任务配置已同步', true);
      }
    }).catch(function (error) {
      state.managedLoading = false;
      renderAll();
      toast('同步粉丝牌失败：' + error.message, false);
    });
  }

  function loadFansStatus(showToast) {
    var rawConfig = getRawConfig();
    if (!rawConfig.cookie) {
      renderFansStatusPage();
      if (showToast) {
        toast('请先保存 Cookie', false);
      }
      return Promise.resolve();
    }

    state.fansStatusLoading = true;
    renderFansStatusPage();
    return requestJson('/api/fans/status').then(function (data) {
      state.fansStatus = data;
      state.fansStatusLoaded = true;
      state.fansStatusLoading = false;
      renderFansStatusPage();
      if (showToast) {
        toast('粉丝牌状态已刷新', true);
      }
    }).catch(function (error) {
      state.fansStatusLoading = false;
      state.fansStatusLoaded = false;
      state.fansStatus = [];
      renderFansStatusPage();
      toast('加载粉丝牌状态失败：' + error.message, false);
    });
  }

  function saveCookie() {
    var cookie = byId('cookie-input').value.trim();
    if (!cookie) {
      toast('请先填写 Cookie', false);
      return;
    }

    requestJson('/api/cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cookie: cookie })
    }).then(function () {
      toast('Cookie 已保存', true);
      loadRawConfig().then(function () {
        loadOverview();
        syncFans(false);
      });
    }).catch(function (error) {
      toast('保存 Cookie 失败：' + error.message, false);
    });
  }

  function saveCollectConfig() {
    var enabled = byId('collect-enable').checked;
    var payload = {
      collectGift: enabled ? { cron: byId('collect-cron').value.trim() } : null
    };

    requestJson('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function () {
      toast('领取配置已保存', true);
      loadRawConfig();
      loadOverview();
    }).catch(function (error) {
      toast('保存领取配置失败：' + error.message, false);
    });
  }

  function buildSendPayload(valueClass, includeEnabled) {
    var fans = getManagedFans();
    var send = {};
    var model = Number(includeEnabled ? byId('double-model').value : byId('keepalive-model').value);
    var i;
    for (i = 0; i < fans.length; i += 1) {
      var roomId = fans[i].roomId;
      var input = document.querySelector('.' + valueClass + '[data-room-id="' + roomId + '"]');
      var value = input ? Number(input.value) : 0;
      send[String(roomId)] = {
        roomId: roomId,
        giftId: 268,
        number: model === 2 ? value : 0,
        percentage: model === 1 ? value : 0,
        count: 0
      };
    }

    var result = {
      cron: includeEnabled ? byId('double-cron').value.trim() : byId('keepalive-cron').value.trim(),
      model: model,
      send: send
    };

    if (includeEnabled) {
      var enabledMap = {};
      var checkboxes = document.querySelectorAll('.double-enabled');
      for (i = 0; i < checkboxes.length; i += 1) {
        enabledMap[String(checkboxes[i].getAttribute('data-room-id'))] = Boolean(checkboxes[i].checked);
      }
      result.enabled = enabledMap;
    }

    return result;
  }

  function saveKeepaliveConfig() {
    var payload = {
      keepalive: byId('keepalive-enable').checked ? buildSendPayload('keepalive-value', false) : null
    };

    requestJson('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function () {
      toast('保活配置已保存', true);
      loadRawConfig().then(function () {
        loadOverview();
        syncFans(false);
      });
    }).catch(function (error) {
      toast('保存保活配置失败：' + error.message, false);
    });
  }

  function saveDoubleConfig() {
    var payload = {
      doubleCard: byId('double-enable').checked ? buildSendPayload('double-value', true) : null
    };

    requestJson('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function () {
      toast('双倍配置已保存', true);
      loadRawConfig().then(function () {
        loadOverview();
        syncFans(false);
      });
    }).catch(function (error) {
      toast('保存双倍配置失败：' + error.message, false);
    });
  }

  function triggerTask(type) {
    requestJson('/api/trigger/' + type, {
      method: 'POST'
    }).then(function () {
      toast('执行完成', true);
      loadOverview();
      loadLogs();
      if (state.activeTab === 'medals') {
        loadFansStatus(false);
      }
    }).catch(function (error) {
      toast('执行失败：' + error.message, false);
    });
  }

  function clearLogs() {
    requestJson('/api/logs', {
      method: 'DELETE'
    }).then(function () {
      toast('日志已清空', true);
      loadLogs();
      loadOverview();
    }).catch(function (error) {
      toast('清空日志失败：' + error.message, false);
    });
  }

  function saveTheme() {
    var mode = byId('theme-mode').value;
    requestJson('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ui: { themeMode: mode } })
    }).then(function () {
      var config = getRawConfig();
      if (!config.ui) {
        config.ui = {};
      }
      config.ui.themeMode = mode;
      state.rawConfig = config;
      renderTheme();
    }).catch(function (error) {
      toast('保存主题失败：' + error.message, false);
    });
  }

  function findActionTarget(node) {
    var current = node;
    while (current && current !== document.body) {
      if (current.getAttribute && current.getAttribute('data-action')) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  document.addEventListener('click', function (event) {
    var target = findActionTarget(event.target);
    if (!target) {
      return;
    }

    var action = target.getAttribute('data-action');
    if (action === 'tab') {
      setActiveTab(target.getAttribute('data-tab'));
      return;
    }
    if (action === 'refresh-overview') {
      loadOverview();
      return;
    }
    if (action === 'sync-fans') {
      syncFans(true);
      return;
    }
    if (action === 'refresh-fans-status') {
      loadFansStatus(true);
      return;
    }
    if (action === 'refresh-logs') {
      loadLogs();
      return;
    }
    if (action === 'clear-logs') {
      clearLogs();
      return;
    }
    if (action === 'save-cookie') {
      saveCookie();
      return;
    }
    if (action === 'save-collect') {
      saveCollectConfig();
      return;
    }
    if (action === 'save-keepalive') {
      saveKeepaliveConfig();
      return;
    }
    if (action === 'save-double') {
      saveDoubleConfig();
      return;
    }
    if (action === 'trigger') {
      triggerTask(target.getAttribute('data-trigger'));
    }
  });

  byId('theme-mode').addEventListener('change', saveTheme);

  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (state.themeMode === 'system') {
          renderTheme();
        }
      });
    } catch (error) {
      // Ignore older browsers that do not support addEventListener on MediaQueryList.
    }
  }

  setInterval(function () {
    if (state.activeTab === 'overview') {
      loadOverview();
    }
    if (state.activeTab === 'logs' && byId('logs-auto-refresh').checked) {
      loadLogs();
    }
  }, 5000);

  Promise.all([
    loadRawConfig(),
    loadOverview(),
    loadLogs()
  ]).then(function () {
    var rawConfig = getRawConfig();
    if (rawConfig.cookie) {
      syncFans(false);
    } else {
      renderAll();
    }
  });
})();
</script>
</body>
</html>`;
}

export function getHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>斗鱼粉丝牌续牌</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231967d2'/%3E%3Cpath d='M18 18h28v28H18z' fill='white' opacity='.15'/%3E%3Cpath d='M24 24h16c4.4 0 8 3.6 8 8s-3.6 8-8 8h-4v8h-8V24zm8 8v8h8c2.2 0 4-1.8 4-4s-1.8-4-4-4h-8z' fill='white'/%3E%3C/svg%3E">
<style>
:root{
  --bg:#f4ede4;
  --bg-alt:#edf4fb;
  --surface:rgba(255,255,255,.76);
  --surface-strong:rgba(255,255,255,.9);
  --surface-soft:rgba(255,248,240,.72);
  --line:rgba(91,111,145,.16);
  --line-strong:rgba(72,93,129,.28);
  --text:#182338;
  --muted:#5f6f86;
  --accent:#135fd2;
  --accent-2:#16a3a5;
  --accent-soft:rgba(19,95,210,.1);
  --accent-gradient:linear-gradient(135deg,#135fd2 0%,#16a3a5 100%);
  --success:#16825d;
  --danger:#c33b35;
  --warning:#b7791f;
  --shadow:0 24px 60px rgba(25,40,68,.12);
  --btn-shadow:0 14px 30px rgba(22,82,180,.18);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;min-height:100%}
body{
  font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  color:var(--text);
  background:
    radial-gradient(circle at top left, rgba(27,105,214,.16), transparent 28%),
    radial-gradient(circle at top right, rgba(27,163,165,.14), transparent 24%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 52%, #edf3fb 100%);
}
body::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  background:linear-gradient(180deg, rgba(255,255,255,.28), transparent 18%, transparent 82%, rgba(255,255,255,.12));
}
body[data-theme="dark"]{
  --bg:#000;
  --bg-alt:#07131b;
  --surface:rgba(10,12,15,.78);
  --surface-strong:rgba(8,8,8,.94);
  --surface-soft:rgba(14,18,24,.84);
  --line:rgba(110,148,182,.14);
  --line-strong:rgba(128,182,230,.22);
  --text:#edf7ff;
  --muted:#8da5bf;
  --accent:#41b7ff;
  --accent-2:#3ad1b6;
  --accent-soft:rgba(65,183,255,.14);
  --accent-gradient:linear-gradient(135deg,#3b9fff 0%,#2fd0b0 100%);
  --success:#27b27f;
  --danger:#ff6b6b;
  --warning:#f8b84c;
  --shadow:0 30px 70px rgba(0,0,0,.58);
  --btn-shadow:0 18px 34px rgba(0,0,0,.38);
  background:
    radial-gradient(circle at top left, rgba(59,159,255,.16), transparent 24%),
    radial-gradient(circle at top right, rgba(47,208,176,.1), transparent 18%),
    linear-gradient(180deg, #000 0%, #020406 48%, #04090d 100%);
}
.shell{
  position:relative;
  z-index:1;
  min-height:100vh;
  display:flex;
}
.sidebar{
  width:292px;
  flex:0 0 292px;
  padding:24px 20px;
  border-right:1px solid var(--line);
  background:var(--surface);
  backdrop-filter:blur(18px);
}
.brand-title{
  margin:0 0 10px;
  font-size:26px;
  font-weight:800;
  letter-spacing:.02em;
}
.brand-copy{
  margin:0 0 22px;
  color:var(--muted);
  font-size:13px;
  line-height:1.75;
}
.tab-list{
  display:flex;
  flex-direction:column;
  gap:8px;
}
.tab-btn{
  width:100%;
  border:1px solid transparent;
  background:transparent;
  color:inherit;
  text-align:left;
  padding:13px 15px;
  border-radius:18px;
  cursor:pointer;
  font:inherit;
  font-weight:600;
  transition:transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease;
}
.tab-btn:hover{
  transform:translateX(3px);
  background:rgba(255,255,255,.28);
  border-color:var(--line-strong);
}
.tab-btn.active{
  background:var(--accent-gradient);
  color:#fff;
  border-color:transparent;
  box-shadow:var(--btn-shadow);
}
.theme-box{
  margin-top:22px;
  padding:16px;
  border:1px solid var(--line);
  border-radius:20px;
  background:var(--surface-strong);
  box-shadow:var(--shadow);
}
.theme-note{
  margin-top:8px;
  color:var(--muted);
  font-size:12px;
  line-height:1.7;
}
.main{
  flex:1;
  min-width:0;
  padding:24px;
}
.header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:16px;
  margin-bottom:18px;
}
.page-title{
  margin:0;
  font-size:30px;
  font-weight:800;
  letter-spacing:.01em;
}
.page-subtitle{
  margin:8px 0 0;
  color:var(--muted);
  font-size:13px;
  line-height:1.75;
}
.toolbar{
  display:flex;
  gap:10px;
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
.panel,
.table-shell,
.log-box,
.empty,
.status-box{
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:24px;
  backdrop-filter:blur(18px);
  box-shadow:var(--shadow);
}
.panel,
.status-box,
.empty{
  padding:18px;
}
.section-kicker{
  font-size:11px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--muted);
}
.section-title{
  margin:8px 0 6px;
  font-size:20px;
  line-height:1.2;
}
.subtle{
  margin:0;
  color:var(--muted);
  font-size:13px;
  line-height:1.75;
}
.panel-head{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:14px;
}
.overview-stack{
  display:grid;
  gap:16px;
}
.login-strip{
  padding:22px;
}
.login-strip-inner{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:18px;
}
.login-status{
  margin-top:12px;
  display:flex;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}
.hero-status{
  font-size:30px;
  font-weight:800;
  line-height:1;
}
.strip-metrics{
  min-width:280px;
  display:grid;
  gap:12px;
  grid-template-columns:repeat(2,minmax(0,1fr));
}
.strip-metric{
  border:1px solid var(--line);
  border-radius:18px;
  padding:14px;
  background:var(--surface-soft);
}
.mini-label{
  color:var(--muted);
  font-size:12px;
  margin-bottom:6px;
}
.mini-value{
  font-size:16px;
  font-weight:700;
}
.task-grid{
  display:grid;
  gap:16px;
  grid-template-columns:repeat(3,minmax(0,1fr));
}
.task-card{
  padding:18px;
  border-radius:24px;
  background:var(--surface);
  border:1px solid var(--line);
  box-shadow:var(--shadow);
  backdrop-filter:blur(18px);
}
.task-card-head{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
}
.task-card-title{
  margin:0;
  font-size:19px;
}
.task-card-pills{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:12px;
}
.summary-grid{
  margin-top:16px;
  display:grid;
  gap:10px;
  grid-template-columns:repeat(3,minmax(0,1fr));
}
.summary-cell{
  border-top:1px solid var(--line);
  padding-top:10px;
}
.pill{
  display:inline-flex;
  align-items:center;
  min-height:28px;
  padding:4px 10px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
  background:var(--accent-soft);
  color:var(--accent);
}
.pill.warn{
  background:rgba(248,184,76,.16);
  color:var(--warning);
}
.pill.ok{
  background:rgba(39,178,127,.16);
  color:var(--success);
}
.pill.off{
  background:rgba(120,138,160,.14);
  color:var(--muted);
}
.field-block{margin-bottom:16px}
.field-label{
  display:block;
  margin-bottom:6px;
  font-size:12px;
  color:var(--muted);
}
input,textarea,select{
  width:100%;
  border:1px solid var(--line-strong);
  border-radius:16px;
  padding:11px 13px;
  background:var(--surface-strong);
  color:var(--text);
  font:inherit;
  outline:none;
  transition:border-color .18s ease, box-shadow .18s ease, background .18s ease;
}
input:focus,textarea:focus,select:focus{
  border-color:var(--accent);
  box-shadow:0 0 0 4px var(--accent-soft);
}
textarea{
  min-height:150px;
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
.switch-field{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:18px;
  padding:16px 18px;
  border:1px solid var(--line);
  border-radius:22px;
  background:var(--surface-soft);
}
.switch-copy{
  min-width:0;
}
.switch-title{
  font-size:15px;
  font-weight:700;
}
.switch-note{
  margin-top:4px;
  color:var(--muted);
  font-size:12px;
  line-height:1.65;
}
.switch-control{
  position:relative;
  display:inline-flex;
  align-items:center;
}
.switch-input{
  position:absolute;
  opacity:0;
  pointer-events:none;
}
.switch-slider{
  position:relative;
  width:58px;
  height:34px;
  border-radius:999px;
  background:rgba(121,138,160,.28);
  border:1px solid var(--line-strong);
  transition:background .18s ease, border-color .18s ease, box-shadow .18s ease;
}
.switch-slider::after{
  content:"";
  position:absolute;
  top:3px;
  left:3px;
  width:26px;
  height:26px;
  border-radius:50%;
  background:#fff;
  box-shadow:0 6px 16px rgba(0,0,0,.18);
  transition:transform .18s ease;
}
.switch-input:checked + .switch-slider{
  background:var(--accent-gradient);
  border-color:transparent;
  box-shadow:var(--btn-shadow);
}
.switch-input:checked + .switch-slider::after{
  transform:translateX(24px);
}
.helper{
  color:var(--muted);
  font-size:13px;
  line-height:1.7;
}
.btn{
  border:1px solid transparent;
  border-radius:999px;
  padding:11px 16px;
  cursor:pointer;
  font:inherit;
  font-weight:700;
  transition:transform .18s ease, box-shadow .18s ease, opacity .18s ease, border-color .18s ease;
}
.btn:hover{
  transform:translateY(-1px);
}
.btn:disabled{
  opacity:.55;
  cursor:not-allowed;
  transform:none;
  box-shadow:none;
}
.btn-primary,
.btn-success{
  background:var(--accent-gradient);
  color:#fff;
  box-shadow:var(--btn-shadow);
}
.btn-secondary{
  background:var(--surface-strong);
  color:var(--text);
  border-color:var(--line-strong);
}
.btn-danger{
  background:linear-gradient(135deg,#cc4c45 0%, #ef6d63 100%);
  color:#fff;
  box-shadow:0 14px 30px rgba(204,76,69,.24);
}
.actions{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
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
  padding:12px;
  border-bottom:1px solid var(--line);
  text-align:left;
  font-size:13px;
}
.table th{
  position:sticky;
  top:0;
  background:var(--surface-strong);
  color:var(--muted);
  font-size:12px;
  z-index:1;
}
.table tbody tr:nth-child(even){
  background:rgba(255,255,255,.04);
}
.table input[type="number"]{
  min-width:96px;
}
.table input[type="checkbox"]{
  width:auto;
  accent-color:var(--accent);
}
.overview-table-note{
  margin-top:8px;
}
.empty{
  color:var(--muted);
  font-size:13px;
  line-height:1.75;
}
.empty-action{
  margin-top:14px;
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
  color:var(--muted);
}
.toast{
  position:fixed;
  top:20px;
  right:20px;
  min-width:220px;
  max-width:420px;
  padding:12px 14px;
  border-radius:16px;
  color:#fff;
  display:none;
  z-index:999;
  box-shadow:var(--shadow);
}
@media (max-width: 1100px){
  .task-grid,
  .grid.cols-3{
    grid-template-columns:1fr;
  }
  .strip-metrics,
  .summary-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}
@media (max-width: 960px){
  .shell{display:block}
  .sidebar{
    width:auto;
    border-right:none;
    border-bottom:1px solid var(--line);
  }
  .main{
    padding:18px;
  }
  .header,
  .login-strip-inner{
    display:block;
  }
  .toolbar{
    margin-top:14px;
  }
  .strip-metrics,
  .grid.cols-2,
  .summary-grid{
    grid-template-columns:1fr;
  }
}
</style>
</head>
<body data-theme="dark">
<div class="shell">
  <aside class="sidebar">
    <h1 class="brand-title">斗鱼粉丝牌续牌</h1>
    <p class="brand-copy">更聚焦的 Docker 管理台。先看概况，再分别管理登录、保活和双倍任务。</p>

    <div class="tab-list">
      <button class="tab-btn active" data-action="tab" data-tab="overview">概况</button>
      <button class="tab-btn" data-action="tab" data-tab="cookie">登录与领取</button>
      <button class="tab-btn" data-action="tab" data-tab="keepalive">保活任务</button>
      <button class="tab-btn" data-action="tab" data-tab="double-card">双倍任务</button>
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
        <h2 class="page-title" id="page-title">概况</h2>
        <p class="page-subtitle" id="page-subtitle">先看登录、领取、保活、双倍的当前状态，再确认粉丝牌列表。</p>
      </div>
      <div class="toolbar">
        <button class="btn btn-secondary" data-action="refresh-overview">刷新</button>
      </div>
    </div>

    <section class="page active" id="page-overview">
      <div class="overview-stack">
        <div class="panel login-strip">
          <div class="login-strip-inner">
            <div>
              <div class="section-kicker">登录状态</div>
              <div class="login-status">
                <div class="hero-status" id="login-strip-status">-</div>
                <span class="pill off" id="login-strip-pill">等待加载</span>
              </div>
              <p class="subtle" id="login-strip-note" style="margin-top:12px">加载中...</p>
            </div>
            <div class="strip-metrics" id="login-strip-meta">
              <div class="strip-metric">
                <div class="mini-label">系统就绪</div>
                <div class="mini-value">-</div>
              </div>
              <div class="strip-metric">
                <div class="mini-label">粉丝牌</div>
                <div class="mini-value">-</div>
              </div>
            </div>
          </div>
        </div>

        <div class="task-grid">
          <div class="task-card" id="overview-collect-card">
            <div class="task-card-title">领取</div>
          </div>
          <div class="task-card" id="overview-keepalive-card">
            <div class="task-card-title">保活</div>
          </div>
          <div class="task-card" id="overview-double-card">
            <div class="task-card-title">双倍</div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <div>
              <div class="section-kicker">粉丝牌</div>
              <h3 class="section-title">粉丝牌列表</h3>
              <p class="subtle">概况页直接展示当前粉丝牌与双倍状态。</p>
            </div>
          </div>
          <div class="subtle overview-table-note" id="overview-fans-note">正在加载粉丝牌状态...</div>
          <div id="overview-fans-table-wrap" style="margin-top:14px"></div>
        </div>
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
          <div class="switch-field">
            <div class="switch-copy">
              <div class="switch-title">启用领取任务</div>
              <div class="switch-note">关闭后仅保留 Cookie，不执行领取调度。</div>
            </div>
            <label class="switch-control">
              <input class="switch-input" type="checkbox" id="collect-enable">
              <span class="switch-slider"></span>
            </label>
          </div>
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
        <h3 class="section-title">保活任务</h3>
        <p class="subtle">房间列表跟随粉丝牌自动同步。没有 Cookie 时，先去登录与领取页保存 Cookie。</p>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-secondary" data-action="sync-fans">刷新粉丝牌并同步</button>
        </div>
        <div class="status-box" id="keepalive-note" style="margin-top:14px">等待加载...</div>
      </div>

      <div class="panel" style="margin-top:16px">
        <div class="field-block">
          <div class="switch-field">
            <div class="switch-copy">
              <div class="switch-title">启用保活任务</div>
              <div class="switch-note">关闭后保留配置，但不执行保活调度。</div>
            </div>
            <label class="switch-control">
              <input class="switch-input" type="checkbox" id="keepalive-enable">
              <span class="switch-slider"></span>
            </label>
          </div>
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
        <h3 class="section-title">双倍任务</h3>
        <p class="subtle">双倍任务围绕同一份粉丝牌列表运作，并记录每个房间是否参与。</p>
        <div class="actions" style="margin-top:14px">
          <button class="btn btn-secondary" data-action="sync-fans">刷新粉丝牌并同步</button>
        </div>
        <div class="status-box" id="double-note" style="margin-top:14px">等待加载...</div>
      </div>

      <div class="panel" style="margin-top:16px">
        <div class="field-block">
          <div class="switch-field">
            <div class="switch-copy">
              <div class="switch-title">启用双倍任务</div>
              <div class="switch-note">关闭后不执行双倍检测与赠送，但保留当前分配设置。</div>
            </div>
            <label class="switch-control">
              <input class="switch-input" type="checkbox" id="double-enable">
              <span class="switch-slider"></span>
            </label>
          </div>
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
      title: '概况',
      subtitle: '先看登录、领取、保活、双倍的当前状态，再确认粉丝牌列表。'
    },
    cookie: {
      title: '登录与领取',
      subtitle: '保存 Cookie，并配置独立的领取任务。'
    },
    keepalive: {
      title: '保活任务',
      subtitle: '房间列表跟随粉丝牌同步，保活任务只负责赠送。'
    },
    'double-card': {
      title: '双倍任务',
      subtitle: '双倍任务在粉丝牌列表上维护参与状态与分配值。'
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

    if (tab === 'overview' && getRawConfig().cookie && !state.fansStatusLoaded) {
      loadFansStatus(false);
    }
    if (tab === 'logs') {
      loadLogs();
    }
  }

  function buildStatusPill(label, kind) {
    return '<span class="pill ' + kind + '">' + escapeHtml(label) + '</span>';
  }

  function buildSummaryCell(label, value) {
    return '<div class="summary-cell"><div class="mini-label">' + escapeHtml(label) + '</div><div class="mini-value">' + escapeHtml(value) + '</div></div>';
  }

  function buildLoadingTaskCard(title) {
    return '<div class="task-card-head"><div><div class="section-kicker">任务状态</div><h3 class="task-card-title">' + escapeHtml(title) + '</h3></div></div><div class="task-card-pills">' + buildStatusPill('等待加载', 'off') + '</div><div class="summary-grid">' + buildSummaryCell('上次执行', '-') + buildSummaryCell('下次执行', '-') + buildSummaryCell('运行状态', '-') + '</div>';
  }

  function buildTaskCard(title, configured, status, extraLabel, extraValue) {
    var enabledLabel = configured ? '已启动' : '未启动';
    var runningLabel = configured ? (status.running ? '运行中' : '未运行') : '未启用';
    return ''
      + '<div class="task-card-head"><div><div class="section-kicker">任务状态</div><h3 class="task-card-title">' + escapeHtml(title) + '</h3></div></div>'
      + '<div class="task-card-pills">'
      + buildStatusPill(enabledLabel, configured ? 'ok' : 'off')
      + buildStatusPill(runningLabel, configured ? (status.running ? 'warn' : 'off') : 'off')
      + '</div>'
      + '<div class="summary-grid">'
      + buildSummaryCell('上次执行', formatDate(status.lastRun))
      + buildSummaryCell('下次执行', formatDate(status.nextRun))
      + buildSummaryCell(extraLabel, extraValue)
      + '</div>';
  }

  function buildFansStatusTable(items) {
    var rows = [];
    var i;
    for (i = 0; i < items.length; i += 1) {
      var item = items[i];
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
    return '<div class="table-shell"><table class="table"><thead><tr><th>序号</th><th>主播名称</th><th>房间号</th><th>等级</th><th>排名</th><th>今日亲密度</th><th>亲密度</th><th>双倍状态</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }

  function renderOverview() {
    var overview = state.overview;
    var rawConfig = getRawConfig();
    var fans = state.fansStatusLoaded ? state.fansStatus : getManagedFans();
    if (!overview) {
      byId('login-strip-status').textContent = '加载中';
      byId('login-strip-pill').className = 'pill off';
      byId('login-strip-pill').textContent = '等待数据';
      byId('login-strip-note').textContent = '正在加载概况信息...';
      byId('login-strip-meta').innerHTML = ''
        + '<div class="strip-metric"><div class="mini-label">系统就绪</div><div class="mini-value">-</div></div>'
        + '<div class="strip-metric"><div class="mini-label">粉丝牌</div><div class="mini-value">-</div></div>'
        + '<div class="strip-metric"><div class="mini-label">当前状态</div><div class="mini-value">-</div></div>';
      byId('overview-collect-card').innerHTML = buildLoadingTaskCard('领取');
      byId('overview-keepalive-card').innerHTML = buildLoadingTaskCard('保活');
      byId('overview-double-card').innerHTML = buildLoadingTaskCard('双倍');
      byId('overview-fans-note').textContent = '正在加载粉丝牌状态...';
      byId('overview-fans-table-wrap').innerHTML = '<div class="empty">请稍候...</div>';
      return;
    }

    byId('login-strip-status').textContent = overview.cookieSaved ? '已登录' : '未登录';
    byId('login-strip-pill').className = 'pill ' + (overview.cookieSaved ? 'ok' : 'off');
    byId('login-strip-pill').textContent = overview.cookieSaved ? 'Cookie 已保存' : '等待登录';
    if (!rawConfig.cookie) {
      byId('login-strip-note').textContent = '请先在登录与领取页保存 Cookie。保存后概况页会自动同步粉丝牌状态。';
    } else if (state.managedLoading || state.fansStatusLoading) {
      byId('login-strip-note').textContent = '正在同步粉丝牌与任务配置，请稍候...';
    } else {
      byId('login-strip-note').textContent = '当前登录态可用于领取、保活、双倍以及粉丝牌同步。';
    }

    byId('login-strip-meta').innerHTML = ''
      + '<div class="strip-metric"><div class="mini-label">系统就绪</div><div class="mini-value">' + escapeHtml(overview.ready ? '已就绪' : '待配置') + '</div></div>'
      + '<div class="strip-metric"><div class="mini-label">粉丝牌</div><div class="mini-value">' + escapeHtml(rawConfig.cookie ? ((state.managedLoading || state.fansStatusLoading) ? '同步中' : (fans.length + ' 个')) : '未同步') + '</div></div>'
      + '<div class="strip-metric"><div class="mini-label">当前状态</div><div class="mini-value">' + escapeHtml(overview.cookieSaved ? (overview.ready ? '可运行' : '待启用任务') : '待登录') + '</div></div>';

    byId('overview-collect-card').innerHTML = buildTaskCard(
      '领取',
      overview.collectGiftConfigured,
      overview.status.collectGift,
      '执行方式',
      overview.collectGiftConfigured ? '独立任务' : '等待启用'
    );
    byId('overview-keepalive-card').innerHTML = buildTaskCard(
      '保活',
      overview.keepaliveConfigured,
      overview.status.keepalive,
      '房间数',
      overview.keepaliveRooms
    );
    byId('overview-double-card').innerHTML = buildTaskCard(
      '双倍',
      overview.doubleCardConfigured,
      overview.status.doubleCard,
      '房间数',
      overview.doubleCardRooms
    );

    if (!rawConfig.cookie) {
      byId('overview-fans-note').textContent = '请先保存 Cookie，概况页才会显示粉丝牌列表。';
      byId('overview-fans-table-wrap').innerHTML = '<div class="empty">保存 Cookie 后再点击顶部“刷新”，这里会直接展示粉丝牌与双倍状态。<div class="empty-action"><button class="btn btn-primary" data-action="tab" data-tab="cookie">前往登录与领取</button></div></div>';
      return;
    }

    if (state.managedLoading || state.fansStatusLoading) {
      byId('overview-fans-note').textContent = '正在同步粉丝牌状态...';
      byId('overview-fans-table-wrap').innerHTML = '<div class="empty">请稍候，列表正在更新。</div>';
      return;
    }

    if (!state.fansStatusLoaded) {
      byId('overview-fans-note').textContent = '点击顶部“刷新”可重新加载粉丝牌状态。';
      byId('overview-fans-table-wrap').innerHTML = '<div class="empty">尚未加载粉丝牌状态。</div>';
      return;
    }

    if (!state.fansStatus.length) {
      byId('overview-fans-note').textContent = '当前没有可展示的粉丝牌数据。';
      byId('overview-fans-table-wrap').innerHTML = '<div class="empty">当前没有可展示的粉丝牌数据。</div>';
      return;
    }

    byId('overview-fans-note').textContent = '当前共 ' + state.fansStatus.length + ' 个粉丝牌房间，双倍状态已直接并入列表。';
    byId('overview-fans-table-wrap').innerHTML = buildFansStatusTable(state.fansStatus);
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
      state.fansStatus = [];
      state.fansStatusLoaded = false;
      renderOverview();
      if (showToast) {
        toast('请先保存 Cookie', false);
      }
      return Promise.resolve();
    }

    state.fansStatusLoading = true;
    renderOverview();
    return requestJson('/api/fans/status').then(function (data) {
      state.fansStatus = data;
      state.fansStatusLoaded = true;
      state.fansStatusLoading = false;
      renderOverview();
      if (showToast) {
        toast('粉丝牌状态已刷新', true);
      }
    }).catch(function (error) {
      state.fansStatusLoading = false;
      state.fansStatusLoaded = false;
      state.fansStatus = [];
      renderOverview();
      toast('加载粉丝牌状态失败：' + error.message, false);
    });
  }

  function refreshOverviewSurface(showToast) {
    return loadRawConfig().then(function () {
      var rawConfig = getRawConfig();
      if (!rawConfig.cookie) {
        state.managed = null;
        state.fansStatus = [];
        state.fansStatusLoaded = false;
        renderAll();
        return loadOverview().then(function () {
          if (showToast) {
            toast('概况已刷新', true);
          }
        });
      }

      return syncFans(false).then(function () {
        return loadFansStatus(false);
      }).then(function () {
        return loadOverview();
      }).then(function () {
        if (showToast) {
          toast('概况已刷新', true);
        }
      });
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
      refreshOverviewSurface(false);
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
      loadRawConfig().then(function () {
        loadOverview();
      });
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
      refreshOverviewSurface(false);
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
      refreshOverviewSurface(false);
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
      if (state.activeTab === 'overview') {
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
      refreshOverviewSurface(true);
      return;
    }
    if (action === 'sync-fans') {
      syncFans(true).then(function () {
        loadFansStatus(false);
      });
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
      syncFans(false).then(function () {
        loadFansStatus(false);
      });
    } else {
      renderAll();
    }
  });
})();
</script>
</body>
</html>`;
}

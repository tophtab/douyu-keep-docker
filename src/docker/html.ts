export function getHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>斗鱼粉丝牌续牌</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  color-scheme:light dark;
  --radius-xl:24px;
  --radius-lg:18px;
  --radius-md:14px;
  --shadow:0 18px 42px rgba(15,23,42,.14);
  --font-sans:"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
}
body{
  font-family:var(--font-sans);
  min-height:100vh;
  background:var(--bg);
  color:var(--text);
  transition:background .2s ease,color .2s ease;
}
body[data-theme="light"]{
  --bg:
    radial-gradient(circle at top left,rgba(191,219,254,.72),transparent 34%),
    radial-gradient(circle at right,rgba(254,240,138,.5),transparent 26%),
    linear-gradient(180deg,#f7fbff 0%,#eef4fb 55%,#e7eef7 100%);
  --surface:rgba(255,255,255,.78);
  --surface-strong:#ffffff;
  --surface-soft:rgba(240,246,255,.92);
  --surface-muted:rgba(225,235,247,.9);
  --line:rgba(71,85,105,.14);
  --text:#122033;
  --muted:#5f7188;
  --accent:#1967d2;
  --accent-soft:rgba(25,103,210,.1);
  --accent-strong:#0f4fb0;
  --success:#0f9b73;
  --danger:#d14343;
  --warning:#c88a0a;
}
body[data-theme="dark"]{
  --bg:
    radial-gradient(circle at top left,rgba(29,78,216,.14),transparent 28%),
    radial-gradient(circle at right,rgba(56,189,248,.09),transparent 20%),
    linear-gradient(180deg,#050608 0%,#050608 100%);
  --surface:rgba(10,12,16,.92);
  --surface-strong:#090b0f;
  --surface-soft:rgba(18,22,28,.95);
  --surface-muted:rgba(26,32,41,.94);
  --line:rgba(148,163,184,.18);
  --text:#ecf4ff;
  --muted:#8ca0b8;
  --accent:#5bb5ff;
  --accent-soft:rgba(91,181,255,.13);
  --accent-strong:#8dd3ff;
  --success:#44d7a8;
  --danger:#ff7b7b;
  --warning:#f5c75a;
}
a{color:inherit}
button,input,select,textarea{font:inherit}
.app-shell{display:flex;min-height:100vh}
.sidebar{
  width:280px;
  flex:0 0 280px;
  padding:28px 20px 20px;
  border-right:1px solid var(--line);
  background:color-mix(in srgb,var(--surface) 92%,transparent);
  backdrop-filter:blur(18px);
  position:sticky;
  top:0;
  height:100vh;
}
.brand{padding:8px 10px 22px}
.brand h1{font-size:22px;line-height:1.2;font-weight:800;letter-spacing:.02em}
.brand p{margin-top:10px;font-size:13px;line-height:1.7;color:var(--muted)}
.nav-list{display:flex;flex-direction:column;gap:8px}
.nav-btn{
  width:100%;
  border:1px solid transparent;
  border-radius:16px;
  background:transparent;
  color:var(--muted);
  padding:13px 14px;
  text-align:left;
  cursor:pointer;
  transition:.2s ease;
}
.nav-btn:hover,.nav-btn.active{
  color:var(--text);
  border-color:var(--line);
  background:linear-gradient(135deg,var(--accent-soft),rgba(255,255,255,.02));
}
.sidebar-footer{
  margin-top:18px;
  padding:16px;
  border-radius:18px;
  border:1px solid var(--line);
  background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015));
}
.sidebar-footer label,.toolbar label,.field-label,.check label,.switch-row label,.helper-label{
  display:block;
  font-size:12px;
  color:var(--muted);
  margin-bottom:6px;
}
.sidebar-footer select,.field-control,.field-control textarea,.field-control input,.field-control select,.toolbar select{
  width:100%;
}
.theme-hint{
  margin-top:10px;
  font-size:12px;
  line-height:1.7;
  color:var(--muted);
}
.content-shell{flex:1;min-width:0;padding:22px}
.topbar{
  display:flex;
  justify-content:space-between;
  gap:18px;
  align-items:flex-start;
  padding:24px 26px;
  border:1px solid var(--line);
  border-radius:var(--radius-xl);
  background:linear-gradient(135deg,var(--accent-soft),rgba(255,255,255,.02));
  box-shadow:var(--shadow);
  margin-bottom:18px;
}
.topbar h2{font-size:24px;line-height:1.2}
.topbar p{margin-top:8px;font-size:13px;line-height:1.7;color:var(--muted)}
.topbar-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
main{max-width:1280px}
.tab{display:none}
.tab.active{display:block}
.grid{display:grid;gap:16px}
.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}
.grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}
.panel,.section,.hero-card{
  border:1px solid var(--line);
  border-radius:var(--radius-lg);
  background:var(--surface);
  backdrop-filter:blur(16px);
  box-shadow:var(--shadow);
}
.panel,.section{padding:18px}
.hero-card{padding:20px}
.section+.section{margin-top:16px}
.section-header{
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:flex-start;
  margin-bottom:14px;
}
.section-header h3,.section h2,.panel h2,.hero-card h3{font-size:18px}
.section-header p,.subtle,.hint,.meta-text,.empty-note,.helper-note{
  color:var(--muted);
  font-size:13px;
  line-height:1.7;
}
.hero{display:grid;grid-template-columns:1.25fr .95fr;gap:16px;margin-bottom:16px}
.metric{
  padding:16px;
  border-radius:16px;
  border:1px solid var(--line);
  background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.015));
}
.metric-label{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.metric-value{margin-top:10px;font-size:28px;font-weight:800}
.metric-hint{margin-top:10px;font-size:13px;line-height:1.7;color:var(--muted)}
.badge-row,.table-meta,.quick-actions,.toolbar,.switch-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:7px 11px;
  border-radius:999px;
  font-size:12px;
  border:1px solid var(--line);
  background:color-mix(in srgb,var(--surface-soft) 86%,transparent);
}
.dot{width:8px;height:8px;border-radius:999px}
.dot.on{background:var(--success)}
.dot.off{background:var(--danger)}
.dot.wait{background:var(--warning)}
.btn{
  border:none;
  border-radius:12px;
  padding:10px 16px;
  cursor:pointer;
  transition:.2s ease;
}
.btn:hover{transform:translateY(-1px)}
.btn:disabled{opacity:.55;cursor:not-allowed;transform:none}
.btn-primary{
  color:#fff;
  background:linear-gradient(135deg,var(--accent),var(--accent-strong));
}
.btn-secondary{
  color:var(--text);
  border:1px solid var(--line);
  background:color-mix(in srgb,var(--surface-soft) 88%,transparent);
}
.btn-success{
  color:#04110e;
  background:linear-gradient(135deg,#2dd4bf,var(--success));
}
.btn-danger{
  color:#fff;
  background:linear-gradient(135deg,#fb7185,var(--danger));
}
.btn-sm{padding:8px 12px;font-size:12px}
.table-shell{
  overflow:auto;
  border-radius:16px;
  border:1px solid var(--line);
  background:color-mix(in srgb,var(--surface-soft) 92%,transparent);
}
.table{width:100%;min-width:920px;border-collapse:collapse}
.table th,.table td{
  padding:12px 14px;
  border-bottom:1px solid var(--line);
  text-align:left;
  font-size:13px;
  vertical-align:middle;
}
.table th{
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.08em;
  color:var(--muted);
  background:rgba(255,255,255,.02);
}
.table tbody tr:hover{background:rgba(255,255,255,.03)}
.table tbody tr:last-child td{border-bottom:none}
.table strong{font-size:14px}
.pill{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:5px 10px;
  border-radius:999px;
  border:1px solid var(--line);
  font-size:12px;
}
.pill.on{color:var(--success);background:rgba(45,212,191,.12)}
.pill.off{color:var(--muted);background:rgba(148,163,184,.08)}
.mono{
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}
.field-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:14px}
.field-control,.toolbar select,.sidebar-footer select,input,textarea,select{
  width:100%;
  border-radius:12px;
  border:1px solid var(--line);
  background:color-mix(in srgb,var(--surface-strong) 88%,transparent);
  color:var(--text);
  padding:10px 12px;
}
textarea{min-height:140px;resize:vertical}
.field-control.inline{display:flex;align-items:center;gap:8px}
.field-control.inline input{width:auto}
.switch-row input,.check input{width:auto}
.toggle-switch{
  display:inline-flex;
  align-items:center;
  gap:10px;
  cursor:pointer;
  user-select:none;
}
.toggle-switch input{
  position:absolute;
  opacity:0;
  pointer-events:none;
}
.toggle-track{
  position:relative;
  width:48px;
  height:28px;
  border-radius:999px;
  border:1px solid var(--line);
  background:color-mix(in srgb,var(--surface-muted) 88%,transparent);
  transition:.2s ease;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.03);
}
.toggle-track::after{
  content:'';
  position:absolute;
  top:3px;
  left:3px;
  width:20px;
  height:20px;
  border-radius:999px;
  background:#fff;
  box-shadow:0 4px 12px rgba(15,23,42,.2);
  transition:.2s ease;
}
.toggle-switch input:checked + .toggle-track{
  background:linear-gradient(135deg,var(--accent),var(--accent-strong));
  border-color:transparent;
}
.toggle-switch input:checked + .toggle-track::after{
  transform:translateX(20px);
}
.toggle-text{
  font-size:13px;
  color:var(--text);
}
.weekday-list{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.weekday-item{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:8px 10px;
  border:1px solid var(--line);
  border-radius:999px;
  background:color-mix(in srgb,var(--surface-soft) 88%,transparent);
  font-size:12px;
}
.loading,.empty{
  padding:26px 14px;
  text-align:center;
  color:var(--muted);
}
.status-note{
  padding:14px 16px;
  border-radius:16px;
  border:1px dashed var(--line);
  background:rgba(255,255,255,.02);
  color:var(--muted);
  font-size:13px;
  line-height:1.7;
}
.log-box{
  min-height:280px;
  max-height:62vh;
  overflow:auto;
  border-radius:16px;
  border:1px solid var(--line);
  background:color-mix(in srgb,var(--surface-strong) 92%,transparent);
  padding:14px;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:12px;
  line-height:1.8;
}
.log-line .time{color:var(--muted)}
.log-line .cat{color:var(--accent)}
.toast{
  position:fixed;
  top:22px;
  right:22px;
  min-width:220px;
  max-width:420px;
  padding:12px 16px;
  border-radius:12px;
  color:#fff;
  display:none;
  z-index:99;
  box-shadow:var(--shadow);
}
.topbar-actions .btn,.sidebar-footer .btn{white-space:nowrap}
@media (max-width:1120px){
  .hero,.grid.two,.grid.three,.field-grid{grid-template-columns:1fr}
}
@media (max-width:860px){
  .app-shell{display:block}
  .sidebar{
    width:auto;
    height:auto;
    position:static;
    border-right:none;
    border-bottom:1px solid var(--line);
  }
  .content-shell{padding:16px}
  .topbar{padding:20px 18px;flex-direction:column}
  .topbar-actions{justify-content:flex-start}
  .nav-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:560px){
  .nav-list{grid-template-columns:1fr}
  .topbar h2{font-size:21px}
}
</style>
</head>
<body data-theme="dark">
<div class="app-shell">
  <aside class="sidebar">
    <div class="brand">
      <h1>斗鱼粉丝牌续牌</h1>
      <p>粉丝牌驱动的 Docker 管理台。<br>登录与领取、保活赠送、双倍赠送三条任务线并行运作。</p>
    </div>
    <div class="nav-list">
      <button class="nav-btn active" data-tab="overview" onclick="switchTab('overview', this)">概览</button>
      <button class="nav-btn" data-tab="cookie" onclick="switchTab('cookie', this)">登录与领取</button>
      <button class="nav-btn" data-tab="keepalive" onclick="switchTab('keepalive', this)">保活赠送</button>
      <button class="nav-btn" data-tab="double-card" onclick="switchTab('double-card', this)">双倍赠送</button>
      <button class="nav-btn" data-tab="medals" onclick="switchTab('medals', this)">粉丝牌同步</button>
      <button class="nav-btn" data-tab="logs" onclick="switchTab('logs', this)">运行日志</button>
    </div>
    <div class="sidebar-footer">
      <label for="theme-mode">主题模式</label>
      <select id="theme-mode" onchange="handleThemeChange()">
        <option value="system">跟随系统</option>
        <option value="light">浅色</option>
        <option value="dark">深色</option>
      </select>
      <div class="theme-hint" id="theme-hint">当前主题由配置加载。</div>
    </div>
  </aside>

  <div class="content-shell">
    <header class="topbar">
      <div>
        <h2 id="page-title">概览</h2>
        <p id="page-subtitle">先确认登录、领取、保活、双倍和粉丝牌同步是否都在预期状态。</p>
      </div>
      <div class="topbar-actions">
        <button class="btn btn-secondary" onclick="syncManagedState(true)">同步粉丝牌</button>
        <button class="btn btn-secondary" onclick="loadOverview()">刷新概览</button>
      </div>
    </header>

    <main>
      <section id="overview" class="tab active">
        <div class="hero">
          <div class="hero-card">
            <div class="section-header">
              <div>
                <h3>系统就绪状态</h3>
                <p>优先确认登录状态、任务就绪度和当前展示的时区语义。</p>
              </div>
            </div>
            <div class="grid three">
              <div class="metric">
                <div class="metric-label">系统就绪</div>
                <div class="metric-value" id="metric-ready">-</div>
                <div class="metric-hint" id="metric-ready-hint">加载中...</div>
              </div>
              <div class="metric">
                <div class="metric-label">登录状态</div>
                <div class="metric-value" id="metric-cookie">-</div>
                <div class="metric-hint" id="metric-cookie-hint">加载中...</div>
              </div>
              <div class="metric">
                <div class="metric-label">显示时区</div>
                <div class="metric-value" id="metric-timezone">-</div>
                <div class="metric-hint" id="metric-timezone-hint">加载中...</div>
              </div>
            </div>
            <div class="badge-row" id="overview-badges" style="margin-top:14px"></div>
            <div class="quick-actions" style="margin-top:16px">
              <button class="btn btn-primary" onclick="switchTab('cookie', findTabButton('cookie'))">管理登录与领取</button>
              <button class="btn btn-secondary" id="trigger-collect-btn" onclick="trigger('collectGift')">手动领取</button>
              <button class="btn btn-secondary" id="trigger-keepalive-btn" onclick="trigger('keepalive')">手动执行保活</button>
              <button class="btn btn-secondary" id="trigger-double-btn" onclick="trigger('doubleCard')">手动执行双倍</button>
            </div>
          </div>
          <div class="hero-card">
            <div class="section-header">
              <div>
                <h3>粉丝牌同步</h3>
                <p>保活与双倍围绕同一份粉丝牌列表自动对齐，领取任务独立运行。</p>
              </div>
            </div>
            <div class="badge-row" id="sync-summary"></div>
            <div class="status-note" id="sync-note" style="margin-top:14px">正在加载同步状态...</div>
          </div>
        </div>

        <div class="grid three">
          <div class="panel">
            <div class="section-header">
              <div>
                <h2>领取任务</h2>
                <p>独立负责领取荧光棒，不再嵌入保活或双倍执行链路。</p>
              </div>
            </div>
            <div class="badge-row" id="collect-badge"></div>
            <div class="meta-text" id="collect-meta" style="margin-top:12px">加载中...</div>
          </div>
          <div class="panel">
            <div class="section-header">
              <div>
                <h2>保活赠送</h2>
                <p>保活房间始终与当前粉丝牌列表同步，只负责赠送，不再负责领取。</p>
              </div>
            </div>
            <div class="badge-row" id="keepalive-badge"></div>
            <div class="meta-text" id="keepalive-meta" style="margin-top:12px">加载中...</div>
          </div>
          <div class="panel">
            <div class="section-header">
              <div>
                <h2>双倍赠送</h2>
                <p>在同一份粉丝牌列表上控制参与检测和赠送的房间，也不再负责领取。</p>
              </div>
            </div>
            <div class="badge-row" id="double-badge"></div>
            <div class="meta-text" id="double-meta" style="margin-top:12px">加载中...</div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <div>
              <h2>最近日志</h2>
              <p>保留最近的系统、领取、保活与双倍日志。</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="switchTab('logs', findTabButton('logs'))">查看全部</button>
          </div>
          <div class="log-box" id="overview-logs"></div>
        </div>
      </section>

      <section id="cookie" class="tab">
        <div class="section">
          <div class="section-header">
            <div>
              <h2>登录信息</h2>
              <p>先保存 Cookie，后续领取、保活、双倍和粉丝牌同步都会基于它运行。</p>
            </div>
          </div>
          <label class="helper-label" for="cookie">斗鱼 Cookie</label>
          <textarea id="cookie" class="mono" placeholder="粘贴斗鱼 Cookie..."></textarea>
          <div class="helper-note" style="margin-top:10px">保存成功后，可以直接在本页配置领取任务，或去保活、双倍、粉丝牌同步页面继续配置。</div>
          <div class="quick-actions" style="margin-top:14px">
            <button class="btn btn-success" onclick="saveCookie()">保存 Cookie</button>
          </div>
        </div>
        <div class="section">
          <div class="section-header">
            <div>
              <h2>领取任务</h2>
              <p>领取荧光棒改为独立全局任务，使用单独 cron，不再由保活或双倍执行时顺手领取。</p>
            </div>
            <div class="quick-actions">
              <button class="btn btn-secondary btn-sm" onclick="trigger('collectGift')">立即领取</button>
            </div>
          </div>
          <div id="collect-summary" class="badge-row"></div>
          <div id="collect-editor" style="margin-top:16px"></div>
        </div>
      </section>

      <section id="keepalive" class="tab">
        <div class="section">
          <div class="section-header">
            <div>
              <h2>保活赠送</h2>
              <p>房间列表始终来自粉丝牌。已有房间保留原分配值，新房间自动拿默认值；赠送时机固定跟随执行。</p>
            </div>
            <div class="quick-actions">
              <button class="btn btn-secondary btn-sm" onclick="syncManagedState(true)">刷新粉丝牌并同步</button>
            </div>
          </div>
          <div id="keepalive-summary" class="badge-row"></div>
          <div id="keepalive-editor" style="margin-top:16px"></div>
        </div>
      </section>

      <section id="double-card" class="tab">
        <div class="section">
          <div class="section-header">
            <div>
              <h2>双倍赠送</h2>
              <p>按粉丝牌逐项勾选参与双倍检测和赠送的房间，同时保留双倍独立的 cron 和分配逻辑。</p>
            </div>
            <div class="quick-actions">
              <button class="btn btn-secondary btn-sm" onclick="syncManagedState(true)">刷新粉丝牌并同步</button>
            </div>
          </div>
          <div id="double-summary" class="badge-row"></div>
          <div id="double-editor" style="margin-top:16px"></div>
        </div>
      </section>

      <section id="medals" class="tab">
        <div class="section">
          <div class="section-header">
            <div>
              <h2>粉丝牌同步</h2>
              <p>展示当前粉丝牌列表和双倍状态，同时作为保活/双倍房间配置的来源。</p>
            </div>
            <div class="quick-actions">
              <button class="btn btn-secondary btn-sm" onclick="loadFanStatusPage(true)">刷新状态</button>
            </div>
          </div>
          <div class="table-meta" id="fans-status-meta"></div>
          <div class="table-shell" style="margin-top:14px">
            <div id="fans-status-loading" class="loading" style="display:none">正在加载粉丝牌状态...</div>
            <div id="fans-status-empty" class="empty" style="display:none"></div>
            <table id="fans-status-table" class="table" style="display:none">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>主播名称</th>
                  <th>房间号</th>
                  <th>粉丝牌等级</th>
                  <th>粉丝牌排名</th>
                  <th>今日亲密度</th>
                  <th>亲密度</th>
                  <th>双倍状态</th>
                </tr>
              </thead>
              <tbody id="fans-status-body"></tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="logs" class="tab">
        <div class="section">
          <div class="section-header">
            <div>
              <h2>运行日志</h2>
              <p>实时查看系统、领取、保活和双倍执行记录。</p>
            </div>
          </div>
          <div class="toolbar">
            <div class="check">
              <input type="checkbox" id="auto-refresh" checked>
              <label for="auto-refresh" style="margin:0">自动刷新</label>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="loadLogs()">手动刷新</button>
            <button class="btn btn-danger btn-sm" onclick="clearLogs()">清空日志</button>
          </div>
          <div class="log-box" id="log-box" style="margin-top:12px"></div>
        </div>
      </section>
    </main>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
const PAGE_META={
  overview:{title:'概览',subtitle:'先确认登录、领取、保活、双倍和粉丝牌同步是否都在预期状态。'},
  cookie:{title:'登录与领取',subtitle:'保存登录 Cookie，并配置独立的领取任务。'},
  keepalive:{title:'保活赠送',subtitle:'房间跟随粉丝牌同步，固定按执行时机直接赠送。'},
  'double-card':{title:'双倍赠送',subtitle:'在粉丝牌列表上勾选参与双倍检测和赠送的房间，并维护独立分配。'},
  medals:{title:'粉丝牌同步',subtitle:'查看当前粉丝牌列表、双倍状态和同步结果。'},
  logs:{title:'运行日志',subtitle:'观察系统、领取、保活和双倍任务的最新执行情况。'},
};

const DISPLAY_TIMEZONE='Asia/Shanghai';
const dateFormatter=new Intl.DateTimeFormat('zh-CN',{
  timeZone:DISPLAY_TIMEZONE,
  year:'numeric',
  month:'2-digit',
  day:'2-digit',
  hour:'2-digit',
  minute:'2-digit',
  second:'2-digit',
  hour12:false,
});

function getSystemThemeMedia(){
  if(typeof window.matchMedia!=='function'){
    return null;
  }

  try{
    return window.matchMedia('(prefers-color-scheme: dark)');
  }catch(_error){
    return null;
  }
}

const state={
  overview:null,
  rawConfig:null,
  managed:null,
  managedLoading:false,
  fansStatus:[],
  fansStatusLoaded:false,
  fansStatusLoading:false,
  fansStatusLastLoadedAt:null,
  themeMode:'system',
};

const systemTheme=getSystemThemeMedia();

function escapeHtml(value){
  return String(value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function toast(message,ok){
  const node=document.getElementById('toast');
  node.textContent=message;
  node.style.display='block';
  node.style.background=ok
    ? 'linear-gradient(135deg,#22c55e,#0f9b73)'
    : 'linear-gradient(135deg,#fb7185,#d14343)';
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>{node.style.display='none';},3000);
}

function formatDate(value){
  if(!value){
    return '无';
  }
  const date=new Date(value);
  if(Number.isNaN(date.getTime())){
    return String(value);
  }
  return dateFormatter.format(date).replace(/\//g,'-');
}

function findTabButton(name){
  return document.querySelector('.nav-btn[data-tab="'+name+'"]');
}

function switchTab(name,button){
  document.querySelectorAll('.tab').forEach(tab=>tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(item=>item.classList.remove('active'));
  document.getElementById(name).classList.add('active');
  if(button){
    button.classList.add('active');
  }

  const meta=PAGE_META[name];
  document.getElementById('page-title').textContent=meta.title;
  document.getElementById('page-subtitle').textContent=meta.subtitle;

  if(name==='keepalive' || name==='double-card'){
    syncManagedState(false);
  }
  if(name==='medals'){
    loadFanStatusPage(true);
  }
  if(name==='logs'){
    loadLogs();
  }
}

function renderBadges(items,targetId){
  const target=document.getElementById(targetId);
  target.innerHTML=items.map(item=>{
    return '<span class="badge"><span class="dot '+item.dot+'"></span>'+escapeHtml(item.label)+'</span>';
  }).join('');
}

function renderLogs(logs,targetId,scrollToBottom){
  const box=document.getElementById(targetId);
  if(!logs.length){
    box.innerHTML='<div class="empty">暂无日志</div>';
    return;
  }
  box.innerHTML=logs.map(log=>{
    return '<div class="log-line"><span class="time">'+escapeHtml(formatDate(log.timestamp))+'</span> <span class="cat">['+escapeHtml(log.category)+']</span> '+escapeHtml(log.message)+'</div>';
  }).join('');
  if(scrollToBottom){
    box.scrollTop=box.scrollHeight;
  }
}

function createDefaultCollectGiftConfig(){
  return {
    cron:'0 0 0 * * *',
  };
}

function createDefaultKeepaliveConfig(fans){
  const send={};
  fans.forEach(fan=>{
    send[String(fan.roomId)]={roomId:fan.roomId,giftId:268,number:0,percentage:1,count:0};
  });
  return {
    cron:'0 0 8 */6 * *',
    model:1,
    send,
  };
}

function createDefaultDoubleCardConfig(fans){
  const send={};
  const enabled={};
  fans.forEach(fan=>{
    send[String(fan.roomId)]={roomId:fan.roomId,giftId:268,number:0,percentage:1,count:0};
    enabled[String(fan.roomId)]=false;
  });
  return {
    cron:'0 0 */4 * * *',
    model:1,
    send,
    enabled,
  };
}

function getCollectGiftDraft(){
  return state.rawConfig?.collectGift || createDefaultCollectGiftConfig();
}

function getKeepaliveDraft(){
  const fans=state.managed?.fans || [];
  const config=state.managed?.config?.keepalive;
  if(config){
    return config;
  }
  return createDefaultKeepaliveConfig(fans);
}

function getDoubleCardDraft(){
  const fans=state.managed?.fans || [];
  const config=state.managed?.config?.doubleCard;
  if(config){
    return {
      ...config,
      enabled:config.enabled || {},
    };
  }
  return createDefaultDoubleCardConfig(fans);
}

function getSendValue(sendItem,model){
  if(!sendItem){
    return 1;
  }
  return model===1 ? sendItem.percentage : sendItem.number;
}

function renderCollectGiftEditor(){
  const target=document.getElementById('collect-editor');
  const enabled=Boolean(state.rawConfig?.collectGift);
  const config=getCollectGiftDraft();
  const status=state.overview?.status?.collectGift;
  const cookieSaved=Boolean(state.rawConfig?.cookie);

  renderBadges([
    {label:enabled?'领取已启用':'领取未启用',dot:enabled?'on':'off'},
    {label:cookieSaved?'登录已保存':'待保存登录',dot:cookieSaved?'on':'wait'},
    {label:status?.running?'调度运行中':'调度未运行',dot:status?.running?'on':(enabled?'wait':'off')},
  ],'collect-summary');

  target.innerHTML=''
    +'<div class="switch-row">'
    +'  <label class="toggle-switch" for="cg-enable"><input type="checkbox" id="cg-enable"'+(enabled?' checked':'')+'><span class="toggle-track"></span><span class="toggle-text">启用领取任务</span></label>'
    +'  <div class="status-note">'+(cookieSaved ? '领取任务会按独立 cron 运行，并单独记录状态与日志。' : '可以先保存领取 cron，但任务要在 Cookie 保存后才会真正启动。')+'</div>'
    +'</div>'
    +'<div id="collect-fields"'+(enabled?'':' style="display:none"')+'>'
    +'  <div class="field-grid">'
    +'    <div><label class="field-label" for="cg-cron">Cron 表达式</label><input id="cg-cron" class="field-control mono" value="'+escapeHtml(config.cron || '0 0 0 * * *')+'"></div>'
    +'    <div><label class="field-label">执行时区</label><div class="status-note">所有 Docker 调度和页面时间统一按 '+DISPLAY_TIMEZONE+' 展示。</div></div>'
    +'    <div><label class="field-label">任务说明</label><div class="status-note">领取任务只负责把荧光棒领到账号，不直接执行赠送。</div></div>'
    +'  </div>'
    +'  <div class="helper-note" style="margin-top:12px">默认 cron 为每天一次。你也可以按自己的节奏调整领取频率。</div>'
    +'  <div class="quick-actions" style="margin-top:14px"><button class="btn btn-success" onclick="saveCollectGift()">保存领取配置</button></div>'
    +'</div>';

  document.getElementById('cg-enable').onchange=function(){
    document.getElementById('collect-fields').style.display=this.checked ? '' : 'none';
  };
}

function renderKeepaliveEditor(){
  const target=document.getElementById('keepalive-editor');
  const fans=state.managed?.fans || [];
  const config=getKeepaliveDraft();
  const enabled=Boolean(state.rawConfig?.keepalive || state.managed?.config?.keepalive);

  renderBadges([
    {label:enabled?'保活已启用':'保活未启用',dot:enabled?'on':'off'},
    {label:'粉丝牌房间 '+fans.length,dot:fans.length?'on':'wait'},
    {label:config.model===1?'按百分比':'按固定数量',dot:'wait'},
  ],'keepalive-summary');

  if(!state.rawConfig?.cookie){
    target.innerHTML='<div class="status-note">请先在登录与领取页面保存 Cookie，随后这里会自动获取粉丝牌并生成保活房间列表。</div>';
    return;
  }

  if(state.managedLoading){
    target.innerHTML='<div class="loading">正在同步粉丝牌与保活配置...</div>';
    return;
  }

  if(!fans.length){
    target.innerHTML='<div class="status-note">当前没有可用粉丝牌。同步后若列表为空，保活配置也会保持空房间集。</div>';
    return;
  }

  const rows=fans.map((fan,index)=>{
    const sendItem=config.send[String(fan.roomId)];
    return '<tr>'
      +'<td>'+(index + 1)+'</td>'
      +'<td><strong>'+escapeHtml(fan.name)+'</strong></td>'
      +'<td class="mono">'+escapeHtml(fan.roomId)+'</td>'
      +'<td>'+escapeHtml(fan.level)+'</td>'
      +'<td>'+escapeHtml(fan.rank)+'</td>'
      +'<td>'+escapeHtml(fan.today)+'</td>'
      +'<td>'+escapeHtml(fan.intimacy)+'</td>'
      +'<td><input type="number" class="field-control ka-value" data-room-id="'+escapeHtml(fan.roomId)+'" value="'+escapeHtml(getSendValue(sendItem,config.model))+'"></td>'
      +'</tr>';
  }).join('');

  target.innerHTML=''
    +'<div class="switch-row">'
    +'  <label class="toggle-switch" for="ka-enable"><input type="checkbox" id="ka-enable"'+(enabled?' checked':'')+'><span class="toggle-track"></span><span class="toggle-text">启用保活任务</span></label>'
    +'  <div class="status-note">保活房间来源固定为粉丝牌列表，不再手动添加或删除；赠送时机固定跟随执行。</div>'
    +'</div>'
    +'<div id="keepalive-fields"'+(enabled?'':' style="display:none"')+'>'
    +'  <div class="field-grid">'
    +'    <div><label class="field-label" for="ka-cron">Cron 表达式</label><input id="ka-cron" class="field-control mono" value="'+escapeHtml(config.cron || '0 0 8 */6 * *')+'"></div>'
    +'    <div><label class="field-label" for="ka-model">分配模式</label><select id="ka-model" class="field-control" onchange="renderKeepaliveEditor()"><option value="1"'+(config.model===1?' selected':'')+'>按百分比</option><option value="2"'+(config.model===2?' selected':'')+'>按固定数量</option></select></div>'
    +'    <div><label class="field-label">赠送时机</label><div class="status-note">固定跟随保活任务执行，不再提供自定义日期。</div></div>'
    +'  </div>'
    +'  <div class="helper-note" style="margin-top:12px">默认 cron 为每 6 天 08:00 执行一次。旧房间保持原分配值；新增房间默认值：固定数量为 1，百分比为 1%。</div>'
    +'  <div class="table-shell" style="margin-top:14px">'
    +'    <table class="table">'
    +'      <thead><tr><th>序号</th><th>主播名称</th><th>房间号</th><th>等级</th><th>排名</th><th>今日亲密度</th><th>亲密度</th><th>'+(config.model===1?'百分比':'数量')+'</th></tr></thead>'
    +'      <tbody>'+rows+'</tbody>'
    +'    </table>'
    +'  </div>'
    +'  <div class="quick-actions" style="margin-top:14px"><button class="btn btn-success" onclick="saveKeepalive()">保存保活配置</button></div>'
    +'</div>';

  document.getElementById('ka-enable').onchange=function(){
    document.getElementById('keepalive-fields').style.display=this.checked ? '' : 'none';
  };
}

function renderDoubleCardEditor(){
  const target=document.getElementById('double-editor');
  const fans=state.managed?.fans || [];
  const config=getDoubleCardDraft();
  const enabled=Boolean(state.rawConfig?.doubleCard || state.managed?.config?.doubleCard);
  const enabledCount=fans.filter(fan=>Boolean(config.enabled?.[String(fan.roomId)])).length;

  renderBadges([
    {label:enabled?'双倍已启用':'双倍未启用',dot:enabled?'on':'off'},
    {label:'已勾选 '+enabledCount+' / '+fans.length,dot:enabledCount?'on':'wait'},
    {label:config.model===1?'按百分比':'按固定数量',dot:'wait'},
  ],'double-summary');

  if(!state.rawConfig?.cookie){
    target.innerHTML='<div class="status-note">请先保存 Cookie，随后这里会自动获取粉丝牌并同步双倍配置。</div>';
    return;
  }

  if(state.managedLoading){
    target.innerHTML='<div class="loading">正在同步粉丝牌与双倍配置...</div>';
    return;
  }

  if(!fans.length){
    target.innerHTML='<div class="status-note">当前没有可用粉丝牌。双倍房间集会跟随粉丝牌列表自动变化。</div>';
    return;
  }

  const rows=fans.map((fan,index)=>{
    const sendItem=config.send[String(fan.roomId)];
    const checked=config.enabled?.[String(fan.roomId)] ? ' checked' : '';
    return '<tr>'
      +'<td>'+(index + 1)+'</td>'
      +'<td><input type="checkbox" class="dc-enabled" data-room-id="'+escapeHtml(fan.roomId)+'"'+checked+'></td>'
      +'<td><strong>'+escapeHtml(fan.name)+'</strong></td>'
      +'<td class="mono">'+escapeHtml(fan.roomId)+'</td>'
      +'<td>'+escapeHtml(fan.level)+'</td>'
      +'<td>'+escapeHtml(fan.rank)+'</td>'
      +'<td>'+escapeHtml(fan.today)+'</td>'
      +'<td>'+escapeHtml(fan.intimacy)+'</td>'
      +'<td><input type="number" class="field-control dc-value" data-room-id="'+escapeHtml(fan.roomId)+'" value="'+escapeHtml(getSendValue(sendItem,config.model))+'"></td>'
      +'</tr>';
  }).join('');

  target.innerHTML=''
    +'<div class="switch-row">'
    +'  <label class="toggle-switch" for="dc-enable"><input type="checkbox" id="dc-enable"'+(enabled?' checked':'')+'><span class="toggle-track"></span><span class="toggle-text">启用双倍任务</span></label>'
    +'  <div class="status-note">勾选表示该房间参与双倍检测，也参与检测到双倍后的赠送候选集。</div>'
    +'</div>'
    +'<div id="double-fields"'+(enabled?'':' style="display:none"')+'>'
    +'  <div class="field-grid">'
    +'    <div><label class="field-label" for="dc-cron">Cron 表达式</label><input id="dc-cron" class="field-control mono" value="'+escapeHtml(config.cron || '0 0 */4 * * *')+'"></div>'
    +'    <div><label class="field-label" for="dc-model">分配模式</label><select id="dc-model" class="field-control" onchange="renderDoubleCardEditor()"><option value="1"'+(config.model===1?' selected':'')+'>按百分比</option><option value="2"'+(config.model===2?' selected':'')+'>按固定数量</option></select></div>'
    +'    <div><label class="field-label">同步规则</label><div class="status-note">旧房间保留原勾选和分配值，新房间默认未勾选。</div></div>'
    +'  </div>'
    +'  <div class="table-shell" style="margin-top:14px">'
    +'    <table class="table">'
    +'      <thead><tr><th>序号</th><th>参与</th><th>主播名称</th><th>房间号</th><th>等级</th><th>排名</th><th>今日亲密度</th><th>亲密度</th><th>'+(config.model===1?'百分比':'数量')+'</th></tr></thead>'
    +'      <tbody>'+rows+'</tbody>'
    +'    </table>'
    +'  </div>'
    +'  <div class="quick-actions" style="margin-top:14px"><button class="btn btn-success" onclick="saveDoubleCard()">保存双倍配置</button></div>'
    +'</div>';

  document.getElementById('dc-enable').onchange=function(){
    document.getElementById('double-fields').style.display=this.checked ? '' : 'none';
  };
}

function renderSyncSummary(){
  const config=state.managed?.config || state.rawConfig || {};
  const fans=state.managed?.fans || [];
  const keepaliveRooms=config.keepalive ? Object.keys(config.keepalive.send || {}).length : 0;
  const doubleRooms=config.doubleCard ? Object.keys(config.doubleCard.send || {}).length : 0;
  const enabledCount=config.doubleCard?.enabled
    ? Object.values(config.doubleCard.enabled).filter(Boolean).length
    : 0;

  renderBadges([
    {label:'粉丝牌 '+fans.length,dot:fans.length?'on':'wait'},
    {label:config.collectGift?'领取独立运行':'未启用领取',dot:config.collectGift?'on':'off'},
    {label:'保活房间 '+keepaliveRooms,dot:config.keepalive?'on':'off'},
    {label:'双倍房间 '+doubleRooms,dot:config.doubleCard?'on':'off'},
    {label:'双倍勾选 '+enabledCount,dot:enabledCount?'on':'wait'},
  ],'sync-summary');

  if(!state.rawConfig?.cookie){
    document.getElementById('sync-note').textContent='请先保存 Cookie，之后保活和双倍配置会随粉丝牌列表自动同步。';
    return;
  }

  if(state.managedLoading){
    document.getElementById('sync-note').textContent='正在同步粉丝牌列表与任务配置...';
    return;
  }

  document.getElementById('sync-note').textContent='同步规则：领取任务独立运行；保活房间始终跟随粉丝牌列表；双倍保留旧勾选和分配；新房间默认未勾选；消失房间自动移除。';
}

async function loadRawConfig(){
  try{
    const response=await fetch('/api/config/raw');
    const data=await response.json();
    state.rawConfig=data.exists ? data.data : {cookie:'',ui:{themeMode:'system'},collectGift:createDefaultCollectGiftConfig()};
    document.getElementById('cookie').value=state.rawConfig.cookie || '';
    applyThemeMode(state.rawConfig.ui?.themeMode || 'system',false);
    renderCollectGiftEditor();
    renderKeepaliveEditor();
    renderDoubleCardEditor();
    renderSyncSummary();
  }catch(error){
    toast('加载配置失败: '+error.message,false);
  }
}

async function loadOverview(){
  try{
    const response=await fetch('/api/overview');
    const data=await response.json();
    state.overview=data;

    document.getElementById('metric-ready').textContent=data.ready ? '已就绪' : '待配置';
    document.getElementById('metric-ready-hint').textContent=data.ready ? '登录与至少一个任务已具备运行条件' : '仍有关键配置未完成';
    document.getElementById('metric-cookie').textContent=data.cookieSaved ? '已保存' : '未保存';
    document.getElementById('metric-cookie-hint').textContent=data.cookieSaved ? 'Cookie 已保存，可继续同步粉丝牌和运行任务' : '请先在登录与领取页保存 Cookie';
    document.getElementById('metric-timezone').textContent='上海';
    document.getElementById('metric-timezone-hint').textContent='页面时间和 Docker 调度统一按 '+(data.timezone || DISPLAY_TIMEZONE);

    renderBadges([
      {label:data.cookieSaved ? 'Cookie 已保存' : 'Cookie 未保存',dot:data.cookieSaved ? 'on' : 'off'},
      {label:data.collectGiftConfigured ? '领取已配置' : '领取未配置',dot:data.collectGiftConfigured ? 'on' : 'wait'},
      {label:data.keepaliveConfigured ? '保活已配置' : '保活未配置',dot:data.keepaliveConfigured ? 'on' : 'wait'},
      {label:data.doubleCardConfigured ? '双倍已配置' : '双倍未配置',dot:data.doubleCardConfigured ? 'on' : 'wait'},
      {label:data.ready ? '系统可运行' : '待完成配置',dot:data.ready ? 'on' : 'wait'},
    ],'overview-badges');

    renderBadges([
      {label:data.status.collectGift.running ? '运行中' : '未运行',dot:data.status.collectGift.running ? 'on' : (data.collectGiftConfigured ? 'wait' : 'off')},
    ],'collect-badge');

    document.getElementById('collect-meta').innerHTML=
      '配置状态: '+(data.collectGiftConfigured ? '已配置' : '未配置')+'<br>'
      +'上次执行: '+escapeHtml(formatDate(data.status.collectGift.lastRun))+'<br>'
      +'下次执行: '+escapeHtml(formatDate(data.status.collectGift.nextRun))+'<br>'
      +'任务职责: 独立领取，不直接赠送';

    renderBadges([
      {label:data.status.keepalive.running ? '运行中' : '未运行',dot:data.status.keepalive.running ? 'on' : (data.keepaliveConfigured ? 'wait' : 'off')},
    ],'keepalive-badge');

    document.getElementById('keepalive-meta').innerHTML=
      '配置状态: '+(data.keepaliveConfigured ? '已配置' : '未配置')+'<br>'
      +'房间数: '+data.keepaliveRooms+'<br>'
      +'上次执行: '+escapeHtml(formatDate(data.status.keepalive.lastRun))+'<br>'
      +'下次执行: '+escapeHtml(formatDate(data.status.keepalive.nextRun));

    renderBadges([
      {label:data.status.doubleCard.running ? '运行中' : '未运行',dot:data.status.doubleCard.running ? 'on' : (data.doubleCardConfigured ? 'wait' : 'off')},
    ],'double-badge');

    document.getElementById('double-meta').innerHTML=
      '配置状态: '+(data.doubleCardConfigured ? '已配置' : '未配置')+'<br>'
      +'房间数: '+data.doubleCardRooms+'<br>'
      +'上次执行: '+escapeHtml(formatDate(data.status.doubleCard.lastRun))+'<br>'
      +'下次执行: '+escapeHtml(formatDate(data.status.doubleCard.nextRun));

    document.getElementById('trigger-collect-btn').disabled=!data.cookieSaved || !data.collectGiftConfigured;
    document.getElementById('trigger-keepalive-btn').disabled=!data.cookieSaved || !data.keepaliveConfigured;
    document.getElementById('trigger-double-btn').disabled=!data.cookieSaved || !data.doubleCardConfigured;

    renderCollectGiftEditor();
    renderLogs(data.recentLogs || [],'overview-logs',false);
  }catch(error){
    toast('加载概览失败: '+error.message,false);
  }
}

async function syncManagedState(showToast){
  if(state.managedLoading){
    return;
  }

  if(!state.rawConfig?.cookie){
    renderCollectGiftEditor();
    renderKeepaliveEditor();
    renderDoubleCardEditor();
    renderSyncSummary();
    if(showToast){
      toast('请先保存 Cookie',false);
    }
    return;
  }

  state.managedLoading=true;
  renderCollectGiftEditor();
  renderKeepaliveEditor();
  renderDoubleCardEditor();
  renderSyncSummary();

  try{
    const response=await fetch('/api/fans/reconcile',{method:'POST'});
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '同步失败');
    }
    state.managed=data;
    state.rawConfig=data.config;
    if(document.getElementById('cookie')){
      document.getElementById('cookie').value=data.config.cookie || '';
    }
    renderCollectGiftEditor();
    renderKeepaliveEditor();
    renderDoubleCardEditor();
    renderSyncSummary();
    await loadOverview();
    if(showToast){
      toast('粉丝牌与任务配置已同步',true);
    }
  }catch(error){
    renderCollectGiftEditor();
    renderKeepaliveEditor();
    renderDoubleCardEditor();
    renderSyncSummary();
    if(showToast){
      toast('同步粉丝牌失败: '+error.message,false);
    }
  }finally{
    state.managedLoading=false;
    renderCollectGiftEditor();
    renderKeepaliveEditor();
    renderDoubleCardEditor();
    renderSyncSummary();
  }
}

async function saveCookie(){
  const cookie=document.getElementById('cookie').value.trim();
  if(!cookie){
    toast('请先填写 Cookie',false);
    return;
  }

  try{
    const response=await fetch('/api/cookie',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({cookie}),
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '保存失败');
    }
    await loadRawConfig();
    await loadOverview();
    await syncManagedState(false);
    toast('Cookie 已保存',true);
  }catch(error){
    toast('保存 Cookie 失败: '+error.message,false);
  }
}

async function saveCollectGift(){
  const enabled=document.getElementById('cg-enable');
  const payload={collectGift:null};

  if(enabled && enabled.checked){
    payload.collectGift={
      cron:document.getElementById('cg-cron').value.trim(),
    };
  }

  try{
    const response=await fetch('/api/config',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '保存失败');
    }
    state.rawConfig=(data.data && data.data.config) ? data.data.config : state.rawConfig;
    await loadRawConfig();
    await loadOverview();
    toast('领取配置已保存',true);
  }catch(error){
    toast('保存领取配置失败: '+error.message,false);
  }
}

async function saveKeepalive(){
  const enabled=document.getElementById('ka-enable');
  const payload={keepalive:null};

  if(enabled && enabled.checked){
    const model=Number(document.getElementById('ka-model').value);
    const send={};
    document.querySelectorAll('.ka-value').forEach(input=>{
      const roomId=Number(input.dataset.roomId);
      const value=Number(input.value);
      send[String(roomId)]={
        roomId,
        giftId:268,
        number:model===2 ? value : 0,
        percentage:model===1 ? value : 0,
        count:0,
      };
    });

    payload.keepalive={
      cron:document.getElementById('ka-cron').value.trim(),
      model,
      send,
    };
  }

  try{
    const response=await fetch('/api/config',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '保存失败');
    }
    state.rawConfig=(data.data && data.data.config) ? data.data.config : state.rawConfig;
    if(data.data && data.data.fans && data.data.fans.length){
      state.managed=data.data;
    }
    await loadRawConfig();
    await loadOverview();
    await syncManagedState(false);
    toast('保活配置已保存',true);
  }catch(error){
    toast('保存保活配置失败: '+error.message,false);
  }
}

async function saveDoubleCard(){
  const enabled=document.getElementById('dc-enable');
  const payload={doubleCard:null};

  if(enabled && enabled.checked){
    const model=Number(document.getElementById('dc-model').value);
    const send={};
    const enabledMap={};

    document.querySelectorAll('.dc-value').forEach(input=>{
      const roomId=Number(input.dataset.roomId);
      const value=Number(input.value);
      send[String(roomId)]={
        roomId,
        giftId:268,
        number:model===2 ? value : 0,
        percentage:model===1 ? value : 0,
        count:0,
      };
    });

    document.querySelectorAll('.dc-enabled').forEach(input=>{
      enabledMap[String(input.dataset.roomId)]=Boolean(input.checked);
    });

    payload.doubleCard={
      cron:document.getElementById('dc-cron').value.trim(),
      model,
      send,
      enabled:enabledMap,
    };
  }

  try{
    const response=await fetch('/api/config',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '保存失败');
    }
    state.rawConfig=(data.data && data.data.config) ? data.data.config : state.rawConfig;
    if(data.data && data.data.fans && data.data.fans.length){
      state.managed=data.data;
    }
    await loadRawConfig();
    await loadOverview();
    await syncManagedState(false);
    toast('双倍配置已保存',true);
  }catch(error){
    toast('保存双倍配置失败: '+error.message,false);
  }
}

function applyThemeMode(mode,persist){
  state.themeMode=mode;
  const prefersDark=Boolean(systemTheme && systemTheme.matches);
  const resolved=mode==='system' ? (prefersDark ? 'dark' : 'light') : mode;
  document.body.setAttribute('data-theme',resolved);
  document.getElementById('theme-mode').value=mode;
  document.getElementById('theme-hint').textContent=
    mode==='system'
      ? '当前跟随系统，系统为 '+(prefersDark ? '深色' : '浅色')
      : (mode==='light' ? '当前固定为浅色模式' : '当前固定为深色模式');

  if(persist){
    saveThemeMode(mode);
  }
}

async function saveThemeMode(mode){
  try{
    const response=await fetch('/api/config',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ui:{themeMode:mode}}),
    });
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '保存失败');
    }
    state.rawConfig=(data.data && data.data.config) ? data.data.config : {...state.rawConfig,ui:{themeMode:mode}};
  }catch(error){
    toast('保存主题失败: '+error.message,false);
  }
}

function handleThemeChange(){
  applyThemeMode(document.getElementById('theme-mode').value,true);
}

if(systemTheme && systemTheme.addEventListener){
  systemTheme.addEventListener('change',()=>{
    if(state.themeMode==='system'){
      applyThemeMode('system',false);
    }
  });
}

function renderFanStatusMeta(){
  const activeCount=state.fansStatus.filter(item=>item.doubleActive).length;
  const lastLoaded=state.fansStatusLastLoadedAt ? formatDate(state.fansStatusLastLoadedAt) : '未加载';
  renderBadges([
    {label:'粉丝牌总数 '+state.fansStatus.length,dot:state.fansStatusLoaded ? 'on' : 'wait'},
    {label:'双倍开启 '+activeCount,dot:activeCount ? 'on' : 'off'},
    {label:'最近刷新 '+lastLoaded,dot:'wait'},
  ],'fans-status-meta');
}

function setFanStatusView(options){
  document.getElementById('fans-status-loading').style.display=options.loading ? '' : 'none';
  document.getElementById('fans-status-empty').style.display=options.empty ? '' : 'none';
  document.getElementById('fans-status-table').style.display=options.table ? '' : 'none';
  if(options.message!==undefined){
    document.getElementById('fans-status-empty').textContent=options.message;
  }
}

function renderFanStatusTable(items){
  const body=document.getElementById('fans-status-body');
  body.innerHTML=items.map((item,index)=>{
    const pillClass=item.doubleActive ? 'pill on' : 'pill off';
    const pillLabel=item.doubleActive ? '双倍中' : '未开启';
    const title=item.doubleActive && item.doubleExpireTime
      ? ' title="有效期至 '+escapeHtml(formatDate(new Date(item.doubleExpireTime * 1000).toISOString()))+'"'
      : '';
    return '<tr>'
      +'<td>'+(index + 1)+'</td>'
      +'<td><strong>'+escapeHtml(item.name)+'</strong></td>'
      +'<td class="mono">'+escapeHtml(item.roomId)+'</td>'
      +'<td>'+escapeHtml(item.level)+'</td>'
      +'<td>'+escapeHtml(item.rank)+'</td>'
      +'<td>'+escapeHtml(item.today)+'</td>'
      +'<td>'+escapeHtml(item.intimacy)+'</td>'
      +'<td><span class="'+pillClass+'"'+title+'>'+pillLabel+'</span></td>'
      +'</tr>';
  }).join('');
}

async function loadFanStatusPage(force){
  if(state.fansStatusLoading){
    return;
  }
  if(state.fansStatusLoaded && !force){
    renderFanStatusMeta();
    return;
  }

  state.fansStatusLoading=true;
  setFanStatusView({loading:true,empty:false,table:false});

  try{
    const response=await fetch('/api/fans/status');
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '加载失败');
    }
    state.fansStatus=data;
    state.fansStatusLoaded=true;
    state.fansStatusLastLoadedAt=new Date().toISOString();
    renderFanStatusMeta();
    if(!data.length){
      setFanStatusView({loading:false,empty:true,table:false,message:'当前没有可展示的粉丝牌数据'});
      return;
    }
    renderFanStatusTable(data);
    setFanStatusView({loading:false,empty:false,table:true});
  }catch(error){
    state.fansStatusLoaded=false;
    renderFanStatusMeta();
    setFanStatusView({loading:false,empty:true,table:false,message:error.message});
  }finally{
    state.fansStatusLoading=false;
  }
}

async function loadLogs(){
  try{
    const response=await fetch('/api/logs');
    const logs=await response.json();
    renderLogs(logs,'log-box',true);
  }catch(error){
    toast('加载日志失败: '+error.message,false);
  }
}

async function clearLogs(){
  await fetch('/api/logs',{method:'DELETE'});
  await loadLogs();
  await loadOverview();
}

async function trigger(type){
  toast('正在执行...',true);
  try{
    const response=await fetch('/api/trigger/'+type,{method:'POST'});
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.error || '执行失败');
    }
    toast('执行完成',true);
    await loadOverview();
    if(document.getElementById('logs').classList.contains('active')){
      await loadLogs();
    }
    if(document.getElementById('medals').classList.contains('active')){
      await loadFanStatusPage(true);
    }
  }catch(error){
    toast('执行失败: '+error.message,false);
  }
}

Promise.all([
  loadRawConfig(),
  loadOverview(),
  loadLogs(),
]).then(()=>{
  syncManagedState(false);
});

setInterval(()=>{
  if(document.getElementById('overview').classList.contains('active')){
    loadOverview();
  }
  if(document.getElementById('logs').classList.contains('active') && document.getElementById('auto-refresh').checked){
    loadLogs();
  }
},5000);
</script>
</body>
</html>`
}

/* ============================================================
   main.js — 博客通用脚本
   ============================================================ */

/* ── 页脚年份自动更新 ── */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── 顶部信号灯开场动画 ── */
(function signalLights() {
  const dots = [
    document.getElementById('sig1'),
    document.getElementById('sig2'),
    document.getElementById('sig3'),
  ];
  if (!dots[0]) return;

  const delays = [600, 900, 1200];
  dots.forEach(function(dot, i) {
    setTimeout(function() {
      if (dot) dot.classList.add('lit');
    }, delays[i]);
  });
})();

/* ── 终端打字效果（首页终端卡片）── */
(function terminalTyping() {
  var out = document.getElementById('termOut');
  if (!out) return;

  // ✏️ 改这里：终端里显示的内容，每行一个字符串
  var lines = [
    '>  ✏️ 终端第一行',
    '>  ✏️ 终端第二行',
    '>  ✏️ 终端第三行',
  ];

  var lineIndex = 0;
  var charIndex = 0;
  var current = '';

  function type() {
    if (lineIndex >= lines.length) return;

    var line = lines[lineIndex];

    if (charIndex < line.length) {
      current += line[charIndex];
      charIndex++;
      out.textContent = current;
      setTimeout(type, 38);
    } else {
      current += '\n';
      out.textContent = current;
      lineIndex++;
      charIndex = 0;
      setTimeout(type, 320);
    }
  }

  setTimeout(type, 1200);
})();

/* ── 文章阅读进度条 ── */
(function readingProgress() {
  var bar = document.getElementById('readingBar');
  if (!bar) return;

  function update() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 文章列表筛选（posts.html）── */
(function filterPosts() {
  var btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.getAttribute('data-filter');

      // 切换按钮激活态
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // 显示 / 隐藏文章行
      var rows = document.querySelectorAll('.archive-row');
      rows.forEach(function(row) {
        var cat = row.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    });
  });
})();

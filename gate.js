/* FTA client-side gate. One code, one session, all gated pages.
   sessionStorage key: fta_ok (legacy keys are accepted and upgraded).
   This is a soft overlay only; do not put secrets behind it. */
(function () {
  var KEY = 'fta_ok';
  var LEGACY = ['fta_cn_ok', 'fta_dc_ok', 'fta_mvp_ok', 'fta_inv', 'fta_tal'];
  var CODE = '0000';

  function unlocked() {
    try {
      if (sessionStorage.getItem(KEY) === '1') return true;
      for (var i = 0; i < LEGACY.length; i++) {
        if (sessionStorage.getItem(LEGACY[i]) === '1') {
          sessionStorage.setItem(KEY, '1');
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function injectStyle() {
    if (document.getElementById('fta-gate-style')) return;
    var s = document.createElement('style');
    s.id = 'fta-gate-style';
    s.textContent =
      '#ftagate{position:fixed;inset:0;z-index:2147483000;background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;color:#f2f2ef}' +
      '#ftagate .fta-kicker{font-size:12px;letter-spacing:.3em;color:#ff8a3d;margin-bottom:14px}' +
      '#ftagate .fta-title{font-size:22px;font-weight:700;margin:0 0 10px;line-height:1.3}' +
      '#ftagate .fta-note{max-width:340px;margin:0 auto 22px;font-size:14px;line-height:1.6;color:#c8c8c4}' +
      '#ftagate #ftapw{width:200px;font-size:28px;letter-spacing:.5em;text-align:center;background:#111;border:1px solid #333;color:#f2f2ef;border-radius:14px;padding:12px 0 12px .5em;outline:none}' +
      '#ftagate #ftago{margin-top:16px;width:200px;font-size:17px;font-weight:800;border:0;border-radius:14px;padding:13px;background:#ff8a3d;color:#0a0a0a;cursor:pointer}' +
      '#ftagate #ftaerr{color:#ffbd8a;font-size:14px;height:20px;margin-top:12px}';
    document.head.appendChild(s);
  }

  function build(g) {
    if (g.querySelector('#ftapw')) return;
    var title = g.getAttribute('data-title') || 'For internal usage';
    var note = g.getAttribute('data-note') || '';
    var kicker = g.getAttribute('data-kicker') || 'FTA';
    var html = '<div class="fta-kicker"></div><div class="fta-title"></div>';
    if (note) html += '<p class="fta-note"></p>';
    html += '<input id="ftapw" type="password" inputmode="numeric" maxlength="8" autocomplete="off" aria-label="Access code">' +
      '<button type="button" id="ftago">Enter</button>' +
      '<div id="ftaerr" role="status"></div>';
    g.innerHTML = html;
    g.querySelector('.fta-kicker').textContent = kicker;
    g.querySelector('.fta-title').textContent = title;
    if (note) g.querySelector('.fta-note').textContent = note;
  }

  function bind(g) {
    build(g);
    if (unlocked()) {
      g.style.display = 'none';
      document.documentElement.style.overflow = '';
      return;
    }
    g.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    function ok() {
      var input = document.getElementById('ftapw');
      var err = document.getElementById('ftaerr');
      if (input && input.value === CODE) {
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        g.style.display = 'none';
        document.documentElement.style.overflow = '';
      } else if (err) {
        err.textContent = 'Incorrect code';
      }
    }
    var btn = document.getElementById('ftago');
    var input = document.getElementById('ftapw');
    if (btn) btn.addEventListener('click', ok);
    if (input) {
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') ok(); });
      setTimeout(function () { try { input.focus(); } catch (e) {} }, 0);
    }
  }

  injectStyle();
  var g = document.getElementById('ftagate');
  if (g) bind(g);
})();

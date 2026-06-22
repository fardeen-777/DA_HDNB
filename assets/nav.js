/* nav.js — shared sticky nav, base: /DA_HDNB/ */
(function () {
  const BASE = '/DA_HDNB';

  const NAV_HTML = `
<nav class="site-nav" aria-label="Site navigation">
  <span class="nav-logo">HDNB · Analytics Bootcamp</span>
  <a class="nav-link" href="${BASE}/index.html">Home</a>
  <a class="nav-link" href="${BASE}/pages/guide.html">Course Guide</a>
  <a class="nav-link" href="${BASE}/pages/tracker.html">My Tracker</a>
  <a class="nav-link" href="${BASE}/pages/resources.html">YouTube Prep</a>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // Mark active link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (path.endsWith(link.getAttribute('href').replace(BASE, '')) ||
        (path.endsWith('/DA_HDNB/') && link.getAttribute('href').endsWith('index.html'))) {
      link.classList.add('active');
    }
  });
})();

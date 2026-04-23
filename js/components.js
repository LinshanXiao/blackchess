/* components.js — shared header + footer injected into every page */

function injectNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const links = [
    { href: 'index.html',       label: 'Home' },
    { href: 'about.html',       label: 'About' },
    { href: 'funds.html',       label: 'Our Funds' },
    { href: 'strategy.html',    label: 'Strategy' },
    { href: 'performance.html', label: 'Performance' },
    { href: 'team.html',        label: 'Team' },
  ];

  const linksHTML = links.map(l => {
    const active = currentPage === l.href ? 'active' : '';
    return `<li><a href="${l.href}" class="${active}">${l.label}</a></li>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="site-nav">
      <a class="nav-logo" href="index.html">Black Chess <span>Capital</span></a>
      <ul class="nav-links" id="nav-links">
        ${linksHTML}
        <li><a href="contact.html" class="nav-cta">Contact Us</a></li>
      </ul>
      <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  `);

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  /* shrink nav on scroll */
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('site-nav');
    nav.style.background = window.scrollY > 60
      ? 'rgba(8,8,7,0.97)'
      : 'rgba(8,8,7,0.9)';
  });
}

function injectFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer id="site-footer">
      <div class="footer-main">
        <!-- Brand -->
        <div>
          <div class="footer-brand-name">Black Chess Capital</div>
          <p class="footer-brand-desc">
            The union of Softwater Capital's Australian venture expertise and 
            Heqi Investment's quantitative precision — a dual-hemisphere platform 
            built for sophisticated global investors.
          </p>
          <div class="footer-legal-tags">
            <span>ABN 40 664 455 501</span>
            <span>AFSL Representative</span>
            <span>VCLP Registered</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <div class="footer-col-title">Quick Links</div>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="funds.html">Our Funds</a></li>
            <li><a href="strategy.html">Strategy</a></li>
            <li><a href="performance.html">Performance</a></li>
            <li><a href="team.html">Team</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <!-- Offices -->
        <div>
          <div class="footer-col-title">Our Offices</div>
          <div class="footer-office">
            <div class="footer-office-city">Sydney — Softwater Capital</div>
            <p>Chris Li<br>
            <a href="mailto:Chris.Li@softwatercap.com.au">Chris.Li@softwatercap.com.au</a><br>
            +61 430 988 999</p>
          </div>
          <div class="footer-office">
            <div class="footer-office-city">Perth — Softwater Capital</div>
            <p>Jake Zhou<br>
            <a href="mailto:jakezhou88@outlook.com">jakezhou88@outlook.com</a><br>
            +61 452 188 526</p>
          </div>
          <div class="footer-office">
            <div class="footer-office-city">Shanghai — Heqi Investment</div>
            <p>江苏和棋投资管理有限公司<br>
            Registration No. P1019979</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© 2026 Black Chess Capital. All rights reserved.</p>
        <div class="footer-legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>

      <div class="footer-disclaimer">
        <p>
          This website is for informational purposes only and does not constitute financial advice 
          or an offer to invest. Past performance is not indicative of future results. 
          Black Chess Capital and its associated entities — Softwater Capital Pty Ltd (ABN 40 664 455 501) 
          and Jiangsu Heqi Investment Management Co. Ltd (P1019979) — are not responsible for investment 
          decisions made based on the content of this website. Investment in venture capital and quantitative 
          funds involves significant risk, including possible loss of capital. For qualified and sophisticated 
          investors only. Always seek independent financial advice before investing.
        </p>
      </div>
    </footer>
  `);
}

/* Scroll reveal */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initReveal();
});

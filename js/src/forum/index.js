import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';

// Import our components
import BottomNav from './components/BottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import MobileHeader from './components/MobileHeader';

// Import extend modules (CSS-only styling)
import './extend/header';
import './extend/sidebar';
import './extend/indexPage';

// RTL locales
const RTL_LOCALES = ['ar', 'fa', 'he', 'ur', 'ps', 'sd', 'yi'];

function isRTL() {
  const lang = document.documentElement.getAttribute('lang') || '';
  return RTL_LOCALES.some(loc => lang.startsWith(loc));
}

// Initialize the theme
app.initializers.add('hadi-flarum-theme-modern', function () {
  // Fix RTL direction - Flarum sets dir="ltr" even for RTL locales
  if (isRTL()) {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  // Mount bottom navigation
  const mountBottomNav = () => {
    const existing = document.getElementById('modern-bottom-nav');
    if (!existing && window.innerWidth < 768) {
      const container = document.createElement('div');
      container.id = 'modern-bottom-nav';
      document.body.appendChild(container);
      m.mount(container, BottomNav);
    }
  };

  // Mount floating action button
  const mountFAB = () => {
    const existing = document.getElementById('modern-fab');
    if (!existing && window.innerWidth < 768 && app.session.user) {
      const container = document.createElement('div');
      container.id = 'modern-fab';
      document.body.appendChild(container);
      m.mount(container, FloatingActionButton);
    }
  };

  // Mount mobile header
  const mountMobileHeader = () => {
    const existing = document.getElementById('modern-mobile-header');
    if (!existing && window.innerWidth < 768) {
      // Replace default header content on mobile
      const header = document.querySelector('.Header');
      if (header) {
        header.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'container';
        header.appendChild(container);
        m.mount(container, MobileHeader);
      }
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mountBottomNav();
      mountFAB();
      mountMobileHeader();
    });
  } else {
    mountBottomNav();
    mountFAB();
    mountMobileHeader();
  }

  // Re-mount on route change
  extend(app, 'route', function () {
    setTimeout(() => {
      mountBottomNav();
      mountFAB();
    }, 100);
  });

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      const bottomNav = document.getElementById('modern-bottom-nav');
      const fab = document.getElementById('modern-fab');

      if (!isMobile && bottomNav) {
        bottomNav.remove();
      } else if (isMobile && !bottomNav) {
        mountBottomNav();
      }

      if (!isMobile && fab) {
        fab.remove();
      } else if (isMobile && !fab && app.session.user) {
        mountFAB();
      }
    }, 150);
  });
});

// Export components for other extensions to use
export {
  BottomNav,
  FloatingActionButton,
  MobileHeader
};
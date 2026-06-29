import { extend, override } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import Post from 'flarum/forum/components/Post';

// Import our components
import BottomNav from './components/BottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import MobileHeader from './components/MobileHeader';

// Import extend modules
import './extend/indexPage';
import './extend/discussionListItem';
import './extend/discussionPage';
import './extend/post';
import './extend/header';
import './extend/sidebar';

// Initialize the theme
app.initializers.add('hadi-flarum-theme-modern', function () {
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
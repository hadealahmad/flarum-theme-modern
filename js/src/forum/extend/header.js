import { extend, override } from 'flarum/common/extend';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';

// Hide header items on mobile (handled by custom MobileHeader)
extend(HeaderPrimary.prototype, 'view', function (vnode) {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    return <div className="Header-primary Header-primary--mobile" style="display: none" />;
  }
});

extend(HeaderSecondary.prototype, 'view', function (vnode) {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    return <div className="Header-secondary Header-secondary--mobile" style="display: none" />;
  }
});
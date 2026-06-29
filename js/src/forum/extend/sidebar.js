import { extend, override } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';

// Override IndexPage sidebar for mobile drawer
extend(IndexPage.prototype, 'view', function (vnode) {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // Transform sidebar into drawer
    const sidebar = this.element.querySelector('.IndexPage-sidebar');
    if (sidebar) {
      sidebar.classList.add('IndexPage-sidebar--drawer');
    }
  }
});
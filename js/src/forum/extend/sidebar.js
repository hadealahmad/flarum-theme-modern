import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';

extend(IndexPage.prototype, 'view', function (vnode) {
  if (vnode && vnode.attrs) {
    vnode.attrs.className = (vnode.attrs.className || '') + ' ModernSidebar';
  }
});
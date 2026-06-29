import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionList from 'flarum/forum/components/DiscussionList';

// Add mobile class to IndexPage for CSS targeting
extend(IndexPage.prototype, 'view', function (vnode) {
  if (vnode && vnode.attrs) {
    vnode.attrs.className = (vnode.attrs.className || '') + ' ModernIndexPage';
  }
});

// Add card class to DiscussionList
extend(DiscussionList.prototype, 'view', function (vnode) {
  if (vnode && vnode.attrs) {
    vnode.attrs.className = (vnode.attrs.className || '') + ' DiscussionList--cards';
  }
});
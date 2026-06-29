import { extend, override } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';

// Override IndexPage view for mobile-first layout
extend(IndexPage.prototype, 'view', function (vnode) {
  // Add mobile-specific classes
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // Ensure content takes full width on mobile
    const content = this.element.querySelector('.IndexPage-results');
    if (content) {
      content.style.width = '100%';
      content.style.float = 'none';
      content.style.margin = '0';
      content.style.padding = '12px';
    }
  }
});

// Override DiscussionList view for card layout
extend(DiscussionList.prototype, 'view', function (vnode) {
  // Add card styling class
  if (this.element) {
    this.element.classList.add('DiscussionList--cards');
  }
});
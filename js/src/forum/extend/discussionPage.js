import { extend } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

extend(DiscussionPage.prototype, 'view', function (vnode) {
  const discussion = this.discussion;
  const isMobile = window.innerWidth < 768;

  if (!isMobile || !discussion) return;

  // Prepend mobile nav bar into the existing vnode children
  const children = Array.isArray(vnode.children) ? vnode.children : [vnode.children];

  vnode.children = [
    <nav className="DiscussionPage-nav">
      <button
        className="Button Button--back"
        onclick={() => window.history.back()}
        aria-label="Back"
      >
        <i className="fas fa-arrow-left icon" />
      </button>
      <h1 className="DiscussionPage-title">{discussion.title()}</h1>
      <button className="Button Button--icon" aria-label="Menu">
        <i className="fas fa-ellipsis-v icon" />
      </button>
    </nav>,
    ...children
  ];
});

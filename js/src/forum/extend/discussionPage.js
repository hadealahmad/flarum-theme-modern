import { extend, override } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import PostStream from 'flarum/forum/components/PostStream';
import Post from 'flarum/forum/components/Post';

// Override DiscussionPage for mobile layout
extend(DiscussionPage.prototype, 'view', function (vnode) {
  const discussion = this.discussion;

  if (!discussion) {
    return <div className="DiscussionPage LoadingIndicator" />;
  }

  const isMobile = window.innerWidth < 768;

  return (
    <div className={`DiscussionPage ${isMobile ? 'DiscussionPage--mobile' : ''}`}>
      {isMobile && this.viewMobileNav(discussion)}
      <div className="DiscussionPage-discussion">
        {this.hero()}
        {this.postStream()}
      </div>
    </div>
  );
});

// Add mobile navigation bar
extend(DiscussionPage.prototype, 'viewMobileNav', function (discussion) {
  return (
    <nav className="DiscussionPage-nav">
      <button
        className="Button Button--back"
        onclick={() => window.history.back()}
      >
        <i className="fas fa-arrow-left icon" />
      </button>
      <h1 className="DiscussionPage-title">{discussion.title()}</h1>
      <button className="Button Button--icon">
        <i className="fas fa-ellipsis-v icon" />
      </button>
    </nav>
  );
});
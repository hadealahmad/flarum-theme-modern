import { extend, override } from 'flarum/common/extend';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';

// On mobile, completely replace the view to add the mobile nav bar
override(DiscussionPage.prototype, 'view', function (original) {
  const discussion = this.discussion;
  const isMobile = window.innerWidth < 768;

  if (isMobile && discussion) {
    return (
      <div className="DiscussionPage DiscussionPage--mobile">
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
        </nav>
        <div className="DiscussionPage-discussion">
          {this.hero()}
          {this.postStream()}
        </div>
      </div>
    );
  }

  // On desktop, use the original view
  return original();
});

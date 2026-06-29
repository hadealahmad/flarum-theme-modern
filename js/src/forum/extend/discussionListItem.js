import { extend, override } from 'flarum/common/extend';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import avatar from 'flarum/common/helpers/avatar';
import icon from 'flarum/common/helpers/icon';
import humanTime from 'flarum/common/utils/humanTime';
import username from 'flarum/common/helpers/username';

// Completely override DiscussionListItem view for card design
override(DiscussionListItem.prototype, 'view', function (original) {
  const discussion = this.attrs.discussion;
  const lastReadPost = discussion.lastReadPostNumber();
  const unreadCount = discussion.unreadCount();
  const isUnread = lastReadPost && lastReadPost < discussion.lastPostNumber();

  return (
    <div
      className={`DiscussionListItem ${isUnread ? 'unread' : ''}`}
      onclick={(e) => {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
          m.route.set(app.route('discussion', { id: discussion.slug() }));
        }
      }}
    >
      <div className="DiscussionListItem-content">
        {avatar(discussion.user(), { className: 'avatar' })}
        <div className="DiscussionListItem-main">
          <h3 className="DiscussionListItem-title">
            <a href={app.route('discussion', { id: discussion.slug() })}>
              {discussion.title()}
            </a>
          </h3>
          <div className="DiscussionListItem-meta">
            {username(discussion.user())}
            <span className="DateTime">{humanTime(discussion.createdAt())}</span>
          </div>
          {discussion.preview() && (
            <p className="DiscussionListItem-preview">{discussion.preview()}</p>
          )}
          <div className="DiscussionListItem-info">
            {discussion.commentCount() > 0 && (
              <span className="ItemContent-meta">
                {icon('fas fa-comment')}
                {discussion.commentCount()}
              </span>
            )}
            {discussion.lastPost() && (
              <span className="ItemContent-meta">
                {icon('fas fa-clock')}
                {humanTime(discussion.lastPostAt())}
              </span>
            )}
          </div>
        </div>
        {isUnread && unreadCount > 0 && (
          <div className="DiscussionListItem-indicator">
            <span className="Badge">{unreadCount}</span>
          </div>
        )}
      </div>
      <div className="DiscussionListItem-controls">
        {DiscussionControls.controls(discussion, this).toArray()}
      </div>
    </div>
  );
});
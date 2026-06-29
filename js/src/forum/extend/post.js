import { extend, override } from 'flarum/common/extend';
import Post from 'flarum/forum/components/Post';
import icon from 'flarum/common/helpers/icon';
import avatar from 'flarum/common/helpers/avatar';
import username from 'flarum/common/helpers/username';
import humanTime from 'flarum/common/utils/humanTime';
import PostControls from 'flarum/forum/utils/PostControls';
import ItemList from 'flarum/common/utils/ItemList';

// Override Post view for mobile-optimized layout
override(Post.prototype, 'view', function (original) {
  const post = this.attrs.post;
  const discussion = post.discussion();
  const user = post.user();

  return (
    <div className={`Post ${post.isFirstPost() ? 'Post--first' : ''}`} id={'post-' + post.number()}>
      <div className="Post-header">
        {user ? avatar(user, { className: 'avatar' }) : avatar(null, { className: 'avatar' })}
        <div className="PostMeta">
          {username(user)}
          <span className="DateTime">{humanTime(post.createdAt())}</span>
        </div>
        <div className="Post-controls">
          {PostControls.controls(post, this).toArray()}
        </div>
      </div>
      <div className="Post-body">
        {post.contentType() === 'comment' ? (
          <div className="Post-content" onclick={this.handleContentClick.bind(this)}>
            {m.trust(post.contentHtml())}
          </div>
        ) : (
          this.viewContent()
        )}
        {post.isEdited() && (
          <span className="Post-isEdited">
            ({app.translator.trans('core.lib.post.edited')})
          </span>
        )}
      </div>
      {this.viewReactions()}
      {this.viewActionButtons()}
    </div>
  );
});

// Add action buttons below post
extend(Post.prototype, 'viewActionButtons', function () {
  const post = this.attrs.post;
  const isMobile = window.innerWidth < 768;

  if (!isMobile) return null;

  return (
    <div className="Post-actions">
      <button
        className="Button Post-actions-like"
        onclick={() => this.like()}
      >
        {icon(post.isLiked() ? 'fas fa-heart' : 'far fa-heart')}
        <span className="Button-label">
          {post.isLiked() ? 'Liked' : 'Like'}
        </span>
      </button>
      <button
        className="Button Post-actions-reply"
        onclick={() => this.reply()}
      >
        {icon('fas fa-reply')}
        <span className="Button-label">Reply</span>
      </button>
    </div>
  );
});
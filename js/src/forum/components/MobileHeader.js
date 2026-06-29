import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import avatar from 'flarum/common/helpers/avatar';
import username from 'flarum/common/helpers/username';
import humanTime from 'flarum/common/utils/humanTime';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';

export default class MobileHeader extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.searchOpen = false;
  }

  view() {
    const isDiscussionPage = app.current() instanceof flarum.forum.components.DiscussionPage;
    const discussion = isDiscussionPage ? app.current.discussion : null;

    return (
      <header className="Header">
        <div className="container">
          {isDiscussionPage && discussion ? (
            this.viewDiscussion(discussion)
          ) : (
            this.viewDefault()
          )}
        </div>
      </header>
    );
  }

  viewDefault() {
    return (
      <Fragment>
        <a className="Header-logo" href={app.forum.attribute('baseUrl')}>
          {app.forum.attribute('logoUrl') ? (
            <img src={app.forum.attribute('logoUrl')} alt={app.forum.attribute('title')} />
          ) : (
            icon('fas fa-comments')
          )}
          <span>{app.forum.attribute('title')}</span>
        </a>

        <div className="Header-actions">
          <button
            className="Button Button--icon"
            onclick={() => this.toggleSearch()}
          >
            {icon('fas fa-search')}
          </button>
          <button
            className="Button Button--icon NotificationsButton"
            onclick={() => this.toggleNotifications()}
          >
            {icon('fas fa-bell')}
            {this.getNotificationCount() > 0 && (
              <span className="NotificationCount">{this.getNotificationCount()}</span>
            )}
          </button>
        </div>
      </Fragment>
    );
  }

  viewDiscussion(discussion) {
    return (
      <Fragment>
        <button
          className="Button Button--back"
          onclick={() => window.history.back()}
        >
          {icon('fas fa-arrow-left')}
        </button>
        <h1 className="DiscussionPage-title">
          {discussion.title()}
        </h1>
        <div className="Header-actions">
          <button
            className="Button Button--icon"
            onclick={() => this.showControls(discussion)}
          >
            {icon('fas fa-ellipsis-v')}
          </button>
        </div>
      </Fragment>
    );
  }

  toggleSearch() {
    const search = document.querySelector('.Search');
    if (search) {
      search.classList.toggle('active');
      const input = search.querySelector('.Search-input');
      if (input) input.focus();
    }
  }

  toggleNotifications() {
    // Trigger notification dropdown
    const button = document.querySelector('.IndexPage-nav .Dropdown-toggle');
    if (button) button.click();
  }

  showControls(discussion) {
    DiscussionControls.controls(discussion, this).show();
  }

  getNotificationCount() {
    return app.session.user ? app.session.user.newNotificationsCount() : 0;
  }
}
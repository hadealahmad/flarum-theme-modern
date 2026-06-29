import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';

export default class BottomNav extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.activeTab = this.getCurrentTab();
  }

  getCurrentTab() {
    const route = m.route.get();
    if (route.startsWith('/u/')) return 'profile';
    if (route.startsWith('/search')) return 'search';
    if (route.includes('notifications')) return 'notifications';
    return 'home';
  }

  view() {
    const items = [
      { id: 'home', icon: 'fas fa-house', label: 'Home', onclick: () => this.goHome() },
      { id: 'search', icon: 'fas fa-magnifying-glass', label: 'Search', onclick: () => this.openSearch() },
      { id: 'notifications', icon: 'fas fa-bell', label: 'Alerts', onclick: () => this.openNotifications(), badge: this.getNotificationCount() },
      { id: 'profile', icon: 'fas fa-user', label: 'Profile', onclick: () => this.goProfile() },
    ];

    return (
      <nav className="BottomNav">
        {items.map(item => (
          <button
            className={`BottomNav-item ${this.activeTab === item.id ? 'BottomNav-item--active' : ''}`}
            onclick={item.onclick}
            aria-label={item.label}
          >
            {icon(item.icon)}
            <span className="Button-label">{item.label}</span>
            {item.badge > 0 && (
              <span className="BottomNav-badge">{item.badge > 99 ? '99+' : item.badge}</span>
            )}
          </button>
        ))}
      </nav>
    );
  }

  goHome() {
    this.activeTab = 'home';
    m.route.set('/');
  }

  openSearch() {
    this.activeTab = 'search';
    const searchToggle = document.querySelector('.Search-toggle');
    if (searchToggle) searchToggle.click();
  }

  openNotifications() {
    this.activeTab = 'notifications';
    const notifButton = document.querySelector('.NotificationsButton');
    if (notifButton) notifButton.click();
  }

  goProfile() {
    this.activeTab = 'profile';
    if (app.session.user) {
      m.route.set(app.route('user', { username: app.session.user.username() }));
    }
  }

  getNotificationCount() {
    return app.session.user ? app.session.user.unreadNotificationsCount() : 0;
  }
}
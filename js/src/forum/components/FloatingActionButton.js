import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';

export default class FloatingActionButton extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.visible = true;
    this.lastScrollTop = 0;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    // Listen for scroll to hide/show FAB
    const content = document.querySelector('.App-content');
    if (content) {
      content.addEventListener('scroll', () => {
        const scrollTop = content.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
          // Scrolling down
          this.visible = false;
          m.redraw();
        } else {
          // Scrolling up
          this.visible = true;
          m.redraw();
        }
        this.lastScrollTop = scrollTop;
      });
    }
  }

  view() {
    if (!app.session.user) return null;

    return (
      <button
        className={`FloatingActionButton ${!this.visible ? 'FloatingActionButton--hidden' : ''}`}
        onclick={() => this.openComposer()}
        aria-label="New Discussion"
      >
        {icon('fas fa-plus')}
      </button>
    );
  }

  openComposer() {
    // Trigger the new discussion composer
    const composeButton = document.querySelector('.Composer-handle');
    if (composeButton) {
      composeButton.click();
    } else {
      // Fallback: try to find any compose trigger
      const newDiscussion = document.querySelector('[data-action="newDiscussion"]');
      if (newDiscussion) newDiscussion.click();
    }
  }
}
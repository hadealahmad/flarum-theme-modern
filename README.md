# Modern Theme for Flarum

A modern, mobile-first Flarum theme inspired by Facebook and Twitter, designed for optimal mobile experience with quick access to posts and interactions.

## Features

- **Mobile-First Design** - Optimized for modern smartphones with bottom navigation
- **Card-Based Discussion List** - Clean, readable cards with avatars and previews
- **Bottom Navigation Bar** - Quick access to Home, Search, Notifications, and Profile
- **Floating Action Button** - Easy new discussion creation on mobile
- **Touch-Optimized Post Actions** - Large tap targets, swipe-friendly interface
- **Bottom Sheet Composer** - Mobile-native feel for creating posts
- **Minimal Header** - Clean, focused header that doesn't distract
- **Responsive Layout** - Adapts beautifully from mobile to desktop

## Installation

### Via Composer (Recommended)

Add the repository to your Flarum root `composer.json`:

```json
"repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/hadealahmad/flarum-theme-modern.git"
    }
]
```

Then run:

```bash
composer require hadi/flarum-theme-modern
```

### Via Extension Manager

1. Download the latest release
2. Extract to `extensions/flarum-theme-modern`
3. Run `composer update` in your Flarum root

## Activation

1. Go to Admin Dashboard > Extensions
2. Find "Modern Theme" in the Themes section
3. Click Enable

## Configuration

After enabling, you can customize the theme colors by editing the Less variables in `less/common/variables.less`.

## Compatibility

- Flarum 1.8+
- Works with all bundled extensions
- Compatible with most third-party extensions

## Development

### Prerequisites

- Node.js 16+
- npm

### Setup

```bash
cd js
npm install
npm run dev  # Development mode with watch
npm run build  # Production build
```

### File Structure

```
flarum-theme-modern/
├── extend.php           # PHP extenders
├── composer.json        # Package metadata
├── js/                  # JavaScript source
│   ├── src/
│   │   ├── forum/       # Forum frontend
│   │   └── admin/       # Admin panel
│   └── package.json
├── less/                # Stylesheets
│   ├── common/          # Shared variables & utilities
│   └── forum/           # Forum-specific styles
└── assets/              # Compiled assets
```

## License

MIT License
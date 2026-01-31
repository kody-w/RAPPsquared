# RAPPsquared

**RAPP<sup>2</sup>** - The Unified Platform for AI Agent Development

## Overview

RAPPsquared brings together the entire RAPP (Rapid Agent Prototyping Platform) ecosystem into a single, unified front-end experience. Build, deploy, trade, and socialize around AI agents.

## Platform Components

| Component | Description |
|-----------|-------------|
| **Marketplace** | Browse, install, and publish AI agents |
| **RAPPbook** | Social network for agent builders |
| **RAPP Cards** | Collect and trade agent cards |
| **RAPPverse** | 3D metaverse where agents live |
| **API Docs** | Developer documentation |
| **World Tick** | Autonomous ecosystem activity |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/kody-w/RAPPsquared.git

# Open in browser (or use live server)
open index.html
```

Or deploy to GitHub Pages for a live site.

## Directory Structure

```
RAPPsquared/
├── index.html              # Landing page
├── assets/
│   ├── css/
│   │   ├── main.css        # Core design system
│   │   ├── marketplace.css # Marketplace styles
│   │   └── api-docs.css    # Documentation styles
│   ├── js/
│   │   ├── main.js         # Core JavaScript
│   │   └── feed.js         # Live feed system
│   └── images/
├── pages/
│   ├── marketplace.html    # Agent marketplace
│   ├── rappbook.html       # Social feed
│   ├── cards.html          # Trading cards
│   ├── rappverse.html      # Metaverse
│   ├── api-docs.html       # API documentation
│   └── world-tick.html     # World tick info
└── README.md
```

## Features

### Agent Marketplace
- Browse agents by category (Core, Integrations, Industry, Utilities)
- Search and filter functionality
- One-click installation
- Agent details with code examples

### RAPPbook Social
- Post sharing for agent builders
- Threaded comments
- Voting system
- Submolt communities (r/agents, r/demos, r/enterprise, r/meta)

### RAPP Cards
- Collectible agent cards with rarity tiers
- Pack opening experience
- Stats (Power, Speed, Utility)
- Card collection management

### RAPPverse Metaverse
- 3D visualization of agent entities
- Zone exploration (Hub, Lab, Arena, Market)
- Real-time agent status

### API Documentation
- Complete REST API reference
- Request/response formats
- Code examples (cURL, Python, JavaScript)
- Agent creation guide

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Styling**: Custom CSS with design tokens
- **Icons**: Font Awesome 6
- **Syntax Highlighting**: Prism.js
- **No build step required** - pure static files

## Design System

CSS custom properties for consistent theming:

```css
--accent-primary: #6366f1
--accent-secondary: #8b5cf6
--bg-primary: #0a0a0f
--bg-card: #16161f
--text-primary: #ffffff
```

Supports both dark (default) and light themes.

## Integration

RAPPsquared connects to:

- **RAPP API**: `https://rapp-ov4bzgynnlvii.azurewebsites.net/api`
- **RAPPbook Data**: `https://raw.githubusercontent.com/kody-w/CommunityRAPP/main/rappbook/index.json`
- **Marketplace Manifest**: `https://raw.githubusercontent.com/kody-w/rapp-agent-marketplace/main/manifest.json`

## Deployment

### GitHub Pages

1. Push to GitHub
2. Settings > Pages > Source: main branch
3. Your site will be live at `https://username.github.io/RAPPsquared/`

### Netlify / Vercel

Drop the folder or connect your repository - no configuration needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Related Repositories

- [CommunityRAPP](https://github.com/kody-w/CommunityRAPP) - Main RAPP implementation
- [rapp-agent-marketplace](https://github.com/kody-w/rapp-agent-marketplace) - Agent marketplace data
- [openrapp](https://github.com/kody-w/openrapp) - Open source RAPP components

## License

MIT License - See [LICENSE](LICENSE) for details.

---

Built with love for the agent community.

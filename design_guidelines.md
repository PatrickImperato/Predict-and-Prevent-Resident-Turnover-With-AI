{
  "brand": {
    "product_name": "HappyCo Concierge",
    "v1_goal": "Prospect-facing demo platform with enterprise-grade clarity and diagnostics; must visually match the current preview experience while modernizing tokens, spacing, and interaction fidelity.",
    "brand_attributes": [
      "trustworthy",
      "quietly premium",
      "operator-friendly",
      "data-confident",
      "diagnostic-ready"
    ],
    "visual_personality": {
      "style_fusion": [
        "Swiss/international typographic structure (tight grid, strong hierarchy)",
        "Bento-card admin dashboards (quick scanning)",
        "Soft glass accents (only on secondary surfaces, no heavy gradients)",
        "Warm-neutral enterprise palette with teal as the only primary accent"
      ],
      "do_not": [
        "Do not use purple for AI/concierge contexts.",
        "Do not rely on centered page layouts.",
        "Do not use dark/saturated gradients or large gradient coverage (see GRADIENT RESTRICTION RULE)."
      ]
    }
  },
  "inspiration_sources": {
    "references": [
      {
        "name": "Dribbble: RealEstate Pro dashboard",
        "url": "https://dribbble.com/shots/26985439-RealEstate-Pro-Property-Management-Dashboard-UI-UX-Design",
        "takeaways": [
          "Portfolio-style metric cards with subtle borders",
          "Clear left nav + top context bar",
          "Chart + table pairing for decision workflows"
        ]
      },
      {
        "name": "Muzli 2026 dashboard inspiration roundup",
        "url": "https://muz.li/blog/best-dashboard-design-examples-inspirations-for-2026/",
        "takeaways": [
          "Bento layout trends",
          "High legibility with warm neutrals",
          "Micro-interactions for scan-to-action flows"
        ]
      }
    ],
    "layout_north_star": "Left sidebar (primary nav) + top header (property/context switcher, environment badge, user) + content grid (cards → tables → charts)."
  },
  "typography": {
    "google_fonts": {
      "heading": {
        "family": "Space Grotesk",
        "weights": [500, 600, 700],
        "usage": "H1/H2, card titles, KPI numbers"
      },
      "body": {
        "family": "Work Sans",
        "weights": [400, 500, 600],
        "usage": "body, tables, forms, labels"
      },
      "mono": {
        "family": "IBM Plex Mono",
        "weights": [400, 500],
        "usage": "diagnostics, IDs, env vars, database names"
      }
    },
    "tailwind_usage": {
      "apply_fonts": {
        "heading_class": "font-[var(--font-heading)]",
        "body_class": "font-[var(--font-body)]",
        "mono_class": "font-[var(--font-mono)]"
      },
      "text_size_hierarchy": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl",
        "h2": "text-base md:text-lg",
        "body": "text-sm md:text-base",
        "small": "text-xs"
      },
      "kpi_number": "text-2xl md:text-3xl font-semibold tracking-tight",
      "table_header": "text-xs uppercase tracking-wide",
      "label": "text-xs font-medium"
    },
    "letter_spacing": {
      "headings": "tracking-[-0.01em]",
      "kpis": "tracking-[-0.02em]",
      "caps": "tracking-[0.08em]"
    }
  },
  "color_system": {
    "notes": [
      "Use warm neutrals for surfaces; teal for primary actions and positive trends; sand/amber for warnings; red for destructive.",
      "Charts should map semantic meaning: positive=teal, warning=sand, negative=rose.",
      "Avoid large gradients; use noise + subtle section wash instead."
    ],
    "tokens_css_custom_properties": {
      "recommended_in_index_css_root": {
        "--background": "210 33% 98%",
        "--foreground": "222 22% 14%",
        "--card": "0 0% 100%",
        "--card-foreground": "222 22% 14%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222 22% 14%",
        "--primary": "185 78% 28%",
        "--primary-foreground": "0 0% 100%",
        "--secondary": "35 62% 92%",
        "--secondary-foreground": "222 22% 14%",
        "--muted": "210 24% 95%",
        "--muted-foreground": "215 16% 42%",
        "--accent": "35 66% 88%",
        "--accent-foreground": "222 22% 14%",
        "--destructive": "350 80% 52%",
        "--destructive-foreground": "0 0% 100%",
        "--border": "215 20% 88%",
        "--input": "215 20% 88%",
        "--ring": "185 78% 28%",
        "--chart-1": "185 78% 28%",
        "--chart-2": "35 80% 52%",
        "--chart-3": "215 16% 42%",
        "--chart-4": "189 45% 46%",
        "--chart-5": "350 80% 52%",
        "--radius": "0.75rem",
        "--shadow-soft": "0 1px 1px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.08)",
        "--shadow-hard": "0 1px 1px rgba(16, 24, 40, 0.06), 0 16px 40px rgba(16, 24, 40, 0.12)",
        "--surface-noise-opacity": "0.06"
      }
    },
    "semantic_colors": {
      "success": {
        "bg": "bg-emerald-50",
        "text": "text-emerald-800",
        "border": "border-emerald-200"
      },
      "info": {
        "bg": "bg-sky-50",
        "text": "text-sky-900",
        "border": "border-sky-200"
      },
      "warning": {
        "bg": "bg-amber-50",
        "text": "text-amber-900",
        "border": "border-amber-200"
      },
      "danger": {
        "bg": "bg-rose-50",
        "text": "text-rose-900",
        "border": "border-rose-200"
      }
    },
    "environment_badges": {
      "preview": {
        "container": "bg-teal-50 text-teal-900 border border-teal-200",
        "dot": "bg-teal-500"
      },
      "production": {
        "container": "bg-slate-900 text-slate-50 border border-slate-700",
        "dot": "bg-amber-400"
      }
    }
  },
  "gradients_and_texture": {
    "allowed_usage": [
      "Hero/landing section background wash only (max 20% viewport)",
      "Decorative corner blobs behind charts (very subtle)",
      "Never for reading surfaces/cards/tables"
    ],
    "approved_gradients": [
      {
        "name": "teal-mist",
        "tailwind": "bg-[radial-gradient(600px_circle_at_20%_10%,rgba(13,148,136,0.10),transparent_55%),radial-gradient(500px_circle_at_85%_15%,rgba(245,158,11,0.10),transparent_60%)]",
        "notes": "Use on landing hero container only; keep text on solid surface overlay."
      }
    ],
    "noise_overlay": {
      "implementation": "Add a pseudo-element overlay using a tiny SVG noise data URI or a lightweight PNG; opacity controlled by --surface-noise-opacity.",
      "tailwind_pattern": "relative before:pointer-events-none before:absolute before:inset-0 before:opacity-[var(--surface-noise-opacity)] before:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.22\"/></svg>')]"
    }
  },
  "layout_and_grid": {
    "app_shell": {
      "desktop": "Sidebar (280px) + content",
      "mobile": "Bottom sheet / drawer navigation + sticky top bar",
      "max_width": "max-w-[1400px] for inner content; full-bleed background",
      "page_padding": "px-4 sm:px-6 lg:px-8 py-6"
    },
    "grids": {
      "kpi_row": "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
      "bento": "grid grid-cols-1 lg:grid-cols-12 gap-4",
      "two_column": "grid grid-cols-1 lg:grid-cols-3 gap-6 (content spans 2 cols, sidebar spans 1)"
    },
    "cards": {
      "base": "rounded-xl border bg-card text-card-foreground shadow-[var(--shadow-soft)]",
      "header": "p-4 pb-2",
      "content": "p-4 pt-2",
      "dense": "p-3",
      "interactive": "hover:shadow-[var(--shadow-hard)] hover:-translate-y-[1px] transition-shadow transition-colors"
    }
  },
  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui/",
      "note": "Project uses .jsx components; follow existing patterns and named exports for components."
    },
    "use_these_shadcn_components": {
      "navigation": [
        { "name": "sheet", "path": "components/ui/sheet.jsx", "use": "mobile nav drawer" },
        { "name": "navigation-menu", "path": "components/ui/navigation-menu.jsx", "use": "top nav actions (optional)" },
        { "name": "breadcrumb", "path": "components/ui/breadcrumb.jsx", "use": "Property > Details context" }
      ],
      "forms_auth": [
        { "name": "form", "path": "components/ui/form.jsx", "use": "login + settings forms" },
        { "name": "input", "path": "components/ui/input.jsx", "use": "text inputs" },
        { "name": "label", "path": "components/ui/label.jsx", "use": "field labels" },
        { "name": "checkbox", "path": "components/ui/checkbox.jsx", "use": "remember me / demo mode toggles" },
        { "name": "select", "path": "components/ui/select.jsx", "use": "property switcher, filters" }
      ],
      "data_display": [
        { "name": "card", "path": "components/ui/card.jsx", "use": "KPI cards, panels" },
        { "name": "badge", "path": "components/ui/badge.jsx", "use": "status + env + role" },
        { "name": "table", "path": "components/ui/table.jsx", "use": "properties/providers/tenants" },
        { "name": "tabs", "path": "components/ui/tabs.jsx", "use": "property detail sections" },
        { "name": "tooltip", "path": "components/ui/tooltip.jsx", "use": "metric definitions" },
        { "name": "progress", "path": "components/ui/progress.jsx", "use": "completion/health indicators" }
      ],
      "dialogs_feedback": [
        { "name": "dialog", "path": "components/ui/dialog.jsx", "use": "create/edit provider, confirmation" },
        { "name": "alert-dialog", "path": "components/ui/alert-dialog.jsx", "use": "dangerous actions (seed reset)" },
        { "name": "sonner", "path": "components/ui/sonner.jsx", "use": "toasts" },
        { "name": "skeleton", "path": "components/ui/skeleton.jsx", "use": "loading states" }
      ],
      "filters_and_search": [
        { "name": "command", "path": "components/ui/command.jsx", "use": "search palette (properties/providers)" },
        { "name": "popover", "path": "components/ui/popover.jsx", "use": "filter popovers" },
        { "name": "calendar", "path": "components/ui/calendar.jsx", "use": "analytics date range" }
      ]
    },
    "buttons": {
      "brand_button_style": "Professional / Corporate with slight premium softness",
      "variants": {
        "primary": "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "ghost": "hover:bg-muted",
        "destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
      "sizes": {
        "sm": "h-8 px-3 text-sm",
        "md": "h-9 px-4",
        "lg": "h-10 px-5"
      },
      "motion": {
        "hover": "transition-colors transition-shadow",
        "press": "active:scale-[0.98]",
        "prohibited": "transition-all"
      }
    }
  },
  "page_blueprints": {
    "landing": {
      "structure": [
        "Top bar: logo + discreet environment badge (preview only) + Sign in",
        "Hero: headline + value bullets + CTA 'Sign in'",
        "3 property preview cards (Lakeside Commons / Downtown Tower / The Metropolitan at Riverside)",
        "Trust strip: 'Diagnostics built-in' + 'Separate preview/production DBs' badges",
        "Footer: domain + build info + support"
      ],
      "hero_background": "teal-mist gradient + noise overlay (max 20% viewport)",
      "cta": "Primary button; secondary ghost 'View Diagnostics' (if public in preview)"
    },
    "login": {
      "layout": "Two-panel on desktop (left: form, right: muted image/texture); single column mobile.",
      "form": [
        "email",
        "password",
        "remember me",
        "preview-only: demo mode toggle"
      ],
      "copy_behavior": "Match existing preview labels/copy as close as possible."
    },
    "admin_shell": {
      "sidebar": [
        "Dashboard",
        "Properties",
        "Providers",
        "Tenants",
        "Analytics",
        "Settings",
        "Diagnostics"
      ],
      "topbar": [
        "Property switcher (Select)",
        "Date range (Popover + Calendar)",
        "Env badge + DB name (mono)",
        "User menu"
      ]
    },
    "dashboard": {
      "above_fold": [
        "4 KPI cards: Gross Revenue, Credits, Net Revenue, Active Residents",
        "Alerts card (maintenance tickets, churn risk counts)"
      ],
      "below_fold": [
        "Revenue trend (Recharts line chart)",
        "Provider performance (bar chart + table)",
        "Retention interventions log (table)"
      ]
    },
    "properties": {
      "list": "Table with filters + search; rows navigate by id-based routing.",
      "detail": "Tabs: Overview, Residents, Providers, Maintenance, Economics, Settings"
    },
    "providers": {
      "list": "Table with status badges, service tags; create/edit in Dialog.",
      "micro": "Inline quick actions (call/email placeholders) as icon buttons with tooltips."
    },
    "tenants": {
      "list": "Residents table; highlight Alex Chen row with subtle 'QA Example' badge.",
      "detail": "Profile header + activity timeline + consents + bookings"
    },
    "analytics": {
      "layout": "Bento grid of 2 charts + 2 tables; date range selector; export button.",
      "empty_states": "Use Skeleton while loading; show friendly empty state if no data for range."
    },
    "settings": {
      "global_settings": "Form sections with separators: Platform, Predictive model, Margin, Default turnover cost",
      "property_settings": "Only if property selected; show read-only diagnostics next to editable fields"
    },
    "diagnostics": {
      "layout": "Two-column: left (env/host/db/user/session), right (collection counts + last seed run)",
      "tone": "Engineering-friendly; use mono; allow copy-to-clipboard buttons"
    }
  },
  "charts_and_data_viz": {
    "library": {
      "recommended": "recharts",
      "why": "Fast to implement in React, good defaults, easy custom tooltips/legends"
    },
    "visual_rules": {
      "gridlines": "stroke-muted-foreground/20",
      "axes": "text-muted-foreground text-xs",
      "tooltip": "Card-like tooltip with border + shadow-soft; use mono for numeric values",
      "color_mapping": {
        "gross_revenue": "hsl(var(--chart-1))",
        "credits": "hsl(var(--chart-2))",
        "net_revenue": "hsl(var(--chart-4))",
        "risk": "hsl(var(--chart-5))"
      }
    }
  },
  "motion_and_micro_interactions": {
    "library": {
      "recommended": "framer-motion",
      "install": "npm i framer-motion",
      "usage": [
        "Page transitions: opacity + slight y (8px)",
        "Card hover: shadow intensity only (no big transforms)",
        "Table row hover: background tint + left accent bar"
      ]
    },
    "principles": [
      "Use motion to confirm state changes (filters applied, data refreshed)",
      "Prefer 120–180ms durations for hovers, 220–320ms for entrances",
      "Respect prefers-reduced-motion"
    ],
    "examples_tailwind": {
      "hover": "transition-colors transition-shadow duration-150",
      "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    }
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast for all text on surfaces",
      "Visible focus states on all interactive elements",
      "Keyboard navigation for sidebar, tables, dialogs",
      "Prefer semantic elements; associate Label with Input",
      "Do not rely on color alone for status—use icons/badges/text"
    ],
    "table_accessibility": [
      "Use proper table headers",
      "Row actions must have aria-labels + tooltips"
    ]
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid attributes in kebab-case describing role.",
    "examples": [
      "data-testid=\"login-form-submit-button\"",
      "data-testid=\"sidebar-nav-properties-link\"",
      "data-testid=\"property-switcher-select\"",
      "data-testid=\"diagnostics-env-badge\"",
      "data-testid=\"dashboard-gross-revenue-card\""
    ]
  },
  "iconography": {
    "library": "lucide-react",
    "guidance": [
      "Use consistent 18–20px icons in nav",
      "Stroke width 1.75",
      "Use muted foreground for inactive; primary for active"
    ]
  },
  "image_urls": {
    "landing_hero": [
      {
        "url": "https://images.unsplash.com/photo-1647527269452-cbed2aba8671?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxtaW5pbWFsJTIwbW9kZXJuJTIwY2l0eSUyMHNreWxpbmUlMjBtb3JuaW5nJTIwaGF6ZXxlbnwwfHx8Ymx1ZXwxNzcyNzcxMTg5fDA&ixlib=rb-4.1.0&q=85",
        "description": "Subtle skyline haze for landing right panel / hero media; keep overlay for readability."
      }
    ],
    "property_cards": [
      {
        "url": "https://images.unsplash.com/photo-1528104804036-3d7727d19b33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGxvYmJ5JTIwY29uY2llcmdlfGVufDB8fHx0ZWFsfDE3NzI3NzExODZ8MA&ixlib=rb-4.1.0&q=85",
        "description": "Modern tower exterior for property card cover."
      },
      {
        "url": "https://images.unsplash.com/photo-1652963426007-0d189dee3c56?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGxvYmJ5JTIwY29uY2llcmdlfGVufDB8fHx0ZWFsfDE3NzI3NzExODZ8MA&ixlib=rb-4.1.0&q=85",
        "description": "Bright modern building for secondary property card."
      }
    ],
    "texture_optional": [
      {
        "url": "https://images.unsplash.com/photo-1587647454951-04a835b2a7ae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHx3YXJtJTIwbWluaW1hbCUyMGFic3RyYWN0JTIwZ3JhZGllbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MHx8fG9yYW5nZXwxNzcyNzcxMTkyfDA&ixlib=rb-4.1.0&q=85",
        "description": "Warm paper texture for subtle background panel (opacity 10–16%)."
      }
    ]
  },
  "instructions_to_main_agent": {
    "css_cleanup": [
      "Remove CRA demo styles in App.css (App-header centering etc). Do not set global text-align center.",
      "Update index.css :root HSL tokens to match the tokens specified above; keep shadcn variable structure.",
      "Add font imports in index.html or via CSS @import (Google Fonts for Space Grotesk + Work Sans + IBM Plex Mono).",
      "Add utility classes for noise overlay and card shadows via CSS variables (no heavy gradients)."
    ],
    "routing_and_shell": [
      "Implement AdminShell layout first (sidebar + topbar).",
      "Use id-based routing for detail pages; breadcrumb should reflect entity names.",
      "Expose environment badge and DB name in the topbar and Diagnostics page (mono)."
    ],
    "data_display": [
      "Prefer tables for lists; cards only for KPIs and key summaries.",
      "Track credits separately from gross revenue in KPI cards and charts."
    ],
    "demo_preview_only": [
      "Demo mode toggle only appears when APP_ENV=preview; show 'Preview' badge." 
    ],
    "testing": [
      "Add data-testid to: all buttons, links, inputs, selects, dialog triggers, table row actions, key metric values and status badges."
    ]
  }
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>

---
name: Protocol-Native Provenance
colors:
  surface: '#10131b'
  surface-dim: '#10131b'
  surface-bright: '#363941'
  surface-container-lowest: '#0a0e15'
  surface-container-low: '#181c23'
  surface-container: '#1c2027'
  surface-container-high: '#262a32'
  surface-container-highest: '#31353d'
  on-surface: '#e0e2ec'
  on-surface-variant: '#c0c6d6'
  inverse-surface: '#e0e2ec'
  inverse-on-surface: '#2d3038'
  outline: '#8a91a0'
  outline-variant: '#404754'
  surface-tint: '#a9c7ff'
  primary: '#a9c7ff'
  on-primary: '#003063'
  primary-container: '#3a90ff'
  on-primary-container: '#002957'
  inverse-primary: '#005db6'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468b'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#10131b'
  on-background: '#e0e2ec'
  surface-variant: '#31353d'
  slate-900: '#0F172A'
  slate-800: '#1E293B'
  atproto-blue: '#0085FF'
  status-public: '#10B981'
  status-unlisted: '#F59E0B'
  status-permissioned: '#8B5CF6'
  c2pa-trusted: '#34D399'
  c2pa-invalid: '#F87171'
  c2pa-wellformed: '#60A5FA'
themes:
  default: dark
  light:
    background: '#f8f9fc'
    on-background: '#1a1c23'
    surface: '#ffffff'
    surface-dim: '#eef0f6'
    surface-bright: '#ffffff'
    surface-container-lowest: '#ffffff'
    surface-container-low: '#f3f4f8'
    surface-container: '#eceef4'
    surface-container-high: '#e3e6ee'
    surface-container-highest: '#d8dce6'
    on-surface: '#1a1c23'
    on-surface-variant: '#454a56'
    inverse-surface: '#2d3038'
    inverse-on-surface: '#e8eaf2'
    outline: '#6b7280'
    outline-variant: '#c5cad6'
    surface-tint: '#005db6'
    primary: '#005db6'
    on-primary: '#ffffff'
    primary-container: '#d6e3ff'
    on-primary-container: '#001b3d'
    inverse-primary: '#a9c7ff'
    secondary: '#39485a'
    on-secondary: '#ffffff'
    secondary-container: '#d4e4fa'
    on-secondary-container: '#0d1c2d'
    slate-900: '#f1f5f9'
    slate-800: '#e2e8f0'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  metadata-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  disclosure-l1:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  headline-md-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-margin: 2rem
  grid-gutter: 1.5rem
  panel-padding: 1.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  container-max-width: 1440px
---

## Brand & Style

The design system is rooted in the "Protocol-native" aesthetic—a philosophy that prioritizes technical transparency, cryptographic trust, and data integrity over decorative flourish. It is a system for a decentralized era, designed to feel like a high-precision tool for creators and power users who value the "source of truth."

The visual style is **Minimalist / Corporate Modern**, utilizing heavy whitespace and a structured, systematic approach to information density. It avoids subjective labels, instead using a "Neutral Trust" framework to present C2PA provenance data objectively. The UI should evoke a sense of reliability and calm authority, similar to a modern developer environment or a premium fintech dashboard.

Key Principles:
- **Verifiability as Aesthetic:** Metadata is not hidden; it is a core architectural element.
- **Neutrality:** The UI never makes moral judgments. It presents "Valid," "Invalid," or "None" states without bias.
- **Media-First:** All structural elements exist to frame and support the media, which remains the focal point.

## Colors

The palette is anchored by "Deep Slate" and "Crisp White," creating a high-contrast environment that ensures technical metadata is legible. 

### Core Logic
- **Primary:** `atproto-blue` (#0085FF) is used for primary actions, protocol-level identities, and active states.
- **Visibility States:** 
  - **Public:** Emerald green, signifying open accessibility.
  - **Unlisted:** Amber, suggesting caution/restricted discovery.
  - **Permissioned:** Violet, representing a secure, exclusive "Space."
- **C2PA Validation:** Use a specific semantic set for Content Credentials. 
  - **Trusted/Valid:** Soft greens. 
  - **Invalid:** High-visibility red. 
  - **Well-Formed/None:** Neutral slates or blues.

The system defaults to **Dark Mode** to reduce eye strain during media review and to provide a premium, cinematic backdrop for photography. A **Light Mode** palette is defined in the `themes.light` token set above and MUST be available as a user-selectable alternative.

### Theme modes (dark / light)

Both themes share the same semantic token names. Implementation MUST map tokens to CSS custom properties (e.g., `data-theme="dark"` | `data-theme="light"` on `<html>` or `<body>`).

| Token group | Dark | Light |
|-------------|------|-------|
| **Surfaces** | `background` #10131b, `slate-900` / `slate-800` containers | `background` #f8f9fc, white / `#eceef4` containers |
| **Text** | `on-surface` #e0e2ec | `on-surface` #1a1c23 |
| **Primary actions** | `primary` #a9c7ff on dark surfaces | `primary` #005db6 on light surfaces |
| **Status & C2PA semantics** | `status-*`, `c2pa-*`, `atproto-blue` | **Unchanged** — semantic colors MUST NOT invert |

Light mode maintains the protocol-native aesthetic: high contrast for metadata, media-first layout, neutral trust presentation. Photo thumbnails and C2PA badge semantics look identical in both modes; only chrome, panels, and typography colors adapt.

## Typography

Typography is used to distinguish between "User Content" and "System Data."

- **Brand & Headings:** **Hanken Grotesk** provides a sharp, contemporary feel for album titles and handles.
- **Body & Captions:** **Inter** is used for its exceptional legibility in varied lighting conditions and high-density panels.
- **Technical Metadata:** **JetBrains Mono** is utilized for DIDs, hashes, and provenance logs, creating a visual "code-safe" distinction for protocol-level information.

For C2PA disclosures, use `label-caps` for section headers and `metadata-code` for the actual cryptographic strings or manifest data.

## Layout & Spacing

The layout follows a **Fluid Grid** model designed for media-heavy galleries. 

### Gallery System
- **Desktop:** 12-column grid. Gallery items should default to a 3 or 4-column span (approx. 20 items per page). 
- **Media Detail:** A split-view layout. The image occupies a flexible primary area (Path A), while the Metadata/C2PA panel (Path B) is a fixed 400px sidebar on desktop, or a bottom-sheet on mobile.
- **Rhythm:** Use a baseline 8px (0.5rem) increment system. 

### Breakpoints
- **Mobile (< 768px):** 2-column grid for thumbnails. Metadata panels become full-screen overlays.
- **Tablet (768px - 1024px):** 3-column grid. 
- **Desktop (> 1024px):** 4 to 6 column grid depending on user-selected density settings.

## Elevation & Depth

Depth is used to represent "Permissions" and "Provenance Layers" rather than physical height.

- **Tonal Layers:** The background uses `slate-900`. Secondary containers (cards, sidebars) use `slate-800` to create subtle separation.
- **C2PA Progressive Disclosure:**
    - **Level 1 (Surface):** Small, low-profile badges directly on image cards.
    - **Level 2 (Interaction):** Hover states or side-panels with soft ambient shadows (8% opacity, 16px blur) to suggest temporary focus.
    - **Level 3 (Full Provenance):** A dedicated "Modal Space" or expanded sidebar that pushes the main content back, using a backdrop blur (12px) to focus the user on the audit trail.
- **Borders:** Use 1px solid borders in `slate-700` for primary element separation, maintaining a crisp, technical look.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a clean, modern edge that feels precise but approachable. 

- **Thumbnails:** Use `rounded-sm` (4px) to maximize the visible area of the photo while softening the grid.
- **Buttons & Inputs:** `rounded-sm` (4px) to maintain the technical, tool-like feel.
- **Status Indicators:** Small circles (pills) for C2PA status to align with industry standards for "Content Credentials" indicators.
- **Panels:** Use `rounded-lg` (8px) for larger container units like the C2PA Level 3 modal.

## Components

### Buttons & Chips
- **Primary Action:** Solid `atproto-blue` with white text.
- **Status Chips:** Use a subtle background (10% opacity) of the status color (e.g., Public/Unlisted) with a bold 1px left-border of the same color.
- **C2PA Badge:** A small "CR" (Content Credentials) icon button that changes color based on validation state (Trusted, Valid, Invalid).

### Media Cards
- Aspect-ratio locked thumbnails (default 3:2 or 1:1). 
- Bottom-aligned gradient overlay for Level 1 C2PA indicators and visibility badges.
- Optimistic UI state: Show a 50% opacity "Uploading" overlay with a linear progress bar at the bottom during file transfer.

### C2PA Panels (Provenance)
- **Level 2 (Summary):** A clean vertical list showing "Created," "Edited," and "Published" with timestamps in `metadata-code`.
- **Level 3 (Audit):** A nested tree structure showing the ingredient chain. Use monospaced font for all DID and Public Key displays.

### Inputs & Metadata Fields
- Field labels use `label-caps`. 
- Input backgrounds are 1-step lighter than the container background to suggest interactability.
- Error states (Upload failures, Access Denied) must be actionable, providing a "Retry" or "Request Access" button immediately.

### Theme toggle
- **Placement:** Header utility cluster (sun/moon icon) and **Settings** screen (labeled "Appearance" section with Dark / Light / System options).
- **Control:** Toggle or segmented control; MUST expose accessible name ("Color scheme", "Dark mode", "Light mode").
- **Default:** `themes.default` (dark) when no saved preference exists; if **System** is selected, follow `prefers-color-scheme` media query.
- **Persistence:** Store user choice in `localStorage` key `atpix-color-scheme` (`dark` | `light` | `system`).
- **Transition:** Instant theme swap (no animated flash); re-render token-backed surfaces only, not photo pixels.
- **Contrast:** Both themes MUST meet WCAG 2.x AA for body text and C2PA disclosure labels.
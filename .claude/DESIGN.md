# Design System: Tactical Intelligence & Hero Analytics

## 1. Overview & Creative North Star: "The Digital Archivist"
The Creative North Star for this system is **The Digital Archivist**. We are not building a website; we are designing a high-clearance, encrypted terminal used by strategic intelligence agencies to monitor enhanced individuals.

To move beyond "standard" dark mode, this system rejects the "flat box" mentality. It utilizes **asymmetric data density**, where technical meta-data (monospaced) flanks high-impact cinematic imagery. We break the template look by using "scan-line" overlays and "HUD" (Heads-Up Display) framing, creating a sense of depth that feels like looking through a high-tech glass console.

---

## 2. Colors & Surface Logic
The palette is rooted in an ultra-dark void, punctuated by high-energy "Status Reds" and "Hero-Specific" secondary accents.

### The Surface Hierarchy (Nesting depth)
Instead of borders, we define space through the `surface-container` tiers.
*   **Base Layer (`surface` / `#131317`):** The infinite void. Used for the furthest background.
*   **Declassified Zones (`surface-container-low` / `#1b1b1f`):** Used for large content sections.
*   **Active Modules (`surface-container-high` / `#2a292e`):** Used for interactive cards or data modules.
*   **High-Clearance Overlays (`surface-container-highest` / `#353439`):** Used for tooltips and modal dialogs.

### Rules of Engagement
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Define boundaries through background shifts. For example, a `surface-container-low` sidebar sitting directly on a `surface` background.
*   **The Glass & Gradient Rule:** For hero-specific modules, use glassmorphism. Apply `surface-variant` with a 40% opacity and a `20px` backdrop-blur. 
*   **Signature Textures:** Main CTAs must use a subtle linear gradient from `primary` (#ffb4ac) to `primary_container` (#e8001c) at a 135-degree angle to simulate glowing energy.

---

## 3. Typography: The Narrative Hierarchy
The typography acts as the interface’s "voice"—alternating between loud, heroic declarations and cold, calculated data.

*   **Display & Headlines (Epilogue):** These are your "Impact" fonts. Use `display-lg` for Hero names. The wide, aggressive stance of Epilogue mirrors the Marvel cinematic aesthetic.
*   **Technical Data (Space Grotesk):** All UI labels, stats (Power Levels, Agility, etc.), and "Top Secret" stamps use Space Grotesk. Its monospaced feel conveys precision and "classified" reporting.
*   **Visual Weight:** Always pair a `display-lg` title with a `label-sm` technical serial number (e.g., "S.H.I.E.L.D. FILE // 882-B") to ground the heroics in a tactical context.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to indicate elevation; we use light emission and layering.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a recessed, "slotted-in" look, common in military hardware.
*   **Ambient Glows:** Instead of shadows, use "Glows." For high-importance elements (like an active Iron Man profile), use a 12px blur of `primary_container` (#e8001c) at 15% opacity behind the component to simulate a CRT screen glow.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use the `outline-variant` token at **15% opacity**. This creates a "hairline" feel that suggests a laser-etched edge rather than a drawn line.

---

## 5. Components

### 5.1 Buttons (Tactical Triggers)
*   **Primary:** Solid `primary_container` (#e8001c). No border-radius (`0px`). Text is `on_primary_fixed` (all-caps). On hover, add a `primary` outer glow.
*   **Secondary/Ghost:** `outline` stroke at 20% opacity. Text is `primary`. On hover, the background fills with a 10% opacity `primary` tint.

### 5.2 Data Modules (Cards)
*   **Rule:** Forbid divider lines.
*   **Structure:** Use `spacing-8` (1.75rem) of vertical white space to separate the Hero image from the bio. Use a `surface-container-highest` background for the "Stat Block" to distinguish it from the "Biography" text without using a line.

### 5.3 HUD Chips
*   Used for "Status: Active," "Clearance: Level 7," or "Location: Unknown."
*   **Style:** `0px` radius. Monospaced `label-sm` text. Background is `surface-bright` with a left-side 2px accent bar of the `primary` color.

### 5.4 Scan-line Overlays (Signature Component)
*   Apply a global CSS overlay of repeating linear gradients (0.5px lines) across hero images. This reinforces the "database" aesthetic and unifies disparate hero photography into a single visual language.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use intentional asymmetry. Offset a hero's stat block to the right while the name sits pinned to the bottom left.
*   **Do** use `secondary_container` (Gold) for high-value data visualizations (e.g., power charts or Stark Tech schematics).
*   **Do** keep all corners at `0px`. Roundness kills the technical, "classified" feel.

### Don’t:
*   **Don’t** use pure white. The brightest text should be `on_surface` (#e5e1e7). Pure white breaks the cinematic immersion.
*   **Don’t** use standard transitions. Use "glitch" or "stutter" animations (0.1s steps) for hover states to mimic a loading terminal.
*   **Don’t** use traditional "Card" shadows. If an element needs to pop, increase its `surface-container` tier or add a subtle colored glow.

---

## 7. Spacing & Rhythm
The system uses a generous spacing scale to allow the "technical" elements room to breathe. Use `spacing-16` (3.5rem) for major section breaks to ensure the UI feels editorial and premium, rather than cluttered and "app-like."
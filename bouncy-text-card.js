class BouncyTextCard extends HTMLElement {
  static defaults() {
    return {
      text: "DVD",
      mode: "icon",
      icon: "mdi:home-assistant",
      entity: "",
      entity_prefix: "",
      entity_suffix: "",
      show_unit: true,

      height: 240,
      speed: 1.15,
      size: 58,
      jitter: 0.008,

      logo_color: "#38bdf8",
      logo_opacity: 1,

      background_color: "#111827",
      background_color_mode: "static",
      background_opacity: 1,

      card_radius: "22px",
      card_padding: 14,

      card_border_width: 1,
      card_border_color: "#ffffff",
      card_border_opacity: 0.16,

      card_shadow: true,
      card_shadow_color: "rgba(0, 0, 0, 0.45)",
      card_shadow_blur: 28,
      card_shadow_spread: 0,
      card_shadow_offset_x: 0,
      card_shadow_offset_y: 10,

      card_shine: true,
      card_shine_opacity: 0.14,
      card_shine_size: 62,
      card_shine_position: 0,
      card_shine_angle: 145,
      shine_layer: "above_logo",

      plot_background_color: "#020617",
      plot_background_color_mode: "static",
      plot_background_opacity: 1,
      plot_background_radius: 14,

      bounce_padding: 0,

      show_bounds: false,
      bounds_color: "#ffffff",
      bounds_width: 1,
      bounds_opacity: 0.14,
      bounds_style: "dashed",

      show_debug: false,
      show_bounce_counter: false,
      show_corner_counter: true,
      pause_on_tap: true,
      random_start: true,
      change_color_on_bounce: true,

      corner_celebration: true,
      corner_threshold: null,
      corner_text: "NICE!",
      corner_duration: 650,
      corner_text_duration: 650,
      corner_text_color: "#ffffff",
      corner_background_color: "rgba(250, 204, 21, 0.25)",
      corner_border_color: "#facc15",
      corner_glow_color: "rgba(250, 204, 21, 0.55)",

      corner_flash: true,
      corner_flash_color: "#facc15",
      corner_flash_opacity: 0.2,
      corner_flash_duration: 500,

      corner_confetti: true,
      corner_confetti_count: 14,
      corner_confetti_colors: "#facc15,#38bdf8,#fb7185,#22c55e,#a78bfa",
      corner_confetti_duration: 850,
      corner_confetti_spread: 80,

      corner_border_chase: true,
      corner_border_chase_color: "#facc15",
      corner_border_chase_width: 3,
      corner_border_chase_duration: 900,

      background: undefined,
      text_color: undefined,
      border_color: undefined,
      border_width: undefined,
      border_radius: undefined,
      padding: undefined,
    };
  }

  static getStubConfig() {
    return BouncyTextCard.defaults();
  }

  static getConfigForm() {
    const colourModes = [
      { value: "static", label: "Static colour" },
      { value: "none", label: "Transparent / none" },
    ];

    const borderStyles = [
      { value: "solid", label: "Solid" },
      { value: "dashed", label: "Dashed" },
      { value: "dotted", label: "Dotted" },
    ];

    return {
      schema: [
        {
          type: "expandable",
          name: "content",
          title: "Content",
          icon: "mdi:format-text-variant-outline",
          flatten: true,
          schema: [
            {
              name: "mode",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "icon", label: "Icon" },
                    { value: "text", label: "Text" },
                    { value: "entity", label: "Entity state" },
                  ],
                },
              },
            },
            { name: "icon", selector: { icon: {} } },
            { name: "text", selector: { text: {} } },
            { name: "entity", selector: { entity: {} } },
            { name: "entity_prefix", selector: { text: {} } },
            { name: "entity_suffix", selector: { text: {} } },
            { name: "show_unit", selector: { boolean: {} } },
          ],
        },

        {
          type: "expandable",
          name: "motion",
          title: "Motion",
          icon: "mdi:orbit",
          flatten: true,
          schema: [
            { name: "height", selector: { number: { min: 80, max: 800, step: 1, mode: "box" } } },
            { name: "size", selector: { number: { min: 8, max: 220, step: 1, mode: "box" } } },
            { name: "speed", selector: { number: { min: 0.1, max: 10, step: 0.05, mode: "box" } } },
            { name: "jitter", selector: { number: { min: 0, max: 0.1, step: 0.001, mode: "box" } } },
            { name: "random_start", selector: { boolean: {} } },
            { name: "pause_on_tap", selector: { boolean: {} } },
          ],
        },

        {
          type: "expandable",
          name: "card_surface",
          title: "Card surface",
          icon: "mdi:card-outline",
          flatten: true,
          schema: [
            { name: "background_color", selector: { text: {} } },
            { name: "background_color_mode", selector: { select: { mode: "dropdown", options: colourModes } } },
            { name: "background_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },

            { name: "card_radius", selector: { text: {} } },
            { name: "card_padding", selector: { number: { min: 0, max: 80, step: 1, mode: "slider" } } },

            { name: "card_border_width", selector: { number: { min: 0, max: 20, step: 1, mode: "slider" } } },
            { name: "card_border_color", selector: { text: {} } },
            { name: "card_border_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },

            { name: "card_shadow", selector: { boolean: {} } },
            { name: "card_shadow_color", selector: { text: {} } },
            { name: "card_shadow_blur", selector: { number: { min: 0, max: 80, step: 1, mode: "slider" } } },
            { name: "card_shadow_spread", selector: { number: { min: -20, max: 40, step: 1, mode: "slider" } } },
            { name: "card_shadow_offset_x", selector: { number: { min: -40, max: 40, step: 1, mode: "slider" } } },
            { name: "card_shadow_offset_y", selector: { number: { min: -40, max: 40, step: 1, mode: "slider" } } },

            { name: "card_shine", selector: { boolean: {} } },
            {
              name: "shine_layer",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "below_logo", label: "Below bouncing icon/text" },
                    { value: "above_logo", label: "Above bouncing icon/text" },
                  ],
                },
              },
            },
            { name: "card_shine_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "card_shine_size", selector: { number: { min: 0, max: 100, step: 1, mode: "slider", unit_of_measurement: "%" } } },
            { name: "card_shine_position", selector: { number: { min: -100, max: 100, step: 1, mode: "slider", unit_of_measurement: "%" } } },
            { name: "card_shine_angle", selector: { number: { min: 0, max: 360, step: 5, mode: "slider", unit_of_measurement: "°" } } },
          ],
        },

        {
          type: "expandable",
          name: "bounce_arena",
          title: "Bounce arena",
          icon: "mdi:selection-drag",
          flatten: true,
          schema: [
            { name: "plot_background_color", selector: { text: {} } },
            { name: "plot_background_color_mode", selector: { select: { mode: "dropdown", options: colourModes } } },
            { name: "plot_background_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "plot_background_radius", selector: { number: { min: 0, max: 80, step: 1, mode: "slider" } } },

            { name: "bounce_padding", selector: { number: { min: 0, max: 100, step: 1, mode: "slider" } } },

            { name: "show_bounds", selector: { boolean: {} } },
            { name: "bounds_color", selector: { text: {} } },
            { name: "bounds_width", selector: { number: { min: 0, max: 12, step: 1, mode: "slider" } } },
            { name: "bounds_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "bounds_style", selector: { select: { mode: "dropdown", options: borderStyles } } },
          ],
        },

        {
          type: "expandable",
          name: "logo_text",
          title: "Logo / text",
          icon: "mdi:home-assistant",
          flatten: true,
          schema: [
            { name: "logo_color", selector: { text: {} } },
            { name: "logo_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "change_color_on_bounce", selector: { boolean: {} } },
          ],
        },

        {
          type: "expandable",
          name: "corner_celebration",
          title: "Corner celebration",
          icon: "mdi:party-popper",
          flatten: true,
          schema: [
            { name: "corner_celebration", selector: { boolean: {} } },
            { name: "corner_text", selector: { text: {} } },
            { name: "corner_text_duration", selector: { number: { min: 100, max: 3000, step: 50, mode: "slider", unit_of_measurement: "ms" } } },
            { name: "corner_threshold", selector: { number: { min: 0, max: 60, step: 1, mode: "box" } } },
            { name: "corner_text_color", selector: { text: {} } },
            { name: "corner_background_color", selector: { text: {} } },
            { name: "corner_border_color", selector: { text: {} } },
            { name: "corner_glow_color", selector: { text: {} } },

            { name: "corner_flash", selector: { boolean: {} } },
            { name: "corner_flash_color", selector: { text: {} } },
            { name: "corner_flash_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "corner_flash_duration", selector: { number: { min: 100, max: 3000, step: 50, mode: "slider", unit_of_measurement: "ms" } } },

            { name: "corner_confetti", selector: { boolean: {} } },
            { name: "corner_confetti_count", selector: { number: { min: 0, max: 40, step: 1, mode: "slider" } } },
            { name: "corner_confetti_colors", selector: { text: {} } },
            { name: "corner_confetti_duration", selector: { number: { min: 100, max: 3000, step: 50, mode: "slider", unit_of_measurement: "ms" } } },
            { name: "corner_confetti_spread", selector: { number: { min: 20, max: 180, step: 5, mode: "slider" } } },

            { name: "corner_border_chase", selector: { boolean: {} } },
            { name: "corner_border_chase_color", selector: { text: {} } },
            { name: "corner_border_chase_width", selector: { number: { min: 1, max: 12, step: 1, mode: "slider" } } },
            { name: "corner_border_chase_duration", selector: { number: { min: 100, max: 3000, step: 50, mode: "slider", unit_of_measurement: "ms" } } },
          ],
        },

        {
          type: "expandable",
          name: "debug",
          title: "Counters & debug",
          icon: "mdi:bug-outline",
          flatten: true,
          schema: [
            { name: "show_corner_counter", selector: { boolean: {} } },
            { name: "show_bounce_counter", selector: { boolean: {} } },
            { name: "show_debug", selector: { boolean: {} } },
          ],
        },
      ],
      computeLabel: BouncyTextCard.label,
      computeHelper: BouncyTextCard.helper,
    };
  }

  static label(schema) {
    const labels = {
      mode: "Mode",
      text: "Text",
      icon: "Icon",
      entity: "Entity",
      entity_prefix: "Entity prefix",
      entity_suffix: "Entity suffix",
      show_unit: "Show unit",

      height: "Card height",
      size: "Text / icon size",
      speed: "Speed",
      jitter: "Jitter",
      random_start: "Random start",
      pause_on_tap: "Pause on tap",

      logo_color: "Logo/text colour",
      logo_opacity: "Logo/text opacity",

      background_color: "Card background colour",
      background_color_mode: "Card background colour mode",
      background_opacity: "Card background opacity",
      card_radius: "Card corner radius",
      card_padding: "Card padding",
      card_border_width: "Card border width",
      card_border_color: "Card border colour",
      card_border_opacity: "Card border opacity",
      card_shadow: "Show card shadow",
      card_shadow_color: "Card shadow colour",
      card_shadow_blur: "Card shadow blur",
      card_shadow_spread: "Card shadow spread",
      card_shadow_offset_x: "Card shadow horizontal offset",
      card_shadow_offset_y: "Card shadow vertical offset",
      card_shine: "Show card shine",
      shine_layer: "Shine layer",
      card_shine_opacity: "Card shine opacity",
      card_shine_size: "Card shine size",
      card_shine_position: "Card shine position",
      card_shine_angle: "Card shine angle",

      plot_background_color: "Bounce arena background colour",
      plot_background_color_mode: "Bounce arena background colour mode",
      plot_background_opacity: "Bounce arena background opacity",
      plot_background_radius: "Bounce arena corner radius",
      bounce_padding: "Bounce region padding",

      show_bounds: "Show bounds",
      bounds_color: "Bounds colour",
      bounds_width: "Bounds width",
      bounds_opacity: "Bounds opacity",
      bounds_style: "Bounds style",

      change_color_on_bounce: "Change colour on bounce",

      corner_celebration: "Corner celebration",
      corner_text: "Corner text",
      corner_text_duration: "Celebration text duration",
      corner_threshold: "Corner threshold",
      corner_text_color: "Corner text colour",
      corner_background_color: "Corner text background",
      corner_border_color: "Corner border colour",
      corner_glow_color: "Corner glow colour",

      corner_flash: "Screen flash",
      corner_flash_color: "Screen flash colour",
      corner_flash_opacity: "Screen flash opacity",
      corner_flash_duration: "Screen flash duration",

      corner_confetti: "Mini confetti",
      corner_confetti_count: "Confetti pieces",
      corner_confetti_colors: "Confetti colours",
      corner_confetti_duration: "Confetti duration",
      corner_confetti_spread: "Confetti spread",

      corner_border_chase: "Border chase",
      corner_border_chase_color: "Border chase colour",
      corner_border_chase_width: "Border chase width",
      corner_border_chase_duration: "Border chase duration",

      show_corner_counter: "Show corner counter",
      show_bounce_counter: "Show bounce counter",
      show_debug: "Show debug overlay",
    };

    return labels[schema.name] || schema.name;
  }

  static helper(schema) {
    const helpers = {
      mode: "Choose whether to bounce an icon, text, or an entity state.",
      icon: "Pick an MDI icon, for example mdi:home-assistant.",
      text: "Text shown when mode is set to text.",
      entity: "Pick the entity whose state should bounce around the card.",
      entity_prefix: "Optional text shown before the entity state.",
      entity_suffix: "Optional text shown after the entity state.",
      show_unit: "Append the entity unit of measurement when available.",

      speed: "Movement speed per animation frame. Lower values are calmer.",
      jitter: "Tiny angle variation after each bounce. Set to 0 for strict DVD-style reflection.",
      random_start: "Start from a random position and direction.",
      pause_on_tap: "Tap the card to pause or resume the animation.",

      card_shine: "Adds a soft decorative light sweep over the full card, including the bounce arena.",
      shine_layer: "Choose whether the shine passes over or behind the bouncing icon/text.",
      card_padding: "Outer padding between the card edge and the bounce arena.",
      plot_background_color: "Background colour for the inner bounce arena.",
      bounce_padding: "Inset the invisible bounce region so the logo stays away from the screen edges.",
      show_bounds: "Draws the actual collision area.",

      corner_threshold: "How close to both edges counts as a corner hit. Leave blank for automatic.",
      corner_text_duration: "How long the central celebration text remains visible.",
      corner_flash: "Briefly flashes the bounce arena/screen when a corner is hit.",
      corner_confetti: "Creates a small confetti burst from the hit corner.",
      corner_confetti_colors: "Comma-separated list of confetti colours.",
      corner_border_chase: "Runs a quick animated highlight around the screen border.",
      show_debug: "Shows position, direction, speed and size data.",
    };

    return helpers[schema.name] || "";
  }

  setConfig(config) {
    this.c = { ...BouncyTextCard.defaults(), ...config };
    this.applyLegacyAliases(config || {});

    const s = Number(this.c.speed) || 1.25;
    this.x = 20;
    this.y = 20;
    this.dx = s;
    this.dy = s;
    this.w = 0;
    this.h = 0;
    this.ready = false;
    this.paused = false;
    this.bounces = 0;
    this.corners = 0;
    this.cornerLatch = false;
    this.colour = 0;
    this.colours = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"];

    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  applyLegacyAliases(config) {
    if (config.background !== undefined && config.background_color === undefined) this.c.background_color = config.background;
    if (config.text_color !== undefined && config.logo_color === undefined) this.c.logo_color = config.text_color;
    if (config.border_color !== undefined && config.card_border_color === undefined) this.c.card_border_color = config.border_color;
    if (config.border_width !== undefined && config.card_border_width === undefined) {
      this.c.card_border_width = config.border_width;
      this.c.card_border_opacity = 1;
    }
    if (config.border_radius !== undefined && config.card_radius === undefined) this.c.card_radius = `${config.border_radius}px`;
    if (config.padding !== undefined && config.card_padding === undefined) this.c.card_padding = config.padding;
    if (config.corner_duration !== undefined && config.corner_text_duration === undefined) this.c.corner_text_duration = config.corner_duration;
  }

  set hass(hass) {
    this._hass = hass;
    this.updateEntity();
  }

  connectedCallback() {
    this.start();
  }

  disconnectedCallback() {
    if (this.raf) cancelAnimationFrame(this.raf);
    clearTimeout(this.cornerTextTimer);
    clearTimeout(this.flashTimer);
    clearTimeout(this.chaseTimer);
    this.raf = null;
  }

  render() {
    const c = this.c;
    const h = Number(c.height) || 220;
    const s = Number(c.size) || 56;
    const cp = Number(c.card_padding) || 0;
    const bp = Math.max(0, Number(c.bounce_padding) || 0);

    const cardBg = this.resolveColor(c.background_color, c.background_color_mode, c.background_opacity);
    const plotBg = this.resolveColor(c.plot_background_color, c.plot_background_color_mode, c.plot_background_opacity);
    const borderColor = this.resolveColor(c.card_border_color, "static", c.card_border_opacity);
    const boundsColor = this.resolveColor(c.bounds_color, "static", c.bounds_opacity);
    const shadow = this.cardShadow();
    const counters = this.bool(c.show_bounce_counter) || this.bool(c.show_corner_counter);
    const shineZ = c.shine_layer === "below_logo" ? 3 : 5;
    const logoZ = 4;

    const logo =
      c.mode === "icon"
        ? `<ha-icon id="logo" class="logo" icon="${this.esc(c.icon)}"></ha-icon>`
        : `<div id="logo" class="logo text">${this.esc(c.mode === "entity" ? "Loading…" : c.text)}</div>`;

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          height: ${h}px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          background: ${cardBg};
          border: ${Number(c.card_border_width) || 0}px solid ${borderColor};
          border-radius: ${c.card_radius};
          box-shadow: ${shadow};
          cursor: ${this.bool(c.pause_on_tap) ? "pointer" : "default"};
          transition: box-shadow .16s, border-color .16s;
        }

        .stage {
          position: relative;
          z-index: 2;
          height: 100%;
          box-sizing: border-box;
          padding: ${cp}px;
          overflow: hidden;
        }

        #arena {
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          background: ${plotBg};
          border-radius: ${Number(c.plot_background_radius) || 0}px;
        }

        .bounds {
          display: ${this.bool(c.show_bounds) ? "block" : "none"};
          position: absolute;
          z-index: 2;
          pointer-events: none;
          inset: ${bp}px;
          box-sizing: border-box;
          border: ${Number(c.bounds_width) || 1}px ${c.bounds_style} ${boundsColor};
          border-radius: max(0px, calc(${Number(c.plot_background_radius) || 0}px - ${bp}px));
        }

        .shine {
          display: ${this.bool(c.card_shine) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: ${shineZ};
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(
            ${Number(c.card_shine_angle) || 155}deg,
            rgba(255,255,255,${Number(c.card_shine_opacity) || 0}) 0%,
            rgba(255,255,255,0) ${Number(c.card_shine_size) || 55}%
          );
          transform: translateX(${Number(c.card_shine_position) || 0}%);
        }

        .screen-flash {
          display: ${this.bool(c.corner_flash) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          border-radius: inherit;
          background: ${c.corner_flash_color};
          opacity: 0;
        }

        :host([flash]) .screen-flash {
          animation: bouncy-screen-flash ${Number(c.corner_flash_duration) || 500}ms ease-out both;
        }

        .border-chase {
          display: ${this.bool(c.corner_border_chase) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          border-radius: inherit;
          opacity: 0;
          padding: ${Number(c.corner_border_chase_width) || 3}px;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 250deg,
            ${c.corner_border_chase_color} 292deg,
            transparent 330deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
        }

        :host([chase]) .border-chase {
          animation: bouncy-border-chase ${Number(c.corner_border_chase_duration) || 900}ms linear both;
        }

        .confetti {
          display: ${this.bool(c.corner_confetti) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: 7;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          width: var(--w);
          height: var(--h);
          background: var(--confetti-color);
          border-radius: 2px;
          opacity: 0;
          animation: bouncy-confetti var(--confetti-duration) cubic-bezier(.16,.84,.3,1) forwards;
        }

        .logo {
          position: absolute;
          z-index: ${logoZ};
          left: 0;
          top: 0;
          color: ${c.logo_color};
          opacity: ${Number(c.logo_opacity)};
          user-select: none;
          will-change: transform;
          transition: color .12s, opacity .12s;
        }

        .text {
          font-size: ${s}px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }

        ha-icon.logo {
          width: ${s}px;
          height: ${s}px;
          --mdc-icon-size: ${s}px;
        }

        .overlay {
          position: absolute;
          z-index: 8;
          pointer-events: none;
          font-size: 11px;
          line-height: 1.3;
          color: var(--secondary-text-color);
          background: rgba(0,0,0,.08);
          border-radius: 8px;
          padding: 5px 7px;
          backdrop-filter: blur(4px);
        }

        #pause { top: 8px; left: 8px; }
        #counts { top: 8px; right: 8px; text-align: right; }

        #debug {
          left: 8px;
          bottom: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          white-space: pre;
        }

        #corner {
          display: none;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 22px;
          font-weight: 800;
          color: ${c.corner_text_color};
          background: ${c.corner_background_color};
        }

        :host([paused]) .logo { opacity: .6; }

        :host([corner]) ha-card {
          border-color: ${c.corner_border_color};
          box-shadow:
            ${shadow === "none" ? "" : `${shadow},`}
            0 0 0 3px rgba(250,204,21,.35),
            0 0 22px ${c.corner_glow_color};
        }

        :host([corner]) #corner { display: block; }

        @keyframes bouncy-screen-flash {
          0% { opacity: 0; }
          18% { opacity: ${Number(c.corner_flash_opacity) || 0.2}; }
          100% { opacity: 0; }
        }

        @keyframes bouncy-border-chase {
          0% {
            opacity: 0;
            transform: rotate(0deg);
          }
          12% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(360deg);
          }
        }

        @keyframes bouncy-confetti {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(.4) rotate(0deg);
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform:
              translate(
                calc(-50% + var(--dx)),
                calc(-50% + var(--dy))
              )
              scale(.9)
              rotate(var(--rot));
          }
        }
      </style>

      <ha-card>
        <div class="stage">
          <div id="arena">
            <div class="bounds"></div>
            ${logo}
            <div class="shine"></div>
            <div class="screen-flash"></div>
            <div class="border-chase"></div>
            <div id="confetti" class="confetti"></div>
            ${this.bool(c.pause_on_tap) ? `<div id="pause" class="overlay" hidden>Paused</div>` : ""}
            ${counters ? `
              <div id="counts" class="overlay">
                ${this.bool(c.show_bounce_counter) ? `Bounces: <span id="bounces">0</span><br>` : ""}
                ${this.bool(c.show_corner_counter) ? `Corners: <span id="corners">0</span>` : ""}
              </div>` : ""}
            ${this.bool(c.show_debug) ? `<div id="debug" class="overlay"></div>` : ""}
            <div id="corner" class="overlay">${this.esc(c.corner_text)}</div>
          </div>
        </div>
      </ha-card>
    `;

    this.card = this.shadowRoot.querySelector("ha-card");
    this.arena = this.shadowRoot.querySelector("#arena");
    this.logo = this.shadowRoot.querySelector("#logo");
    this.debug = this.shadowRoot.querySelector("#debug");
    this.bEl = this.shadowRoot.querySelector("#bounces");
    this.cEl = this.shadowRoot.querySelector("#corners");
    this.pEl = this.shadowRoot.querySelector("#pause");
    this.confetti = this.shadowRoot.querySelector("#confetti");

    if (this.card && this.bool(c.pause_on_tap)) this.card.onclick = () => this.togglePause();
    this.updateEntity();
  }

  start() {
    if (this.raf) return;

    const loop = () => {
      if (!this.paused) this.tick();
      if (this.debug) this.updateDebug();
      this.raf = requestAnimationFrame(loop);
    };

    this.raf = requestAnimationFrame(loop);
  }

  tick() {
    if (!this.arena || !this.logo) return;

    const ar = this.arena.getBoundingClientRect();
    const lr = this.logo.getBoundingClientRect();
    if (!ar.width || !ar.height || !lr.width || !lr.height) return;

    const bp = Math.max(0, Number(this.c.bounce_padding) || 0);
    const maxX = Math.max(0, ar.width - lr.width - bp * 2);
    const maxY = Math.max(0, ar.height - lr.height - bp * 2);

    if (!this.ready) {
      this.init(maxX, maxY);
      this.ready = true;
    }

    if (this.w !== ar.width || this.h !== ar.height) {
      this.x = this.clamp(this.x, 0, maxX);
      this.y = this.clamp(this.y, 0, maxY);
      this.w = ar.width;
      this.h = ar.height;
    }

    this.x += this.dx;
    this.y += this.dy;

    const hitX = this.x <= 0 || this.x >= maxX;
    const hitY = this.y <= 0 || this.y >= maxY;

    if (hitX) {
      this.dx *= -1;
      this.x = this.clamp(this.x, 0, maxX);
    }

    if (hitY) {
      this.dy *= -1;
      this.y = this.clamp(this.y, 0, maxY);
    }

    if (!this.isCorner(maxX, maxY)) this.cornerLatch = false;
    if (hitX || hitY) this.bounce(maxX, maxY);

    this.logo.style.transform = `translate(${this.x + bp}px, ${this.y + bp}px)`;
  }

  init(maxX, maxY) {
    if (this.bool(this.c.random_start)) {
      this.x = Math.random() * maxX;
      this.y = Math.random() * maxY;
      this.dx *= Math.random() > 0.5 ? 1 : -1;
      this.dy *= Math.random() > 0.5 ? 1 : -1;
    } else {
      this.x = Math.min(20, maxX);
      this.y = Math.min(20, maxY);
    }
  }

  bounce(maxX, maxY) {
    this.bounces++;
    if (this.bEl) this.bEl.textContent = this.bounces;

    if (this.bool(this.c.change_color_on_bounce)) {
      this.colour = (this.colour + 1) % this.colours.length;
      this.logo.style.color = this.colours[this.colour];
    }

    if (this.bool(this.c.corner_celebration) && this.isCorner(maxX, maxY) && !this.cornerLatch) {
      this.cornerLatch = true;
      this.corners++;
      if (this.cEl) this.cEl.textContent = this.corners;
      this.celebrateCorner(maxX, maxY);
    }

    this.jitter();
  }

  celebrateCorner(maxX, maxY) {
    const corner = this.getCornerInfo(maxX, maxY);

    if (this.bool(this.c.corner_flash)) {
      this.removeAttribute("flash");
      requestAnimationFrame(() => this.setAttribute("flash", ""));
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(
        () => this.removeAttribute("flash"),
        Number(this.c.corner_flash_duration) || 500
      );
    }

    if (this.bool(this.c.corner_border_chase)) {
      this.removeAttribute("chase");
      requestAnimationFrame(() => this.setAttribute("chase", ""));
      clearTimeout(this.chaseTimer);
      this.chaseTimer = setTimeout(
        () => this.removeAttribute("chase"),
        Number(this.c.corner_border_chase_duration) || 900
      );
    }

    this.setAttribute("corner", "");
    clearTimeout(this.cornerTextTimer);
    this.cornerTextTimer = setTimeout(
      () => this.removeAttribute("corner"),
      Number(this.c.corner_text_duration) || Number(this.c.corner_duration) || 650
    );

    if (this.bool(this.c.corner_confetti)) this.makeConfetti(corner);
  }

  getCornerInfo(maxX, maxY) {
    const left = this.x <= maxX / 2;
    const top = this.y <= maxY / 2;

    return {
      x: left ? 0 : this.arena.clientWidth,
      y: top ? 0 : this.arena.clientHeight,
      dx: left ? 1 : -1,
      dy: top ? 1 : -1,
    };
  }

  makeConfetti(corner) {
    if (!this.confetti) return;

    const count = Math.max(0, Number(this.c.corner_confetti_count) || 0);
    const spread = Number(this.c.corner_confetti_spread) || 80;
    const duration = Number(this.c.corner_confetti_duration) || 850;
    const colors = String(this.c.corner_confetti_colors || "#facc15")
      .split(",")
      .map(x => x.trim())
      .filter(Boolean);

    this.confetti.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      const angle = Math.random() * Math.PI / 2;
      const distance = spread * (0.35 + Math.random() * 0.75);
      const dx = Math.cos(angle) * distance * corner.dx;
      const dy = Math.sin(angle) * distance * corner.dy;
      const rot = (Math.random() * 360 - 180).toFixed(0);
      const w = 3 + Math.random() * 4;
      const h = 5 + Math.random() * 8;

      p.className = "confetti-piece";
      p.style.left = `${corner.x}px`;
      p.style.top = `${corner.y}px`;
      p.style.setProperty("--dx", `${dx}px`);
      p.style.setProperty("--dy", `${dy}px`);
      p.style.setProperty("--rot", `${rot}deg`);
      p.style.setProperty("--w", `${w}px`);
      p.style.setProperty("--h", `${h}px`);
      p.style.setProperty("--confetti-duration", `${duration}ms`);
      p.style.setProperty("--confetti-color", colors[i % colors.length]);

      this.confetti.appendChild(p);
    }

    setTimeout(() => {
      if (this.confetti) this.confetti.innerHTML = "";
    }, duration + 80);
  }

  jitter() {
    const j = Number(this.c.jitter) || 0;
    if (!j) return;

    const speed = Math.hypot(this.dx, this.dy);
    const angle = Math.atan2(this.dy, this.dx) + (Math.random() - 0.5) * j;

    this.dx = Math.cos(angle) * speed;
    this.dy = Math.sin(angle) * speed;
  }

  isCorner(maxX, maxY) {
    const fallback = Math.max(3, Math.abs(this.dx), Math.abs(this.dy));
    const t = Number(this.c.corner_threshold) || fallback;
    return (this.x <= t || this.x >= maxX - t) && (this.y <= t || this.y >= maxY - t);
  }

  updateEntity() {
    if (!this.logo || !this._hass || this.c.mode !== "entity") return;

    const e = this._hass.states[this.c.entity];
    if (!e) {
      this.logo.textContent = "Entity unavailable";
      return;
    }

    const unit = this.bool(this.c.show_unit) ? e.attributes.unit_of_measurement || "" : "";
    this.logo.textContent = `${this.c.entity_prefix}${e.state}${unit}${this.c.entity_suffix}`;
  }

  togglePause() {
    this.paused = !this.paused;
    this.toggleAttribute("paused", this.paused);
    if (this.pEl) this.pEl.hidden = !this.paused;
  }

  updateDebug() {
    const ar = this.arena.getBoundingClientRect();
    const lr = this.logo.getBoundingClientRect();
    const bp = Math.max(0, Number(this.c.bounce_padding) || 0);

    this.debug.textContent =
      `mode:${this.c.mode}\n` +
      `x:${this.x.toFixed(1)} y:${this.y.toFixed(1)}\n` +
      `dx:${this.dx.toFixed(2)} dy:${this.dy.toFixed(2)}\n` +
      `speed:${Math.hypot(this.dx, this.dy).toFixed(2)}\n` +
      `padding:${bp}\n` +
      `arena:${Math.round(ar.width)}×${Math.round(ar.height)}\n` +
      `logo:${Math.round(lr.width)}×${Math.round(lr.height)}\n` +
      `paused:${this.paused ? "yes" : "no"}`;
  }

  resolveColor(color, mode = "static", opacity = 1) {
    if (mode === "none" || Number(opacity) <= 0) return "transparent";

    const o = Math.max(0, Math.min(1, Number(opacity)));
    if (o >= 1) return color;

    return `color-mix(in srgb, ${color} ${Math.round(o * 100)}%, transparent)`;
  }

  cardShadow() {
    if (!this.bool(this.c.card_shadow)) return "none";

    return `${Number(this.c.card_shadow_offset_x) || 0}px ${Number(this.c.card_shadow_offset_y) || 0}px ${Number(this.c.card_shadow_blur) || 0}px ${Number(this.c.card_shadow_spread) || 0}px ${this.c.card_shadow_color}`;
  }

  bool(v) {
    return v === true || v === "true";
  }

  clamp(v, min, max) {
    return Math.max(min, Math.min(v, max));
  }

  esc(v) {
    return String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("bouncy-text-card", BouncyTextCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "bouncy-text-card",
  name: "Bouncy Text Card",
  description: "A playful bouncing text, icon, or entity state card.",
});

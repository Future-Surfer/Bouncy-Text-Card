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

      height: 220,
      speed: 1.25,
      size: 56,
      jitter: 0.01,

      // Logo/text styling
      logo_color: "var(--primary-text-color)",
      logo_opacity: 1,

      // Whole-card surface styling, borrowed from Simple Band Graph Card
      background_color: "var(--card-background-color)",
      background_color_mode: "static",
      background_opacity: 1,

      card_radius: "var(--ha-card-border-radius, 12px)",
      card_padding: 16,

      card_border_width: 0,
      card_border_color: "var(--divider-color)",
      card_border_opacity: 0,

      card_shadow: false,
      card_shadow_color: "rgba(0, 0, 0, 0.25)",
      card_shadow_blur: 24,
      card_shadow_spread: 0,
      card_shadow_offset_x: 0,
      card_shadow_offset_y: 8,

      card_shine: false,
      card_shine_opacity: 0.12,
      card_shine_size: 55,
      card_shine_position: 0,
      card_shine_angle: 155,

      // Inner bounce arena / plot-area styling
      plot_background_color: "transparent",
      plot_background_color_mode: "none",
      plot_background_opacity: 0,
      plot_background_radius: 8,

      // Bounds styling
      show_bounds: true,
      bounds_color: "var(--divider-color)",
      bounds_width: 1,
      bounds_opacity: 0.6,
      bounds_style: "dashed",

      show_debug: false,
      show_bounce_counter: false,
      show_corner_counter: true,
      pause_on_tap: true,
      random_start: true,
      change_color_on_bounce: true,

      corner_celebration: true,
      corner_threshold: null,
      corner_text: "CORNER!",
      corner_duration: 650,
      corner_text_color: "var(--primary-text-color)",
      corner_background_color: "rgba(250, 204, 21, 0.25)",
      corner_border_color: "var(--accent-color, #facc15)",
      corner_glow_color: "rgba(250, 204, 21, 0.45)",

      // Legacy aliases, still accepted if present in old YAML
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

  static getConfigElement() {
    return document.createElement("bouncy-text-card-editor");
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
    this.colours = [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#22c55e",
      "#06b6d4",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
    ];

    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  applyLegacyAliases(config) {
    if (config.background !== undefined && config.background_color === undefined) {
      this.c.background_color = config.background;
    }
    if (config.text_color !== undefined && config.logo_color === undefined) {
      this.c.logo_color = config.text_color;
    }
    if (config.border_color !== undefined && config.card_border_color === undefined) {
      this.c.card_border_color = config.border_color;
    }
    if (config.border_width !== undefined && config.card_border_width === undefined) {
      this.c.card_border_width = config.border_width;
      this.c.card_border_opacity = 1;
    }
    if (config.border_radius !== undefined && config.card_radius === undefined) {
      this.c.card_radius = `${config.border_radius}px`;
    }
    if (config.padding !== undefined && config.card_padding === undefined) {
      this.c.card_padding = config.padding;
    }
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
    clearTimeout(this.cornerTimer);
    this.raf = null;
  }

  render() {
    const c = this.c;
    const h = Number(c.height) || 220;
    const s = Number(c.size) || 56;
    const cp = Number(c.card_padding) || 0;

    const cardBg = this.resolveColor(c.background_color, c.background_color_mode, c.background_opacity);
    const plotBg = this.resolveColor(c.plot_background_color, c.plot_background_color_mode, c.plot_background_opacity);
    const borderColor = this.resolveColor(c.card_border_color, "static", c.card_border_opacity);
    const boundsColor = this.resolveColor(c.bounds_color, "static", c.bounds_opacity);
    const shadow = this.cardShadow();
    const shine = this.bool(c.card_shine) ? "block" : "none";
    const counters = this.bool(c.show_bounce_counter) || this.bool(c.show_corner_counter);

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

        ha-card::before {
          content: "";
          display: ${shine};
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          border-radius: inherit;
          background: linear-gradient(
            ${Number(c.card_shine_angle) || 155}deg,
            rgba(255,255,255,${Number(c.card_shine_opacity) || 0}) 0%,
            rgba(255,255,255,0) ${Number(c.card_shine_size) || 55}%
          );
          transform: translateX(${Number(c.card_shine_position) || 0}%);
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
          border: ${this.bool(c.show_bounds) ? `${Number(c.bounds_width) || 1}px ${c.bounds_style} ${boundsColor}` : "none"};
          border-radius: ${Number(c.plot_background_radius) || 0}px;
        }

        .logo {
          position: absolute;
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
          z-index: 3;
          pointer-events: none;
          font-size: 11px;
          line-height: 1.3;
          color: var(--secondary-text-color);
          background: rgba(0,0,0,.08);
          border-radius: 8px;
          padding: 5px 7px;
          backdrop-filter: blur(4px);
        }

        #pause {
          top: 8px;
          left: 8px;
        }

        #counts {
          top: 8px;
          right: 8px;
          text-align: right;
        }

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

        :host([paused]) .logo {
          opacity: .6;
        }

        :host([corner]) ha-card {
          border-color: ${c.corner_border_color};
          box-shadow:
            ${shadow === "none" ? "" : `${shadow},`}
            0 0 0 3px rgba(250,204,21,.35),
            0 0 22px ${c.corner_glow_color};
        }

        :host([corner]) #corner {
          display: block;
        }
      </style>

      <ha-card>
        <div class="stage">
          <div id="arena">
            ${logo}
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

    const maxX = Math.max(0, ar.width - lr.width);
    const maxY = Math.max(0, ar.height - lr.height);

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

    this.logo.style.transform = `translate(${this.x}px, ${this.y}px)`;
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
      this.setAttribute("corner", "");
      clearTimeout(this.cornerTimer);
      this.cornerTimer = setTimeout(
        () => this.removeAttribute("corner"),
        Number(this.c.corner_duration) || 650
      );
    }

    this.jitter();
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

    this.debug.textContent =
      `mode:${this.c.mode}\n` +
      `x:${this.x.toFixed(1)} y:${this.y.toFixed(1)}\n` +
      `dx:${this.dx.toFixed(2)} dy:${this.dy.toFixed(2)}\n` +
      `speed:${Math.hypot(this.dx, this.dy).toFixed(2)}\n` +
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

class BouncyTextCardEditor extends HTMLElement {
  setConfig(config) {
    this.rawConfig = { ...config };
    this.config = { ...BouncyTextCard.defaults(), ...config };
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this.forms) Object.values(this.forms).forEach(form => form.hass = hass);
  }

  render() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .editor {
          display: grid;
          gap: 16px;
        }
        .section {
          border: 1px solid var(--divider-color);
          border-radius: 12px;
          padding: 12px;
        }
        .title {
          font-weight: 600;
          color: var(--primary-text-color);
          margin: 0 0 8px;
        }
        .hint {
          margin: 0 0 12px;
          color: var(--secondary-text-color);
          font-size: 12px;
          line-height: 1.4;
        }
      </style>

      <div class="editor">
        ${this.section("content", "Content", "Choose what bounces around the card.")}
        ${this.section("motion", "Motion", "Control the movement and size.")}
        ${this.section("card", "Card surface", "Style the outer card background, padding, border, shadow and shine.")}
        ${this.section("arena", "Bounce arena", "Style the inner bounce area and visible bounds.")}
        ${this.section("logo", "Logo/text", "Style the bouncing icon, text, or entity state.")}
        ${this.section("corner", "Corner & debug", "Configure the corner celebration and development helpers.")}
      </div>
    `;

    this.forms = {};
    ["content", "motion", "card", "arena", "logo", "corner"].forEach(key => {
      const form = this.shadowRoot.querySelector(`#${key}`);
      this.forms[key] = form;
      form.hass = this._hass;
      form.data = this.config;
      form.schema = this.schema(key);
      form.computeLabel = this.label;
      form.computeHelper = this.helper;
      form.addEventListener("value-changed", e => this.changed(e));
    });
  }

  section(id, title, hint) {
    return `
      <div class="section">
        <div class="title">${title}</div>
        <div class="hint">${hint}</div>
        <ha-form id="${id}"></ha-form>
      </div>
    `;
  }

  schema(section) {
    const mode = this.config.mode || "icon";

    const content = [
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
    ];

    if (mode === "icon") content.push({ name: "icon", selector: { icon: {} } });
    if (mode === "text") content.push({ name: "text", selector: { text: {} } });
    if (mode === "entity") {
      content.push(
        { name: "entity", selector: { entity: {} } },
        { name: "entity_prefix", selector: { text: {} } },
        { name: "entity_suffix", selector: { text: {} } },
        { name: "show_unit", selector: { boolean: {} } }
      );
    }

    const colourModes = [
      { value: "static", label: "Static colour" },
      { value: "none", label: "Transparent / none" },
    ];

    return {
      content,

      motion: [
        { name: "height", selector: { number: { min: 80, max: 800, step: 1, mode: "box" } } },
        { name: "size", selector: { number: { min: 8, max: 220, step: 1, mode: "box" } } },
        { name: "speed", selector: { number: { min: 0.1, max: 10, step: 0.05, mode: "box" } } },
        { name: "jitter", selector: { number: { min: 0, max: 0.1, step: 0.001, mode: "box" } } },
        { name: "random_start", selector: { boolean: {} } },
        { name: "pause_on_tap", selector: { boolean: {} } },
      ],

      card: [
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
        { name: "card_shine_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
        { name: "card_shine_size", selector: { number: { min: 0, max: 100, step: 1, mode: "slider", unit_of_measurement: "%" } } },
        { name: "card_shine_position", selector: { number: { min: -100, max: 100, step: 1, mode: "slider", unit_of_measurement: "%" } } },
        { name: "card_shine_angle", selector: { number: { min: 0, max: 360, step: 5, mode: "slider", unit_of_measurement: "°" } } },
      ],

      arena: [
        { name: "plot_background_color", selector: { text: {} } },
        { name: "plot_background_color_mode", selector: { select: { mode: "dropdown", options: colourModes } } },
        { name: "plot_background_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
        { name: "plot_background_radius", selector: { number: { min: 0, max: 80, step: 1, mode: "slider" } } },
        { name: "show_bounds", selector: { boolean: {} } },
        { name: "bounds_color", selector: { text: {} } },
        { name: "bounds_width", selector: { number: { min: 0, max: 12, step: 1, mode: "slider" } } },
        { name: "bounds_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
        {
          name: "bounds_style",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ],
            },
          },
        },
      ],

      logo: [
        { name: "logo_color", selector: { text: {} } },
        { name: "logo_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
        { name: "change_color_on_bounce", selector: { boolean: {} } },
      ],

      corner: [
        { name: "corner_celebration", selector: { boolean: {} } },
        { name: "corner_text", selector: { text: {} } },
        { name: "corner_duration", selector: { number: { min: 100, max: 3000, step: 50, mode: "box", unit_of_measurement: "ms" } } },
        { name: "corner_threshold", selector: { number: { min: 0, max: 60, step: 1, mode: "box" } } },
        { name: "corner_text_color", selector: { text: {} } },
        { name: "corner_background_color", selector: { text: {} } },
        { name: "corner_border_color", selector: { text: {} } },
        { name: "corner_glow_color", selector: { text: {} } },
        { name: "show_corner_counter", selector: { boolean: {} } },
        { name: "show_bounce_counter", selector: { boolean: {} } },
        { name: "show_debug", selector: { boolean: {} } },
      ],
    }[section] || [];
  }

  changed(e) {
    e.stopPropagation();

    this.config = { ...this.config, ...e.detail.value };

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));

    this.render();
  }

  label(schema) {
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
      card_shine_opacity: "Card shine opacity",
      card_shine_size: "Card shine size",
      card_shine_position: "Card shine position",
      card_shine_angle: "Card shine angle",

      plot_background_color: "Bounce arena background colour",
      plot_background_color_mode: "Bounce arena background colour mode",
      plot_background_opacity: "Bounce arena background opacity",
      plot_background_radius: "Bounce arena corner radius",

      show_bounds: "Show bounds",
      bounds_color: "Bounds colour",
      bounds_width: "Bounds width",
      bounds_opacity: "Bounds opacity",
      bounds_style: "Bounds style",

      change_color_on_bounce: "Change colour on bounce",

      corner_celebration: "Corner celebration",
      corner_text: "Corner text",
      corner_duration: "Corner celebration duration",
      corner_threshold: "Corner threshold",
      corner_text_color: "Corner text colour",
      corner_background_color: "Corner background colour",
      corner_border_color: "Corner border colour",
      corner_glow_color: "Corner glow colour",
      show_corner_counter: "Show corner counter",
      show_bounce_counter: "Show bounce counter",
      show_debug: "Show debug overlay",
    };

    return labels[schema.name] || schema.name;
  }

  helper(schema) {
    const helpers = {
      mode: "Choose whether to bounce an icon, text, or an entity state.",
      icon: "Pick an MDI icon, for example mdi:home-assistant.",
      entity: "Pick the entity whose state should bounce around the card.",
      speed: "Movement speed per animation frame. Lower values are calmer.",
      jitter: "Tiny angle variation after each bounce. Set to 0 for strict DVD-style reflection.",
      card_shine: "Adds a soft decorative light sweep over the card surface.",
      card_padding: "Outer padding between the card edge and the bounce arena.",
      plot_background_color: "Background colour for the inner bounce arena.",
      show_bounds: "Draws the actual collision area.",
      corner_threshold: "How close to both edges counts as a corner hit. Leave blank for automatic.",
      show_debug: "Shows position, direction, speed and size data.",
    };

    return helpers[schema.name] || "";
  }
}

customElements.define("bouncy-text-card", BouncyTextCard);
customElements.define("bouncy-text-card-editor", BouncyTextCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "bouncy-text-card",
  name: "Bouncy Text Card",
  description: "A playful bouncing text, icon, or entity state card.",
});

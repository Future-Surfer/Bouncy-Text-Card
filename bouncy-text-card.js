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

      background: "var(--ha-card-background, var(--card-background-color))",
      text_color: "var(--primary-text-color)",
      border_color: "var(--divider-color)",
      border_width: 2,
      border_style: "solid",
      border_radius: 12,
      padding: 8,

      show_bounds: true,
      show_debug: false,
      show_bounce_counter: false,
      show_corner_counter: true,
      pause_on_tap: true,
      random_start: true,
      change_color_on_bounce: true,
      corner_celebration: true,
      corner_threshold: null,
      corner_text: "CORNER!",
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
    const b = v => v === true || v === "true";
    const h = Number(c.height) || 220;
    const s = Number(c.size) || 56;
    const bw = Number(c.border_width) || 0;
    const br = Number(c.border_radius) || 0;
    const p = Number(c.padding) || 0;

    const counters = b(c.show_bounce_counter) || b(c.show_corner_counter);
    const logo =
      c.mode === "icon"
        ? `<ha-icon id="logo" class="logo" icon="${this.esc(c.icon)}"></ha-icon>`
        : `<div id="logo" class="logo text">${this.esc(c.mode === "entity" ? "Loading…" : c.text)}</div>`;

    this.shadowRoot.innerHTML = `
      <style>
        ha-card {
          height: ${h}px;
          box-sizing: border-box;
          overflow: hidden;
          background: ${c.background};
          border: ${bw}px ${c.border_style} ${c.border_color};
          border-radius: ${br}px;
          cursor: ${b(c.pause_on_tap) ? "pointer" : "default"};
          transition: box-shadow .16s, border-color .16s;
        }
        .stage {
          height: 100%;
          box-sizing: border-box;
          padding: ${p}px;
          overflow: hidden;
        }
        #arena {
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          border: ${b(c.show_bounds) ? "1px dashed rgba(128,128,128,.6)" : "none"};
          border-radius: ${Math.max(0, br - p)}px;
        }
        .logo {
          position: absolute;
          left: 0;
          top: 0;
          color: ${c.text_color};
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
          z-index: 2;
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
          color: var(--primary-text-color);
          background: rgba(250,204,21,.25);
        }
        :host([paused]) .logo { opacity: .6; }
        :host([corner]) ha-card {
          border-color: var(--accent-color, #facc15);
          box-shadow: 0 0 0 3px rgba(250,204,21,.35), 0 0 22px rgba(250,204,21,.45);
        }
        :host([corner]) #corner { display: block; }
      </style>

      <ha-card>
        <div class="stage">
          <div id="arena">
            ${logo}
            ${b(c.pause_on_tap) ? `<div id="pause" class="overlay" hidden>Paused</div>` : ""}
            ${counters ? `
              <div id="counts" class="overlay">
                ${b(c.show_bounce_counter) ? `Bounces: <span id="bounces">0</span><br>` : ""}
                ${b(c.show_corner_counter) ? `Corners: <span id="corners">0</span>` : ""}
              </div>` : ""}
            ${b(c.show_debug) ? `<div id="debug" class="overlay"></div>` : ""}
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

    if (this.card && b(c.pause_on_tap)) this.card.onclick = () => this.togglePause();
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
      this.cornerTimer = setTimeout(() => this.removeAttribute("corner"), 650);
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
    if (this.forms) {
      Object.values(this.forms).forEach(form => form.hass = hass);
    }
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
        <div class="section">
          <div class="title">Content</div>
          <div class="hint">Choose what bounces around the card.</div>
          <ha-form id="content"></ha-form>
        </div>

        <div class="section">
          <div class="title">Motion</div>
          <div class="hint">Control the movement and size.</div>
          <ha-form id="motion"></ha-form>
        </div>

        <div class="section">
          <div class="title">Appearance</div>
          <div class="hint">Style the card and visible arena.</div>
          <ha-form id="appearance"></ha-form>
        </div>

        <div class="section">
          <div class="title">Corner & debug</div>
          <div class="hint">Configure the corner celebration and development helpers.</div>
          <ha-form id="debug"></ha-form>
        </div>
      </div>
    `;

    this.forms = {
      content: this.shadowRoot.querySelector("#content"),
      motion: this.shadowRoot.querySelector("#motion"),
      appearance: this.shadowRoot.querySelector("#appearance"),
      debug: this.shadowRoot.querySelector("#debug"),
    };

    for (const [key, form] of Object.entries(this.forms)) {
      form.hass = this._hass;
      form.data = this.config;
      form.schema = this.schema(key);
      form.computeLabel = this.label;
      form.computeHelper = this.helper;
      form.addEventListener("value-changed", e => this.changed(e));
    }
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

    if (mode === "icon") {
      content.push({
        name: "icon",
        selector: { icon: {} },
      });
    }

    if (mode === "text") {
      content.push({
        name: "text",
        selector: { text: {} },
      });
    }

    if (mode === "entity") {
      content.push(
        { name: "entity", selector: { entity: {} } },
        { name: "entity_prefix", selector: { text: {} } },
        { name: "entity_suffix", selector: { text: {} } },
        { name: "show_unit", selector: { boolean: {} } }
      );
    }

    const schemas = {
      content,

      motion: [
        { name: "height", selector: { number: { min: 80, max: 800, step: 1, mode: "box" } } },
        { name: "size", selector: { number: { min: 8, max: 200, step: 1, mode: "box" } } },
        { name: "speed", selector: { number: { min: 0.1, max: 10, step: 0.05, mode: "box" } } },
        { name: "jitter", selector: { number: { min: 0, max: 0.1, step: 0.001, mode: "box" } } },
        { name: "random_start", selector: { boolean: {} } },
        { name: "pause_on_tap", selector: { boolean: {} } },
      ],

      appearance: [
        { name: "background", selector: { text: {} } },
        { name: "text_color", selector: { text: {} } },
        { name: "border_color", selector: { text: {} } },
        {
          name: "border_style",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
                { value: "none", label: "None" },
              ],
            },
          },
        },
        { name: "border_width", selector: { number: { min: 0, max: 20, step: 1, mode: "box" } } },
        { name: "border_radius", selector: { number: { min: 0, max: 40, step: 1, mode: "box" } } },
        { name: "padding", selector: { number: { min: 0, max: 80, step: 1, mode: "box" } } },
        { name: "show_bounds", selector: { boolean: {} } },
        { name: "change_color_on_bounce", selector: { boolean: {} } },
      ],

      debug: [
        { name: "corner_celebration", selector: { boolean: {} } },
        { name: "corner_text", selector: { text: {} } },
        { name: "corner_threshold", selector: { number: { min: 0, max: 60, step: 1, mode: "box" } } },
        { name: "show_corner_counter", selector: { boolean: {} } },
        { name: "show_bounce_counter", selector: { boolean: {} } },
        { name: "show_debug", selector: { boolean: {} } },
      ],
    };

    return schemas[section] || [];
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

      background: "Background",
      text_color: "Text / icon colour",
      border_color: "Border colour",
      border_style: "Border style",
      border_width: "Border width",
      border_radius: "Border radius",
      padding: "Padding",
      show_bounds: "Show inner bounds",
      change_color_on_bounce: "Change colour on bounce",

      corner_celebration: "Corner celebration",
      corner_text: "Corner text",
      corner_threshold: "Corner threshold",
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
      entity_prefix: "Optional text shown before the entity state.",
      entity_suffix: "Optional text shown after the entity state.",
      show_unit: "Append the entity unit of measurement when available.",

      speed: "Movement speed per animation frame. Lower values are calmer.",
      jitter: "Tiny angle variation after each bounce. Set to 0 for strict DVD-style reflection.",
      size: "Controls icon size or text size.",
      random_start: "Start from a random position and direction.",
      pause_on_tap: "Tap the card to pause or resume the animation.",

      show_bounds: "Draw a dashed outline around the actual bounce area.",
      change_color_on_bounce: "Cycle text/icon colour whenever it hits a wall.",

      corner_threshold: "How close to both edges counts as a corner hit. Leave blank for automatic.",
      show_debug: "Show position, direction, speed and size data.",
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

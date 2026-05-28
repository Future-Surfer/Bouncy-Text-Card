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
      card_padding: 18,

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
      show_corner_counter: false,
      pause_on_tap: true,
      random_start: true,
      change_color_on_bounce: true,

      power_led: true,
      power_led_position: "bottom_right",
      power_led_mode: "steady",
      power_led_color: "#ef4444",
      power_led_size: 7,
      power_led_glow: 12,
      power_led_opacity: 0.95,
      power_led_blink_speed: 1400,
      power_led_side_inset: 42,

      transport_osd: true,
      transport_osd_position: "center",
      transport_osd_duration: 1200,
      transport_osd_pause_text: "PAUSE",
      transport_osd_play_text: "PLAY",
      transport_osd_show_play: true,
      transport_osd_color: "#ffffff",
      transport_osd_background: "rgba(0, 0, 0, 0.38)",
      transport_osd_opacity: 1,
      transport_osd_size: 32,

      screen_osd: true,
      screen_osd_label: "DVD VIDEO",
      screen_osd_detail: "CH 03",
      screen_osd_position: "top_right",
      screen_osd_color: "#dbeafe",
      screen_osd_background: "rgba(2, 6, 23, 0.34)",
      screen_osd_opacity: 0.78,
      screen_osd_size: 12,

      screen_break: false,
      screen_break_on_corner: false,
      screen_break_style: "lcd",
      screen_break_origin: "hit_corner",
      screen_break_max: 8,
      screen_break_opacity: 0.72,
      screen_break_size: 190,
      screen_break_intensity: 0.8,
      screen_break_lines: 26,
      screen_break_branchiness: 7,
      screen_break_color: "rgba(219, 234, 254, 0.85)",
      screen_break_glow_color: "rgba(56, 189, 248, 0.45)",
      screen_break_dead_color: "rgba(0, 0, 0, 0.82)",
      screen_break_bleed_color: "rgba(191, 219, 254, 0.78)",
      screen_break_rgb_opacity: 0.75,

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
      corner_border_chase_mode: "adjacent_sides",
      corner_border_chase_color: "#facc15",
      corner_border_chase_width: 3,
      corner_border_chase_length: 60,
      corner_border_chase_duration: 700,

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

    const positions = [
      { value: "top_left", label: "Top left" },
      { value: "top_right", label: "Top right" },
      { value: "bottom_left", label: "Bottom left" },
      { value: "bottom_right", label: "Bottom right" },
      { value: "center", label: "Centre" },
    ];

    const ledPositions = [
      { value: "top_left", label: "Top left" },
      { value: "top_right", label: "Top right" },
      { value: "bottom_left", label: "Bottom left" },
      { value: "bottom_right", label: "Bottom right" },
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
          name: "power_led",
          title: "Power LED",
          icon: "mdi:led-on",
          flatten: true,
          schema: [
            { name: "power_led", selector: { boolean: {} } },
            { name: "power_led_position", selector: { select: { mode: "dropdown", options: ledPositions } } },
            {
              name: "power_led_mode",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "steady", label: "Steady" },
                    { value: "blink", label: "Blink" },
                    { value: "pulse", label: "Pulse" },
                  ],
                },
              },
            },
            { name: "power_led_color", selector: { text: {} } },
            { name: "power_led_size", selector: { number: { min: 3, max: 24, step: 1, mode: "slider" } } },
            { name: "power_led_glow", selector: { number: { min: 0, max: 40, step: 1, mode: "slider" } } },
            { name: "power_led_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "power_led_blink_speed", selector: { number: { min: 300, max: 4000, step: 100, mode: "slider", unit_of_measurement: "ms" } } },
            { name: "power_led_side_inset", selector: { number: { min: 0, max: 120, step: 1, mode: "slider" } } },
          ],
        },

        {
          type: "expandable",
          name: "screen_osd",
          title: "Screen OSD",
          icon: "mdi:television-classic",
          flatten: true,
          schema: [
            { name: "screen_osd", selector: { boolean: {} } },
            { name: "screen_osd_label", selector: { text: {} } },
            { name: "screen_osd_detail", selector: { text: {} } },
            { name: "screen_osd_position", selector: { select: { mode: "dropdown", options: positions } } },
            { name: "screen_osd_color", selector: { text: {} } },
            { name: "screen_osd_background", selector: { text: {} } },
            { name: "screen_osd_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "screen_osd_size", selector: { number: { min: 8, max: 36, step: 1, mode: "slider" } } },
          ],
        },

        {
          type: "expandable",
          name: "transport_osd",
          title: "Pause / play OSD",
          icon: "mdi:play-pause",
          flatten: true,
          schema: [
            { name: "transport_osd", selector: { boolean: {} } },
            { name: "transport_osd_position", selector: { select: { mode: "dropdown", options: positions } } },
            { name: "transport_osd_pause_text", selector: { text: {} } },
            { name: "transport_osd_play_text", selector: { text: {} } },
            { name: "transport_osd_show_play", selector: { boolean: {} } },
            { name: "transport_osd_duration", selector: { number: { min: 100, max: 4000, step: 100, mode: "slider", unit_of_measurement: "ms" } } },
            { name: "transport_osd_color", selector: { text: {} } },
            { name: "transport_osd_background", selector: { text: {} } },
            { name: "transport_osd_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "transport_osd_size", selector: { number: { min: 12, max: 72, step: 1, mode: "slider" } } },
          ],
        },

        {
          type: "expandable",
          name: "screen_break",
          title: "Screen break",
          icon: "mdi:monitor-screenshot",
          flatten: true,
          schema: [
            { name: "screen_break", selector: { boolean: {} } },
            { name: "screen_break_on_corner", selector: { boolean: {} } },
            {
              name: "screen_break_style",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "lcd", label: "Broken LCD panel" },
                    { value: "glass", label: "Cracked glass" },
                  ],
                },
              },
            },
            {
              name: "screen_break_origin",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "hit_corner", label: "Corner hit" },
                    { value: "random", label: "Random position" },
                    { value: "center", label: "Centre" },
                  ],
                },
              },
            },
            { name: "screen_break_max", selector: { number: { min: 1, max: 30, step: 1, mode: "slider" } } },
            { name: "screen_break_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
            { name: "screen_break_size", selector: { number: { min: 60, max: 420, step: 5, mode: "slider" } } },
            { name: "screen_break_intensity", selector: { number: { min: 0.1, max: 1, step: 0.05, mode: "slider" } } },
            { name: "screen_break_lines", selector: { number: { min: 0, max: 80, step: 1, mode: "slider" } } },
            { name: "screen_break_branchiness", selector: { number: { min: 3, max: 14, step: 1, mode: "slider" } } },
            { name: "screen_break_color", selector: { text: {} } },
            { name: "screen_break_glow_color", selector: { text: {} } },
            { name: "screen_break_dead_color", selector: { text: {} } },
            { name: "screen_break_bleed_color", selector: { text: {} } },
            { name: "screen_break_rgb_opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
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
            {
              name: "corner_border_chase_mode",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "adjacent_sides", label: "From hit corner along adjacent sides" },
                    { value: "full_loop", label: "Full screen loop" },
                  ],
                },
              },
            },
            { name: "corner_border_chase_color", selector: { text: {} } },
            { name: "corner_border_chase_width", selector: { number: { min: 1, max: 12, step: 1, mode: "slider" } } },
            { name: "corner_border_chase_length", selector: { number: { min: 10, max: 100, step: 5, mode: "slider", unit_of_measurement: "%" } } },
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
      mode: "Mode", text: "Text", icon: "Icon", entity: "Entity", entity_prefix: "Entity prefix", entity_suffix: "Entity suffix", show_unit: "Show unit",
      height: "Card height", size: "Text / icon size", speed: "Speed", jitter: "Jitter", random_start: "Random start", pause_on_tap: "Pause on tap",
      logo_color: "Logo/text colour", logo_opacity: "Logo/text opacity",
      background_color: "Card background colour", background_color_mode: "Card background colour mode", background_opacity: "Card background opacity",
      card_radius: "Card corner radius", card_padding: "Card padding", card_border_width: "Card border width", card_border_color: "Card border colour", card_border_opacity: "Card border opacity",
      card_shadow: "Show card shadow", card_shadow_color: "Card shadow colour", card_shadow_blur: "Card shadow blur", card_shadow_spread: "Card shadow spread", card_shadow_offset_x: "Card shadow horizontal offset", card_shadow_offset_y: "Card shadow vertical offset",
      card_shine: "Show card shine", shine_layer: "Shine layer", card_shine_opacity: "Card shine opacity", card_shine_size: "Card shine size", card_shine_position: "Card shine position", card_shine_angle: "Card shine angle",
      plot_background_color: "Bounce arena background colour", plot_background_color_mode: "Bounce arena background colour mode", plot_background_opacity: "Bounce arena background opacity", plot_background_radius: "Bounce arena corner radius", bounce_padding: "Bounce region padding",
      show_bounds: "Show bounds", bounds_color: "Bounds colour", bounds_width: "Bounds width", bounds_opacity: "Bounds opacity", bounds_style: "Bounds style",
      change_color_on_bounce: "Change colour on bounce",
      power_led: "Show power LED", power_led_position: "Power LED position", power_led_mode: "Power LED mode", power_led_color: "Power LED colour", power_led_size: "Power LED size", power_led_glow: "Power LED glow", power_led_opacity: "Power LED opacity", power_led_blink_speed: "Blink/pulse speed", power_led_side_inset: "Power LED side inset",
      screen_osd: "Show screen OSD", screen_osd_label: "OSD label", screen_osd_detail: "OSD detail", screen_osd_position: "OSD position", screen_osd_color: "OSD text colour", screen_osd_background: "OSD background", screen_osd_opacity: "OSD opacity", screen_osd_size: "OSD text size",
      transport_osd: "Show pause/play OSD", transport_osd_position: "Pause/play position", transport_osd_duration: "Play message duration", transport_osd_pause_text: "Pause text", transport_osd_play_text: "Play text", transport_osd_show_play: "Show play message", transport_osd_color: "Pause/play text colour", transport_osd_background: "Pause/play background", transport_osd_opacity: "Pause/play opacity", transport_osd_size: "Pause/play size",
      screen_break: "Show screen break", screen_break_on_corner: "Add break on corner hit", screen_break_style: "Break style", screen_break_origin: "Break origin", screen_break_max: "Maximum breaks", screen_break_opacity: "Break opacity", screen_break_size: "Break size", screen_break_intensity: "Break intensity", screen_break_lines: "LCD failure lines", screen_break_branchiness: "Glass branchiness", screen_break_color: "Break line colour", screen_break_glow_color: "Break glow colour", screen_break_dead_color: "Dead panel colour", screen_break_bleed_color: "Panel bleed colour", screen_break_rgb_opacity: "RGB line opacity",
      corner_celebration: "Corner celebration", corner_text: "Corner text", corner_text_duration: "Celebration text duration", corner_threshold: "Corner threshold", corner_text_color: "Corner text colour", corner_background_color: "Corner text background", corner_border_color: "Corner border colour", corner_glow_color: "Corner glow colour",
      corner_flash: "Screen flash", corner_flash_color: "Screen flash colour", corner_flash_opacity: "Screen flash opacity", corner_flash_duration: "Screen flash duration",
      corner_confetti: "Mini confetti", corner_confetti_count: "Confetti pieces", corner_confetti_colors: "Confetti colours", corner_confetti_duration: "Confetti duration", corner_confetti_spread: "Confetti spread",
      corner_border_chase: "Border chase", corner_border_chase_mode: "Border chase mode", corner_border_chase_color: "Border chase colour", corner_border_chase_width: "Border chase width", corner_border_chase_length: "Border chase length", corner_border_chase_duration: "Border chase duration",
      show_corner_counter: "Show corner counter", show_bounce_counter: "Show bounce counter", show_debug: "Show debug overlay",
    };
    return labels[schema.name] || schema.name;
  }

  static helper(schema) {
    const helpers = {
      power_led: "Adds a small TV-style power light in the frame/bezel area around the screen.",
      power_led_position: "Places the LED in the frame, just outside the screen edge.",
      power_led_side_inset: "Moves the LED inward from the side so it sits like a real TV power light rather than in the corner.",
      power_led_mode: "Steady is always on; blink switches on/off; pulse gently breathes.",
      screen_break_style: "LCD gives dead panel blobs and coloured failure lines; glass gives the older spiderweb crack.",
      screen_break_on_corner: "When enabled, every corner hit adds another break until the maximum is reached.",
      screen_break_intensity: "Controls how strong the dead panel, bleed and failure-line effects appear.",
      screen_break_lines: "Number of coloured LCD failure lines generated per break.",
      screen_break_origin: "Corner hit uses the actual corner; random scatters damage around the screen.",
      screen_break_max: "Limits stacked breaks so the DOM does not grow forever.",
      screen_osd: "Adds a persistent DVD-player style label on top of the screen.",
      transport_osd: "Shows a chunky old-school pause/play overlay when the card is tapped.",
      corner_border_chase_mode: "Adjacent sides starts from the hit corner; full loop traces the whole screen border.",
      corner_border_chase_length: "How far the adjacent-side pulse travels before fading.",
    };
    return helpers[schema.name] || "";
  }

  setConfig(config) {
    this.c = { ...BouncyTextCard.defaults(), ...config };
    this.applyLegacyAliases(config || {});

    const s = Number(this.c.speed) || 1.25;
    this.x = 20; this.y = 20; this.dx = s; this.dy = s;
    this.w = 0; this.h = 0; this.ready = false; this.paused = false;
    this.bounces = 0; this.corners = 0; this.cornerLatch = false;
    this.breaks = this.breaks || [];
    this.staticBreakAdded = false;
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
    clearTimeout(this.transportTimer);
    this.raf = null;
  }

  render() {
    const c = this.c;
    const h = Number(c.height) || 220;
    const s = Number(c.size) || 56;
    const cp = Number(c.card_padding) || 0;
    const bp = Math.max(0, Number(c.bounce_padding) || 0);
    const ledSize = Number(c.power_led_size) || 7;

    // LED sits in the bezel/frame rail rather than the outer card corner.
    const ledRailOffset = Math.max(2, cp / 2 - ledSize / 2);
    const ledSideInset = Math.max(0, Number(c.power_led_side_inset) || Math.max(cp + 10, cp * 1.7));

    const cardBg = this.resolveColor(c.background_color, c.background_color_mode, c.background_opacity);
    const plotBg = this.resolveColor(c.plot_background_color, c.plot_background_color_mode, c.plot_background_opacity);
    const borderColor = this.resolveColor(c.card_border_color, "static", c.card_border_opacity);
    const boundsColor = this.resolveColor(c.bounds_color, "static", c.bounds_opacity);
    const shadow = this.cardShadow();
    const counters = this.bool(c.show_bounce_counter) || this.bool(c.show_corner_counter);
    const shineZ = c.shine_layer === "below_logo" ? 3 : 5;
    const logoZ = 4;
    const chaseWidth = Number(c.corner_border_chase_width) || 3;
    const chaseDuration = Number(c.corner_border_chase_duration) || 700;
    const chaseLength = Math.max(0.1, Math.min(1, (Number(c.corner_border_chase_length) || 60) / 100));

    const logo = c.mode === "icon"
      ? `<ha-icon id="logo" class="logo" icon="${this.esc(c.icon)}"></ha-icon>`
      : `<div id="logo" class="logo text">${this.esc(c.mode === "entity" ? "Loading…" : c.text)}</div>`;

    const screenOsd = this.bool(c.screen_osd)
      ? `<div class="screen-osd osd-${this.esc(c.screen_osd_position)}">
          <div class="screen-osd-main">${this.esc(c.screen_osd_label)}</div>
          ${c.screen_osd_detail ? `<div class="screen-osd-detail">${this.esc(c.screen_osd_detail)}</div>` : ""}
        </div>`
      : "";

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

        .power-led {
          display: ${this.bool(c.power_led) ? "block" : "none"};
          position: absolute;
          z-index: 20;
          width: ${ledSize}px;
          height: ${ledSize}px;
          border-radius: 999px;
          pointer-events: none;
          background:
            radial-gradient(circle at 35% 30%, rgba(255,255,255,.95) 0 10%, ${c.power_led_color} 28%, rgba(80,0,0,.95) 100%);
          opacity: ${Number(c.power_led_opacity)};
          box-shadow:
            0 0 ${Number(c.power_led_glow) || 0}px ${c.power_led_color},
            0 0 ${Math.max(1, (Number(c.power_led_glow) || 0) * 0.45)}px ${c.power_led_color},
            inset 0 -1px 2px rgba(0,0,0,.45);
        }

        .power-led::after {
          content: "";
          position: absolute;
          inset: -${Math.max(3, ledSize * 0.65)}px;
          border-radius: inherit;
          background: radial-gradient(circle, ${c.power_led_color} 0%, transparent 65%);
          opacity: .24;
          filter: blur(2px);
        }

        .power-led.top_left {
          top: ${ledRailOffset}px;
          left: ${ledSideInset}px;
        }

        .power-led.top_right {
          top: ${ledRailOffset}px;
          right: ${ledSideInset}px;
        }

        .power-led.bottom_left {
          bottom: ${ledRailOffset}px;
          left: ${ledSideInset}px;
        }

        .power-led.bottom_right {
          bottom: ${ledRailOffset}px;
          right: ${ledSideInset}px;
        }

        .power-led.mode-blink {
          animation: bouncy-power-led-blink ${Number(c.power_led_blink_speed) || 1400}ms steps(2, end) infinite;
        }

        .power-led.mode-pulse {
          animation: bouncy-power-led-pulse ${Number(c.power_led_blink_speed) || 1400}ms ease-in-out infinite;
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
          background: linear-gradient(${Number(c.card_shine_angle) || 155}deg, rgba(255,255,255,${Number(c.card_shine_opacity) || 0}) 0%, rgba(255,255,255,0) ${Number(c.card_shine_size) || 55}%);
          transform: translateX(${Number(c.card_shine_position) || 0}%);
        }

        .screen-break-layer {
          display: ${this.bool(c.screen_break) || this.bool(c.screen_break_on_corner) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          overflow: hidden;
          opacity: ${Number(c.screen_break_opacity)};
        }

        .screen-break-svg {
          position: absolute;
          overflow: visible;
          filter: drop-shadow(0 0 4px ${c.screen_break_glow_color});
        }

        .lcd-dead { fill: ${c.screen_break_dead_color}; opacity: ${Number(c.screen_break_intensity)}; }
        .lcd-bleed { fill: ${c.screen_break_bleed_color}; opacity: ${Number(c.screen_break_intensity) * 0.9}; }
        .lcd-white { fill: rgba(255,255,255,.86); opacity: ${Number(c.screen_break_intensity) * 0.7}; }
        .lcd-line { opacity: ${Number(c.screen_break_rgb_opacity)}; }
        .lcd-hair { stroke: ${c.screen_break_color}; stroke-width: .6; stroke-linecap: round; opacity: .55; fill: none; }

        .screen-break-main {
          stroke: ${c.screen_break_color};
          stroke-width: 1.55;
          stroke-linecap: round;
          fill: none;
        }

        .screen-break-hair {
          stroke: ${c.screen_break_color};
          stroke-width: .7;
          stroke-linecap: round;
          fill: none;
          opacity: .72;
        }

        .screen-break-impact {
          fill: rgba(255,255,255,.8);
          stroke: ${c.screen_break_color};
          stroke-width: .8;
        }

        .screen-flash {
          display: ${this.bool(c.corner_flash) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: 6;
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
          z-index: 7;
          pointer-events: none;
          border-radius: inherit;
          overflow: hidden;
        }

        .chase-segment {
          position: absolute;
          display: block;
          background: linear-gradient(90deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%);
          opacity: 0;
          box-shadow: 0 0 ${chaseWidth * 4}px ${c.corner_border_chase_color};
        }

        .chase-top, .chase-bottom { height: ${chaseWidth}px; width: 100%; transform: scaleX(0); }
        .chase-left, .chase-right { width: ${chaseWidth}px; height: 100%; transform: scaleY(0); }

        .chase-top { top: 0; left: 0; transform-origin: left center; }
        .chase-right { top: 0; right: 0; transform-origin: center top; background: linear-gradient(180deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%); }
        .chase-bottom { right: 0; bottom: 0; transform-origin: right center; background: linear-gradient(270deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%); }
        .chase-left { left: 0; bottom: 0; transform-origin: center bottom; background: linear-gradient(0deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%); }

        :host([chase-mode="full_loop"][chase]) .chase-top { animation: bouncy-chase-top-full ${chaseDuration}ms linear both; }
        :host([chase-mode="full_loop"][chase]) .chase-right { animation: bouncy-chase-right-full ${chaseDuration}ms linear both; }
        :host([chase-mode="full_loop"][chase]) .chase-bottom { animation: bouncy-chase-bottom-full ${chaseDuration}ms linear both; }
        :host([chase-mode="full_loop"][chase]) .chase-left { animation: bouncy-chase-left-full ${chaseDuration}ms linear both; }

        :host([chase-mode="adjacent_sides"][hit-corner="top-left"][chase]) .chase-top,
        :host([chase-mode="adjacent_sides"][hit-corner="top-left"][chase]) .chase-left,
        :host([chase-mode="adjacent_sides"][hit-corner="top-right"][chase]) .chase-top,
        :host([chase-mode="adjacent_sides"][hit-corner="top-right"][chase]) .chase-right,
        :host([chase-mode="adjacent_sides"][hit-corner="bottom-right"][chase]) .chase-bottom,
        :host([chase-mode="adjacent_sides"][hit-corner="bottom-right"][chase]) .chase-right,
        :host([chase-mode="adjacent_sides"][hit-corner="bottom-left"][chase]) .chase-bottom,
        :host([chase-mode="adjacent_sides"][hit-corner="bottom-left"][chase]) .chase-left {
          animation: bouncy-chase-adjacent ${chaseDuration}ms ease-out both;
        }

        :host([hit-corner="top-right"]) .chase-top { left: auto; right: 0; transform-origin: right center; background: linear-gradient(270deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%); }
        :host([hit-corner="bottom-right"]) .chase-right { top: auto; bottom: 0; transform-origin: center bottom; background: linear-gradient(0deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%); }
        :host([hit-corner="bottom-left"]) .chase-bottom { left: 0; right: auto; transform-origin: left center; background: linear-gradient(90deg, ${c.corner_border_chase_color} 0%, ${c.corner_border_chase_color} 55%, transparent 100%); }

        .confetti {
          display: ${this.bool(c.corner_confetti) ? "block" : "none"};
          position: absolute;
          inset: 0;
          z-index: 8;
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

        .screen-osd {
          position: absolute;
          z-index: 11;
          pointer-events: none;
          color: ${c.screen_osd_color};
          background: ${c.screen_osd_background};
          opacity: ${Number(c.screen_osd_opacity)};
          font-size: ${Number(c.screen_osd_size) || 12}px;
          line-height: 1.05;
          letter-spacing: .12em;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          padding: .45em .58em;
          border-radius: .25em;
          text-shadow: 0 0 .35em currentColor;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
          min-width: 5.5em;
        }

        .screen-osd-detail {
          opacity: .72;
          font-size: .72em;
          margin-top: .22em;
          letter-spacing: .16em;
        }

        .transport-osd {
          display: none;
          position: absolute;
          z-index: 12;
          pointer-events: none;
          color: ${c.transport_osd_color};
          background: ${c.transport_osd_background};
          opacity: ${Number(c.transport_osd_opacity)};
          font-size: ${Number(c.transport_osd_size) || 32}px;
          line-height: 1;
          font-family: Arial Black, Impact, Arial, Helvetica, sans-serif;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: .34em .45em .32em;
          border-radius: .22em;
          text-shadow: 0 0 .2em rgba(255,255,255,.8), .08em .08em 0 rgba(0,0,0,.35);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.14), 0 .2em .75em rgba(0,0,0,.3);
        }

        :host([transport-osd]) .transport-osd {
          display: flex;
          align-items: center;
          gap: .28em;
          animation: bouncy-transport-osd-in 160ms ease-out both;
        }

        .transport-icon { font-size: 1.2em; letter-spacing: -.12em; transform: translateY(-.02em); }

        .osd-top_left { top: 10px; left: 10px; }
        .osd-top_right { top: 10px; right: 10px; text-align: right; }
        .osd-bottom_left { bottom: 10px; left: 10px; }
        .osd-bottom_right { bottom: 10px; right: 10px; text-align: right; }
        .osd-center { top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }

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

        .text { font-size: ${s}px; font-weight: 700; line-height: 1; white-space: nowrap; }
        ha-icon.logo { width: ${s}px; height: ${s}px; --mdc-icon-size: ${s}px; }

        .overlay {
          position: absolute;
          z-index: 10;
          pointer-events: none;
          font-size: 11px;
          line-height: 1.3;
          color: var(--secondary-text-color);
          background: rgba(0,0,0,.10);
          border-radius: 8px;
          padding: 5px 7px;
        }

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
          box-shadow: ${shadow === "none" ? "" : `${shadow},`} 0 0 0 3px rgba(250,204,21,.35), 0 0 22px ${c.corner_glow_color};
        }

        :host([corner]) #corner { display: block; }

        @keyframes bouncy-power-led-blink {
          0%, 49% { opacity: ${Number(c.power_led_opacity)}; }
          50%, 100% { opacity: .18; box-shadow: inset 0 -1px 2px rgba(0,0,0,.45); }
        }

        @keyframes bouncy-power-led-pulse {
          0%, 100% {
            opacity: ${Math.max(0.25, Number(c.power_led_opacity) * 0.45)};
            transform: scale(.88);
          }
          50% {
            opacity: ${Number(c.power_led_opacity)};
            transform: scale(1.08);
          }
        }

        @keyframes bouncy-screen-flash {
          0% { opacity: 0; }
          18% { opacity: ${Number(c.corner_flash_opacity) || 0.2}; }
          100% { opacity: 0; }
        }

        @keyframes bouncy-transport-osd-in {
          0% { opacity: 0; transform: scale(.96); }
          100% { opacity: ${Number(c.transport_osd_opacity)}; transform: scale(1); }
        }

        @keyframes bouncy-chase-adjacent {
          0% { opacity: 0; }
          10% { opacity: 1; }
          65% { opacity: .85; }
          100% { opacity: 0; transform: scaleX(${chaseLength}) scaleY(${chaseLength}); }
        }

        @keyframes bouncy-chase-top-full {
          0% { opacity: 1; transform: scaleX(0); }
          22% { opacity: 1; transform: scaleX(1); }
          25%, 100% { opacity: 0; transform: scaleX(1); }
        }

        @keyframes bouncy-chase-right-full {
          0%, 24% { opacity: 0; transform: scaleY(0); }
          25% { opacity: 1; transform: scaleY(0); }
          47% { opacity: 1; transform: scaleY(1); }
          50%, 100% { opacity: 0; transform: scaleY(1); }
        }

        @keyframes bouncy-chase-bottom-full {
          0%, 49% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(0); }
          72% { opacity: 1; transform: scaleX(1); }
          75%, 100% { opacity: 0; transform: scaleX(1); }
        }

        @keyframes bouncy-chase-left-full {
          0%, 74% { opacity: 0; transform: scaleY(0); }
          75% { opacity: 1; transform: scaleY(0); }
          97% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(1); }
        }

        @keyframes bouncy-confetti {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.4) rotate(0deg); }
          12% { opacity: 1; }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(.9) rotate(var(--rot));
          }
        }
      </style>

      <ha-card>
        <div class="stage">
          <div id="arena">
            <div class="bounds"></div>
            ${logo}
            <div class="shine"></div>
            <div id="screenBreakLayer" class="screen-break-layer"></div>
            <div class="screen-flash"></div>
            <div class="border-chase">
              <span class="chase-segment chase-top"></span>
              <span class="chase-segment chase-right"></span>
              <span class="chase-segment chase-bottom"></span>
              <span class="chase-segment chase-left"></span>
            </div>
            <div id="confetti" class="confetti"></div>
            ${screenOsd}
            <div id="transportOsd" class="transport-osd osd-${this.esc(c.transport_osd_position)}">
              <span id="transportIcon" class="transport-icon">❚❚</span>
              <span id="transportText">${this.esc(c.transport_osd_pause_text)}</span>
            </div>
            ${counters ? `
              <div id="counts" class="overlay">
                ${this.bool(c.show_bounce_counter) ? `Bounces: <span id="bounces">0</span><br>` : ""}
                ${this.bool(c.show_corner_counter) ? `Corners: <span id="corners">0</span>` : ""}
              </div>` : ""}
            ${this.bool(c.show_debug) ? `<div id="debug" class="overlay"></div>` : ""}
            <div id="corner" class="overlay">${this.esc(c.corner_text)}</div>
          </div>
          <div class="power-led ${this.esc(c.power_led_position)} mode-${this.esc(c.power_led_mode)}"></div>
        </div>
      </ha-card>
    `;

    this.card = this.shadowRoot.querySelector("ha-card");
    this.arena = this.shadowRoot.querySelector("#arena");
    this.logo = this.shadowRoot.querySelector("#logo");
    this.debug = this.shadowRoot.querySelector("#debug");
    this.bEl = this.shadowRoot.querySelector("#bounces");
    this.cEl = this.shadowRoot.querySelector("#corners");
    this.transportOsd = this.shadowRoot.querySelector("#transportOsd");
    this.transportIcon = this.shadowRoot.querySelector("#transportIcon");
    this.transportText = this.shadowRoot.querySelector("#transportText");
    this.confetti = this.shadowRoot.querySelector("#confetti");
    this.breakLayer = this.shadowRoot.querySelector("#screenBreakLayer");

    this.setAttribute("chase-mode", c.corner_border_chase_mode || "adjacent_sides");

    if (this.card && this.bool(c.pause_on_tap)) this.card.onclick = () => this.togglePause();

    if (this.bool(c.screen_break) && !this.staticBreakAdded) {
      this.staticBreakAdded = true;
      this.addScreenBreak({ name: "center", x: 0, y: 0, px: 0.5, py: 0.42, dx: 1, dy: 1 }, true);
    }

    this.renderBreaks();
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

    this.setAttribute("hit-corner", corner.name);
    this.setAttribute("chase-mode", this.c.corner_border_chase_mode || "adjacent_sides");

    if (this.bool(this.c.screen_break_on_corner)) this.addScreenBreak(corner, false);

    if (this.bool(this.c.corner_flash)) {
      this.removeAttribute("flash");
      requestAnimationFrame(() => this.setAttribute("flash", ""));
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => this.removeAttribute("flash"), Number(this.c.corner_flash_duration) || 500);
    }

    if (this.bool(this.c.corner_border_chase)) {
      this.removeAttribute("chase");
      requestAnimationFrame(() => this.setAttribute("chase", ""));
      clearTimeout(this.chaseTimer);
      this.chaseTimer = setTimeout(() => this.removeAttribute("chase"), Number(this.c.corner_border_chase_duration) || 700);
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
      name: `${top ? "top" : "bottom"}-${left ? "left" : "right"}`,
      x: left ? 0 : this.arena.clientWidth,
      y: top ? 0 : this.arena.clientHeight,
      px: left ? 0.06 : 0.94,
      py: top ? 0.08 : 0.92,
      dx: left ? 1 : -1,
      dy: top ? 1 : -1,
    };
  }

  addScreenBreak(corner, isStatic) {
    if (!this.arena) return;

    let px = corner.px ?? 0.5;
    let py = corner.py ?? 0.5;

    if (!isStatic && this.c.screen_break_origin === "random") {
      px = 0.12 + Math.random() * 0.76;
      py = 0.12 + Math.random() * 0.76;
    }

    if (!isStatic && this.c.screen_break_origin === "center") {
      px = 0.5 + (Math.random() - 0.5) * 0.16;
      py = 0.5 + (Math.random() - 0.5) * 0.16;
    }

    const style = this.c.screen_break_style || "lcd";
    const direction = { dx: corner.dx || 1, dy: corner.dy || 1 };

    this.breaks.push({
      id: Date.now() + Math.random(),
      style,
      px,
      py,
      rotation: style === "glass" ? Math.random() * 360 : 0,
      scale: 0.9 + Math.random() * 0.25,
      data: style === "glass"
        ? this.makeGlassBreakData(direction)
        : this.makeLcdBreakData(direction),
    });

    const max = Math.max(1, Number(this.c.screen_break_max) || 8);
    while (this.breaks.length > max) this.breaks.shift();

    this.renderBreaks();
  }

  makeGlassBreakData(direction) {
    const branchiness = Math.max(3, Math.min(14, Number(this.c.screen_break_branchiness) || 7));
    const lines = [];

    for (let i = 0; i < branchiness; i++) {
      const angle = ((Math.PI * 2) / branchiness) * i + Math.random() * 0.5;
      const len = 28 + Math.random() * 30;
      const mid = len * (0.42 + Math.random() * 0.2);
      const x1 = 50 + Math.cos(angle) * 4;
      const y1 = 50 + Math.sin(angle) * 4;
      const x2 = 50 + Math.cos(angle) * mid + Math.sin(angle) * (Math.random() - 0.5) * 11;
      const y2 = 50 + Math.sin(angle) * mid - Math.cos(angle) * (Math.random() - 0.5) * 11;
      const x3 = 50 + Math.cos(angle) * len;
      const y3 = 50 + Math.sin(angle) * len;
      lines.push({ type: "main", d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${x2.toFixed(1)} ${y2.toFixed(1)} ${x3.toFixed(1)} ${y3.toFixed(1)}` });

      if (i % 2 === 0) {
        const branchAngle = angle + (Math.random() > 0.5 ? 0.7 : -0.7);
        const bx = x2 + Math.cos(branchAngle) * len * 0.28;
        const by = y2 + Math.sin(branchAngle) * len * 0.28;
        lines.push({ type: "hair", d: `M ${x2.toFixed(1)} ${y2.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}` });
      }
    }

    return { lines };
  }

  makeLcdBreakData(direction) {
    const lineCount = Math.max(0, Math.min(80, Number(this.c.screen_break_lines) || 26));
    const ox = -direction.dx;
    const oy = -direction.dy;
    const dx = direction.dx;
    const dy = direction.dy;
    const colours = ["#38bdf8", "#22c55e", "#fb7185", "#a78bfa", "#60a5fa", "#f472b6"];
    const lines = [];
    const hair = [];

    for (let i = 0; i < lineCount; i++) {
      const x = 50 + ox * (8 + Math.random() * 34) + (Math.random() - 0.5) * 28;
      const y1 = Math.max(-8, 50 + oy * (18 + Math.random() * 40));
      const y2 = 108;
      lines.push({
        x: x.toFixed(1),
        y1: y1.toFixed(1),
        y2,
        width: (0.45 + Math.random() * 1.8).toFixed(2),
        color: colours[i % colours.length],
        opacity: (0.32 + Math.random() * 0.55).toFixed(2),
      });
    }

    for (let i = 0; i < 8; i++) {
      const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.6;
      const len = 18 + Math.random() * 34;
      const x2 = 50 + Math.cos(a) * len;
      const y2 = 50 + Math.sin(a) * len;
      hair.push({ d: `M 50 50 L ${x2.toFixed(1)} ${y2.toFixed(1)}` });
    }

    const dead = [
      [50, 50],
      [50 + ox * 48 + dy * 18, 50 + oy * 20 - dx * 18],
      [50 + ox * 58, 50 + oy * 58],
      [50 + ox * 20 - dy * 22, 50 + oy * 50 + dx * 22],
      [50 + dx * 6, 50 + dy * 10],
    ];

    const bleed = [
      [50, 50],
      [50 + dx * 60 - dy * 10, 50 + dy * 22 + dx * 10],
      [50 + dx * 42 + dy * 20, 50 + dy * 62 - dx * 20],
      [50 + dx * 10 + dy * 30, 50 + dy * 36 - dx * 30],
    ];

    const white = [
      [50 + ox * 12, 50 + oy * 10],
      [50 + dx * 32 - dy * 8, 50 + dy * 14 + dx * 8],
      [50 + dx * 22 + dy * 18, 50 + dy * 34 - dx * 18],
      [50 + ox * 4 + dy * 12, 50 + oy * 8 - dx * 12],
    ];

    return { dead, bleed, white, lines, hair };
  }

  renderBreaks() {
    if (!this.breakLayer) return;

    if (!this.bool(this.c.screen_break) && !this.bool(this.c.screen_break_on_corner)) {
      this.breakLayer.innerHTML = "";
      return;
    }

    const size = Number(this.c.screen_break_size) || 190;
    this.breakLayer.innerHTML = this.breaks.map((b) => {
      return b.style === "glass" ? this.breakSvgGlass(b, size) : this.breakSvgLcd(b, size);
    }).join("");
  }

  breakSvgGlass(b, size) {
    const lines = b.data.lines.map((l) => {
      const cls = l.type === "main" ? "screen-break-main" : "screen-break-hair";
      return `<path class="${cls}" d="${l.d}"/>`;
    }).join("");

    return `
      <svg class="screen-break-svg"
        style="left: calc(${(b.px * 100).toFixed(1)}% - ${size / 2}px); top: calc(${(b.py * 100).toFixed(1)}% - ${size / 2}px); width:${size}px; height:${size}px; transform: rotate(${b.rotation}deg) scale(${b.scale});"
        viewBox="0 0 100 100">
        <circle class="screen-break-impact" cx="50" cy="50" r="4.4"/>
        <circle class="screen-break-hair" cx="50" cy="50" r="9.5"/>
        ${lines}
      </svg>
    `;
  }

  breakSvgLcd(b, size) {
    const p = (pts) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

    const rgbLines = b.data.lines.map((l) =>
      `<line class="lcd-line" x1="${l.x}" x2="${l.x}" y1="${l.y1}" y2="${l.y2}" stroke="${l.color}" stroke-width="${l.width}" opacity="${l.opacity}"/>`
    ).join("");

    const hair = b.data.hair.map((h) => `<path class="lcd-hair" d="${h.d}"/>`).join("");

    return `
      <svg class="screen-break-svg"
        style="left: calc(${(b.px * 100).toFixed(1)}% - ${size / 2}px); top: calc(${(b.py * 100).toFixed(1)}% - ${size / 2}px); width:${size}px; height:${size}px; transform: scale(${b.scale});"
        viewBox="0 0 100 100">
        ${rgbLines}
        <polygon class="lcd-bleed" points="${p(b.data.bleed)}"/>
        <polygon class="lcd-white" points="${p(b.data.white)}"/>
        <polygon class="lcd-dead" points="${p(b.data.dead)}"/>
        ${hair}
      </svg>
    `;
  }

  makeConfetti(corner) {
    if (!this.confetti) return;

    const count = Math.max(0, Number(this.c.corner_confetti_count) || 0);
    const spread = Number(this.c.corner_confetti_spread) || 80;
    const duration = Number(this.c.corner_confetti_duration) || 850;
    const colors = String(this.c.corner_confetti_colors || "#facc15").split(",").map(x => x.trim()).filter(Boolean);

    this.confetti.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      const angle = Math.random() * Math.PI / 2;
      const distance = spread * (0.35 + Math.random() * 0.75);
      const dx = Math.cos(angle) * distance * corner.dx;
      const dy = Math.sin(angle) * distance * corner.dy;
      const rot = (Math.random() * 360 - 180).toFixed(0);
      const w = 3 + Math.random() * 4;
      const h = 5 + Math.random() * 8;

      piece.className = "confetti-piece";
      piece.style.left = `${corner.x}px`;
      piece.style.top = `${corner.y}px`;
      piece.style.setProperty("--dx", `${dx}px`);
      piece.style.setProperty("--dy", `${dy}px`);
      piece.style.setProperty("--rot", `${rot}deg`);
      piece.style.setProperty("--w", `${w}px`);
      piece.style.setProperty("--h", `${h}px`);
      piece.style.setProperty("--confetti-duration", `${duration}ms`);
      piece.style.setProperty("--confetti-color", colors[i % colors.length]);

      this.confetti.appendChild(piece);
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
    this.showTransportOsd(this.paused ? "pause" : "play");
  }

  showTransportOsd(state) {
    if (!this.bool(this.c.transport_osd) || !this.transportOsd || !this.transportIcon || !this.transportText) return;

    clearTimeout(this.transportTimer);

    if (state === "pause") {
      this.transportIcon.textContent = "❚❚";
      this.transportText.textContent = this.c.transport_osd_pause_text || "PAUSE";
      this.setAttribute("transport-osd", "");
      return;
    }

    if (!this.bool(this.c.transport_osd_show_play)) {
      this.removeAttribute("transport-osd");
      return;
    }

    this.transportIcon.textContent = "▶";
    this.transportText.textContent = this.c.transport_osd_play_text || "PLAY";
    this.setAttribute("transport-osd", "");

    this.transportTimer = setTimeout(
      () => this.removeAttribute("transport-osd"),
      Number(this.c.transport_osd_duration) || 1200
    );
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
      `breaks:${this.breaks.length}\n` +
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

if (!customElements.get("bouncy-text-card")) {
  customElements.define("bouncy-text-card", BouncyTextCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "bouncy-text-card",
  name: "Bouncy Text Card",
  description: "A playful bouncing text, icon, or entity state card.",
});

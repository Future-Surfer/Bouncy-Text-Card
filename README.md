# Bouncy Text Card

A playful Home Assistant custom card that bounces an icon, text, or entity state around a dashboard card, inspired by the classic DVD screensaver.

<img width="802" height="435" alt="Bouncy Text Card preview" src="https://github.com/user-attachments/assets/57a0c377-c413-4571-be20-d521e0fcddcb" />

It includes configurable speed, size, card styling, DVD-style screen overlays, corner celebrations, mini confetti, screen damage effects, a TV-style power LED, entity state display, and a visual editor.

## Features

- Bounce an **icon**, **text**, or **entity state**
- DVD-screensaver-style movement
- Configurable speed, size, jitter and random start
- Optional colour change on each bounce
- Corner-hit celebrations
- Mini confetti bursts
- Screen flash effects
- Border chase effects from the hit corner
- DVD-style pause/play OSD
- Custom screen OSD labels, such as `DVD VIDEO` and `CH 03`
- TV-style power LED in the card bezel
- Optional broken LCD / cracked glass screen damage
- Optional stacking screen damage on each corner hit
- Configurable card surface, screen area, borders, shadows and shine
- Built-in Home Assistant visual editor

## Installation

### HACS custom repository

Until this card is available as a default HACS repository, you can add it as a custom repository.

1. Open **HACS** in Home Assistant.
2. Open the three-dot menu.
3. Choose **Custom repositories**.
4. Add this repository URL.
5. Set the category to **Dashboard**.
6. Click **Add**.
7. Install **Bouncy Text Card**.
8. Refresh your browser.

Then add the resource if Home Assistant does not add it automatically:

```yaml
url: /hacsfiles/bouncy-text-card/bouncy-text-card.js
type: module
```

### Manual installation

Download `bouncy-text-card.js` and place it in:

```text
/config/www/bouncy-text-card.js
```

Then add it as a Lovelace resource:

```yaml
url: /local/bouncy-text-card.js
type: module
```

If you are testing changes locally, use a cache-busting version number:

```yaml
url: /local/bouncy-text-card.js?v=24
type: module
```

## Basic usage

```yaml
type: custom:bouncy-text-card
```

By default, this shows a bouncing Home Assistant icon in a DVD-style screen.

## Examples

### Bouncing icon

```yaml
type: custom:bouncy-text-card
mode: icon
icon: mdi:home-assistant
```

### Bouncing text

```yaml
type: custom:bouncy-text-card
mode: text
text: DVD
```

### Bouncing entity state

```yaml
type: custom:bouncy-text-card
mode: entity
entity: sensor.living_room_temperature
entity_suffix: "°C"
show_unit: false
```

### Classic DVD-style screen

```yaml
type: custom:bouncy-text-card
mode: text
text: DVD
height: 260
speed: 1.2
size: 64
card_padding: 18
plot_background_color: "#020617"
logo_color: "#38bdf8"
screen_osd: true
screen_osd_label: DVD VIDEO
screen_osd_detail: CH 03
power_led: true
power_led_position: bottom_right
```

### TV power LED

```yaml
type: custom:bouncy-text-card
power_led: true
power_led_position: bottom_right
power_led_mode: pulse
power_led_color: "#ef4444"
power_led_size: 7
power_led_glow: 14
power_led_side_inset: 48
```

Available LED modes:

```yaml
power_led_mode: steady
power_led_mode: blink
power_led_mode: pulse
```

### DVD-style pause/play overlay

Tap the card to pause or resume the animation.

```yaml
type: custom:bouncy-text-card
pause_on_tap: true
transport_osd: true
transport_osd_position: center
transport_osd_pause_text: PAUSE
transport_osd_play_text: PLAY
transport_osd_show_play: true
transport_osd_duration: 1200
transport_osd_size: 34
```

### Screen OSD label

```yaml
type: custom:bouncy-text-card
screen_osd: true
screen_osd_label: DVD VIDEO
screen_osd_detail: CH 03
screen_osd_position: top_right
screen_osd_color: "#dbeafe"
screen_osd_background: rgba(2, 6, 23, 0.34)
```

### Corner celebrations

```yaml
type: custom:bouncy-text-card
corner_celebration: true
corner_text: NICE!
corner_text_duration: 900

corner_flash: true
corner_flash_color: "#facc15"
corner_flash_opacity: 0.2
corner_flash_duration: 500

corner_confetti: true
corner_confetti_count: 16
corner_confetti_colors: "#facc15,#38bdf8,#fb7185,#22c55e,#a78bfa"
corner_confetti_duration: 850
corner_confetti_spread: 90
```

### Border chase from hit corner

The border chase can start from the actual corner that was hit and travel along both adjacent sides.

```yaml
type: custom:bouncy-text-card
corner_border_chase: true
corner_border_chase_mode: adjacent_sides
corner_border_chase_color: "#facc15"
corner_border_chase_width: 4
corner_border_chase_length: 60
corner_border_chase_duration: 700
```

You can also use a full loop:

```yaml
corner_border_chase_mode: full_loop
```

### Broken LCD screen

```yaml
type: custom:bouncy-text-card
screen_break: true
screen_break_style: lcd
screen_break_opacity: 0.75
screen_break_size: 210
screen_break_intensity: 0.8
screen_break_lines: 34
screen_break_dead_color: rgba(0, 0, 0, 0.86)
screen_break_bleed_color: rgba(191, 219, 254, 0.72)
screen_break_rgb_opacity: 0.8
```

### Add screen damage on corner hits

This mode adds a new LCD break whenever the logo hits a corner.

```yaml
type: custom:bouncy-text-card
screen_break: true
screen_break_on_corner: true
screen_break_style: lcd
screen_break_origin: hit_corner
screen_break_max: 14
screen_break_size: 190
screen_break_lines: 28
screen_break_intensity: 0.8
```

Screen break styles:

```yaml
screen_break_style: lcd
screen_break_style: glass
```

Screen break origins:

```yaml
screen_break_origin: hit_corner
screen_break_origin: random
screen_break_origin: center
```

### Minimal clean card

```yaml
type: custom:bouncy-text-card
mode: icon
icon: mdi:home-assistant
height: 220
card_padding: 14
card_shadow: false
card_shine: false
screen_osd: false
transport_osd: false
power_led: false
corner_celebration: false
show_corner_counter: false
show_bounce_counter: false
```

## Configuration

### Content

| Option | Type | Default | Description |
|---|---:|---:|---|
| `mode` | string | `icon` | What to bounce. Options: `icon`, `text`, `entity`. |
| `icon` | string | `mdi:home-assistant` | Icon to show when `mode: icon`. |
| `text` | string | `DVD` | Text to show when `mode: text`. |
| `entity` | string | `""` | Entity to display when `mode: entity`. |
| `entity_prefix` | string | `""` | Text before the entity state. |
| `entity_suffix` | string | `""` | Text after the entity state. |
| `show_unit` | boolean | `true` | Show the entity unit of measurement when available. |

### Motion

| Option | Type | Default | Description |
|---|---:|---:|---|
| `height` | number | `240` | Card height in pixels. |
| `speed` | number | `1.15` | Movement speed per animation frame. |
| `size` | number | `58` | Icon or text size. |
| `jitter` | number | `0.008` | Small random direction variation after bounces. |
| `random_start` | boolean | `true` | Start from a random position and direction. |
| `pause_on_tap` | boolean | `true` | Tap the card to pause or resume. |
| `change_color_on_bounce` | boolean | `true` | Cycle the logo colour after each bounce. |

### Logo / text

| Option | Type | Default | Description |
|---|---:|---:|---|
| `logo_color` | string | `#38bdf8` | Main icon/text colour. |
| `logo_opacity` | number | `1` | Icon/text opacity. |

### Card surface

| Option | Type | Default | Description |
|---|---:|---:|---|
| `background_color` | string | `#111827` | Outer card background colour. |
| `background_color_mode` | string | `static` | Background mode. Options: `static`, `none`. |
| `background_opacity` | number | `1` | Outer background opacity. |
| `card_radius` | string | `22px` | Outer card corner radius. |
| `card_padding` | number | `18` | Padding between the outer card and the bounce arena. |
| `card_border_width` | number | `1` | Outer card border width. |
| `card_border_color` | string | `#ffffff` | Outer card border colour. |
| `card_border_opacity` | number | `0.16` | Outer card border opacity. |
| `card_shadow` | boolean | `true` | Show card shadow. |
| `card_shadow_color` | string | `rgba(0, 0, 0, 0.45)` | Shadow colour. |
| `card_shadow_blur` | number | `28` | Shadow blur. |
| `card_shadow_spread` | number | `0` | Shadow spread. |
| `card_shadow_offset_x` | number | `0` | Horizontal shadow offset. |
| `card_shadow_offset_y` | number | `10` | Vertical shadow offset. |
| `card_shine` | boolean | `true` | Show decorative shine overlay. |
| `shine_layer` | string | `above_logo` | Whether shine appears `above_logo` or `below_logo`. |
| `card_shine_opacity` | number | `0.14` | Shine opacity. |
| `card_shine_size` | number | `62` | Shine gradient size. |
| `card_shine_position` | number | `0` | Shine horizontal position. |
| `card_shine_angle` | number | `145` | Shine angle in degrees. |

### Bounce arena

| Option | Type | Default | Description |
|---|---:|---:|---|
| `plot_background_color` | string | `#020617` | Inner screen/bounce-area background. |
| `plot_background_color_mode` | string | `static` | Background mode. Options: `static`, `none`. |
| `plot_background_opacity` | number | `1` | Inner screen opacity. |
| `plot_background_radius` | number | `14` | Inner screen corner radius. |
| `bounce_padding` | number | `0` | Insets the invisible bounce area. |
| `show_bounds` | boolean | `false` | Show the collision bounds. |
| `bounds_color` | string | `#ffffff` | Bounds line colour. |
| `bounds_width` | number | `1` | Bounds line width. |
| `bounds_opacity` | number | `0.14` | Bounds opacity. |
| `bounds_style` | string | `dashed` | Bounds style. Options: `solid`, `dashed`, `dotted`. |

### Power LED

| Option | Type | Default | Description |
|---|---:|---:|---|
| `power_led` | boolean | `true` | Show a TV-style power LED in the bezel. |
| `power_led_position` | string | `bottom_right` | LED position. Options: `top_left`, `top_right`, `bottom_left`, `bottom_right`. |
| `power_led_mode` | string | `steady` | LED behaviour. Options: `steady`, `blink`, `pulse`. |
| `power_led_color` | string | `#ef4444` | LED colour. |
| `power_led_size` | number | `7` | LED size in pixels. |
| `power_led_glow` | number | `12` | LED glow strength. |
| `power_led_opacity` | number | `0.95` | LED opacity. |
| `power_led_blink_speed` | number | `1400` | Blink or pulse speed in milliseconds. |
| `power_led_side_inset` | number | `42` | Distance from the side, so the LED sits in the TV frame rather than the corner. |

### Screen OSD

| Option | Type | Default | Description |
|---|---:|---:|---|
| `screen_osd` | boolean | `true` | Show the persistent DVD-style screen label. |
| `screen_osd_label` | string | `DVD VIDEO` | Main OSD label. |
| `screen_osd_detail` | string | `CH 03` | Secondary OSD detail. |
| `screen_osd_position` | string | `top_right` | OSD position. |
| `screen_osd_color` | string | `#dbeafe` | OSD text colour. |
| `screen_osd_background` | string | `rgba(2, 6, 23, 0.34)` | OSD background. |
| `screen_osd_opacity` | number | `0.78` | OSD opacity. |
| `screen_osd_size` | number | `12` | OSD text size. |

### Pause / play OSD

| Option | Type | Default | Description |
|---|---:|---:|---|
| `transport_osd` | boolean | `true` | Show pause/play overlay when tapping the card. |
| `transport_osd_position` | string | `center` | Pause/play OSD position. |
| `transport_osd_duration` | number | `1200` | How long the `PLAY` message remains visible. |
| `transport_osd_pause_text` | string | `PAUSE` | Pause text. |
| `transport_osd_play_text` | string | `PLAY` | Play text. |
| `transport_osd_show_play` | boolean | `true` | Show `PLAY` when resuming. |
| `transport_osd_color` | string | `#ffffff` | Pause/play text colour. |
| `transport_osd_background` | string | `rgba(0, 0, 0, 0.38)` | Pause/play background. |
| `transport_osd_opacity` | number | `1` | Pause/play opacity. |
| `transport_osd_size` | number | `32` | Pause/play size. |

### Corner celebration

| Option | Type | Default | Description |
|---|---:|---:|---|
| `corner_celebration` | boolean | `true` | Enable corner-hit celebration effects. |
| `corner_threshold` | number/null | `null` | How close to both edges counts as a corner hit. |
| `corner_text` | string | `NICE!` | Text shown when a corner is hit. |
| `corner_duration` | number | `650` | Legacy fallback duration. |
| `corner_text_duration` | number | `650` | Celebration text duration in milliseconds. |
| `corner_text_color` | string | `#ffffff` | Celebration text colour. |
| `corner_background_color` | string | `rgba(250, 204, 21, 0.25)` | Celebration text background. |
| `corner_border_color` | string | `#facc15` | Temporary card border colour on corner hit. |
| `corner_glow_color` | string | `rgba(250, 204, 21, 0.55)` | Temporary glow colour on corner hit. |

### Screen flash

| Option | Type | Default | Description |
|---|---:|---:|---|
| `corner_flash` | boolean | `true` | Flash the screen area when a corner is hit. |
| `corner_flash_color` | string | `#facc15` | Flash colour. |
| `corner_flash_opacity` | number | `0.2` | Flash opacity. |
| `corner_flash_duration` | number | `500` | Flash duration in milliseconds. |

### Mini confetti

| Option | Type | Default | Description |
|---|---:|---:|---|
| `corner_confetti` | boolean | `true` | Show mini confetti when a corner is hit. |
| `corner_confetti_count` | number | `14` | Number of confetti pieces. |
| `corner_confetti_colors` | string | `#facc15,#38bdf8,#fb7185,#22c55e,#a78bfa` | Comma-separated list of confetti colours. |
| `corner_confetti_duration` | number | `850` | Confetti duration in milliseconds. |
| `corner_confetti_spread` | number | `80` | Confetti spread distance. |

### Border chase

| Option | Type | Default | Description |
|---|---:|---:|---|
| `corner_border_chase` | boolean | `true` | Show a border chase effect on corner hit. |
| `corner_border_chase_mode` | string | `adjacent_sides` | Options: `adjacent_sides`, `full_loop`. |
| `corner_border_chase_color` | string | `#facc15` | Border chase colour. |
| `corner_border_chase_width` | number | `3` | Border chase width. |
| `corner_border_chase_length` | number | `60` | How far adjacent-side pulses travel before fading. |
| `corner_border_chase_duration` | number | `700` | Border chase duration in milliseconds. |

### Screen break

| Option | Type | Default | Description |
|---|---:|---:|---|
| `screen_break` | boolean | `false` | Show a persistent screen break. |
| `screen_break_on_corner` | boolean | `false` | Add new screen damage whenever a corner is hit. |
| `screen_break_style` | string | `lcd` | Options: `lcd`, `glass`. |
| `screen_break_origin` | string | `hit_corner` | Options: `hit_corner`, `random`, `center`. |
| `screen_break_max` | number | `8` | Maximum number of stacked screen breaks. |
| `screen_break_opacity` | number | `0.72` | Overall screen break opacity. |
| `screen_break_size` | number | `190` | Size of each damage pattern. |
| `screen_break_intensity` | number | `0.8` | Strength of LCD dead-panel and bleed effects. |
| `screen_break_lines` | number | `26` | Number of LCD failure lines. |
| `screen_break_branchiness` | number | `7` | Number of branches in glass crack style. |
| `screen_break_color` | string | `rgba(219, 234, 254, 0.85)` | Crack/hairline colour. |
| `screen_break_glow_color` | string | `rgba(56, 189, 248, 0.45)` | Break glow colour. |
| `screen_break_dead_color` | string | `rgba(0, 0, 0, 0.82)` | LCD dead-panel colour. |
| `screen_break_bleed_color` | string | `rgba(191, 219, 254, 0.78)` | LCD bleed colour. |
| `screen_break_rgb_opacity` | number | `0.75` | Opacity of coloured LCD failure lines. |

### Counters and debug

| Option | Type | Default | Description |
|---|---:|---:|---|
| `show_bounce_counter` | boolean | `false` | Show bounce counter. |
| `show_corner_counter` | boolean | `false` | Show corner-hit counter. |
| `show_debug` | boolean | `false` | Show debug overlay with position and speed values. |

## Visual editor

This card includes a visual editor in Home Assistant.

You can configure the main options through collapsible sections:

- Content
- Motion
- Card surface
- Bounce arena
- Logo / text
- Power LED
- Screen OSD
- Pause / play OSD
- Screen break
- Corner celebration
- Counters & debug

Some advanced styling values are easiest to fine-tune directly in YAML.

## Notes

### Cache busting

When developing locally, Home Assistant may cache the JavaScript file. Add a version query string to the resource URL and increment it after each change:

```yaml
url: /local/bouncy-text-card.js?v=24
type: module
```

### Screen break stacking

`screen_break_on_corner` can add lots of visual damage over time. Use `screen_break_max` to keep the number of rendered damage overlays under control.

```yaml
screen_break_on_corner: true
screen_break_max: 12
```

### Bounce padding

`bounce_padding` controls the invisible collision area. The default is `0`, which means the logo can bounce right up to the edge of the screen area.

```yaml
bounce_padding: 0
```

### Legacy aliases

Older YAML options are still accepted where possible:

| Old option | New option |
|---|---|
| `background` | `background_color` |
| `text_color` | `logo_color` |
| `border_color` | `card_border_color` |
| `border_width` | `card_border_width` |
| `border_radius` | `card_radius` |
| `padding` | `card_padding` |

## Roadmap ideas

Possible future additions:

- Screen smudges and fingerprints
- Scanline / CRT overlay
- Named visual presets, such as `classic_dvd`, `broken_lcd`, `minimal`, and `retro_tv`
- Tap / hold / double-tap actions
- More entity-driven styling
- More DVD player OSD effects, such as `NO DISC`, `OPEN`, `LOADING`
- Optional sound-style visual effects, such as muted speaker icon or volume OSD
- Better damage presets for screen breaks

## Credits

Inspired by the classic DVD screensaver corner-hit obsession and far too many old televisions left on standby.

## License

MIT

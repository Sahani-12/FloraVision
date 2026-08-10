# 🌿 FloraVision Design System — Style Guide & Tokens (Module 0)

This design system establishes the foundational aesthetic, color palette, typography scale, spacing rules, and component styles for **FloraVision**. Every page and component across all modules must adhere strictly to these tokens for consistent luxury and organic branding.

---

## 🎨 Color Palette

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| **Primary (Forest Green)** | `#1F3B2C` | Main headers, primary nav bar, brand elements, footer background |
| **Secondary (Sage Green)** | `#7A9B76` | Accents, hover states, tag pills, plant care indicators |
| **Accent (Warm Terracotta)** | `#C96F4A` | Main CTAs ("Add to Cart", "Buy Now", "Subscribe"), sale badges |
| **Accent Gold (Subtle Luxury)**| `#C9A24B` | Featured badges, star ratings, premium member borders |
| **Background Base** | `#F7F4EE` | Primary page background (warm off-white organic tone) |
| **Background Alt** | `#EFE9DD` | Soft beige background for section breaks & background bands |
| **Card Background** | `#FFFFFF` | Product cards, white elevated containers (`shadow-plant`) |
| **Text Primary** | `#1C1C1A` | Near-black headings, body text, readable high contrast |
| **Text Muted** | `#6B6B63` | Subtitles, meta info, secondary labels, footers |
| **Success** | `#4C8055` | Stock availability, in-stock badges, order success |
| **Error / Sale** | `#B3452F` | Sale badges, out of stock, validation errors |

---

## ✍️ Typography

- **Headings Font**: `'Fraunces'`, serif (weights 500, 600, 700) — elegant, organic, luxury feeling.
- **Body & UI Font**: `'Plus Jakarta Sans'`, sans-serif (weights 400, 500, 600, 700) — clean modern readability.

### Type Scale
- **Display / Hero H1**: `48px` desktop / `36px` mobile (line-height 1.15, letter-spacing `-0.02em`)
- **Section Heading H2**: `36px` desktop / `28px` mobile (line-height 1.25, letter-spacing `-0.01em`)
- **Subheading H3**: `24px` desktop / `20px` mobile
- **Card Titles H4**: `18px` desktop / `16px` mobile
- **Body Text**: `16px` (line-height 1.6)
- **Small / Meta**: `14px` or `12px`

---

## 📐 Spacing & Border Radius

- **Base Unit**: `8px` scale (8, 16, 24, 32, 48, 64, 80, 96px)
- **Card Radius**: `16px` (`rounded-2xl`)
- **Button Radius**: `12px` (`rounded-xl`) or full pill (`rounded-full`)
- **Hero / Panel Radius**: `24px` (`rounded-3xl`)
- **Card Shadow**: `0 8px 24px rgba(31, 59, 44, 0.08)` (soft organic shadow)
- **Elevated Hover Shadow**: `0 16px 36px rgba(31, 59, 44, 0.15)`

---

## ✨ Visual Language & Micro-Interactions

1. **Organic Shapes & Blobs**: Soft background SVG blobs in low opacity Sage Green (`rgba(122, 155, 118, 0.12)`).
2. **Glassmorphism**: Sticky navigation bar on scroll (`backdrop-blur-md bg-[#F7F4EE]/90`).
3. **Product Card Ratio**: Standard `4:5` aspect ratio images with smooth hover scale (`scale-105` image zoom inside `overflow-hidden` rounded card).
4. **Button States**:
   - Primary: `#C96F4A` fill, white text, hover lightens to `#D87D58`, click active scale `0.97`.
   - Secondary: `#1F3B2C` border or fill, hover shifts to `#7A9B76`.

/**
 * Calendly Configuration
 * ─────────────────────────────────────────────────────
 * PASTE YOUR CALENDLY URL HERE ↓
 * Example: "https://calendly.com/your-name/30min"
 *
 * To find your URL:
 *   1. Log in to https://calendly.com
 *   2. Go to Event Types
 *   3. Click "Copy Link" on any event
 * ─────────────────────────────────────────────────────
 */
export const CALENDLY_URL = "https://calendly.com/sainidishu2002/30min";

/**
 * Calendly InlineWidget styles — controls the embedded height.
 * min-width must be 320px (Calendly requirement).
 */
export const CALENDLY_STYLES = {
  minWidth: "320px",
  height: "700px",
};

/**
 * Calendly page settings — removes Calendly's own header/footer
 * so the widget blends into our design.
 */
export const CALENDLY_PAGE_SETTINGS = {
  backgroundColor: "ffffff",   /* white bg inside widget */
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
  primaryColor: "FF8C00",      /* matches our #FF8C00 accent */
  textColor: "1A1209",         /* matches our charcoal */
};

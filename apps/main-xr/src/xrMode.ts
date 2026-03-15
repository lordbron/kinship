/**
 * Detects whether the app is running as an installed PWA / WebSpatial app
 * (i.e. in the PICO emulator after "Run as standalone app") vs. a regular
 * desktop browser tab.
 *
 * When running as standalone, we:
 *   - Add the `is-spatial` class to <html> so WebSpatial CSS applies
 *   - Launch the available experiences as separate WebSpatial scenes
 *
 * When running in a regular browser:
 *   - Show a dark background
 *   - Render a launcher page with links to each experience
 */
export const isXRMode = window.matchMedia("(display-mode: standalone)").matches;

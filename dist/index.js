'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * A React hook that changes the tab title and favicon when the user switches to another tab
 * or when manually triggered.
 *
 * @example
 * // Basic usage with just a title change
 * const { startNotification, stopNotification } = useTabNotification({
 *   title: "Come back! 👋",
 *   manualTrigger: true
 * });
 *
 * @example
 * // Advanced usage with emoji favicons
 * const { isActive } = useTabNotification({
 *   title: "You have unread messages!",
 *   favicons: [
 *     { emoji: "🔔", backgroundColor: "#0078d4" },
 *     { emoji: "📬", backgroundColor: "#0078d4" }
 *   ],
 *   faviconInterval: 500 // Faster animation
 * });
 *
 * @param {UseTabNotificationOptions} options - Configuration options
 * @returns {Object} Control methods and state for the notification
 */
function useTabNotification(_a) {
    var _b = _a === void 0 ? {} : _a, notificationTitle = _b.title, _c = _b.favicons, notificationFavicons = _c === void 0 ? [] : _c, _d = _b.faviconInterval, faviconInterval = _d === void 0 ? 1000 : _d, _e = _b.manualTrigger, manualTrigger = _e === void 0 ? false : _e;
    // Track if the notification is currently active
    var _f = react.useState(false), isActive = _f[0], setIsActive = _f[1];
    // Store the original document title to restore it later
    var originalTitleRef = react.useRef("");
    // Store the original favicon elements to restore them later
    var originalIconsRef = react.useRef([]);
    // Track the current index in the favicons array
    var faviconIndexRef = react.useRef(0);
    // Store the interval ID for the favicon animation
    var intervalIdRef = react.useRef(null);
    /**
     * Converts an emoji to a data URL that can be used as a favicon
     *
     * @param {string} emoji - The emoji character to convert
     * @param {string} backgroundColor - Background color for the emoji
     * @param {number} size - Size of the emoji favicon in pixels
     * @returns {string} Data URL for the emoji favicon
     */
    var emojiToDataURL = function (emoji, backgroundColor, size) {
        if (backgroundColor === void 0) { backgroundColor = "transparent"; }
        if (size === void 0) { size = 32; }
        // Create a canvas element to draw the emoji
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return "";
        // Fill background if specified
        if (backgroundColor !== "transparent") {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, size, size);
        }
        // Draw the emoji centered on the canvas
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "".concat(Math.floor(size * 0.7), "px Arial");
        ctx.fillText(emoji, size / 2, size / 2);
        // Convert canvas to data URL
        return canvas.toDataURL("image/png");
    };
    /**
     * Helper function to get existing favicon link elements or create new ones if none exist
     * @returns {HTMLLinkElement[]} Array of favicon link elements
     */
    var ensureFaviconLinks = function () {
        // Ensure we're in a browser environment
        if (typeof document === "undefined")
            return [];
        var head = document.head || document.getElementsByTagName("head")[0];
        var existing = [];
        // Find all existing favicon links
        Array.from(head.querySelectorAll('link[rel*="icon"]')).forEach(function (link) {
            existing.push(link);
        });
        // If we found existing favicon links, return them
        if (existing.length)
            return existing;
        // Otherwise, create default icons
        var icon = document.createElement("link");
        icon.rel = "icon";
        icon.type = "image/x-icon";
        head.appendChild(icon);
        var apple = document.createElement("link");
        apple.rel = "apple-touch-icon";
        head.appendChild(apple);
        return [icon, apple];
    };
    /**
     * Sets a favicon URL or emoji to all favicon link elements
     * @param {string | EmojiConfig} favicon - The favicon URL or emoji configuration to set
     */
    var setFavicon = function (favicon) {
        var links = ensureFaviconLinks();
        // Convert the favicon to a URL if it's an emoji configuration
        var faviconUrl;
        if (typeof favicon === "string") {
            faviconUrl = favicon;
        }
        else {
            // It's an emoji configuration
            faviconUrl = emojiToDataURL(favicon.emoji, favicon.backgroundColor, favicon.size);
        }
        // Set the favicon URL to all link elements
        links.forEach(function (link) {
            link.href = faviconUrl;
        });
    };
    /**
     * Starts the favicon animation cycle
     */
    var startFaviconAnimation = function () {
        // Don't do anything if no favicons were provided
        if (!notificationFavicons.length)
            return;
        // Reset the index and set the first favicon
        faviconIndexRef.current = 0;
        setFavicon(notificationFavicons[0]);
        // Set up an interval to cycle through the favicons
        intervalIdRef.current = window.setInterval(function () {
            faviconIndexRef.current = (faviconIndexRef.current + 1) % notificationFavicons.length;
            setFavicon(notificationFavicons[faviconIndexRef.current]);
        }, faviconInterval);
    };
    /**
     * Stops the favicon animation and restores the original favicons
     */
    var stopFaviconAnimation = function () {
        // Clear the interval if it exists
        if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
        // Restore original icons
        originalIconsRef.current.forEach(function (orig, idx) {
            var currentLinks = ensureFaviconLinks();
            if (currentLinks[idx])
                currentLinks[idx].href = orig.href;
        });
    };
    /**
     * Starts the tab notification (changes title and favicon)
     */
    var startNotification = function () {
        // Skip if already active or if we're not in a browser environment
        if (isActive || typeof document === "undefined")
            return;
        // Save original title if not already saved
        if (!originalTitleRef.current) {
            originalTitleRef.current = document.title;
        }
        // Save original favicons if not already saved
        if (originalIconsRef.current.length === 0) {
            originalIconsRef.current = ensureFaviconLinks().map(function (link) { return link.cloneNode(true); });
        }
        // Change title if one was provided
        if (notificationTitle) {
            document.title = notificationTitle;
        }
        // Start favicon animation if favicons were provided
        if (notificationFavicons.length > 0) {
            startFaviconAnimation();
        }
        // Update active state
        setIsActive(true);
    };
    /**
     * Stops the tab notification and restores the original title and favicon
     */
    var stopNotification = function () {
        // Skip if not active or if we're not in a browser environment
        if (!isActive || typeof document === "undefined")
            return;
        // Restore original title
        document.title = originalTitleRef.current;
        // Stop animation & restore favicons
        stopFaviconAnimation();
        // Update active state
        setIsActive(false);
    };
    /**
     * Toggle the notification state
     */
    var toggleNotification = function () {
        if (isActive) {
            stopNotification();
        }
        else {
            startNotification();
        }
    };
    react.useEffect(function () {
        // Skip if we're not in a browser environment
        if (typeof document === "undefined")
            return;
        // Save original title
        originalTitleRef.current = document.title;
        // Save original favicons
        originalIconsRef.current = ensureFaviconLinks().map(function (link) { return link.cloneNode(true); });
        // If manual trigger is enabled, don't set up visibility change handler
        if (manualTrigger)
            return;
        /**
         * Handler for the visibilitychange event
         * Changes the title and favicon when the tab is hidden,
         * and restores them when the tab becomes visible again
         */
        var onVisibilityChange = function () {
            if (document.hidden) {
                startNotification();
            }
            else {
                stopNotification();
            }
        };
        // Add event listener for tab visibility changes
        document.addEventListener("visibilitychange", onVisibilityChange);
        // Clean up event listener and animations when the component unmounts
        return function () {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            stopNotification();
        };
    }, [manualTrigger]); // Only re-run if manualTrigger changes
    // Return control methods and state
    return {
        isActive: isActive,
        startNotification: startNotification,
        stopNotification: stopNotification,
        toggleNotification: toggleNotification,
    };
}

exports.default = useTabNotification;
exports.useTabNotification = useTabNotification;
//# sourceMappingURL=index.js.map

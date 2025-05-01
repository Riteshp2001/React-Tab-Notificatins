/**
 * @file index.ts
 * @description Main entry point for the react-tab-notification package
 */

export {
  useTabNotification,
  type UseTabNotificationOptions,
  type EmojiConfig,
} from "./useTabNotification";

export { TabNotificationDemo } from "../../app/TabNotificationDemo";

// Default export
export { useTabNotification as default } from "./useTabNotification";

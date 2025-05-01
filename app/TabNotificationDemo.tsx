"use client";

/**
 * @file TabNotificationDemo.tsx
 * @description Demo component for the useTabNotification hook using Tailwind CSS
 */

import type * as React from "react";
import { useState } from "react";
import {
  useTabNotification,
  type EmojiConfig,
} from "../hooks/useTabNotification/useTabNotification";

export const TabNotificationDemo: React.FC = () => {
  const [title, setTitle] = useState<string>("📢 Come back to the app!");
  const [faviconType, setFaviconType] = useState<string>("emoji");
  const [emojiList, setEmojiList] = useState<string>("🔔,📬,🔔,📬");
  const [urlList, setUrlList] = useState<string>(
    "/favicon-1.ico,/favicon-2.ico"
  );
  const [interval, setInterval] = useState<number>(800);
  const [manualTrigger, setManualTrigger] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>("#0078d4");

  const getFavicons = (): (string | EmojiConfig)[] => {
    if (faviconType === "emoji") {
      return emojiList
        .split(",")
        .map((emoji) => emoji.trim())
        .filter(Boolean)
        .map((emoji) => ({
          emoji,
          backgroundColor: bgColor,
          size: 32,
        }));
    } else {
      return urlList
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);
    }
  };

  const { isActive, startNotification, stopNotification, toggleNotification } =
    useTabNotification({
      title,
      favicons: getFavicons(),
      faviconInterval: interval,
      manualTrigger,
    });

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Tab Notification Demo
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            A powerful hook to manage tab notifications and favicon animations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Configuration
            </h2>

            <div className="space-y-6">
              <div className="form-group">
                <label className="text-sm font-semibold text-gray-700">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold text-gray-700">
                  Favicon Type
                </label>
                <div className="mt-2 flex gap-6">
                  {["emoji", "url"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        checked={faviconType === type}
                        onChange={() => setFaviconType(type)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 capitalize">
                        {type} Favicons
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {faviconType === "emoji" ? (
                <>
                  <div className="form-group">
                    <label className="text-sm font-semibold text-gray-700">
                      Emoji List
                    </label>
                    <input
                      type="text"
                      value={emojiList}
                      onChange={(e) => setEmojiList(e.target.value)}
                      className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-sm font-semibold text-gray-700">
                      Background Color
                    </label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-700">
                    URL List
                  </label>
                  <input
                    type="text"
                    value={urlList}
                    onChange={(e) => setUrlList(e.target.value)}
                    className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="text-sm font-semibold text-gray-700">
                  Animation Interval: {interval}ms
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={interval}
                  onChange={(e) => setInterval(Number(e.target.value))}
                  className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manualTrigger}
                    onChange={(e) => setManualTrigger(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Manual Trigger
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Preview & Controls
            </h2>

            <div
              className={`p-4 rounded-lg mb-6 ${
                isActive
                  ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700"
                  : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700"
              }`}
            >
              <div className="font-medium">
                Status: {isActive ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <button
                  onClick={toggleNotification}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isActive ? "Stop Notification" : "Start Notification"}
                </button>
                {isActive && (
                  <button
                    onClick={stopNotification}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Quick Guide
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                  <li>Adjust your notification settings above</li>
                  <li>Click "Start Notification" to preview</li>
                  <li>
                    Switch tabs to see it in action (if manual trigger is off)
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNotificationDemo;

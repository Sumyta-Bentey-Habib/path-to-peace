"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  fetchPrayerTimesServer: () => fetchPrayerTimesServer
});
module.exports = __toCommonJS(index_exports);

// src/actions.ts
async function fetchPrayerTimesServer(lat, lng) {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/today?latitude=${lat}&longitude=${lng}&method=2`
    );
    if (!response.ok) throw new Error("Failed to fetch prayer times");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching prayer times on server:", error);
    return null;
  }
}

// src/index.ts
async function main() {
  console.log("Server started");
}
main().catch(console.error);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchPrayerTimesServer
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/server/modules/database/database.service.ts
var import_mongoose2 = __toESM(require("mongoose"));
var import_colorette = require("colorette");

// src/server/modules/database/database.module.ts
var import_mongoose = require("mongoose");
var rageUserSchema = new import_mongoose.Schema({
  socialClub: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  money: { type: Number, default: 5e3 },
  bank: { type: Number, default: 25e3 }
});
var RageUser = (0, import_mongoose.model)("RageUser", rageUserSchema);

// src/server/modules/database/database.service.ts
import_mongoose2.default.set("strictQuery", true);
var DatabaseService = class {
  constructor(url) {
    this.connect(url);
  }
  async connect(url) {
    try {
      await import_mongoose2.default.connect(url);
      console.log((0, import_colorette.cyan)("[DATABASE]"), (0, import_colorette.green)("\u2713"), "MongoDB connected successfully!");
    } catch (error) {
      console.error((0, import_colorette.cyan)("[DATABASE]"), (0, import_colorette.red)("\u2717"), "MongoDB connection failed:", error);
    }
  }
  async getUser(socialClub) {
    return await RageUser.findOne({ socialClub });
  }
  async createUser(socialClub, username) {
    const user = new RageUser({ socialClub, username });
    await user.save();
    console.log((0, import_colorette.cyan)("[DATABASE]"), (0, import_colorette.green)("\u2713"), `User created: ${(0, import_colorette.bold)(username)}`);
    return user;
  }
  async updateMoney(socialClub, money) {
    await RageUser.updateOne({ socialClub }, { money });
  }
  async updateBank(socialClub, bank) {
    await RageUser.updateOne({ socialClub }, { bank });
  }
};

// src/server/server.module.ts
var ServerModule = class {
  constructor(config) {
    __publicField(this, "database");
    this.database = new DatabaseService(config.database.url);
  }
  getDatabase() {
    return this.database;
  }
};

// src/server/index.ts
var import_config = require("dotenv/config");
new ServerModule({
  database: {
    url: process.env.MONGO_URL || ""
  }
});

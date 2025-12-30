"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/client/decorators/events.decorators.ts
function RegisterEvent(eventName) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    mp.events.add(eventName, (...args) => {
      originalMethod.apply(target, args);
    });
  };
}

// src/client/utils/player.ts
var player = mp.players.local;

// src/client/core/browser/browser.service.ts
var _BrowserService = class _BrowserService {
  constructor(url) {
    _BrowserService.create(url);
  }
  /* ===================== CREATE / DESTROY ===================== */
  static create(url) {
    if (this.browser) {
      this.browser.destroy();
      this.browser = null;
    }
    this.browser = mp.browsers.new(url);
    this.browser.active = true;
    this.initialized = false;
  }
  static destroy() {
    if (!this.browser) return;
    this.browser.destroy();
    this.browser = null;
    this.initialized = false;
    this.queue = [];
    this.toggleQueue = [];
  }
  static exists() {
    return this.browser !== null;
  }
  /* ===================== CALL ===================== */
  static call(func, ...args) {
    var _a;
    if (!player) return;
    if (!this.initialized) {
      this.queue.push({ func, args });
      return;
    }
    (_a = this.browser) == null ? void 0 : _a.call(func, ...args);
  }
  call(func, ...args) {
    _BrowserService.call(func, ...args);
  }
  /* ===================== TOGGLE INTERFACE ===================== */
  static async toggle(app, toggle, cursor = false) {
    var _a;
    if (!player) return;
    if (!this.initialized) {
      this.toggleQueue.unshift({ app, toggle, cursor });
      return;
    }
    try {
      (_a = this.browser) == null ? void 0 : _a.call("CEF_BROWSER_TOGGLE", app, toggle);
      this.setCursor(cursor);
    } catch (err) {
      mp.console.logError(`[BrowserService.toggle] ${err}`);
    }
  }
  showInterface(name) {
    _BrowserService.toggle(name, true, true);
  }
  hideInterface(name) {
    _BrowserService.toggle(name, false, false);
  }
  static async hideAllInterfaces() {
    var _a;
    if (!player) return;
    (_a = this.browser) == null ? void 0 : _a.call("CEF_BROWSER_HIDE_ALL");
    return Promise.resolve();
  }
  /* ===================== INIT ===================== */
  static markInitialized() {
    var _a, _b;
    if (!player) return;
    this.initialized = true;
    for (const { app, toggle, cursor } of this.toggleQueue) {
      (_a = this.browser) == null ? void 0 : _a.call("CEF_BROWSER_TOGGLE", app, toggle);
      this.setCursor(cursor);
    }
    this.toggleQueue = [];
    for (const { func, args } of this.queue) {
      (_b = this.browser) == null ? void 0 : _b.call(func, ...args);
    }
    this.queue = [];
  }
  /* ===================== CURSOR ===================== */
  static setCursor(state) {
    if (!player) return;
    mp.gui.cursor.show(state, state);
    mp.events.callRemote("SERVER_SETVAR_CURSOR", state);
  }
};
__publicField(_BrowserService, "browser", null);
__publicField(_BrowserService, "initialized", false);
__publicField(_BrowserService, "queue", []);
__publicField(_BrowserService, "toggleQueue", []);
var BrowserService = _BrowserService;

// src/client/core/browser/browser.controller.ts
var BrowserController = class {
  constructor(service) {
    this.service = service;
  }
  onClientCallBrowser(func, ...args) {
    this.service.call(func, ...args);
  }
  onBrowserInitialize() {
    mp.console.logError(`[BrowserController.onBrowserInitialize]`);
    BrowserService.markInitialized();
  }
};
__decorateClass([
  RegisterEvent("CLIENT_CALL_BROWSER")
], BrowserController.prototype, "onClientCallBrowser", 1);
__decorateClass([
  RegisterEvent("CLIENT_BROWSER_INITIALIZE")
], BrowserController.prototype, "onBrowserInitialize", 1);

// src/client/core/browser/browser.module.ts
var BrowserModule = class {
  constructor(url) {
    __publicField(this, "service");
    mp.console.logError(`[BrowserModule] ${url}`);
    this.service = new BrowserService(url);
    new BrowserController(this.service);
  }
};

// src/client/core/console/console.constants.ts
var consoleCommands = /* @__PURE__ */ new Map();

// src/client/core/console/console.controller.ts
var ConsoleController = class {
  constructor() {
    this.registerGlobalEvent();
  }
  registerGlobalEvent() {
    mp.events.add("consoleCommand", (command) => {
      var _a;
      const args = command.trim().split(" ");
      const cmd = (_a = args.shift()) == null ? void 0 : _a.toLowerCase();
      if (!cmd) return;
      const handler = consoleCommands.get(cmd);
      if (!handler)
        return;
      handler(...args);
    });
  }
};

// src/client/decorators/console.decorators.ts
var RegisterConsoleCommand = (name) => {
  return function(target, propertyKey, descriptor) {
    consoleCommands.set(name.toLowerCase(), descriptor.value.bind(target));
  };
};

// src/client/core/console/console.commands.ts
var ConsoleCommands = class {
  constructor() {
  }
  restart() {
    mp.console.logInfo("Server restarting...");
  }
  giveCash(playerId, amount) {
    mp.console.logInfo(`Giving ${amount}$ to player ${playerId}`);
  }
  clear() {
    mp.console.clear();
  }
  interfaces(toggle) {
    BrowserService.toggle("Test", toggle !== "true" ? false : true);
  }
};
__decorateClass([
  RegisterConsoleCommand("restart")
], ConsoleCommands.prototype, "restart", 1);
__decorateClass([
  RegisterConsoleCommand("givecash")
], ConsoleCommands.prototype, "giveCash", 1);
__decorateClass([
  RegisterConsoleCommand("clear")
], ConsoleCommands.prototype, "clear", 1);
__decorateClass([
  RegisterConsoleCommand("test")
], ConsoleCommands.prototype, "interfaces", 1);

// src/client/core/console/console.service.ts
var ConsoleService = class {
  constructor(controller) {
    this.controller = controller;
    __publicField(this, "commands");
    this.commands = new ConsoleCommands();
    mp.console.logInfo("[CONSOLE] Loaded ConsoleService");
  }
};

// src/client/core/console/console.module.ts
var ConsoleModule = class {
  constructor() {
    __publicField(this, "controller");
    __publicField(this, "service");
    this.controller = new ConsoleController();
    this.service = new ConsoleService(this.controller);
  }
};

// src/client/client.module.ts
var ClientModule = class {
  constructor() {
    new ConsoleModule();
    new BrowserModule(
      "http://localhost:5173"
    );
  }
};

// src/client/index.ts
new ClientModule();

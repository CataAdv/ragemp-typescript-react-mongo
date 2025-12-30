import { player } from "@/utils/player";


type QueuedCall = {
    func: string;
    args: any[];
};

type QueuedToggle = {
    app: string;
    toggle: boolean;
    cursor: boolean;
};

class BrowserService {
    private static browser: BrowserMp | null = null;
    private static initialized = false;

    private static queue: QueuedCall[] = [];
    private static toggleQueue: QueuedToggle[] = [];

    constructor(url: string) {
        BrowserService.create(url);
    }

    /* ===================== CREATE / DESTROY ===================== */

    public static create(url: string) {
        if (this.browser) {
            this.browser.destroy();
            this.browser = null;
        }

        this.browser = mp.browsers.new(url);
        this.browser.active = true;
        this.initialized = false;
    }

    public static destroy() {
        if (!this.browser) return;

        this.browser.destroy();
        this.browser = null;
        this.initialized = false;
        this.queue = [];
        this.toggleQueue = [];
    }

    public static exists(): boolean {
        return this.browser !== null;
    }

    /* ===================== CALL ===================== */

    public static call(func: string, ...args: any[]): void {
        if (!player) return;

        if (!this.initialized) {
            this.queue.push({ func, args });
            return;
        }

        this.browser?.call(func, ...args);
    }

    public call(func: string, ...args: any[]) {
        BrowserService.call(func, ...args);
    }

    /* ===================== TOGGLE INTERFACE ===================== */

    public static async toggle(
        app: string,
        toggle: boolean,
        cursor: boolean = false
    ): Promise<void> {
        if (!player) return;

        if (!this.initialized) {
            this.toggleQueue.unshift({ app, toggle, cursor });
            return;
        }

        try {
            this.browser?.call("CEF_BROWSER_TOGGLE", app, toggle);

            this.setCursor(cursor);
        } catch (err) {
            mp.console.logError(`[BrowserService.toggle] ${err}`);
        }
    }

    public showInterface(name: string) {
        BrowserService.toggle(name, true, true);
    }

    public hideInterface(name: string) {
        BrowserService.toggle(name, false, false);
    }

    public static async hideAllInterfaces(): Promise<void> {
        if (!player) return;
        this.browser?.call("CEF_BROWSER_HIDE_ALL");
        return Promise.resolve();
    }

    /* ===================== INIT ===================== */

    public static markInitialized(): void {
        if (!player) return;

        this.initialized = true;

        for (const { app, toggle, cursor } of this.toggleQueue) {
            this.browser?.call("CEF_BROWSER_TOGGLE", app, toggle);
            this.setCursor(cursor);
        }
        this.toggleQueue = [];

        for (const { func, args } of this.queue) {
            this.browser?.call(func, ...args);
        }
        this.queue = [];
    }

    /* ===================== CURSOR ===================== */

    public static setCursor(state: boolean): void {
        if (!player) return;

        mp.gui.cursor.show(state, state);
        mp.events.callRemote("SERVER_SETVAR_CURSOR", state);
    }

}

export { BrowserService };
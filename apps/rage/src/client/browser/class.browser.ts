
export class RageBrowser {

    public static browser: BrowserMp = mp.browsers.new("");

    constructor() {
        RageBrowser.browser = mp.browsers.new("package://ui/index.html");
        RageBrowser.browser.active = true;
    }

    public static call(name: string, ...args: any[]) {
        RageBrowser.browser?.call(name, ...args);
    }

    public static showInterface(name: string) {
        RageBrowser.browser?.call("CEF_SHOW_INTERFACE", name);
    }

    public static hideInterface(name: string) {
        RageBrowser.browser?.call("CEF_HIDE_INTERFACE", name);
    }

}
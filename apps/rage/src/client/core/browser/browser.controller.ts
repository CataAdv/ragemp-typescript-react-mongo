import { RegisterEvent } from "@/decorators/events.decorators";
import { BrowserService } from "./browser.service";


class BrowserController {

    constructor(private service: BrowserService) {}

    @RegisterEvent("CLIENT_CALL_BROWSER")
    onClientCallBrowser(func: string, ...args: any[]) {
        this.service.call(func, ...args);
    }

    @RegisterEvent("CLIENT_BROWSER_INITIALIZE")
    onBrowserInitialize() {
        mp.console.logError(`[BrowserController.onBrowserInitialize]`);
        BrowserService.markInitialized();
    }

}

export { BrowserController }; 

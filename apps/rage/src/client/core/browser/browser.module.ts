import { BrowserController } from "./browser.controller";
import { BrowserService } from "./browser.service";

export class BrowserModule {

    private readonly service: BrowserService;

    constructor(url: string) {
        mp.console.logError(`[BrowserModule] ${url}`);
        this.service = new BrowserService(url);
        new BrowserController(this.service);
    }

}
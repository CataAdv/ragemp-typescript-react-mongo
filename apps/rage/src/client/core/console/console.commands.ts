import { RegisterConsoleCommand } from "@/decorators/console.decorators";
import { BrowserService } from "../browser/browser.service";

export class ConsoleCommands {

    constructor() {

    }

    @RegisterConsoleCommand("restart")
    restart() {
        mp.console.logInfo("Server restarting...");
    }

    @RegisterConsoleCommand("givecash")
    giveCash(playerId: string, amount: string) {
        mp.console.logInfo(`Giving ${amount}$ to player ${playerId}`);
    }

    @RegisterConsoleCommand("clear")
    clear() {
        mp.console.clear();
    }

    @RegisterConsoleCommand("test")
    interfaces(toggle: string) {
        BrowserService.toggle("Test", toggle !== "true" ? false : true);
    }
}

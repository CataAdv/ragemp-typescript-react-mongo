import { ConsoleCommands } from "./console.commands";
import { ConsoleController } from "./console.controller";

class ConsoleService {
    private readonly commands: ConsoleCommands;

    constructor(private controller: ConsoleController) {
        this.commands = new ConsoleCommands();
        mp.console.logInfo("[CONSOLE] Loaded ConsoleService");
    }
}

export { ConsoleService };

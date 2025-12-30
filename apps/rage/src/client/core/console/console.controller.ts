import { consoleCommands } from "./console.constants";

export class ConsoleController {

    constructor() {
        this.registerGlobalEvent();
    }

    private registerGlobalEvent() {
        mp.events.add("consoleCommand", (command: string) => {
            const args = command.trim().split(" ");
            const cmd = args.shift()?.toLowerCase();

            if (!cmd) return;

            const handler = consoleCommands.get(cmd);
            
            if (!handler)
                return;

            handler(...args);
        });
    }
}

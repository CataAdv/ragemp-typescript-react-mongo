import { ConsoleController } from "./console.controller";
import { ConsoleService } from "./console.service";

class ConsoleModule {
    private readonly controller: ConsoleController;
    private readonly service: ConsoleService;

    constructor() {
        this.controller = new ConsoleController();
        this.service = new ConsoleService(this.controller);
    }
}

export { ConsoleModule };
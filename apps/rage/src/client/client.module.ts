import { BrowserModule } from "./core/browser/browser.module";
import { ConsoleModule } from "./core/console/console.module";


class ClientModule {

    constructor() {

        /**
         * Console Module
         */
        
        new ConsoleModule();

        /**
         * browser module
         */

        new BrowserModule(
            "http://localhost:5173"
        );

    }

}

export { ClientModule };
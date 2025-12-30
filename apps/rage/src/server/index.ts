/** 
 * Server-side basicly imports
**/

import { ServerModule } from "./server.module";



/**
 * Server-side server module
 */

new ServerModule({
    database: {
        url: "mongodb://test:parola@localhost:27017/testdb"
    }
});


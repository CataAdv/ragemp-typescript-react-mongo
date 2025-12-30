/** 
 * Server-side basicly imports
**/

import { ServerModule } from "./server.module";
import 'dotenv/config';


/**
 * Server-side server module
 */

new ServerModule({
    database: {
        url: process.env.MONGO_URL || ""
    }
});

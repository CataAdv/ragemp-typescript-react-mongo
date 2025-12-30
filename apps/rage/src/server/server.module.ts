import { DatabaseService } from "./modules/database/database.service"

export class ServerModule {

    private readonly database: DatabaseService;

    constructor(config: { 
        database: {
            url: string 
        }
    }) {
        this.database = new DatabaseService(config.database.url);
    }

    public getDatabase(): DatabaseService {
        return this.database;
    }

}
import { greenBright } from 'colorette';
import mongoose from 'mongoose';

export class DatabaseController {
    private static instance: DatabaseController;

    private constructor() {}

    public static getInstance(): DatabaseController {
        if (!DatabaseController.instance) {
        DatabaseController.instance = new DatabaseController();
        }
        return DatabaseController.instance;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect('mongodb://ragemp_user:parola_sigura_aici@localhost:27017/ragemp');
            console.log(greenBright("[MONGO]"), 'MongoDB connected');
        } catch (error) {
            console.log(greenBright("[MONGO]"), 'MongoDB connection failed', error);
        }
    }
}
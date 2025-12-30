import mongoose from 'mongoose';
import { green, red, cyan, bold } from 'colorette';
import { RageUser } from "./database.module";

mongoose.set('strictQuery', true);

export class DatabaseService {
  
  constructor(url: string) {
    this.connect(url);
  }
  
  private async connect(url: string): Promise<void> {
    try {
      await mongoose.connect(url);
      console.log(cyan('[DATABASE]'), green('✓'), 'MongoDB connected successfully!');
    } catch (error) {
      console.error(cyan('[DATABASE]'), red('✗'), 'MongoDB connection failed:', error);
    }
  }
  
  public async getUser(socialClub: string) {
    return await RageUser.findOne({ socialClub });
  }
  
  public async createUser(socialClub: string, username: string) {
    const user = new RageUser({ socialClub, username });
    await user.save();
    console.log(cyan('[DATABASE]'), green('✓'), `User created: ${bold(username)}`);
    return user;
  }
  
  public async updateMoney(socialClub: string, money: number) {
    await RageUser.updateOne({ socialClub }, { money });
  }
  
  public async updateBank(socialClub: string, bank: number) {
    await RageUser.updateOne({ socialClub }, { bank });
  }
}
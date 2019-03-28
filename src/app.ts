import * as compression from 'compression';
import * as cors from 'cors';
import { config } from 'dotenv';
import * as express from 'express';
import { Server } from 'http';
import * as mongoose from 'mongoose';
import RedirecterModel from './schema';

config();

class App {
  public ROOT_URL = '/';
  public app: express.Application;
  public model = RedirecterModel;
  public server: Server;
  public port = process.env.PORT || 4000;

  constructor() {
    this.app = express();
    this.setupDB();
    this.config();
    // this.app.use();
    this.server = this.app.listen(this.port);
  }

  private setupDB(): void {
    mongoose.connect(process.env.MONGO_URL);

    mongoose.connection.on('connected', () => {
      console.log('connected to the database');
    });

    mongoose.connection.on('error', err => {
      console.log('Mongoose connection error');
    });
  }

  private config(): void {
    this.app.use(compression());
    this.app.use(cors());
  }

  private async addURL(key_url: string, target_url: string): Promise<boolean> {
    const _m = new this.model({ key_url: key_url, target_url: target_url });
    try {
      await _m.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private async getURL(key_url: string): Promise<string> {
    return 'null';
  }
}

export default new App();

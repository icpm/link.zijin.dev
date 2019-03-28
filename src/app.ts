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
    this.app.use('/:key_url', async (req, res) => {
      const target_url: string = await this.getURL(req.params.key_url);
      if (target_url) {
        res.status(301).redirect(target_url);
      }
    });
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

  private async addURL(
    key_url: string = 'cs4001group',
    target_url: string = 'https://docs.google.com/presentation/d/1TgxRrGsqMrormKjv1zTN-aEuWUMA7mE9stUo886QGDA/edit?usp=sharing'
  ): Promise<boolean> {
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
    const res = await this.model.findOne({ key_url: key_url });
    if (!res) {
      return 'null';
    } else {
      return res.target_url;
    }
  }
}

export default new App();

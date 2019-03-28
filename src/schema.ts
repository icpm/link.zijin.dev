import { prop, Typegoose } from 'typegoose';

class Redirecter extends Typegoose {
  @prop({ unique: true })
  key_url: string;

  @prop()
  target_url: string;
}

const RedirecterModel = new Redirecter().getModelForClass(Redirecter);

export default RedirecterModel;

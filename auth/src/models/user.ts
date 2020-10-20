import mongoose from 'mongoose';
import {Password} from '../services/password';

// an interface that describes a new user
//typescript 
interface UserAttrs {
  email: string;
  password: string;
}

//an interface that describes the properties that a 
//user model has
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}

//an interface that describes the props that a
//user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

//type attribute is mongoose not typescripts for type:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String, 
    required: true
  }
});
userSchema.pre('save', async function(done) {
  if (this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})

userSchema.statics.build = (attrs:UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User };
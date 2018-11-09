import User from '../db/models/User';

export default class UserService {
  findOne(credentials) {
    return credentials.type === 'Google' ? User.findOne({'google.id': credentials.id}) : Promise.resolve(null);
  }

  register(credentials) {
    if (credentials.type === 'Google')
      return new User({google: {id: credentials.id, email: credentials.email, name: credentials.name}}).save();

    throw new Error('Unknown Credentials type');
  }
}
import User from './models/User'

export default class UserService {
    getByGoogleId(googleId) {
        return User.findOne({ 'google.id' : googleId });
    }

    save(user) {
        return new User(user).save();
    }
}
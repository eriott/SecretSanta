import GoogleJWTVerifier from "./GoogleJWTVerifier";
import UserService from "../UserService";

export default class AuthService {
  async authorize(data) {
    if (data.type !== 'Google')
      throw new Error('Unknown authorization method');

    const payload = await new GoogleJWTVerifier().verify(data.jwt);

    const userService = new UserService();
    let user = await userService.findOne({type: 'Google', id: payload.sub});
    if (!user) {
      user = await userService.register({type: 'Google', id: payload.sub});
    }

    return user;
  }
}
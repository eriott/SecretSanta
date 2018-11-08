import {OAuth2Client} from 'google-auth-library';
import config from '../../../config';

export default class GoogleJWTVerifier {
  async verify(jwt) {
    const client = new OAuth2Client(config.googleAuth.clientID);
    const ticket = await client.verifyIdToken({
      idToken: jwt,
      audience: config.googleAuth.clientID
    });
    return ticket.getPayload();
  }
}
import User from '../db/User'
import Event from '../db/Event'
import UserEvent from '../dto/Event'
import Addressee from '../dto/Аddressee'

export default class UserEventService {
    getByUser(user) {
        return Event.find({members: user._id}).populate('members').then(events => {
            return events.map(event => {
                let addressee;
                if (event.pairs) {
                    let pair = event.pairs.filter(pair => pair.from.equals(user._id))[0];
                    if (pair && pair.to) {
                        let targetUser = event.members.filter(member => member._id === pair.to)[0];
                        addressee = new Addressee(Object.assign(targetUser.postData, targetUser.about))
                    }
                }

                return new UserEvent(Object.assign(event, {addressee: addressee, isPackageSent: false}))
            })
        });
    }
}
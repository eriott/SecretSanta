import Event from '../db/models/Event'
import UserEvent from '../dto/UserEvent'
import Addressee from '../dto/Аddressee'

export default class UserEventService {
    getByUser(user) {
        return Event.find({members: user._id}).populate('members').then(events => {
            return events.map(event => {
                let addressee;
                let pair;
                if (event.pairs) {
                    pair = event.pairs.filter(pair => pair.from.equals(user._id))[0];
                    if (pair && pair.to) {
                        let targetUser = event.members.filter(member => member._id.equals(pair.to))[0];
                        addressee = new Addressee(Object.assign(targetUser.toJSON().postData, targetUser.toJSON()))
                    }
                }
                return new UserEvent(Object.assign(event.toJSON(), {
                    id: event.toJSON()._id,
                    user: user,
                    addressee: addressee,
                    isGiftSent: pair ? pair.isGiftSent : undefined,
                    isGiftReceived: pair ? pair.isGiftReceived : undefined,
                    endDate: event.endDate.toDateString()
                }))
            })
        }).catch(err => {
            console.error(err);
        });
    }

    save(event) {
        console.log('Save event', event);

        let set = {};
        if (event.isGiftSent) {
            set['pairs.$.isGiftSent'] = event.isGiftSent;
        }
        if (event.isGiftReceived) {
            set['pairs.$.isGiftReceived'] = event.isGiftReceived;
        }

        return Event.update({_id: event.id, 'pairs.from': event.user._id}, {'$set': set})
            .then(updated => {
                console.log(updated)
            }).catch(err => {
                console.log(err);
            });
    }
}
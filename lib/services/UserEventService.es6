import Event from '../db/models/Event'
import UserEvent from '../dto/UserEvent'
import Addressee from '../dto/Аddressee'

export default class UserEventService {
    getByUser(user) {
        return Event.find({members: user._id}).sort('-startDate').populate('members').then(events => {
            return events.map(event => {
                let addressee;
                let myPair;
                let showGiftSentMessage, showGiftReceivedMessage;
                let receivedTrackingNumber;

                if (event.pairs) {
                    myPair = event.pairs.filter(pair => pair.from.equals(user._id))[0]; // from me pair
                    if (myPair && myPair.to) {
                        let targetUser = event.members.filter(member => member._id.equals(myPair.to))[0];
                        addressee = new Addressee(Object.assign(targetUser.toJSON().postData, targetUser.toJSON()));

                        let myAddresseePair = event.pairs.filter(pair => pair.from.equals(targetUser._id))[0];
                        showGiftReceivedMessage = myAddresseePair && myAddresseePair.isGiftReceived;
                    }

                    let toMePair = event.pairs.filter(pair => pair.to.equals(user._id))[0];
                    showGiftSentMessage = toMePair && toMePair.isGiftSent;
                    receivedTrackingNumber = toMePair ? toMePair.trackingNumber : undefined;
                }

                let timeDiff = Math.abs(event.endDate.getTime() - event.startDate.getTime());
                let daysTotal = Math.ceil(timeDiff / (1000 * 3600 * 24));
                timeDiff = Math.abs(new Date().getTime() - event.startDate.getTime());
                let daysGone = Math.ceil(timeDiff / (1000 * 3600 * 24));

                return new UserEvent(Object.assign(event.toJSON(), {
                    id: event.toJSON()._id,
                    user: user,
                    addressee: addressee,
                    isGiftSent: myPair ? myPair.isGiftSent : undefined,
                    sentTrackingNumber: myPair && myPair.trackingNumber ? myPair.trackingNumber : '',
                    receivedTrackingNumber: receivedTrackingNumber,
                    isGiftReceived: myPair ? myPair.isGiftReceived : undefined,
                    endDate: event.endDate.toDateString(),
                    membersCount: event.members.length,
                    completion: Math.round(daysGone / daysTotal * 100),
                    showGiftSentMessage: showGiftSentMessage,
                    showGiftReceivedMessage: showGiftReceivedMessage
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

        if (event.sentTrackingNumber === '' || Boolean(event.sentTrackingNumber)) {
            set['pairs.$.trackingNumber'] = event.sentTrackingNumber;
        }

        return Event.update({_id: event.id, 'pairs.from': event.user._id}, {'$set': set})
            .then(updated => {
                console.log(updated)
            }).catch(err => {
                console.log(err);
            });
    }
}

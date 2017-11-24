import Event from '../db/models/Event'

export default class AssignAddressesService {
    assign() {
        return Event.find().populate('members').then(events => {
            events.forEach(event => {
                let ids = event.members.map(user => user._id);
                let all = event.members.map(user => user._id);

                let pairs = [];
                ids.forEach(id => {
                    let others = all.filter(otherId => otherId !== id);

                    let index = Math.floor(Math.random() * others.length);
                    let candidate = others[index];
                    pairs.push({from: id, to: candidate});
                    let start = all.indexOf(candidate);
                    all.splice(start, 1);
                });

                event.pairs = pairs;
                event.save((err, saved) => {
                    if (err) {
                        console.log("Error occured", err);
                    } else {
                        console.log("Saved event", saved);
                    }
                });
            });
        });
    }
}
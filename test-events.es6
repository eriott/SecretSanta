import User from './lib/db/models/User'
import Event from './lib/db/models/Event'

let events = [ {
    uid: 'codegirls17',
    name: "Codegirls Secret Santa 2017",
    startDate: new Date(2017, 10, 27),
    endDate: new Date(2017, 11, 4),
    members: []
}];

// User.find().then(users => {
    events.forEach(event => {
        if (!event.skip) {
            let eventDao = new Event(event);
            // users.forEach(user => eventDao.members.push(user));
            return eventDao.save().then(saved => console.log("Event saved", saved))
        }
    });
// });
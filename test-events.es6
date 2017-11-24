import User from './lib/db/models/User'
import Event from './lib/db/models/Event'

let events = [{
    startDate: new Date(2017, 10, 10),
    endDate: new Date(2018, 1, 10),
    members: [],
    skip: true
}, {
    startDate: new Date(2017, 10, 20),
    endDate: new Date(2018, 0, 10),
    members: [],
    name: "Codegirls Secret Santa 2017/18"
}];

User.find().then(users => {
    events.forEach(event => {
        if (!event.skip) {
            let eventDao = new Event(event);
            users.forEach(user => eventDao.members.push(user));
            return eventDao.save().then(saved => console.log("Event saved", saved))
        }
    })
});
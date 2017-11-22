import User from './lib/db/User'
import Event from './lib/db/Event'

let events = [{
    startDate: new Date(2017, 10, 10),
    endDate: new Date(2018, 1, 10),
    members: []
}];

User.find().then(users => {
   events.forEach(event => {
       let eventDao = new Event(event);
       users.forEach(user => eventDao.members.push(user));
       return eventDao.save().then(saved => console.log("Event saved", saved))
   })
});
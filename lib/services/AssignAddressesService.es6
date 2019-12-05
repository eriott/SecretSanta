import Event from '../db/models/Event'

export default class AssignAddressesService {
  assign () {
    const CODEGIRLS_EVENT = 'codegirls19';
    console.log('Assign pairs for event', CODEGIRLS_EVENT);
    return Event.find({uid: CODEGIRLS_EVENT}).populate('members').then(events => {
      return Promise.all(events.map(event => {
        event.pairs = this._makePairs(event);
        return event.save();
      }));
    });
  }

  _makePairs (event) {
    let ids = event.members.filter(member => member.canUseInPair()).map(user => user._id);
    let all = event.members.filter(member => member.canUseInPair()).map(user => user._id);

    if (all.length === 1) {
      console.log('Can not assign pair for event with 1 member');
      return [];
    }

    let pairs = [];
    ids.forEach(id => {
      let others = all.filter(otherId => !otherId.equals(id));
      let candidate;

      if (others.length === 2) {
        // fix cycling bug when one user can not get pair
        others.forEach(other => {
          if (pairs.filter(pair => pair.from.equals(other) || pair.to.equals(other)).length === 0) {
            candidate = other;
          }
        })
      }

      if (!candidate) {
        let index = Math.floor(Math.random() * others.length);
        candidate = others[index];
      }

      pairs.push({from: id, to: candidate});
      let start = all.indexOf(candidate);
      all.splice(start, 1);
    });

    return pairs;
  }
}

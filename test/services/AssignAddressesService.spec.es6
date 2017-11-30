import Event from '../../lib/db/models/Event'
import User from '../../lib/db/models/User'
import AssignAddressesService from '../../lib/services/AssignAddressesService'

describe('AssignAddressesService', () => {
    let service;

    let user1;
    let user2;
    let user3;
    let user4;

    let event;

    beforeEach(done => {
        user1 = new User({postData: {fullName: 'User1', address: 'User1 Address'}});
        user2 = new User({postData: {fullName: 'User2', address: 'User2 Address'}});
        user3 = new User({postData: {fullName: 'User3', address: 'User3 Address'}});
        user4 = new User({postData: {fullName: 'User4', address: 'User4 Address'}});

        event = new Event({uid: 'any event uid'});
        event.members = [user1, user2, user3, user4];

        service = new AssignAddressesService();

        Promise.resolve()
            .then(() => User.remove({}))
            .then(() => Event.remove({}))
            .then(() => Promise.all([user1.save(), user2.save(), user3.save(), user4.save()]))
            .then(() => event.save())
            .then(() => done(), done);
    });

    describe('#assign', () => {
        it('creates pair for all members of Event', done => {
            service.assign()
                .then(() => Event.find().populate('members'))
                .then(([event]) => {
                    expect(event).not.undefined;
                    expect(event.pairs).not.undefined;
                    expect(event.pairs).lengthOf(event.members.length);

                    expect(event.pairs.filter(pair => pair.from.equals(user1._id))).lengthOf(1);
                    expect(event.pairs.filter(pair => pair.from.equals(user2._id))).lengthOf(1);
                    expect(event.pairs.filter(pair => pair.from.equals(user3._id))).lengthOf(1);
                    expect(event.pairs.filter(pair => pair.from.equals(user4._id))).lengthOf(1);

                    expect(event.pairs.filter(pair => pair.to.equals(user1._id))).lengthOf(1);
                    expect(event.pairs.filter(pair => pair.to.equals(user2._id))).lengthOf(1);
                    expect(event.pairs.filter(pair => pair.to.equals(user3._id))).lengthOf(1);
                    expect(event.pairs.filter(pair => pair.to.equals(user4._id))).lengthOf(1);
                }).then(done, done);
        });

        it('creates pair with different from and to', done => {
            service.assign()
                .then(() => Event.find())
                .then(([event]) => {
                    expect(event).not.undefined;
                    expect(event.pairs).not.undefined;
                    expect(event.pairs).lengthOf(event.members.length);

                    expect(event.pairs.filter(pair => pair.from.equals(pair.to))).lengthOf(0);
                }).then(done, done);
        });

        it('doesnt create pair for users without fullName and address', done => {
            user1.postData.fullName = '';
            user3.postData.address = '';

            Promise.all([user1.save(), user3.save()]).then(() => {
                service.assign()
                    .then(() => Event.find())
                    .then(([event]) => {
                        expect(event).not.undefined;
                        expect(event.pairs).not.undefined;
                        expect(event.pairs).lengthOf(2);

                        expect(event.pairs.filter(pair => pair.from.equals(user1._id))).lengthOf(0);
                        expect(event.pairs.filter(pair => pair.from.equals(user3._id))).lengthOf(0);

                        expect(event.pairs.filter(pair => pair.to.equals(user1._id))).lengthOf(0);
                        expect(event.pairs.filter(pair => pair.to.equals(user3._id))).lengthOf(0);
                    }).then(done, done);
            });
        });

        it('creates pairs when event has odd number of members', done => {
            User.remove({_id: user4._id}).then(() => {
                service.assign()
                    .then(() => Event.find())
                    .then(([event]) => {
                        expect(event).not.undefined;
                        expect(event.pairs).not.undefined;
                        expect(event.pairs).lengthOf(3);

                        expect(event.pairs.filter(pair => pair.from.equals(user1._id))).lengthOf(1);
                        expect(event.pairs.filter(pair => pair.from.equals(user2._id))).lengthOf(1);
                        expect(event.pairs.filter(pair => pair.from.equals(user3._id))).lengthOf(1);

                        expect(event.pairs.filter(pair => pair.to.equals(user1._id))).lengthOf(1);
                        expect(event.pairs.filter(pair => pair.to.equals(user2._id))).lengthOf(1);
                        expect(event.pairs.filter(pair => pair.to.equals(user3._id))).lengthOf(1);

                        expect(event.pairs.filter(pair => pair.from.equals(pair.to))).lengthOf(0);
                    }).then(done, done);
            });
        });
    });
});
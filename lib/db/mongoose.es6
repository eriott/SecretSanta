import mongoose from 'mongoose'
import config from '../../config'

// Using native promises (see http://mongoosejs.com/docs/promises.html)
// Mongoose's default promise library `mpromise` is deprecated
mongoose.Promise = global.Promise;

console.log('config', config);
let dbUrl = config.db;
console.log(`Connect to ${dbUrl}`);
mongoose.connect(dbUrl);

export function model(name, definition, tune, collection, skipInit) {
    let schema = new mongoose.Schema(definition);
    let model = mongoose.model(name, schema, collection, skipInit);
    model.on('index', err => {
        if (err)
            console.error('Index create error:', err);
    });
    return model;
}

mongoose.define = model;

export let Types = mongoose.Schema.Types;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let db = mongoose;

export function newObjectId(id) {
    return mongoose.Types.ObjectId(id);
}

export default mongoose;
import * as chai from 'chai';
import * as sinon from 'sinon';

chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.sinon = sinon;
import {EXCHANGE_CREATE_BEGIN, EXCHANGE_CREATE_FAILURE, EXCHANGE_CREATE_SUCCESS} from "../actions/exchangeActions";

const event = {
  uid: 'codegirls18',
  name: "Codegirls Secret Santa 2018",
  addressee: {
    fullName: 'Настя Иванова',
    address: 'г. Владивосток, ул. Круглая, д. 5, кв. 17',
    about: 'Люблю наклейки',
    telegramLogin: 'nastya'
  },
  isGiftSent: true,
  isGiftReceived: false,
  endDate: new Date(),
  membersCount: 12,
  completion: 70,
  showGiftSentMessage: true,
  showGiftReceivedMessage: true
};

const initialState = {startExchange: {progress: false}, items: [{
  uid: 'codegirls17',
  name: "Codegirls Secret Santa 2017",
  startDate: new Date(2017, 10, 27),
  endDate: new Date(2017, 11, 4),
  members: []
}, event]};

export default function (state = initialState, action) {
  switch (action.type) {
    case EXCHANGE_CREATE_BEGIN:
      return Object.assign({}, state, {startExchange: {progress: true, exchange: action.exchange}});
    case EXCHANGE_CREATE_SUCCESS:
      return Object.assign({}, state, {startExchange: {progress: false, exchange: action.exchange, succeed: true}, items: [action.exchange].concat(state.items)});
    case EXCHANGE_CREATE_FAILURE:
      return Object.assign({}, state, {startExchange: {progress: false, exchange: action.exchange, error: action.error}});
    default:
      return state;
  }
}
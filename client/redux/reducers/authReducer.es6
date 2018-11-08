import {AUTH_BEGIN, AUTH_FAILURE, AUTH_SUCCESS} from "../actions/authActions";

const user = {
  "about": "Proin sed lectus hendrerit, convallis risus id, lobortis est. Nunc urna dui, luctus elementum ligula quis, pellentesque faucibus ligula. Proin rhoncus massa et sem lacinia pellentesque. Cras luctus, mauris sed varius egestas, tortor ipsum condimentum augue, eget accumsan justo risus ut nisi. ",
  "postData": {
    "address": "Россия, г. Волгоград, ул. Ленина 2а, кв. 21",
    "fullName": "Петрова Анастасия Анатольевна"
  },
  "google": {
    "id": "123",
    "token": "google token",
    "name": "Петрова Анастасия",
    "email": "garaeva.regina9@gmail.com"
  },
  "__v": 0,
  "telegramLogin": "nastya"
};
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_BEGIN:
      return Object.assign({}, state, {token: null});
    case AUTH_SUCCESS:
      return Object.assign({}, state, {token: action.token});
    case AUTH_FAILURE:
      return Object.assign({}, state, {token: null});
    default:
      return state;
  }
}
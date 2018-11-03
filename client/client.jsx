import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from "./redux/configureStore";
import routes from '../routes';

let user = {
    "about": "Proin sed lectus hendrerit, convallis risus id, lobortis est. Nunc urna dui, luctus elementum ligula quis, pellentesque faucibus ligula. Proin rhoncus massa et sem lacinia pellentesque. Cras luctus, mauris sed varius egestas, tortor ipsum condimentum augue, eget accumsan justo risus ut nisi. ",
    "postData": {
        "address": "Россия, г. Тюмень, ул. Чернышевского 2а, кв. 72, инд. 625003",
        "fullName": "Гараева Регина Ильшатовна"
    },
    "google": {
        "id": "110000217167418966873",
        "token": "ya29.GlwSBURlidZVEkiDSQ6GkqRqvEfIC_zoWhhvPGdMjjt2Jn2Keik6t3qLW2TDAzdxICCs3TtpPLUa7hCtfxXPfKKHcvwWvRij9zCZibxGnq5m3Qx31Y-L1EGDmwBRUQ",
        "name": "Регина Гараева",
        "email": "garaeva.regina9@gmail.com"
    },
    "__v": 0,
    "telegramLogin": "windmilly"
};

const store = configureStore();

const component = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

ReactDOM.hydrate(component, document.getElementById('react-view'));

// const store = configureStore();
//
// ReactDOM.render(component, document.getElementById('react-view'));
//
// ReactDOM.hydrate((
//     <Provider store={store}>
//         <BrowserRouter>
//             <Switch>
//                 <Route exact path="/" component={Guest}/>
//                 <Route exact path="/profile" render={(props) => (
//                     <Profile {...props} user={user} events={[]}/>
//                 )}/>
//             </Switch>
//         </BrowserRouter>
//     </Provider>
// ), document);
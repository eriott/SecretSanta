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
  "telegramLogin": "nastya"
};

const initialState = {
  show: false,
  user: user
};

export default function (state = initialState, action) {
  // switch (action.type) {
  //     case PROFILE_UPDATED:
  //         axios.post('/update_profile', action.profile).then(response => {
  //             let result = response.data;
  //             //$('#reply').text("Saved.").delay(2000).animate({opacity: 0});
  //
  //             //
  //             // let badgeExists = $('#profile-tab').find('.badge').length > 0;
  //             //
  //             // if (!badgeExists && (result.postData.fullName === '' || result.postData.address === '')) {
  //             //     $('#profile-tab').append('<span class="badge badge-warning">!</span>');
  //             // }
  //             //
  //             // if (badgeExists && result.postData.fullName !== '' && result.postData.address !== '') {
  //             //     $('#profile-tab .badge').remove();
  //             // }
  //             console.log("!!!!!!", result);
  //             return {show: result.postData.fullName === '' || result.postData.address === ''};
  //         }).catch(function (error) {
  //             console.log(error);
  //             return state;
  //         });
  //
  //     default:
  return state;
  // }
}
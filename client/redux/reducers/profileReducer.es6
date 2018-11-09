import {PROFILE_UPDATED, REQUEST_PROFILE_SUCCESS} from "../actions/profileActions";
import {REQUEST_EXCHANGES_FAILURE} from "../actions/exchangeActions";

const stub = {
  about: '',
  postData: {
    address: '',
    fullName: ''
  },
  telegramLogin: ''
};

const initialState = {
  show: false,
  user: stub
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROFILE_SUCCESS:
      console.log(action);
      return {user: action.profile};
    case REQUEST_EXCHANGES_FAILURE:
      return {user: stub};
    case PROFILE_UPDATED:
      axios.post('/update_profile', action.profile).then(response => {
        let result = response.data;
        //$('#reply').text("Saved.").delay(2000).animate({opacity: 0});

        //
        // let badgeExists = $('#profile-tab').find('.badge').length > 0;
        //
        // if (!badgeExists && (result.postData.fullName === '' || result.postData.address === '')) {
        //     $('#profile-tab').append('<span class="badge badge-warning">!</span>');
        // }
        //
        // if (badgeExists && result.postData.fullName !== '' && result.postData.address !== '') {
        //     $('#profile-tab .badge').remove();
        // }
        console.log("!!!!!!", result);
        return {show: result.postData.fullName === '' || result.postData.address === ''};
      }).catch(function (error) {
        console.log(error);
        return state;
      });

    default:
      return state;
  }
}
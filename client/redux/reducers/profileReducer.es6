import {PROFILE_UPDATED} from '../actions/profileActions';
import axios from 'axios';

const initialState = {show: false};

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
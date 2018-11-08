export const PROFILE_UPDATED = 'PROFILE_UPDATED';

export function profileUpdated(profile) {
    return {type: PROFILE_UPDATED, profile: profile};
}
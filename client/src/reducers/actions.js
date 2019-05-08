/*
 * action types
 */

export const USER_AUTH = "USER_AUTH";
export const USER_ADD_SKILL = "USER_ADD_SKILL";
export const USER_ADD_INTEREST = "USER_ADD_INTEREST";

/*
 * action creators
 */

export function userAuth(user) {
  return { type: USER_AUTH, user };
}

export function userAddSkill(skills) {
  return { type: USER_ADD_SKILL, skills };
}

export function userAddInterest(interests) {
  return { type: USER_ADD_INTEREST, interests };
}

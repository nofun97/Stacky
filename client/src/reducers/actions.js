/*
 * action types
 */

export const ADD_USER = 'ADD_USER'

/*
 * action creators
 */

export function addUser(userID) {
  return { type: ADD_USER, userID }
}


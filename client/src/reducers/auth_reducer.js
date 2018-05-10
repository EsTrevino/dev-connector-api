import {AUTH_USER} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case AUTH_USER:
    //spread in object literal
    //copies own enumerable properties
    //from a provided object onto a new object
    return {...state}
  }
  return state;
}

import * as ActionTypes from './ActionTypes';


export const Dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            return {...state, isLoading: false, errMess: null, dishes: action.payload}
        case ActionTypes.DISHED_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []}
        case ActionTypes.DISHED_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: []}
        default: 
            return state;
    }
}
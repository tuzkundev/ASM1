 import { createStore, combineReducers, applyMiddleware } from 'redux';
 import { Staffs } from './staffs';
 import { Departments } from './departments'
 import { staffsSalary } from './staffsSalary';
 import logger from 'redux-logger';
 import thunk from 'redux-thunk';

 export const ConfigureStore = () => {
        const store = createStore(
            combineReducers({
                staffs: Staffs,
                departments: Departments,
                staffsSalary: staffsSalary,
            }),
            applyMiddleware(thunk, logger)
        );
        return store;
 }

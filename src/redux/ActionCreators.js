import { baseUrl } from '../shared/baseUrl';
import * as ActionTypes from './ActionTypes';

// Add Staffs

export const addStaffSuccess = (staff) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staff
});

export const addStaffs = (staff) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(staff),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, error => {
            
            throw error;
        })
        .then(response => response.json())
        .then(response => dispatch(addStaffSuccess(response)))
        .catch(error => {console.log('Post staffs: ', error.message); 
                        alert('Your staff could not be posted ' + error.message)})
}

// FETCH staff

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch('https://rjs101xbackend.herokuapp.com/staffs')
    .then(response => response.json())
    .then(staffs => dispatch=(fetchStaff(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)))
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
})

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_LOADING,
    payload: errmess
})

export const fetchStaff = (staffs) => ({
    type: ActionTypes.FETCH_STAFFS,
    payload: staffs
})

// fetch department 

export const fetchDepartments = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch('https://rjs101xbackend.herokuapp.com/departments') //baseUrl + 'departments'
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    
    .then(response => response.json())
    .then(departments => dispatch=(addDepartments(departments)))
    .catch(error => dispatch(departmentsFailed(error.message)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
})

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
})

// fetch salary

export const fetchSalary = () => (dispatch) => {
    dispatch(salaryLoading(true));

    return fetch('https://rjs101xbackend.herokuapp.com/staffsSalary')
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    
    .then(response => response.json())
    .then(staffsSalary => dispatch=(addSalary(staffsSalary)))
    .catch(error => dispatch(salaryFailed(error.message)))
}

export const salaryLoading = () => ({
    type: ActionTypes.SALARY_LOADING
})

export const salaryFailed = (errmess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errmess
})

export const addSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_SALARY,
    payload: staffsSalary
})



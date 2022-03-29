import React, { Component } from "react";
import StaffList from './StaffListComponent';
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import DepartmentDetail from './DepartmentDetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStaff, fetchDepartments, fetchStaffsSalary, fetchStaffs, deleteStaff, updateStaff } from "../redux/ActionCreators";
import { TransitionGroup } from "react-transition-group";

 const mapStateToProps = (state) => {
     return {
         staffs : state.staffs,
         departments: state.departments,
         staffsSalary: state.staffsSalary,
     };
 }
 
 const mapDispatchToProps = (dispatch) => ({
  addStaff: (staff) => {
    dispatch(addStaff(staff));
  },
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchStaffsSalary: () => {
    dispatch(fetchStaffsSalary());
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
  updateStaff: (staff) => {
    dispatch(updateStaff(staff));
  },
});


class Main extends Component {
    
    componentDidMount() {
      this.props.fetchStaffs();
      this.props.fetchDepartments();
      this.props.fetchStaffsSalary();
    }

   
    render() {

        const StaffWithId = ({ match }) => {
            return(
              <StaffDetail
              staff={
                this.props.staffs.staffs.filter(
                  (staff) => staff.id === parseInt(match.params.staffId, 10)
                )[0]
              }
              dept={this.props.departments.departments}
              onUpdateStaff={this.props.updateStaff}
            />
          );
        };

        const StaffWithDept = ({ match }) => {
          return (
            <DepartmentDetail
              dept={
                this.props.departments.departments.filter(
                  (dept) => dept.id === match.params.deptId
                )[0]
              }
              staff={this.props.staffs.staffs.filter(
                (staff) => staff.departmentId === match.params.deptId
              )}
            />
          );
        };

        

        return(
            <div>
                <Header />
                <TransitionGroup>
                  
                        <Switch>
                    
                    <Route path="/staff/:staffId" component={StaffWithId} />
                  <Route path="/departments/:deptId" component={StaffWithDept} />
                  <Route
                    path="/staff"
                    component={() => (
                      <StaffList
                        staffsLoading={this.props.staffs.isLoading}
                        onAddStaff={this.props.addStaff}
                        staffs={this.props.staffs.staffs}
                        onDeleteStaff={this.props.deleteStaff}
                      />
                    )}
                  />
                  <Route
                    path="/payroll"
                    component={() => (
                      <Salary salary={this.props.staffsSalary.staffsSalary} />
                    )}
                  />
                  <Route
                    path="/room"
                    component={() => (
                      <Department
                        departments={this.props.departments.departments}
                        staffs={this.props.staffs.staffs}
                      />
                    )}
                  />
                  <Redirect to="/staff" />
                    </Switch>
                   
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
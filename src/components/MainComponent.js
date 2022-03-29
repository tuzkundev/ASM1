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
import { addStaffs, fetchDepartments, fetchSalary, fetchStaffs } from "../redux/ActionCreators";

 const mapStateToProps = state => {
     return {
         staffs : state.staffs,
         departments: state.departments,
         staffsSalary: state.staffsSalary,
     }
 }
 
 const mapDispatchToProps = (dispatch) => ({
     addStaffs: (staff) => {
         dispatch(addStaffs(staff));
     },
     fetchStaffs: () => {
         dispatch(fetchStaffs());
     },
     fetchDepartments: () => {
         dispatch(fetchDepartments());
     },
     fetchSalary: () => {
         dispatch(fetchSalary());
     }
 })


class Main extends Component {
    
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchSalary();
    }

   
    render() {

        const StaffWithId = ({match}) => {
            return(
                <StaffDetail
                staff={this.props.staffs.staffs
                    .filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
                department={this.props.departments.departments}
              />
                
            )
        }

        const StaffWithDept = ({match}) => {
            return(
                <DepartmentDetail
                    department = {this.props.departments.departments
                        .filter((department) => department.id === match.params.departmentId)[0]}
                    staff = {this.props.staffs.staffs
                    .filter((staff) => staff.departmentsId === match.params.departmentId)}
                />
            )
        }

        

        return(
            <div>
                <Header />
                <Switch>
                    
                    <Route path="/staff/:staffId" component={StaffWithId} />
                    <Route path="/departments/:departmentId" component={StaffWithDept} />
                    <Route path="/staff"  component={() => <StaffList staffsLoading={this.props.staffs.isLoading} 
                                                                    onAddStaff={addStaffs} 
                                                                    staffs={this.props.staffs.staffs} /> } />
                    
                    <Route path="/room" component={() => <Department departments={this.props.departments} staffs={this.props.staffs.staffs} />} />
                    <Route path="/payroll" component={() => <Salary staffs={this.props.staffsSalary.staffsSalary} />} />   
                    <Redirect to="/staff" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
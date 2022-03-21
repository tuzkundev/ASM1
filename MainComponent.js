import React, { Component } from "react";
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from "../shared/staffs";
import StaffList from './StaffListComponent';
import StaffDetail from "./StaffDetailComponent";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            staffs : STAFFS,
            departments : DEPARTMENTS
        }
    }

   
    render() {

        const StaffWithId = ({match}) => {
            return(
                <StaffDetail
                staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
              />

            )
        }

        const addStaff = (staff) => {
            const id = Math.floor(Math.random() *10000 + 1);
            const newStaff = {id, ...staff};
            this.setState({
                staffs: [...this.state.staffs, newStaff]
            }) ;
            console.log(newStaff);
            console.log(this.state.staffs);
        }


        return(
            <div>
                <Header />
                <Switch>
                    
                    <Route path="/staff/:staffId" component={StaffWithId} />
                    <Route path="/staff"  component={() => <StaffList onAdd={addStaff} staffs={this.state.staffs} /> } />
                    
                    <Route path="/room" component={() => <Department departments={this.state.departments} />} />
                    <Route path="/payroll" component={() => <Salary staffs={this.state.staffs} />} />   
                    <Redirect to="/staff" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from "reactstrap";    
import { NavLink } from "react-router-dom";



class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen : false
        }
        this.toggleNav = this.toggleNav.bind(this);

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className = "container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="#">
                            <img src="assets/images/logo.png" height="30" width="41" alt="nothing"></img>
                        </NavbarBrand>    

                       <Collapse isOpen={this.state.isNavOpen} navbar>
                       <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/staff">
                                    <span className ="fa fa-users fa-lg"></span>  Nhân Viên  
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/room">
                                    <span className ="fa fa-address-card fa-lg"></span> Phòng Ban
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/payroll">
                                    <span className ="fa fa-credit-card fa-lg"></span>  Bảng Lương 
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
    
            </React.Fragment>
        );
    }
}

export default Header;


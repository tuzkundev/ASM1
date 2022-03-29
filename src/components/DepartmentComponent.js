import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

class RenderDepart extends Component {
    render() {
        return(
            <Link to={`/departments/${this.props.department.id}`}>
                <Card>
                <CardTitle className ="m-2">{this.props.department.name}</CardTitle>
                <CardBody>
                    <CardText>Số lượng nhân viên: {this.props.staffNo.length}</CardText>
                </CardBody>
            </Card>
            </Link>
        );
    }
}

class Department extends Component  {
    render() {
        const depart = this.props.departments.departments.map((department) => {
            return(
                <div className = "col-12 col-md-6 col-lg-4 mt-2-mb-2" key={department.id}>
                    <RenderDepart department={department} 
                                staffNo={this.props.staffs.filter((staff) => staff.departmentsId === department.id)} />
                </div>
            );
        });

        return(
            <div className = "container">
                <div className="row shadow m-3">
                    {depart}
                </div>
            </div>
        );
    }

    
}

export default Department;
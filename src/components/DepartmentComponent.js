import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDepart({department}) {
    return(
        <Card>
            <CardTitle className ="m-2">{department.name}</CardTitle>
            <CardBody>
                <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </CardBody>
        </Card>
    );
}

const Department = (props) => {
    const depart = props.departments.map((department) => {
        return(
            <div className = "col-12 col-md-6 col-lg-4 mt-2-mb-2">
                <RenderDepart department={department} />
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

export default Department;
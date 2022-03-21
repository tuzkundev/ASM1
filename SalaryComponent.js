import React from "react";
import { Card, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


const luongChinh = 3000000;
const luongGio = 200000;
function RenderSalary({salary}) {
        return(
            <Card>
                <CardTitle className = "p-3 bg-white rounded m-2">
                    {salary.name}
                </CardTitle>
                <CardBody>
                    <CardText>Mã nhân viên:{salary.id} </CardText>
                    <CardText>Hệ số lương:{salary.salaryScale} </CardText>
                    <CardText>Số giờ làm thêm:{salary.overTime} </CardText>
                    <CardText className="bg-white p-2 shadow">Lương: {(salary.salaryScale*luongChinh + salary.overTime*luongGio).toFixed(0)} </CardText>
                </CardBody>
            </Card>
        );
} 

const Salary = (props) => {
    const sala = props.staffs.map((salary) =>{
        return(
            <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={salary.id}>
                <RenderSalary salary={salary} />
            </div>
        );
    });
    return(
        <div className = "container">
            <div className = "row">
            <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb> 
            </div>
            <div className = "row shadow mb-3">
                {sala}
            </div>
        </div>
    ); 
}
export default Salary;
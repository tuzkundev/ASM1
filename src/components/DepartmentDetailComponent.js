import React from 'react';
import { Card, CardImg, CardBody, Breadcrumb, CardSubtitle, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderStaffItem = ({ staff }) => {
    return(
        <Link to={`/staff/${staff.id}`}>
            <Card>
                <CardImg width='100%' src={staff.image} alt={staff.name} />
                <CardBody>
                    <CardSubtitle>{staff.name}</CardSubtitle>
                </CardBody>
            </Card>
        </Link>
    )
};

const DepartmentDetail = (props) => {
    const staffs = props.staff.map((val) => (
        <div className='col-6 col-md-4 col-lg-2 mt-3 mb-3' key={val.id}>
            <RenderStaffItem staff={val} />
        </div>
    ));

    if(props.staff != null && props.department != null) {
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/departments'> Phòng ban </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {props.department.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.department.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row mb-3'>
                    {staffs}
                </div>
            </div>
        )
    }
    else {
        return <div></div>
    }
}
export default DepartmentDetail;
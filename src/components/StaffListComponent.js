import React from "react";
import { Card, CardTitle, CardImgOverlay, CardImg } from "reactstrap";
import { Link } from 'react-router-dom';

function RenderStaffItem({staff}) {
    return(
        <Link to={`/staff/${staff.id}`}>
            <Card key={staff.id}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardImgOverlay>
                    <CardTitle>{staff.name}</CardTitle>
                </CardImgOverlay>
            </Card>    
        </Link>
    );
}

const StaffList = (props) => {
    
        const staffList = props.staffs.map((staff) => {
            return(
                <div className = "col-2 mt-2">
                        <RenderStaffItem staff = {staff} />
                    </div>
            );
        });
        
        return(
            <div className = "container">
                <div className = "col-3 mt-3">
                    <h3>Nhân viên</h3>
                    <hr />
                </div>
                <div className = "row shadow mb-5 mt-5">{staffList}</div>
               
                </div>
        )
    }


export default StaffList;
import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, CardImg } from "reactstrap";
import dateFormat from 'dateformat';



class StaffList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff});
    }

    renderStaff(staff) {
        if(staff != null) {
            return(
                <div className="col-12">
                <Card>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    <CardBody>
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>                            
                    </CardBody>
                </Card>
            </div>
            ) 
        } else {
            return(
                <div></div>
            )
        }
    }

    render() {
        const staffList = this.props.staffs.map((staff) => {
            return(
                <div className = "col-12 col-md-6 col-lg-4 m-1">
                        <Card key={staff.id} 
                        onClick = {() => this.onStaffSelect(staff)}>
                            <CardTitle>{staff.name}</CardTitle>
                        </Card>
                    </div>
            );
        });
        
        return(
            <div className = "container">
                <div className = "row">{staffList}</div>
                <p>Bấm vào tên nhân viên để xem thông tin</p>
               <div className = "row mt-5">
               {this.renderStaff(this.state.selectedStaff)}
                   </div>
                </div>
        )
    }
}

export default StaffList;
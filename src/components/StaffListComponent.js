import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardImg, Button, Modal, ModalBody, ModalHeader,Form, Input, FormGroup, FormFeedback, Label } from "reactstrap";
import { Link } from 'react-router-dom';


// render danh sach nhan vien
function RenderStaffItem({ staff }) {
    return(
        <Link to={`/staff/${staff.id}`}>
            <Card key={staff.id}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardBody>
                    <CardTitle>{staff.name}</CardTitle>
                </CardBody>
            </Card>    
        </Link>
    );
}

class StaffList extends Component {


        constructor(props) {
            super(props)
            this.state = {
                id: '',
                name: '',
                doB: '',
                salaryScale: '',
                startDate: '',
                departmentType: "Sale",
                annualLeave: '',
                overTime: '',
                salary: '',
                touched: {
                    name: false,
                    doB: false,
                    startDate: false
                },
                
                nameFind: "",
                isModalOpen: false
            }
            this.SearchEmploy = this.SearchEmploy.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleBlur = this.handleBlur.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit = (event) => {
            event.preventDefault();
            const newStaff = {
                name: this.state.name,
                doB: this.state.doB,
                salaryScale: this.state.salaryScale,
                startDate: this.state.startDate,
                departmentType: this.state.departmentType,
                annualLeave: this.state.annualLeave,
                overTime: this.state.overTime,
                salary: this.state.salary,
                image: "/assets/images/alberto.png",
            };
            if ( !this.state.name || !this.state.doB || !this.state.startDate )      
      this.setState( {
        touched: { name: true, doB: true, startDate: true }
      } )
    else    
    this.props.onAdd(newStaff);
               
        }

        handleInputChange(event) {
            const target = event.target;
            const value = target.value;
            const name = target.name

            this.setState({
                [name] : value,
            });
        }

        handleBlur = (field) => (evt) => {
            this.setState({
                touched: {...this.state.touched, [field]: true}
            });
        }

        // hàm xác thực biểu mẫu
        validate(name, doB, startDate) {
            const errors = {
                name: '',
                doB: '',
                startDate: ''
            };
            if(this.state.touched.name && name.length < 1) 
                errors.name = "Yêu cầu nhập";
            else if(this.state.touched.name && name.length < 3)
                errors.name = "Vui lòng nhập từ 2 ký tự trở lên";
            else if(this.state.touched.name && name.length > 30) 
                errors.name = "Vui lòng không nhập quá 30 ký tự";

            if(this.state.touched.doB && doB.length < 1) 
                errors.doB = "Yêu cầu nhập";

            if(this.state.touched.doB && startDate.length < 1) 
                errors.doB = "Yêu cầu nhập";

            return errors;
        }

        // function mo modal
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        // hàm tìm kiếm nhân viên
        SearchEmploy(event) {
            event.preventDefault();
            const nameSearch = event.target.nameSearch.value;
            this.setState({
                nameFind: nameSearch
            });
            
        }
    
        
        // render ra giao dien staff list
        render() {
            const errors = this.validate(this.state.name, this.state.doB, this.state.startDate);
            const staffList = this.props.staffs
            .filter((val) => {
              if (this.state.nameFind === "") return val;
              else if (
                val.name.toLowerCase().includes(this.state.nameFind.toLowerCase())
              )
                return val;
              
            })
            .map((val) => {
              return (
                <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
                  <RenderStaffItem staff={val} />
                </div> 
              );
            });

            return(
                <div className = "container">
                    <div className='row'>
                        
                    <div className = "col-3 mt-3">
                        <h3>Nhân viên</h3>
                        <hr />
                    </div>
                    <div className='col-3 mt-3 '>
                           <Button outline onClick={this.toggleModal}>
                               <span className ='fa fa-plus fa-lg'></span>
                            </Button> 
                    </div>
                    <div className ='col-12 col-md-6 mt-3'>
                        <Form onSubmit={this.SearchEmploy} className='form-group row'>
                           
                                <div className='col-8 col-md-8'>
                                    <Input type='text' name='nameSearch'
                                placeholder='Tim kiem nhan vien' 
                                className='form-control'
                                     />
                                </div>
                                <div className = 'col-4 col-md-4'>
                                    <Button type="submit" color='primary'>
                                        Tìm kiếm
                                    </Button>
                                </div>
                            
                            
                        </Form>
                    </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Thêm Nhân Viên
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}> 
                                <FormGroup>
                                    <Label htmlFor='name'>Tên</Label>
                                    <Input
                                     type='text' 
                                     id="name" 
                                     name="name"
                                     valid={errors.name === ""}
                                     invalid={errors.name !== ""}
                                     value={this.state.name}
                                     
                                     onBlur={this.handleBlur('name')}
                                     onChange={this.handleInputChange}
                                     />
                                      <FormFeedback>{errors.name}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='doB'>Ngày sinh</Label>
                                    <Input
                                     type='date' 
                                     id="doB" 
                                     name="doB"
                                     valid={errors.doB === ""}
                                    invalid={errors.doB !== ""}
                                     value={this.state.doB}
                                     
                                     
                                     onBlur={this.handleBlur('doB')}
                                     onChange={this.handleInputChange}
                                     />
                                      <FormFeedback>{errors.doB}</FormFeedback> 
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='startDate'>Ngày vào công ty</Label>
                                    <Input
                                     type='date' 
                                     id="startDate" 
                                     name="startDate"
                                     valid={errors.startDate === ""}
                                     invalid={errors.startDate !== ""}
                                     value={this.state.startDate}
                                    
                                     
                                     onBlur={this.handleBlur('startDate')}
                                     onChange={this.handleInputChange}
                                     />
                                     <FormFeedback>{errors.startDate}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='startDate'>Phòng ban</Label>
                                    <Input
                                     type='select' 
                                     value={this.state.departmentType}
                                     name="departmentType"
                                     onChange={this.handleInputChange}
                                     > <option>Sale</option>  
                                        <option>HR</option>  
                                        <option>Marketing</option>
                                        <option>IT</option> 
                                        <option>Finance</option>
                                     </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='salaryScale'>Hệ số lương</Label>
                                    <Input
                                     type='number' 
                                     id="salaryScale" 
                                     name="salaryScale"
                                     value={this.state.salaryScale}
                                     onChange={this.handleInputChange}
                                     />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='annualLeave'>Số ngày nghỉ còn lại</Label>
                                    <Input
                                     type='number' 
                                     id="annualLeave" 
                                     name="annualLeave"
                                     value={this.state.annualLeave}
                                     onChange={this.handleInputChange}
                                     />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='overTime'>Số ngày đã làm thêm</Label>
                                    <Input
                                     type='number' 
                                     id="overTime" 
                                     name="overTime"
                                     value={this.state.overTime}
                                     onChange={this.handleInputChange}
                                     />
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" color="primary">Thêm nhân viên</Button>
                                </FormGroup>
                                
                            </Form>
                        </ModalBody>
                    </Modal>


                    <div className = "row shadow mb-5 mt-5">{staffList}</div>
                   
                    </div>
            )
        }
        }


export default StaffList;
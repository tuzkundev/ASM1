import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardImg, Button, Modal, ModalBody, ModalHeader, Label, Col, Row, FormFeedback, Input, Form } from "reactstrap";
import { Control, Errors, LocalForm } from 'react-redux-form';
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

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class AddStaffForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            startDate: '',
            doB: '',
            image: "/asset/images/alberto.png",
            departmentsId: "Dept01",
            touched: {
                doB: false,
                startDate: false
            },
        }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleBlur = this.handleBlur.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    // function xu ly du lieu khi nhap vao form 
    handleSubmit = (value) => {
        if (!this.state.doB || !this.state.startDate)
          this.setState({
            touched: { doB: true, startDate: true },
          });
        else {
          const newStaff = {
            name: value.name,
            doB: this.state.doB,
            salaryScale: parseInt(value.salaryScale, 10),
            startDate: this.state.startDate,
            image: "/asset/images/alberto.png",
            departmentsId: this.state.departmentsId,
            annualLeave: parseInt(value.annualLeave, 10),
            overTime: parseInt(value.overTime, 10),
          };
    
          this.props.onAdd(newStaff);
        }
      };
      // ham xu ly du lieu nahp vao input, thay doi state du lieu
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name

        this.setState({
            [name] : value,
        });
    }
    // ham xu ly touched khi nguoi dung khong nhap gi ma thoat khoi input
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate(doB,startDate){
        const errors = {
          doB: '',
          startDate: ''
        }
    
        if(this.state.touched.doB && doB.length < 1)
          errors.doB = 'Yêu cầu nhập';
        if(this.state.touched.startDate && startDate.length < 1)
          errors.startDate = 'Yêu cầu nhập';
    
        return errors;
        
      }
    

    // function mo modal
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    render() {
        const errors = this.validate(this.state.doB, this.state.startDate);
        return(
            <React.Fragment>
            <div className='col-3 mt-3 '>
                           <Button outline onClick={this.toggleModal}>
                               <span className ='fa fa-plus fa-lg'></span>
                            </Button> 
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Thêm Nhân Viên
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(value) => this.handleSubmit(value)} > 
                                <Row className="form-group">
                                    <Label htmlFor='name' md={4}>Tên</Label>
                                    <Col md={8}>
                                    <Control.text model=".name"
                                     type='text' 
                                     id="name" 
                                     name="name"
                                     
                                     
                                     className='form-control'
                                     validators={{
                                         required, minLength: minLength(3), maxLength: maxLength(30)
                                     }}
                                     />
                                      <Errors
                                      model='.name'
                                      className="text-danger"
                                      show='touched'
                                      messages={{
                                          required: "Yêu cầu ",
                                          minLength: "Yêu cầu nhập nhiều hơn 3 ký tự",
                                          maxLength: "Yêu cầu không nhập quá 30 ký tự "
                                      }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor='doB' md={4}>Ngày sinh</Label>
                                    <Col md={8}>
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
                                    </Col>
                                      
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor='startDate' md={4}>Ngày vào công ty</Label>
                                    <Col md={8}>
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
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor='startDate' md={4}>Phòng ban</Label>
                                    <Col md={8}>
                                    <select
                                     model='.departmenstId'
                                     className='form-control'
                                     id="department"
                                     value={this.state.departmentsId}
                                     onChange={(e) =>
                                        this.setState({ departmentsId: e.target.value })
                                      }
                                     >  <option value="Dept01">Sale</option>  
                                        <option value="Dept02">HR</option>  
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option> 
                                        <option value="Dept05">Finance</option>
                                     </select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor='salaryScale' md={4}>Hệ số lương</Label>
                                    <Col md={8}>
                                    <Control.text
                                     model='.salaryScale'
                                     className='form-control'
                                     name="salaryScale"
                                     placeholder="1.0 -> 3.0"
                                     validators={{
                                         required, isNumber
                                     }}
                                     defaultValue="1"
                                     />
                                      <Errors 
                                        model=".salaryScale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            isNumber: 'Phải là chữ số'
                                        }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor='annualLeave' md={4}>Số ngày nghỉ còn lại</Label>
                                    <Col md={8}>
                                    <Control.text
                                        model=".annualLeave"
                                        id="annualLeave"
                                        name="annualLeave"
                                        defaultValue="0"
                                        validators={{ 
                                        required, isNumber
                                        }}
                                        className="form-control"
                                    />
                                    <Errors
                                    model=".annualLeave"
                                    className="text-danger"
                                    show="touched"
                                    messages={{ 
                                        required: 'Yêu cầu nhập',
                                        isNumber: 'Phải là chữ số'
                                    }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor='overTime' md={4}>Số ngày đã làm thêm</Label>
                                    <Col md={8}>
                                <Control.text
                                    model=".overTime"
                                    id="overTime"
                                    name="overTime"
                                    defaultValue="0"
                                    validators={{ 
                                    required, isNumber
                                    }}
                                    className="form-control"
                                />
                                <Errors
                                model=".overTime"
                                className="text-danger"
                                show="touched"
                                messages={{ 
                                    required: 'Yêu cầu nhập',
                                    isNumber: 'Phải là chữ số'
                                }}
                                />
                                </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">Thêm nhân viên</Button>
                                    </Col>
                                    
                                </Row>
                                
                            </LocalForm>
                        </ModalBody>
                    </Modal>
        </React.Fragment>
        )
        
    }
}

class StaffList extends Component {


        constructor(props) {
            super(props)
            this.state = {
                nameFind: "",
                
            }
            this.SearchEmploy = this.SearchEmploy.bind(this);
            
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
                    <AddStaffForm onAdd={this.props.onAddStaff} />
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
                    


                    <div className = "row shadow mb-5 mt-5">{staffList}</div>
                   
                    </div>
            )
        }
        }


export default StaffList;
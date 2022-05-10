import React, { Component } from 'react';
import '../css/StaffList.css';
import logoStaff from '../assets/images/alberto.png';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  Row,
} from 'reactstrap';

import { STAFFS } from '../shared/staffs';
import { Control, Errors, LocalForm } from 'react-redux-form';
import DatePicker from 'react-widgets/DatePicker';
import 'react-widgets/styles.css';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const StaffList = ({ staffs, keyword, newStaff }) => {
  let staffList = [...staffs];

  if (newStaff) {
    newStaff.forEach((item) => {
      staffList = [...staffList, item];
    });
  }
  // Lọc các item trùng nhau
  staffList = [...new Set(staffList)];

  if (!keyword) {
    return staffList.map((staff) => (
      <RenderStaff key={staff.id} staff={staff} />
    ));
  }
  const searchArray = staffList.filter(
    (item) =>
      item.name.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1
  );
  if (!searchArray || searchArray.length === 0) {
    return (
      <div className="container">
        <div className="notFound">
          <em>
            <h2>Oops! No result found!</h2>
          </em>
        </div>
      </div>
    );
  }
  return searchArray.map((item) => <RenderStaff key={item.id} staff={item} />);
};

function RenderStaff({ staff }) {
  return (
    <div className="col-6 col-md-4 col-lg-2 my-2">
      <Link to={`/staff/${staff.id}`}>
        <div className="staff__item">
          <img src={logoStaff} alt={staff.name} />
          <p>{staff.name}</p>
        </div>
      </Link>
    </div>
  );
}

class StaffComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listStaffs: STAFFS,
      newStaffLocal: JSON.parse(localStorage.getItem('newStaff')),
      keyword: '',
      searchKey: '',
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleSubmitInput = this.handleSubmitInput.bind(this);
  }

  validateDatePicker = () => {
    if (this.state.hasDatePicker === null) {
      this.setState({
        datePickerValid: false,
      });
    }
    this.setState({
      datePickerValid: true,
    });
  };

  renderDatePicker = (props) => {
    return (
      <React.Fragment>
        <DatePicker placeholder="mm/dd/yy" {...props} />
      </React.Fragment>
    );
  };

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmitSearch(e) {
    e.preventDefault();
    this.setState({
      searchKey: this.state.keyword,
    });
  }

  handleSubmitInput(values) {
    this.toggleModal();
    const duplicateStaff = { ...values };

    let list = [...this.state.listStaffs];
    if (this.state.newStaffLocal) {
      this.state.newStaffLocal.forEach((item) => (list = [...list, item]));
    }

    let idStaff = list[list.length - 1].id;
    duplicateStaff.id = idStaff + 1;
    let staffAdded = [];
    staffAdded.push(duplicateStaff);
    list.push(staffAdded[0]);

    this.setState({
      listStaffs: [...list],
    });

    const localSavedStaff = localStorage.getItem('newStaff');
    if (localSavedStaff) {
      const itemParse = JSON.parse(localSavedStaff);
      itemParse.push(duplicateStaff);
      localStorage.setItem('newStaff', JSON.stringify(itemParse));
    } else {
      localStorage.setItem('newStaff', JSON.stringify(staffAdded));
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="staffList container-fluid my-3">
          <div className="container">
            <div className="row">
              <Col md={6} className="d-flex justify-content-between">
                <h3>Nhân viên</h3>
                <div className="btn__add" style={{ width: '50%' }}>
                  <Button onClick={this.toggleModal}>
                    <span className="fa fa-plus fa-lg"></span>
                  </Button>
                </div>
              </Col>

              <Col md={6}>
                <div className="search__content">
                  <Form
                    onSubmit={this.handleSubmitSearch}
                    className="d-flex justify-content-between"
                  >
                    <FormGroup style={{ width: '80%', marginBottom: '0' }}>
                      <div className="search__item">
                        <Input
                          id="searchInput"
                          placeholder="Nhập tên tại đây"
                          onChange={(e) =>
                            this.setState({
                              keyword: e.target.value,
                            })
                          }
                        />
                      </div>
                    </FormGroup>
                    <Button color="primary" type="submit">
                      Tìm
                    </Button>
                  </Form>
                </div>
              </Col>
            </div>

            {/* Render Staff List */}
            <div className="row mt-3">
              <StaffList
                staffs={this.state.listStaffs}
                keyword={this.state.searchKey}
                newStaff={this.state.newStaffLocal}
              />
            </div>
          </div>
        </div>

        {/* ========== Modal Add Staff ============== */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmitInput(values)}>
              <Row className="form-group">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    className="form-control"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      minLength: 'Yêu cầu tối thiểu hơn 2 ký tự',
                      maxLength: 'Yêu cầu ít hơn 30 ký tự',
                    }}
                  />
                </Col>
              </Row>
              {/* https://davidkpiano.github.io/react-redux-form/docs/guides/custom-controls.html */}
              <Row className="form-group">
                <Label htmlFor=".doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Control
                    type="text"
                    name="dob"
                    component={this.renderDatePicker}
                    model=".doB"
                    mapProps={{
                      value: (props) => props.viewValue,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: 'Yêu cầu nhập',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Control
                    type="text"
                    name="startDate"
                    component={this.renderDatePicker}
                    model=".startDate"
                    mapProps={{
                      value: (props) => props.viewValue,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: 'Yêu cầu nhập',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor=".department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    className="form-control"
                    defaultValue="HR"
                  >
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={4} htmlFor=".salaryScale">
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    md={10}
                    type="text"
                    model=".salaryScale"
                    id="salaryScale"
                    className="form-control"
                    name="salaryScale"
                    defaultValue="1"
                    placeholder="1.0 -> 
                  3.0"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={4} htmlFor=".annualLeave">
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    md={10}
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    className="form-control"
                    model=".annualLeave"
                    defaultValue="0"
                    placeholder="1.0"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label md={4} htmlFor=".overTime">
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    md={10}
                    type="text"
                    className="form-control"
                    id="overTime"
                    name="overTime"
                    model=".overTime"
                    defaultValue="0"
                  />
                </Col>
              </Row>
              <ModalFooter>
                <Button type="submit">Thêm</Button>
                <Button type="button" onClick={this.toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StaffComponent;

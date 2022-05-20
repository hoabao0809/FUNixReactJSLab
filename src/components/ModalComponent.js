import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  Row,
} from 'reactstrap';

import { Control, Errors, LocalForm } from 'react-redux-form';
import DatePicker from 'react-widgets/DatePicker';
import 'react-widgets/styles.css';
import { connect } from 'react-redux';
import { toggleModal, postStaff, updateStaff } from '../redux/ActionCreators';
import dateFormat from 'dateformat';
import Swal from 'sweetalert2';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs.staffs,
    departments: state.departments.departments,
    isModalOpen: state.isModalOpen.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleModal: () => {
    dispatch(toggleModal());
  },
  postStaff: (staff) => {
    dispatch(postStaff(staff));
  },
  updateStaff: (id, staff) => {
    dispatch(updateStaff(id, staff));
  },
});

class ModalForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggleModal();
  }

  renderDatePicker = (props) => {
    return (
      <React.Fragment>
        <DatePicker placeholder="mm/dd/yy" {...props} />
        {(props.value === null || props.value === undefined) && (
          <div className="text-danger">Yêu cầu nhập</div>
        )}
      </React.Fragment>
    );
  };

  handleSubmitInput(values) {
    this.props.toggleModal();

    const departmentItem = this.props.departments.filter(
      (item) => item.name === values.department
    )[0];

    const salary =
      parseInt(values.salaryScale) * 3000000 +
      parseInt(values.overTime) * 200000;

    const lastStaffArray = this.props.staffs[this.props.staffs.length - 1];

    switch (this.props.type) {
      case 'addStaff':
        this.props.postStaff({
          ...values,
          id: lastStaffArray ? lastStaffArray.id + 1 : 0,
          departmentId: departmentItem.id,
          image: '/assets/images/alberto.png',
          salary,
        });

        break;

      case 'updateStaff':
        const updatedStaff = {
          ...this.props.staff,
          ...values,
          departmentId: departmentItem.id,
          image: '/assets/images/alberto.png',
          salary,
        };

        this.props.updateStaff(updatedStaff);

        break;

      default:
        break;
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isModalOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
          {this.props.type === 'addStaff' ? 'Thêm' : 'Cập nhật'} nhân viên
        </ModalHeader>
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
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(30),
                  }}
                  defaultValue={this.props.staff ? this.props.staff.name : ''}
                  disabled={this.props.staff ? true : false}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: 'Yêu cầu nhập',
                    minLength: '  Nhập tối thiểu hơn 2 ký tự',
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
                  placeholder={
                    this.props.staff
                      ? dateFormat(this.props.staff.doB, 'dd/mm/yyyy')
                      : ''
                  }
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
                  placeholder={
                    this.props.staff
                      ? dateFormat(this.props.staff.startDate, 'dd/mm/yyyy')
                      : ''
                  }
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
                  name="departmen"
                  className="form-control"
                  defaultValue={
                    this.props.department ? this.props.department.name : 'HR'
                  }
                >
                  <option>HR</option>
                  <option>Sale</option>
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
                  defaultValue={
                    this.props.staff ? this.props.staff.salaryScale : '1'
                  }
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
                  defaultValue={
                    this.props.staff ? this.props.staff.annualLeave : '0'
                  }
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
                  defaultValue={
                    this.props.staff ? this.props.staff.overTime : '0'
                  }
                />
              </Col>
            </Row>
            <ModalFooter>
              <Button type="submit">
                {this.props.type === 'addStaff' ? 'Thêm' : 'Cập Nhật'}
              </Button>
              <Button type="button" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);

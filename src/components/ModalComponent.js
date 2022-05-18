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
import { toggleModal } from '../redux/ActionCreators';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.isModalOpen.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleModal: () => {
    dispatch(toggleModal());
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

  render() {
    return (
      <Modal isOpen={this.props.isModalOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Thêm nhân viên</ModalHeader>
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

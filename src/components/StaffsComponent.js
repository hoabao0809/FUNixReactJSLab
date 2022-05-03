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
} from 'reactstrap';

import DatePicker from 'reactstrap-date-picker/lib/DatePicker';

const StaffList = ({ staffs, keyword }) => {
  if (!keyword) {
    return staffs.map((staff) => <RenderStaff key={staff.id} staff={staff} />);
  }
  const searchArray = staffs.filter(
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
      newStaff: {
        name: '',
        doB: new Date().toISOString(),
        startDate: new Date().toISOString(),
        department: 'Sale',
        salaryScale: 1,
        annualLeave: 0,
        overTime: 0,
        image: '/assets/images/alberto.png',
      },

      keyword: '',
      searchKey: '',
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmitInput = this.handleSubmitInput.bind(this);
  }

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

  handleSubmitInput() {
    const staffAdded = { ...this.state.newStaff };
    localStorage.setItem('newStaff', JSON.stringify(staffAdded));
  }

  handleChangeInput(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      newStaff: {
        ...this.state.newStaff,
        [name]: value,
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="staffList container-fluid my-3">
          <div className="container">
            <h3>Nhân viên</h3>
            <div className="btn__add">
              <Button onClick={this.toggleModal}>
                <span className="fa fa-plus fa-lg"></span>
              </Button>
            </div>
            <div className="search__content">
              <Form onSubmit={this.handleSubmitSearch}>
                <FormGroup>
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
                <Button type="submit">Tìm</Button>
              </Form>
            </div>
            <div className="row mt-3">
              <StaffList
                staffs={this.props.staffs}
                keyword={this.state.searchKey}
              />
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmitInput}>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.newStaff.name}
                    onChange={this.handleChangeInput}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <DatePicker
                    id="doB"
                    name="doB"
                    value={this.state.newStaff.doB}
                    onChange={(v) =>
                      this.setState({
                        newStaff: {
                          ...this.state.newStaff,
                          doB: v,
                        },
                      })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <DatePicker
                    id="startDate"
                    name="startDate"
                    value={this.state.newStaff.startDate}
                    onChange={(v) =>
                      this.setState({
                        newStaff: {
                          ...this.state.newStaff,
                          startDate: v,
                        },
                      })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4}>Phòng ban</Label>
                <Col md={8}>
                  <Input
                    type="select"
                    name="department"
                    value={this.state.newStaff.department}
                    onChange={this.handleChangeInput}
                  >
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4} htmlFor="salaryScale">
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    md={10}
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.newStaff.salaryScale}
                    placeholder="1.0 -> 
                  3.0"
                    onChange={this.handleChangeInput}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} htmlFor="annualLeave">
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    md={10}
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.newStaff.annualLeave}
                    placeholder="1.0"
                    onChange={this.handleChangeInput}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label md={4} htmlFor="overTime">
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    md={10}
                    type="text"
                    id="overTime"
                    name="overTime"
                    value={this.state.newStaff.overTime}
                    onChange={this.handleChangeInput}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" onClick={this.handleSubmitInput}>
              Thêm
            </Button>
            <Button onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StaffComponent;

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
  FormFeedback,
} from 'reactstrap';

import DatePicker from 'reactstrap-date-picker/lib/DatePicker';
import { STAFFS } from '../shared/staffs';

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

      newStaff: {
        name: '',
        doB: '',
        startDate: '',
        department: 'Sale',
        salaryScale: 1,
        annualLeave: 0,
        overTime: 0,
        image: '/assets/images/alberto.png',
      },

      keyword: '',
      searchKey: '',
      isModalOpen: false,
      errors: {
        name: null,
        doB: null,
        startDate: null,
      },
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
    this.validate();

    if (
      this.state.errors.name === '' &&
      this.state.errors.doB === '' &&
      this.state.errors.startDate === ''
    ) {
      this.toggleModal();
      const duplicateStaff = { ...this.state.newStaff };

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
    this.validateName();
  }

  validateName() {
    if (
      this.state.newStaff.name === '' ||
      this.state.newStaff.name.length < 2
    ) {
      this.setState({
        errors: { ...this.state.errors, name: 'Yêu cầu tối thiểu hơn 2 ký tự' },
      });
    } else if (
      this.state.newStaff.name === '' ||
      this.state.newStaff.name.length > 30
    ) {
      this.setState({
        errors: { ...this.state.errors, name: 'Yêu cầu ít hơn 30 ký tự' },
      });
    } else {
      this.setState({
        errors: { ...this.state.errors, name: '' },
      });
    }
  }

  onChangeDoB = (date, input) => {
    this.setState({
      newStaff: {
        ...this.state.newStaff,
        doB: date,
      },
    });

    this.validateDate(input, 'doB');
  };

  onChangeStartDate = (date, input) => {
    this.setState({
      newStaff: {
        ...this.state.newStaff,
        startDate: date,
      },
    });

    this.validateDate(input, 'startDate');
  };

  validateDate(input, stateProp) {
    if (!input || input === '') {
      this.setState({
        errors: { ...this.state.errors, [stateProp]: 'Yêu cầu nhập' },
      });
    } else {
      this.setState({
        errors: { ...this.state.errors, [stateProp]: '' },
      });
    }
  }

  validate() {
    const errors = {
      name: '',
      doB: '',
      startDate: '',
    };
    if (
      this.state.newStaff.name === '' ||
      this.state.newStaff.name.length < 2
    ) {
      errors.name = 'Yêu cầu tối thiểu hơn 2 ký tự';
    } else if (
      this.state.newStaff.name === '' ||
      this.state.newStaff.name.length > 30
    ) {
      errors.name = 'Yêu cầu ít hơn 30 ký tự';
    } else {
      errors.name = '';
    }

    const inputA = this.state.newStaff.doB;
    if (!inputA || inputA === '') {
      errors.doB = 'Yêu cầu nhập';
    } else {
      errors.doB = '';
    }

    const inputB = this.state.newStaff.startDate;
    if (!inputB || inputB === '') {
      errors.startDate = 'Yêu cầu nhập';
    } else {
      errors.startDate = '';
    }

    this.setState({
      errors,
    });
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
                    valid={this.state.errors.name === ''}
                    invalid={this.state.errors.name !== ''}
                    value={this.state.newStaff.name}
                    onChange={this.handleChangeInput}
                  />
                  <FormFeedback>{this.state.errors.name}</FormFeedback>
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
                    placeholder="dd/mm/yy"
                    valid={this.state.errors.doB === ''}
                    invalid={this.state.errors.doB !== ''}
                    value={this.state.newStaff.doB}
                    onChange={this.onChangeDoB}
                  />
                  <FormFeedback>{this.state.errors.doB}</FormFeedback>
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
                    placeholder="dd/mm/yy"
                    valid={this.state.errors.startDate === ''}
                    invalid={this.state.errors.startDate !== ''}
                    value={this.state.newStaff.startDate}
                    onChange={this.onChangeStartDate}
                  />
                  <FormFeedback>{this.state.errors.startDate}</FormFeedback>
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
            <Button type="button" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StaffComponent;

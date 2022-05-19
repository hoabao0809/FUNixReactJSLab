import React, { Component } from 'react';
import '../css/StaffList.css';
import logoStaff from '../assets/images/alberto.png';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  FormGroup,
  Col,
  // Row,
} from 'reactstrap';
import 'react-widgets/styles.css';
import ModalForm from './ModalComponent';
import { FadeTransform } from 'react-animation-components';

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
      keyword: '',
      searchKey: '',
    };

    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  handleSubmitSearch(e) {
    e.preventDefault();
    this.setState({
      searchKey: this.state.keyword,
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
                  <Button onClick={this.props.toggleModal}>
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
            <FadeTransform
              in
              transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)',
              }}
            >
              <div className="row mt-3">
                <StaffList
                  staffs={this.props.staffs}
                  keyword={this.state.searchKey}
                />
              </div>
            </FadeTransform>
          </div>
        </div>

        <ModalForm type="addStaff" />
      </React.Fragment>
    );
  }
}

export default StaffComponent;

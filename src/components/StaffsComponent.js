import React, { Component } from 'react';
import '../css/StaffList.css';
import logoStaff from '../assets/images/alberto.png';
import { Link } from 'react-router-dom';
import { Form, Input, Button, FormGroup } from 'reactstrap';

/**
 * @description Component search keyword
 * check props nếu không có keyword thì render danh sách bình thường, nếu có thì filter lấy array mới và render, nếu không có kết quả search thì báo No Result Found
 * Nếu người dùng xóa keyword tìm kiếm thì render ra lại full danh sách
 */

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

// Component render 1 item Staff
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

// Functional StaffComponent
class StaffComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      searchKey: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.setState({
      searchKey: this.state.keyword,
    });
    console.log(this.state.searchKey);
    e.preventDefault();
  }

  render() {
    return (
      <div className="staffList container-fluid my-3">
        <div className="container">
          <h3>Nhân viên</h3>
          <div className="search__content">
            <Form onSubmit={this.handleSubmit}>
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
    );
  }
}

export default StaffComponent;

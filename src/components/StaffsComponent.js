import '../css/StaffList.css';
import logoStaff from '../assets/images/alberto.png';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';

/**
 * @description Component search keyword
 * check props nếu không có keyword thì render danh sách bình thường, nếu có thì filter lấy array mới và render, nếu không có kết quả search thì báo No Result Found
 * Nếu người dùng xóa keyword tìm kiếm thì render ra lại full danh sách
 */
function StaffList({ staffs, keyword }) {
  if (!keyword) {
    return staffs.map((staff) => <RenderStaff key={staff.id} staff={staff} />);
  }
  const searchArray = staffs.filter(
    (item) =>
      item.name.toLowerCase().indexOf(keyword.toLowerCase().trim()) != -1
  );
  if (!searchArray || searchArray.length == 0) {
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
}

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

function handleSubmit(e) {
  e.preventDefault();
}

// Functional StaffComponent
function StaffComponent({ staffs }) {
  const [searchKey, setSearchKey] = useState();

  return (
    <div className="staffList container-fluid my-3">
      <div className="container">
        <div className="search__content">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="searchInput">
                <strong>Tìm kiếm</strong>
              </Label>
              <div className="search__item">
                <Input
                  id="searchInput"
                  placeholder="Nhập tên tại đây"
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>
            </FormGroup>
          </Form>
        </div>
        <h3>Nhân viên</h3>
        <div className="row mt-3">
          <StaffList staffs={staffs} keyword={searchKey} />
        </div>
      </div>
    </div>
  );
}

export default StaffComponent;

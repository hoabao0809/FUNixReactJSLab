import '../css/StaffList.css';
import logoStaff from '../assets/images/alberto.png';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';

function StaffList({ staffs, keyword }) {
  if (!keyword) {
    return staffs.map((staff) => <RenderStaff key={staff.id} staff={staff} />);
  }
  const searchArray = staffs.filter(
    (item) =>
      item.name.toLowerCase().indexOf(keyword.toLowerCase().trim()) != -1
  );
  return searchArray.map((item) => <RenderStaff key={item.id} staff={item} />);
}

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

function StaffComponent({ staffs }) {
  const [searchKey, setSearchKey] = useState();

  return (
    <div className="staffList container-fluid my-3">
      <div className="container">
        <div className="search__content">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="searchInput">Tìm kiếm</Label>
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

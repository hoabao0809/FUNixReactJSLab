import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoStaff from '../assets/images/alberto.png';
import '../css/SalaryComponent.css';

/**
 * @description Component render điều kiện lọc
 * Nếu props sorby không có (user chưa chọn select) thì render danh sách như bình thường
 * Nếu người dùng chọn sắp xếp => dùng switch case check điều kiện và render danh sách mới tương ứng
 */
function RenderByCondition({ staffs, sortBy }) {
  let staffsArr = [...staffs];

  if (!sortBy || sortBy === 'defaultValue') {
    return staffs.map((item) => <RenderSalary key={item.id} staff={item} />);
  }

  switch (sortBy) {
    case 'id':
      // Sắp xếp Id theo thứ tự thấp -> cao
      staffsArr = staffsArr.sort((a, b) => a.id - b.id);

      return staffsArr.map((item) => (
        <RenderSalary key={item.id} staff={item} />
      ));

    case 'salaryScale':
      // Sắp xếp Hệ sống lương theo thứ tự thấp -> cao
      staffsArr = staffsArr.sort((a, b) => {
        return a.salaryScale - b.salaryScale;
      });

      return staffsArr.map((item) => (
        <RenderSalary key={item.id} staff={item} />
      ));
  }
}

// Component render 1 salary item
function RenderSalary({ staff }) {
  const salary =
    parseInt(staff.salaryScale) * 3000000 + parseInt(staff.overTime) * 200000;
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="salary__item">
        <div className="salary__header">
          <div className="salary__img">
            <img src={logoStaff} alt={staff.id} />
          </div>
          <div className="salary__name">
            <h4>{staff.name}</h4>
            <p>Mã nhân viên: {staff.id}</p>
            <p>Hệ số lương: {staff.salaryScale}</p>
            <p>Số ngày làm thêm: {staff.overTime}</p>
          </div>
        </div>

        <p>Lương: {salary}</p>
      </div>
    </div>
  );
}

// Component Salary
export default function SalaryComponent({ staffs }) {
  const [selectValue, handleSelect] = useState();
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staff">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="col-6 text-right">
            <select onChange={(e) => handleSelect(e.target.value)}>
              <option defaultValue value="defaultValue">
                Sắp xếp theo
              </option>
              <option value="id">Mã NV</option>
              <option value="salaryScale">Mức lương</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <RenderByCondition staffs={staffs} sortBy={selectValue} />
        </div>
      </div>
    </div>
  );
}

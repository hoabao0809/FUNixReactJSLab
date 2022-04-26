import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderSalary({ staff }) {
  const salary =
    parseInt(staff.salaryScale) * 3000000 + parseInt(staff.overTime) * 200000;
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="salary__item">
        <h3>{staff.name}</h3>
        <p>Mã nhân viên: {staff.id}</p>
        <p>Hệ số lương: {staff.salaryScale}</p>
        <p>Số ngày làm thêm: {staff.overTime}</p>
        <p>Lương: {salary}</p>
      </div>
    </div>
  );
}

export default function SalaryComponent({ staffs }) {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="row">
          {staffs.map((item) => (
            <RenderSalary key={item.id} staff={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

import dateFormat from 'dateformat';
import logo from './../assets/images/alberto.png';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Link from 'react-router-dom/Link';
import '../css/StaffDetail.css';
import { Button } from 'reactstrap';

// Component render 1 staff detail item
function RenderStaffDetail({ staff, department, deleteStaff }) {
  return (
    <div className="row staff_detail">
      <div className="staff__left col-12 col-md-4 col-lg-3">
        <img src={logo} alt={staff.name} />
      </div>
      <div className="staff__right col-12 col-md-8 col-lg-9 mt-3">
        <h5>Họ và tên: {staff.name}</h5>
        <p>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</p>
        <p>Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}</p>
        <p>
          Phòng ban: {department.name ? department.name : staff['department']}
        </p>
        <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
        <p>Số ngày đã làm thêm : {staff.overTime}</p>
        <Button
          onClick={() => {
            deleteStaff(staff.id);
          }}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
}

// Component StaffDetail
const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staff">Nhân Viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div>
            <RenderStaffDetail
              staff={props.staff}
              department={props.department}
              deleteStaff={props.deleteStaff}
              generatePath={props.generatePath}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;

import '../css/StaffList.css';
import logoStaff from '../assets/images/alberto.png';
import { Link } from 'react-router-dom';

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

function StaffComponent({ staffs }) {
  return (
    <div className="staffList container-fluid my-3">
      <div className="container">
      <input type="text" />
        <h3>Nhân viên</h3>
        <div className="row mt-3">
          {staffs.map((staff) => (
            <RenderStaff key={staff.id} staff={staff} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StaffComponent;

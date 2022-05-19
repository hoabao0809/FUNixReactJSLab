import { Link } from 'react-router-dom';

function RenderDepartment({ department }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={`/department/${department.id}`}>
        <div className="department_item">
          <h3>{department.name}</h3>
          <p>Số lượng nhân viên: {department.numberOfStaff}</p>
        </div>
      </Link>
    </div>
  );
}

function DepaComponent({ departments }) {
  return (
    <div className="container my-3">
      <div className="row">
        {departments.map((item) => (
          <RenderDepartment key={item.id} department={item} />
        ))}
      </div>
    </div>
  );
}

export default DepaComponent;

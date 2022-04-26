function RenderDepartment({ department }) {
  return (
    <div className="col-xs-12 col-md-6 col-lg-4">
      <div className="department_item">
        <h2>{department.name}</h2>
        <p>Số lượng nhân viên: {department.numberOfStaff}</p>
      </div>
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

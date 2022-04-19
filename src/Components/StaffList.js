import { Component } from 'react';
import './StaffList.css';
import dateFormat from 'dateformat';
import logo from './../assets/images/alberto.png';

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
      colDisplay: 'col-lg-4',
    };
  }

  onStaffSelect(staff) {
    this.setState({
      selectedStaff: staff,
    });
  }

  renderStaffSelected(staff) {
    if (staff != null) {
      return (
        <div className="row">
          <div className="staff__left col-xs-12 col-md-4">
            <img src={logo} alt={staff.image} />
          </div>
          <div className="staff__right col-xs-12 col-md-6">
            <h5>Họ và tên: {staff.name}</h5>
            <p>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</p>{' '}
            <p>Ngày vào công ty: {dateFormat(staff.startDate, 'dd/mm/yyyy')}</p>
            <p>Phòng ban: {staff.department.id}</p>
            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
            <p>Số ngày đã làm thêm : {staff.overTime}</p>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  //   Tại sao chỗ này phải đổi thành arrow function
  renderList = (display) => {
    return this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className={`col-xs-12 col-md-6 ${display}`}>
          <div className="staff__item">
            <p
              onClick={() => {
                this.onStaffSelect(staff);
              }}
            >
              {staff.name}
            </p>
          </div>
        </div>
      );
    });
  };

  handleSelect = (event) => {
    switch (event.target.value) {
      case '2 cols':
        this.setState({
          selectedStaff: null,
          colDisplay: 'col-lg-6',
        });
        console.log(this.state.colDisplay);
        break;

      case '3 cols':
        this.setState({
          selectedStaff: null,
          colDisplay: 'col-lg-4',
        });
        break;

      case '6 cols':
        this.setState({
          selectedStaff: null,
          colDisplay: 'col-lg-2',
        });
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div className="staffList container-fluid mt-3">
        <div className="container">
          <div className="">
            <select
              onChange={this.handleSelect}
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue>3 cột</option>
              <option value="2 cols">2 cột</option>
              <option value="3 cols">3 cột</option>
              <option value="6 cols">6 cột</option>
            </select>
          </div>
          <div className="row mt-3">
            {this.renderList(this.state.colDisplay)}
          </div>
          <div className="staff__detail mt-3">
            {this.renderStaffSelected(this.state.selectedStaff)}
          </div>
        </div>
      </div>
    );
  }
}

export default StaffList;

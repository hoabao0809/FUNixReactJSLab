import { Component } from 'react';
import './StaffList.css';

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
    };
  }
  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-xs-12 col-md-6 col-lg-4 ">
          <div className="staff__item">{staff.name}</div>
        </div>
      );
    });

    return (
      <div className="staffList container-fluid mt-3">
        <div className="container">
          <div className="row">{staffList}</div>
        </div>
      </div>
    );
  }
}

export default StaffList;

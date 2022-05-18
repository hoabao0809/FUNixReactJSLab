import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import StaffComponent from './StaffsComponent';
import StaffDetail from './StaffDetailComponent';
import DepaComponent from './DepaComponent';
import SalaryComponent from './SalaryComponent';
import { connect } from 'react-redux';
import {
  fetchStaffs,
  fetchDepartments,
  deleteStaff,
  toggleModal,
} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs.staffs,
    departments: state.departments.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
  toggleModal: () => {
    dispatch(toggleModal());
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }
  render() {
    const StaffWithId = ({ match, history }) => {
      let listStaffs = [...this.props.staffs];
      let listDeparts = [...this.props.departments];

      const staffSelected = listStaffs.filter(
        (staff) => staff.id === parseInt(match.params.staffId, 10)
      )[0];

      // Xử lý sau khi xóa staff => redirect về trang staff
      if (!staffSelected) {
        history.push('/staff');
      }

      return (
        <div className="mt-3 mb-5">
          <StaffDetail
            staff={staffSelected}
            department={
              listDeparts.filter(
                (item) => item.id === staffSelected.departmentId
              )[0]
            }
            deleteStaff={this.props.deleteStaff}
          />
        </div>
      );
    };

    return (
      <React.Fragment>
        <Header />;
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <StaffComponent
                staffs={this.props.staffs}
                departments={this.props.departments}
                toggleModal={this.props.toggleModal}
              />
            )}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            path="/department"
            component={() => (
              <DepaComponent departments={this.props.departments} />
            )}
          />
          <Route
            path="/salary"
            component={() => <SalaryComponent staffs={this.props.staffs} />}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

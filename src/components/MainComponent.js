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
  postStaff,
  fetchDepartments,
  deleteStaff,
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
  postStaff: (staff) => {
    dispatch(postStaff(staff));
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
  }
  render() {
    const StaffWithId = ({ match }) => {
      let listStaffs = [...this.props.staffs];
      let listDeparts = [...this.props.departments];
      const staffSelected = listStaffs.filter(
        (staff) => staff.id === parseInt(match.params.staffId, 10)
      )[0];

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
                postStaff={this.props.postStaff}
                departments={this.props.departments}
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

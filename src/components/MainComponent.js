import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import StaffComponent from './StaffsComponent';
import StaffDetail from './StaffDetailComponent';
import DepaComponent from './DepaComponent';
import SalaryComponent from './SalaryComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

class Main extends Component {
  render() {
    const StaffWithId = ({ match }) => {
      const newStaff = JSON.parse(localStorage.getItem('newStaff'));

      let staffListWithLoStorage = [...this.props.staffs];
      if (newStaff) {
        newStaff.forEach((item) => staffListWithLoStorage.push(item));
      }

      return (
        <div className="mt-3 mb-5">
          <StaffDetail
            staff={
              staffListWithLoStorage.filter(
                (staff) => staff.id === parseInt(match.params.staffId, 10)
              )[0]
            }
            departments={this.props.departments}
          />
        </div>
      );
    };

    return (
      <React.Fragment>
        <Header />;
        <Switch>
          <Route exact path="/staff" component={() => <StaffComponent />} />
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

export default withRouter(connect(mapStateToProps)(Main));

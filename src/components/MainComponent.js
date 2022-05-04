import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import StaffComponent from './StaffsComponent';
import StaffDetail from './StaffDetailComponent';
import DepaComponent from './DepaComponent';
import SalaryComponent from './SalaryComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
      newStaff: JSON.parse(localStorage.getItem('newStaff')),
    };
  }

  render() {
    const StaffWithId = ({ match }) => {
      let staffListWithLoStorage = [...this.state.staffs];
      if (this.state.newStaff) {
        this.state.newStaff.forEach((item) =>
          staffListWithLoStorage.push(item)
        );
      }

      return (
        <div className="mt-3 mb-5">
          <StaffDetail
            staff={
              staffListWithLoStorage.filter(
                (staff) => staff.id === parseInt(match.params.staffId, 10)
              )[0]
            }
            departments={this.state.departments}
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
                staffs={this.state.staffs}
                newStaff={this.state.newStaff}
              />
            )}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            path="/department"
            component={() => (
              <DepaComponent departments={this.state.departments} />
            )}
          />
          <Route
            path="/salary"
            component={() => <SalaryComponent staffs={this.state.staffs} />}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import StaffComponent from './StaffsComponent';
import StaffDetail from './StaffDetailComponent';
import DepaComponent from './DepaComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <div className="mt-3 mb-5">
          <StaffDetail
            staff={
              this.state.staffs.filter(
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
            component={() => <StaffComponent staffs={this.state.staffs} />}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            path="/department"
            component={() => (
              <DepaComponent departments={this.state.departments} />
            )}
          />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Main;

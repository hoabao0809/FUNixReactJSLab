import { Component } from 'react';
import NavbarComponent from './components/NavbarComponent';
import './App.css';
import { STAFFS } from './shared/staffs';
import StaffList from './components/StaffList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };
  }
  render() {
    return (
      <div>
        <NavbarComponent />;
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;

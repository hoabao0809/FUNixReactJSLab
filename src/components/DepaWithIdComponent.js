import React, { Component, useState } from 'react';
import Link from 'react-router-dom/Link';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import logo from './../assets/images/alberto.png';
import { connect } from 'react-redux';

import { getStaffsDepa } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    staffsDepa: state.staffsDepa.staffsDepa,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStaffsDepa: (id) => {
    dispatch(getStaffsDepa(id));
  },
});

function RenderDepaDetail({ staffs }) {
  return staffs.map((staff) => {
    return (
      <div className="col-6 col-md-4 col-lg-2 my-2">
        <Link to={`/staff/${staff.id}`}>
          <div className="staff__item">
            <img src={logo} alt={staff.name} />
            <p>{staff.name}</p>
          </div>
        </Link>
      </div>
    );
  });
}

class DepaWithIdComponent extends Component {
  componentDidMount() {
    this.props.getStaffsDepa(this.props.departId);
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/department">Phòng ban</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.department.name}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="row">
              <RenderDepaDetail staffs={this.props.staffsDepa} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepaWithIdComponent);

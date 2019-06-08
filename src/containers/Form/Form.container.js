import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { updateTime, confirmTravel } from '../../redux/actions/index.actions';

import Form from '../../components/Form/Form.component';

export const FormContainer = props => (
  <Form {...props} />
);

export const mapStateToProps = state => (state);


export const mapDispatchToProps = dispatch => bindActionCreators({
  updateTime,
  confirmTravel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);

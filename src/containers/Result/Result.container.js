import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { confirmTravel, updateToken } from '../../redux/actions/index.actions';

import Result from '../../components/Result/Result.component';

export const ResultContainer = props => (
  <Result {...props} />
);

export const mapStateToProps = state => (state);

export const mapDispatchToProps = dispatch => bindActionCreators({
  updateToken,
  confirmTravel,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);

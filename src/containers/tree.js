import { connect } from 'react-redux';
import { select } from '../actions/docs';
import Component from '../components/tree';

const mapStateToProps = state => ({
  docs: state.docs.items,
});


const mapDispatchToProps = dispatch => ({
  onSelect: (doc) => {
    dispatch(select(doc));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

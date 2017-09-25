import { connect } from 'react-redux';
import { setProps } from '../actions/docs';
import Component from '../components/details';

const mapStateToProps = state => ({
  doc: state.docs.selected,
});


const mapDispatchToProps = dispatch => ({
  setProps: (props) => {
    dispatch(setProps(props));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

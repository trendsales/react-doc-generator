import { connect } from 'react-redux';
import Component from '../components/preview';

const mapStateToProps = state => ({
  doc: state.docs.selected,
  props: state.docs.variant ? state.docs.variant.props : undefined,
  funcs: state.docs.variant ? state.docs.variant.funcs : undefined,
});


const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

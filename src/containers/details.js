import { connect } from 'react-redux';
import Component from '../components/details';

const mapStateToProps = state => ({
  doc: state.docs.selected,
});


const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

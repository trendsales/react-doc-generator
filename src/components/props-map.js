import React, { Component } from 'react';
import { connect } from 'react-redux';

class PropsMap extends Component {
  constructor() {
    super();
    this.state = {
      WrappedComponent: undefined,
      props: {},
    };
  }

  setProps(props) {
    this.setState({
      props: Object.assign({}, this.state.props, props),
    });
  }

  getProps() {
    return this.state;
  }

  componentDidMount() {
    const { updater } = this.props;
    updater.onSetComponent((doc, props, docFuncs) => {
      const funcs = (docFuncs || doc.funcs)(this.setProps.bind(this), this.getProps.bind(this));
      this.setState({
        WrappedComponent: doc.Component,
        props: Object.assign({}, props || doc.defaultProps, funcs),
      });
    });
    updater.onProps((props) => {
      this.setState({
        props,
      });
    });
  }

  render() {
    const { WrappedComponent, props } = this.state;
    if (!WrappedComponent) {
      return <div>Select</div>
    }
    return <WrappedComponent {...props} />
  }
}

export default PropsMap;

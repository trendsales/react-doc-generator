const fields = {
  Component: Symbol('Component'),
  funcs: Symbol('funcs'),
};

const emptyFunc = () => ({});

class ComponentDoc {
  constructor(Component, options = {}) {
    this[fields.Component] = Component;
    this[fields.funcs] = options.funcs || emptyFunc;
    this.defaultProps = options.defaultProps || {};
    this.description = options.description;
    let instance = (new Component({}));
    let BaseComponent = Component;
    while (instance.getRootComponent) {
      BaseComponent = instance.getRootComponent();
      instance = (new BaseComponent({}));
    }
    this.propTypes = BaseComponent.propTypes || {};
  }

  get Component() {
    return this[fields.Component];
  }

  get funcs() {
    return this[fields.funcs];
  }
}

export default (Component, options) => {
  return new ComponentDoc(Component, options)
};

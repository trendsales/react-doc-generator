import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropsMap from './props-map';

const retargetEvents = (shadowDom) => {
    let events = ["onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd",
      "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop",
      "onMouseDown", "onMouseEnter", "onMouseLeave","onMouseMove", "onMouseOut",
      "onMouseOver", "onMouseUp"];

    function dispatchEvent(event, eventType, itemProps) {
      if (itemProps[eventType]) {
        itemProps[eventType](event);
      } else if (itemProps.children && itemProps.children.forEach) {
        itemProps.children.forEach(child => {
          if (!child) return;
          child.props && dispatchEvent(event, eventType, child.props);
        })
      }
    }

    // Compatible with v0.14 & 15
    function findReactInternal(item) {
      let instance;
      for (let key in item) {
        if (item.hasOwnProperty(key) && ~key.indexOf('_reactInternal')) {
          instance = item[key];
          break;
        }
      }
      return instance;
    }

    events.forEach(eventType => {
      let transformedEventType = eventType.replace(/^on/, '').toLowerCase();

      shadowDom.addEventListener(transformedEventType, event => {
        for (let i in event.path) {
          let item = event.path[i];

          let internalComponent = findReactInternal(item);
          if (internalComponent
              && internalComponent._currentElement
              && internalComponent._currentElement.props
          ) {
            dispatchEvent(event, eventType, internalComponent._currentElement.props);
          }

          if (item == shadowDom) break;
        }

      });
    });
  }

class Updater {
  onSetComponent(fn) {
    this._onSetComponent = fn;
    if (this.WrappedComponent) {
      fn(this.WrappedComponent);
    }
  }
  onProps(fn) {
    this._onProps = fn;
    if (this.props) {
      fn(this.props);
    }
  }
  setComponent(WrappedComponent) {
    if (this._onSetComponent) {
      this._onSetComponent(WrappedComponent);
    } else {
      this.WrappedComponent = WrappedComponent;
    }
  }
  setProps(props) {
    if (this._onProps) {
      this._onProps(props);
    } else {
      this.props = props;
    }
  }
}

class Render extends Component {
  componentDidMount() {
    this.updater = new Updater();
    const dom = ReactDOM.findDOMNode(this);
    const root = document.createElement('div');
    root.style.height = '100%';
    dom.appendChild(root);
    this.shadowRoot = root.createShadowRoot();
    this.componentRoot = document.createElement('div');
    this.styleRoot = document.createElement('style');
    this.styleRoot.innerHTML = `
      :host {
        ${global.hostCss}
      }
      .containerCss {
        ${global.containerCss}
      }
      ${global.documentCss}
    `;
    this.shadowRoot.appendChild(this.componentRoot);
    this.shadowRoot.appendChild(this.styleRoot);
    const doc = this.props.doc;

    ReactDOM.render(
      <PropsMap updater={this.updater} />,
      this.componentRoot,
    );
    if (doc) {
      this.updater.setComponent(doc);
    }
    retargetEvents(this.shadowRoot);
  }

  componentWillReceiveProps(next) {
    if (next.doc && next.doc !== this.props.doc)
    this.updater.setComponent(next.doc);
  }

  shouldComponentUpdate(next) {
    return false;
  }

  render() {
    return <div />;
  }
}

export default Render;

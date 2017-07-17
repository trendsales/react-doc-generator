const defaultState = {
  items: [],
  itemTree: [],
  selected: undefined,
};

export default (state = Object.assign({}, defaultState), { type, payload}) => {
  switch(type) {
    case 'DOCS_ADD': {
      const newState = Object.assign({}, state, {
        items: [...state.items, ...payload],
      });
      return newState;
    }
    case 'DOCS_SELECT': {
      return Object.assign({}, state, {
        selected: payload,
      });
    }
    default: {
      return state;
    }
  }
}

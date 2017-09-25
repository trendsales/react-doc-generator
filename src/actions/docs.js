export const select = (doc) => ({
  type: 'DOCS_SELECT',
  payload: doc,
});

export const setProps = (props) => ({
  type: 'DOCS_SET_PROPS',
  payload: props,
});

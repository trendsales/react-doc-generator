### Setup

** docs.js **
```javascript
import setup from 'react-docs/src/setup';

setup(require.context('./src/components', true, /\.docs\.js$/), {
  hostCss: `
    position: relative;
  `,
  containerCss: `
    height: 100%;
  `,
});
```

## Writing documentation

Documentation are written as a separate javascript file, which are discovered using the `setup` function

Documents should return a document using the `createDoc` which can be referenced as `react-docs/src/data/doc`, which takes an object as parameter

** Link.doc.js
```javascript
import createDoc from 'react-docs/src/data/doc';
import Link from './link';

export default createDoc(Link, {
  description: 'Some component description here',
  defaultProps: {
    children: 'The value of default',
  },
  funcs: (setProps, getProps) => ({
    onClick: () => {
      setProps({
        children: 'The updated value of default',
      });
    },
  }),
  variants: [{
    name: 'Variant 1',
    description: 'Some description of the variant'
    props: {
      children: 'The value of variant 1',
    },
    funcs: (setProps) => ({
      onClick: () => {
        setProps({
          children: 'The updated value of variant 1',
        });
      },
    }),
  }],
});
```

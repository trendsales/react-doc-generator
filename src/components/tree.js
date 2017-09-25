import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 250px;
  border-right: solid 1px black;
`;

const toTree = (obj) => {
  const result = {};
  docs.forEach(doc => {
    const segments = doc.path.split('/');
    const self = segments.pop();
    let branch = result;
    segments.forEach(segment => {
      if (!branch[segment]) {
        branch[segment] = {};
      }
      branch = branch[segment];
    });
    branch[self] = doc;
  });
}

const Tree = ({ docs, onSelect }) => (
  <Wrapper>
    {docs.map(doc => (
      <div onClick={() => onSelect(doc)}>{doc.path}</div>
    ))}
  </Wrapper>
);

export default Tree;

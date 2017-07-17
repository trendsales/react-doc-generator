import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 250px;
  border-right: solid 1px black;
`;

const Tree = ({ docs, onSelect }) => (
  <Wrapper>
    {docs.map(doc => (
      <div onClick={() => onSelect(doc)}>{doc.path}</div>
    ))}
  </Wrapper>
);

export default Tree;

import React from 'react';
import Tree from './tree';
import Preview from './preview';
import Details from './details';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const App = ({}) => (
  <Wrapper>
    <Tree />
    <Details />
    <Preview />
  </Wrapper>
);

export default App;

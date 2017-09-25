import React from 'react';
import Render from './render';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
`

export default ({ doc, props, funcs }) => (
  <Wrapper>
    <Render doc={doc} props={props} funcs={funcs} />
  </Wrapper>
);

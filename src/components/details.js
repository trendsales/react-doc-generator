import React from 'react';
import Render from './render';
import styled from 'styled-components';
import marked from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


const Wrapper = styled.div`
  flex: 1;
  border-right: solid 1px black;
`

export default ({ doc }) => doc ? (
  <Wrapper>
    <h1>{doc.path}</h1>
    <pre>
      {JSON.stringify(Object.keys(doc.propTypes) || {}, null, '  ')}
    </pre>
    <div dangerouslySetInnerHTML={{__html: marked(doc.description || 'No description')}} />
  </Wrapper>
): null;

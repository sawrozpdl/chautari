import React from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter();

const Markdown = (props: any): any => {
  const { text } = props;

  const html = converter.makeHtml(text);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;

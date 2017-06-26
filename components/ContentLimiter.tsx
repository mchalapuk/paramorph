import * as React from 'react';
import { ReactNode, ReactElement, cloneElement } from 'react';

interface Props {
  children ?: ReactNode;
  limit ?: number;
}

export const ContentLimiter = ({ children, limit, ...props } : Props) => {
  const childs = ([] as ReactElement<any>[]).concat((children || []) as ReactElement<any>[]);
  if (!limit || childs.length === 0) {
    return <div>{ children }</div>;
  }

  const output = [] as ReactElement<any>[];
  let characters = limit;

  for (const child of childs) {
    if (characters === 0) {
      break;
    }
    switch (child.type) {
      case 'p':
        characters = renderParagraph(child, characters, output);
        break;
      case 'ul':
      case 'ol':
        characters = renderList(child, characters, output);
        break;
      default:
        output.push(cloneElement(child, { ...props, limit: characters }));
        characters = 0;
        break;
    }
  }
  return <div>{ output }</div>;
}

function renderParagraph(child : ReactElement<any>, limit : number, output : ReactElement<any>[]) {
  output.push(<p>Paragraph limited to { limit }.</p>);
  return 0;
}

function renderList(child : ReactElement<any>, limit : number, output : ReactElement<any>[]) {
  output.push(<p>Paragraph limited to { limit }.</p>)
  return 0;
}

export default ContentLimiter;


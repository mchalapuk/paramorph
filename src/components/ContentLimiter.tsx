import * as React from 'react';
import { Children, ReactNode, ReactElement, cloneElement } from 'react';

export interface Props {
  children : ReactNode;
  limit ?: number;
  respectLimit ?: boolean;
}

export function ContentLimiter({ children, limit, respectLimit, ...props } : Props) {
  if (!limit || !respectLimit) {
    return <div className='content'>{ children }</div>;
  }

  const output = [] as ReactNode[];
  limitContent(children, limit, props, 'root', output);
  return <div className='content'>{ output }</div>;
}

export default ContentLimiter;

function limitContent(
  node : ReactNode,
  limit : number,
  limiterProps : any,
  key : number | string,
  output : ReactNode[]
) {
  if (limit === 0 || node === null || node === undefined) {
    return limit;
  }

  switch (typeof node) {
    case 'boolean':
    case 'number':
      output.push(node);
      return limit;
    case 'string':
      return limitString(node as string, limit, output);
    default:
      return limitReactElement(node as ReactElement<any>, limit, limiterProps, key, output);
  }
}

function limitString(child : string, limit : number, output : ReactNode[]) {
  let previuos = 0;
  let current;

  const sentences = sentencize(child);
  if (sentences.length < limit) {
    output.push(child);
    return limit - sentences.length;
  }

  sentences.slice(0, limit)
    .forEach(sentence => output.push(sentence));
  return 0;
}

function limitReactElement(
  elem : ReactElement<any>,
  limit : number,
  limiterProps : any,
  key : number | string,
  output : ReactNode[]
) {
  if (elem.type === 'img') {
    return limit;
  }

  const newChildren = [] as ReactNode[];
  let characters = limit;

  Children.forEach(elem.props.children, (child, key) => {
    characters = limitContent(child, characters, limiterProps, key, newChildren);
  });

  const cloneProps = createCloneProps(elem, limiterProps, key);
  output.push(cloneElement(elem, cloneProps, newChildren.length === 0 ? undefined : newChildren));
  return characters;
}

function sentencize(child : string) {
  const sentenceRegexp = /[^.!?…]*[.!?…]/g;
  const matches = [];

  let match;
  while ((match = sentenceRegexp.exec(child)) !== null) {
    matches.push(match[0]);
  }

  return matches;
}

function createCloneProps(elem : ReactElement<any>, limiterProps : any, key : number | string) {
  if (typeof elem.type === 'string') {
    return { key, ...elem.props };
  }
  return { key, ...elem.props, ...limiterProps };
}


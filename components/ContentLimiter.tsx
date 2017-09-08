import * as React from 'react';
import { ReactNode, ReactElement, cloneElement } from 'react';

interface Props {
  children ?: ReactNode;
  limit ?: number;
  respectLimit ?: boolean;
}

export function ContentLimiter({ children, limit, respectLimit, ...props } : Props) {
  if (!limit || !respectLimit) {
    return <div>{ children }</div>;
  }

  const output = [] as ReactNode[];
  limitContent(children, limit, props, output);
  return <div>{ output }</div>;
}

function limitContent(
  children : ReactNode | undefined,
  limit : number,
  props : any,
  output : ReactNode[]
) {
  switch (typeof children) {
    case 'undefined':
      return limit;
    case 'number':
      output.push(children);
      return limit;
    case 'string':
      return limitString(children as string, limit, output);
    default:
      return limitReactElement(children, limit, props, output);
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
  children : ReactNode | undefined,
  limit : number,
  props : any,
  output : ReactNode[]
) {
  let characters = limit;

  asReactElementArray(children).forEach((child, key) => {
    if (characters === 0) {
      return;
    }
    const newChildren = [] as ReactNode[];
    characters = limitContent(child.props.children, characters, props, newChildren);
    const newProps : any = typeof child.type === 'object'? { ...props, key } : { key };
    output.push(cloneElement(child, newProps, newChildren.length === 0 ? undefined : newChildren));
  });

  return characters;
}

function asReactElementArray(children ?: ReactNode) {
  if (children === undefined) {
    return [] as ReactElement<any>[];
  }
  if (typeof children !== 'object') {
    throw new Error(`unexpected value: ${children}`);
  }
  return ([] as ReactElement<any>[]).concat(children as ReactElement<any>[]);
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

export default ContentLimiter;


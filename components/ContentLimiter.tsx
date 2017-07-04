import * as React from 'react';
import { ReactNode, ReactElement, cloneElement } from 'react';

interface Props {
  children ?: ReactNode;
  limit ?: number;
}

export function ContentLimiter({ children, limit, ...props } : Props) {
  if (!limit) {
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
      return limitString(Number(children as number).toString(), limit, output);
    case 'string':
      return limitString(children as string, limit, output);
    default:
      return limitReactElement(children, limit, props, output);
  }
}

function limitString(child : string, limit : number, output : ReactNode[]) {
  output.push(child.substring(0, limit));
  return Math.max(0, limit - child.length);
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
    output.push(cloneElement(child, newProps, newChildren));
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

export default ContentLimiter;


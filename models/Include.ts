import { Component, ComponentClass, StatelessComponent } from 'react';

type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;

export default class Include {
  name : string;
  component : ComponentType<any>;

  constructor(name : string, component : ComponentType<any>) {
    this.name = name;
    this.component = component;
  }
}


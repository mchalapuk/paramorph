/// <reference types="react" />
import { ComponentClass, StatelessComponent } from 'react';
export declare type ComponentType<T> = ComponentClass<T> | StatelessComponent<T>;
export default class Include {
    name: string;
    component: ComponentType<any>;
    constructor(name: string, component: ComponentType<any>);
}

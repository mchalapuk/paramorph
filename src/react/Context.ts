
import { History } from 'history';
import { Paramorph, PathParams, Page } from '../model';

export interface Context {
  paramorph : Paramorph;
  pathParams : PathParams;
  history : History;
  page : Page;
}

export default Context;


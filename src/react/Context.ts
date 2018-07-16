
import { History } from 'history';
import { Paramorph, Page } from '../model';

export interface Context {
  paramorph : Paramorph;
  history : History;
  page : Page;
}

export default Context;


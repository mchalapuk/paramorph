
import { History } from 'history';
import { Paramorph, PathParams, Post } from '../model';

export interface Context {
  paramorph : Paramorph;
  pathParams : PathParams;
  history : History;
  post : Post;
}

export default Context;


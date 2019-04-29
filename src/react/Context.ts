
import { History } from 'history';
import { Paramorph, PathParams, Post } from '../model';

export interface Context {
  paramorph : Paramorph;
  history : History;
  post : Post;
  pathParams : PathParams;
  requestParameterizedRender : (params : any) => void;
}

export default Context;


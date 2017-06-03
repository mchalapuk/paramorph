
import { Page, ComponentType } from './Page';
import Layout from './Layout';
export { Page, ComponentType } from './Page';

export class CurrentPage extends Page {
  constructor(title : string, url : string, layout : Layout, body : ComponentType<any>, date ?: string) {
    super(title, url, layout, body, date);
  }
}

export default CurrentPage;


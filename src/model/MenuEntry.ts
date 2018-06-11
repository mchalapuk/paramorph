
export class MenuEntry {
  constructor(
    readonly title : string,
    readonly short : string,
    readonly url : string,
    readonly icon ?: string) {
  }
}

export default MenuEntry;


declare module 'masonry-layout' {
  export interface MasonryOptions {
    itemSelector?: string;
    columnWidth?: string | number | Element;
    percentPosition?: boolean;
    gutter?: string | number | Element;
    horizontalOrder?: boolean;
    stamp?: string;
    fitWidth?: boolean;
    originLeft?: boolean;
    originTop?: boolean;
    containerStyle?: object;
    transitionDuration?: string | number;
    resize?: boolean;
    initLayout?: boolean;
  }

  export default class Masonry {
    constructor(element: string | Element, options?: MasonryOptions);
    layout(): void;
    layoutItems(items: Element[], isStill?: boolean): void;
    stamp(elements: Element | Element[] | NodeList | string): void;
    unstamp(elements: Element | Element[] | NodeList | string): void;
    appended(elements: Element | Element[] | NodeList): void;
    prepended(elements: Element | Element[] | NodeList): void;
    addItems(elements: Element | Element[] | NodeList): any[];
    remove(elements: Element | Element[] | NodeList): void;
    reloadItems(): void;
    destroy(): void;
    getItemElements(): Element[];
    data(element: Element): any;
  }
}

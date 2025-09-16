declare module 'muuri' {
  export interface MuuriOptions {
    items?: string;
    dragEnabled?: boolean;
    dragHandle?: string;
    dragContainer?: Element | null;
    dragSort?: boolean | any;
    dragAutoScroll?: {
      targets?: (Window | Element)[];
      threshold?: number;
      safeZone?: number;
      speed?: number;
    };
    dragPlaceholder?: {
      enabled?: boolean;
      createElement?: (item: any) => HTMLElement;
    };
    dragStartPredicate?: {
      distance?: number;
      delay?: number;
    };
    dragSortHeuristics?: {
      sortInterval?: number;
      minDragDistance?: number;
      minBounceBackAngle?: number;
    };
    layout?: {
      fillGaps?: boolean;
      horizontal?: boolean;
      alignRight?: boolean;
      alignBottom?: boolean;
      rounding?: boolean;
    };
    layoutOnResize?: boolean;
    layoutDuration?: number;
    layoutEasing?: string;
    showDuration?: number;
    showEasing?: string;
    hideDuration?: number;
    hideEasing?: string;
  }

  export default class Muuri {
    constructor(element: HTMLElement, options?: MuuriOptions);
    refreshItems(): this;
    layout(instant?: boolean): this;
    add(elements: HTMLElement | HTMLElement[]): void;
    remove(items: any[], options?: any): void;
    destroy(): void;
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
    getItems(): any[];
    getItem(element: HTMLElement): any;
  }
}

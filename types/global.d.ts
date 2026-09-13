import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    popover?: "auto" | "manual" | "" | string;
    popoverTarget?: string;
    popovertarget?: string;
    popoverTargetAction?: "toggle" | "show" | "hide";
    popovertargetaction?: "toggle" | "show" | "hide";
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    popoverTarget?: string;
    popovertarget?: string;
    popoverTargetAction?: "toggle" | "show" | "hide";
    popovertargetaction?: "toggle" | "show" | "hide";
  }
}

declare module "next" {
  export interface Metadata {
    title?: any;
    description?: string;
    keywords?: string[] | string;
    authors?: Array<{ name: string; url?: string }>;
    [key: string]: any;
  }
  const next: any;
  export default next;
}

declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type Metadata = any;
  export type ResolvingMetadata = any;
}

declare global {
  interface HTMLElement {
    showPopover?(): void;
    hidePopover?(): void;
    togglePopover?(force?: boolean): void;
  }
}

declare module "next" {
  export interface Metadata {
    title?: any;
    description?: string;
    keywords?: string[] | string;
    authors?: Array<{ name: string; url?: string }>;
    [key: string]: any;
  }
  export interface Viewport {
    [key: string]: any;
  }
  const next: any;
  export default next;
}

declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type Metadata = any;
  export type ResolvingMetadata = any;
  export type Viewport = any;
  export type ResolvingViewport = any;
}

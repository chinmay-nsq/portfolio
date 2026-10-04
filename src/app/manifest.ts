import type { MetadataRoute } from "next";
import { asset } from "@/lib/asset";
import { siteMeta } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.title,
    short_name: siteMeta.name,
    description: siteMeta.description,
    start_url: ".", // relative to the manifest, so it also works under /<repo>/
    scope: ".",
    display: "standalone",
    background_color: siteMeta.themeColor,
    theme_color: siteMeta.themeColor,
    icons: [
      { src: asset("/icons/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: asset("/icons/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

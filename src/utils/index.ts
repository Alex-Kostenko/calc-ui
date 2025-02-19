import { IImage } from "@/interfaces/image";

export function getImageUrl(image: IImage) {
  return (
    (import.meta.env.VITE_STRAPI_IMG_URL || "http://localhost:1337") + image.url
  );
}

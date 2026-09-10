import * as contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || "mock_space",
  accessToken:
    (import.meta.env.DEV
      ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
      : (import.meta.env.CONTENTFUL_DELIVERY_TOKEN || import.meta.env.CONTENTFUL_ACCESS_TOKEN)) || "mock_token",
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

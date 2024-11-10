// import {
//   parseContentfulContentImage,
//   parseContentfulContentImages,
// } from "./contentImage";

// export function parseContentfulPolicy(policy) {
//   if (!policy) {
//     return null;
//   }

//   return {
//     heading: policy.fields.heading || "",
//     content: policy.fields.content || "",
//   };
// }

// export function parseContentfulArticle(article) {
//   if (!article) {
//     return null;
//   }
//   return {
//     title: article.fields.title || "",
//     slug: article.fields.slug,
//     description: article.fields.description || null,
//     duration: article.fields.duration || null,
//     price: article.fields.price || null,
//     images: parseContentfulContentImages(article.fields.images),
//   };
// }

// export function parseContentfulOpeningHours(hours) {
//   if (!hours) {
//     return null;
//   }

//   return {
//     day: hours.fields.day || "",
//     start: hours.fields.start,
//     finish: hours.fields.finish || null,
//   };
// }

// export function parseContentfulPrices(prices) {
//   if (!prices) {
//     return null;
//   }

//   return {
//     intro: prices.fields.intro || "",
//     price: prices.fields.price,
//     duration: prices.fields.duration || null,
//     treatmentName: prices.fields.treatmentName || "",
//     content: prices.fields.content || "",
//   };
// }

// export function parseContentfulHeroContent(content) {
//   if (!content) {
//     return null;
//   }
//   return {
//     image: parseContentfulContentImage(content.fields.heroImage) || null,
//     heading: content.fields.heading || "",
//     content: content.fields.content || "",
//   };
// }

// export function parseContentfulPromotion(content) {
//   if (!content) {
//     return null;
//   }
//   return {
//     heading: content.fields.heading || "",
//     content: content.fields.content || "",
//   };
// }

// export async function fetchContent({ preview }, content_type, parseFunction) {
//   const contentful = contentfulClient({ preview });

//   const result = await contentful.getEntries({ content_type });

//   return result?.items?.map(parseFunction) || [];
// }

// export async function fetchArticle({ slug, preview, content_type }) {
//   const contentful = contentfulClient({ preview });

//   const ArticleResult = await contentful.getEntries({
//     content_type,
//     "fields.slug": slug,
//     include: 2,
//   });

//   return parseContentfulArticle(ArticleResult.items[0]);
// }

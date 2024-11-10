// export function parseContentfulContentImage(asset) {
//   if (!asset) {
//     return null;
//   }

//   if (!("fields" in asset)) {
//     return null;
//   }

//   return {
//     src: `https:${asset.fields.file?.url}` || "",
//     alt: asset.fields.description || "",
//     width: asset.fields.file?.details.image?.width || 0,
//     height: asset.fields.file?.details.image?.height || 0,
//   };
// }

// export function parseContentfulContentImages(assets) {
//   if (!Array.isArray(assets)) {
//     return [];
//   }

//   return assets.map((asset) => {
//     if (!asset || !("fields" in asset)) {
//       return null;
//     }

//     return {
//       src: `https:${asset.fields.file?.url}` || "",
//       alt: asset.fields.description || "",
//       width: asset.fields.file?.details.image?.width || 0,
//       height: asset.fields.file?.details.image?.height || 0,
//     };
//   });
// }

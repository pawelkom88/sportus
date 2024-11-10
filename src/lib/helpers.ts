// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// function paragraphClass(node: string) {
//   const class = "max-w-readable mx-auto my-4 indent-1.5 text-justify text-lg";
//   return class;
// }

// function headingClass(node: string) {
//   const class = "text-2xl my-4 font-bold text-center";
//   return class;
// }
// function heading3Class(node: string) {
//   const class = "text-xl my-8 font-bold text-center";
//   return class;
// }

// function ulClass(node: string) {
//   const class = "max-w-readable mx-auto text-lg";
//   return class;
// }

// export const options = {
//   renderNode: {
//     [BLOCKS.HEADING_2]: (node: any, children: any) => (
//       <h2 class={headingClass(node)}>{children}</h2>
//     ),

//     [BLOCKS.HEADING_3]: (node: any, children: any) => (
//       <h3 class={heading3Class(node)}>{children}</h3>
//     ),

//     [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
//       return <p class={paragraphClass(node)}>{children}</p>;
//     },

//     [BLOCKS.UL_LIST]: (node: any, children: any) => {
//       return <ul class={ulClass(node)}>{children}</ul>;
//     },

//     [INLINES.HYPERLINK]: (node: any, children: any) => (
//       <a class="text-secondary-clr underline" href={node.data.uri}>
//         {children}
//       </a>
//     ),

//     [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
//       const UnTaggedChildren = documentToReactComponents(node, {
//         renderNode: {
//           [BLOCKS.PARAGRAPH]: (node, children) => children,
//           [BLOCKS.LIST_ITEM]: (node, children) => children,
//         },
//       });

//       return <li class="list-disc">{UnTaggedChildren}</li>;
//     },
//   },
// };
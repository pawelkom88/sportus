import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { contentfulClient } from "./contentful";
import { parseContentfulContentImage } from "./contentImage";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => `<custom-bold>${text}<custom-bold>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, next: any) =>
      `<custom-paragraph>${next(node.content)}</custom-paragraph>`,
  },
};

export function parseContentfulArticle(article: any) {
  if (!article) {
    return null;
  }
  return {
    heading: article.fields.heading,
    text: documentToHtmlString(article.fields.text, options),
    date: new Date(article.fields.date).toLocaleDateString(),
    slug: article.fields.slug,
    authorImage: parseContentfulContentImage(article.fields.authorImage),
    image: parseContentfulContentImage(article.fields.images),
  };
}

export async function fetchContent(
  content_type: string,
  parseFunction: typeof parseContentfulArticle
) {
  const result = await contentfulClient.getEntries({ content_type });

  return result?.items?.map(parseFunction) || [];
}

export async function fetchArticle({ slug, content_type }: any) {
  const ArticleResult = await contentfulClient.getEntries({
    content_type,
    "fields.slug": slug,
    include: 2,
  });

  return parseContentfulArticle(ArticleResult.items[0]);
}

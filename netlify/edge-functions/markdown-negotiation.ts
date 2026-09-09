interface NetlifyContext {
  next: () => Promise<Response>;
  [key: string]: unknown;
}

function htmlToMarkdown(html: string): string {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "Sportuś";

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const description = descMatch ? descMatch[1].trim() : "";

  // Remove scripts, styles, svg, and navigations
  let content = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");

  // Try extracting main body content if present
  const mainMatch = content.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) ||
                    content.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (mainMatch) {
    content = mainMatch[1];
  }

  // Convert headings
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n# $1\n\n");
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n");
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n");
  content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n\n#### $1\n\n");

  // Convert links
  content = content.replace(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Convert bold and italics
  content = content.replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, "**$1**");
  content = content.replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, "*$1*");

  // Convert list items
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1");
  content = content.replace(/<\/(?:ul|ol)>/gi, "\n\n");

  // Convert paragraphs and linebreaks
  content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n");
  content = content.replace(/<br\s*[\/]?>/gi, "\n");

  // Strip any remaining HTML tags
  content = content.replace(/<[^>]+>/g, "");

  // Decode basic HTML entities
  content = content
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Clean excessive whitespace
  content = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line, i, arr) => line.length > 0 || (i > 0 && arr[i - 1].length > 0))
    .join("\n");

  const header = `# ${title}\n\n${description ? `> ${description}\n\n` : ""}`;
  return `${header}${content.trim()}\n`;
}

export default async function (request: Request, context: NetlifyContext) {
  const accept = request.headers.get("accept") || "";

  // Only intercept when text/markdown is explicitly requested
  if (!accept.includes("text/markdown")) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  // If response is HTML, convert to markdown
  if (contentType.includes("text/html")) {
    const html = await response.text();
    const markdown = htmlToMarkdown(html);

    // Approximate token count (1 token ~= 4 characters in English/Polish)
    const tokenCount = Math.ceil(markdown.length / 4);

    return new Response(markdown, {
      status: 200,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(tokenCount),
        "vary": "Accept",
        "access-control-allow-origin": "*"
      }
    });
  }

  return response;
}

import siteData from "../seo/siteData.json";

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function jsonLDGenerator({
  type = "website",
  post,
  url,
}: {
  type: string;
  post?: any;
  url?: string;
}) {
  if (type === "post") {
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${url}"
        },
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image?.src || "https://sportus.com.pl/social-media-card.webp"}",
        "author": {
          "@type": "Person",
          "name": "${post.author}",
          "url": "${slugify(post.author || "")}"
        },
        "datePublished": "${post.date}"
      }
    </script>`;
  }
  if (type === "website")
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "name": "${siteData.title}",
        "url": "${siteData.url}",
        "logo": "https://sportus.com.pl/_astro/SPORTUŚ-logo-2.D3-O3gO0_Zu0CqY.avif",
        "image": "${siteData.image.src}",
        "description": "${siteData.description}",  
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "${siteData.city}",
          "addressRegion": "${siteData.region}",
          "addressCountry": "Polska",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "${siteData.telephone}",
          "contactType": "customer support",
          "areaServed": "PL",
          "availableLanguage": ["pl-PL"]
        }
      }
    </script>`;
}

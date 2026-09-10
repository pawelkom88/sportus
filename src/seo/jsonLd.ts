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
  url = siteData.url,
  faqData,
}: {
  type: string;
  post?: any;
  url?: string;
  faqData?: any;
}) {
  const scripts: string[] = [];

  if (type === "post" && post) {
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      headline: post.title,
      description: post.description,
      image: post.image?.src || siteData.image.src,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author || "Krzysztof Iwanowski",
        url: `${siteData.url}/o-nas/`,
      },
      publisher: {
        "@type": "Organization",
        name: "Sportuś",
        logo: {
          "@type": "ImageObject",
          url: `${siteData.url}/android-chrome-512x512.png`,
        },
      },
    };
    scripts.push(
      `<script type="application/ld+json">${JSON.stringify(blogPostingSchema)}</script>`
    );
  }

  // Global SportsClub / LocalBusiness entity
  const sportsClubSchema = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "@id": `${siteData.url}/#sportsclub`,
    name: "Sportuś",
    legalName: "Sportuś Krzysztof Iwanowski",
    url: siteData.url,
    logo: `${siteData.url}/android-chrome-512x512.png`,
    image: siteData.image.src,
    description: siteData.description,
    telephone: siteData.telephone,
    email: siteData.email,
    taxID: "7432000795",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Myśliwskie Wzgórze 4",
      addressLocality: "Gdańsk",
      addressRegion: "Pomorskie",
      postalCode: "80-283",
      addressCountry: "PL",
    },
    areaServed: [
      { "@type": "City", name: "Gdańsk" },
      { "@type": "City", name: "Gdynia" },
      { "@type": "City", name: "Sopot" },
    ],
    sameAs: [
      "https://www.facebook.com/sportus.gdansk/",
      "https://www.owg.pl/ceidg/sportus_krzysztof_iwanowski_9,74,743200,7432000795",
    ],
  };

  scripts.push(
    `<script type="application/ld+json">${JSON.stringify(sportsClubSchema)}</script>`
  );

  // Optional FAQPage schema
  if (faqData && Array.isArray(faqData) && faqData.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item: any) => ({
        "@type": "Question",
        name: item.data?.question || item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.data?.answer || item.answer,
        },
      })),
    };
    scripts.push(
      `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`
    );
  }

  return scripts.join("\n");
}

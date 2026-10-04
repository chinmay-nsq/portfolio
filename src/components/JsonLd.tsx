import { profile, skillGroups, education } from "@/data/portfolio";
import { absoluteUrl, siteMeta } from "@/lib/site";

/** Structured data so search engines can connect the site to the person (Person + ProfilePage + WebSite). */
export default function JsonLd() {
  const home = absoluteUrl("/");
  const personId = `${home}#person`;
  const skills = skillGroups.flatMap((g) => g.items);

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      url: home,
      name: `${siteMeta.name} — Portfolio`,
      description: siteMeta.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${home}#profile`,
      url: home,
      name: siteMeta.title,
      isPartOf: { "@id": `${home}#website` },
      mainEntity: { "@id": personId },
      dateModified: new Date().toISOString(),
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(siteMeta.ogImage.path), width: siteMeta.ogImage.width, height: siteMeta.ogImage.height },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: siteMeta.name,
      url: home,
      image: absoluteUrl(siteMeta.ogImage.path),
      description: siteMeta.description,
      jobTitle: profile.role,
      worksFor: { "@type": "Organization", name: profile.company },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: education[0].school,
        address: { "@type": "PostalAddress", addressLocality: education[0].place, addressCountry: "IN" },
      },
      address: { "@type": "PostalAddress", addressRegion: "Maharashtra", addressCountry: "IN" },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: skills,
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

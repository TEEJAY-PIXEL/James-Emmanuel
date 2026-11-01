"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Media = { filePath: string; type: "image" | "video" | "pdf"; caption: string; altText: string; watermarkedPath?: string };
type Business = { slug: string; businessName: string; industry: string; services: string[]; description: string; media: Media[]; result: string; featured: boolean };
const filters = ["All", "GMC", "GMB", "GA4", "GTM", "Google Ads"];

export default function PortfolioGallery({ businesses, caseStudySlugs }: { businesses: Business[]; caseStudySlugs: string[] }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<{src:string;alt:string;caption:string}|null>(null);
  const visible = useMemo(() => active === "All" ? businesses : businesses.filter(b => b.services.includes(active)), [active,businesses]);
  return <div>
    <div className="portfolio-filters" role="group" aria-label="Filter projects by service">
      {filters.map(filter => <button key={filter} type="button" className={active===filter?"active":""} aria-pressed={active===filter} onClick={()=>setActive(filter)}>{filter}</button>)}
    </div>
    <div className="portfolio-business-list">
      {visible.map(business => <section className="portfolio-business" key={business.slug} id={business.slug}>
        <div className="portfolio-business-heading">
          <div><p className="portfolio-kicker">{business.industry}</p><h2>{business.businessName}</h2><p className="portfolio-description">{business.description}</p></div>
          <div className="portfolio-tags">{business.services.map(service=><span key={service}>{service}</span>)}</div>
        </div>
        <div className="portfolio-media-grid">
          {business.media.map((media,index) => media.type === "image" && media.watermarkedPath ? <button className="portfolio-media-button" type="button" key={media.filePath} onClick={()=>setLightbox({src:media.watermarkedPath!,alt:media.altText,caption:media.caption})} onContextMenu={e=>e.preventDefault()} aria-label={`Open image: ${media.caption}`}>
            <span className="portfolio-image-frame"><Image src={media.watermarkedPath} alt={media.altText} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" className="portfolio-image" draggable={false} onContextMenu={e=>e.preventDefault()} /></span><span className="portfolio-caption">{media.caption}</span>
          </button> : <div className="portfolio-media-placeholder" key={media.filePath}>{media.caption} — TBC</div>)}
        </div>
        <div className="portfolio-business-bottom"><p><strong>Recorded result:</strong> {business.result}</p>{caseStudySlugs.includes(business.slug) && <a href={`/case-studies/${business.slug}`}>View full case study ↗</a>}</div>
      </section>)}
    </div>
    {lightbox && <div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.caption} onClick={()=>setLightbox(null)} onContextMenu={e=>e.preventDefault()}>
      <button type="button" className="portfolio-lightbox-close" onClick={()=>setLightbox(null)} aria-label="Close image">×</button>
      <div className="portfolio-lightbox-content" onClick={e=>e.stopPropagation()}><Image src={lightbox.src} alt={lightbox.alt} fill sizes="100vw" className="portfolio-lightbox-image" draggable={false} onContextMenu={e=>e.preventDefault()} /><p>{lightbox.caption}</p></div>
    </div>}
  </div>;
}
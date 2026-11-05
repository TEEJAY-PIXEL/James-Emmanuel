import type {MetadataRoute} from "next";
import { caseStudies } from "@/lib/case-studies";
export default function sitemap():MetadataRoute.Sitemap{
 const base="https://james-emmanuel-xi.vercel.app";
 const routes=["","/about","/contact","/portfolio","/case-studies","/pricing","/privacy-policy","/terms-of-service"];
 return [...routes,...caseStudies.map(study=>`/case-studies/${study.slug}`)].map(route=>({url:`${base}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:route==="/portfolio"||route==="/pricing"?0.8:0.6}));
}

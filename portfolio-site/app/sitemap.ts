import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{
 const base="https://james-emmanuel-9qkf-teejay14.vercel.app";
 const routes=["","/about","/contact","/portfolio","/case-studies","/pricing","/privacy-policy","/terms-of-service"];
 return routes.map(route=>({url:`${base}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:route==="/portfolio"||route==="/pricing"?0.8:0.6}));
}

import { NextRequest, NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
export const runtime="nodejs";
export const maxDuration=60;
const services=new Set(["GMC","GMB","GA4","GTM"]);
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c));
const isPrivate=(ip:string)=>{if(ip.includes(":"))return ip==="::1"||ip==="::"||/^(fc|fd|fe8|fe9|fea|feb|::ffff:)/i.test(ip);const p=ip.split(".").map(Number);return p[0]===0||p[0]===10||p[0]===127||p[0]>=224||(p[0]===169&&p[1]===254)||(p[0]===172&&p[1]>=16&&p[1]<=31)||(p[0]===192&&p[1]===168)||(p[0]===100&&p[1]>=64&&p[1]<=127);};
async function scan(site:string){
 const url=new URL(site);
 if(url.protocol!=="https:"||url.port||url.username||url.password||isIP(url.hostname)||url.hostname==="localhost")throw Error("Enter a public HTTPS website URL.");
 const addresses=await lookup(url.hostname,{all:true});
 if(!addresses.length||addresses.some(a=>isPrivate(a.address)))throw Error("Website cannot be scanned.");
 let evidence="Homepage could not be retrieved. No findings are verified.";
 try{
 const r=await fetch(url.toString(),{redirect:"manual",signal:AbortSignal.timeout(9000),headers:{"User-Agent":"JamesPortfolioAuditBot/1.0"},cache:"no-store"});
 if(r.ok&&(r.headers.get("content-type")||"").includes("text/html")){
 const html=(await r.text()).slice(0,150000);
 const title=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.slice(0,160)||"not detected";
 const links=[...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].slice(0,120).map(m=>({href:m[1].slice(0,140),label:m[2].replace(/<[^>]*>/g," ").trim().slice(0,65)}));
 evidence=JSON.stringify({status:r.status,title,links,canonical:/rel=["']canonical/i.test(html),structuredData:html.includes("application/ld+json"),scope:"homepage HTML only; linked pages and account settings not inspected"}).slice(0,11000);
 }else evidence="Homepage HTTP status: "+r.status+"; linked pages not checked.";
 }catch{}
 return {url,evidence};
}

type Finding={title:string;detail:string;severity:"low"|"medium"|"unverified"};
export async function POST(req:NextRequest){
 try{
  if(req.headers.get("origin")&&new URL(req.headers.get("origin")!).host!==req.nextUrl.host)return NextResponse.json({error:"Invalid origin."},{status:403});
  const raw=await req.text();if(raw.length>12000)throw Error("Request too large.");
  const b=JSON.parse(raw);
  if(b.company)return NextResponse.json({error:"Request rejected."},{status:400});
  if(b.consent!==true||typeof b.name!=="string"||b.name.trim().length<2||b.name.length>100||typeof b.email!=="string"||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(b.email)||b.email.length>254||!services.has(b.service)||typeof b.issue!=="string"||b.issue.length<10||b.issue.length>3000)throw Error("Please complete the form correctly.");
  const {url,evidence}=await scan(b.website);
  const findings:Finding[]=[];
  let data:{status?:number;title?:string;links?:{href:string;label:string}[];canonical?:boolean;structuredData?:boolean}|null=null;
  try{data=JSON.parse(evidence)}catch{}
  if(!data){findings.push({title:"Website inspection",detail:"The homepage could not be fully inspected. This is not proof of a website error.",severity:"unverified"});}
  else{
   findings.push({title:"HTTPS homepage",detail:"The public homepage responded successfully over HTTPS.",severity:"low"});
   const links=(data.links||[]).map(l=>(l.href+" "+l.label).toLowerCase()).join(" ");
   const policies=[["Contact details",/contact|mailto:|tel:/i],["Returns and refunds",/refund|returns?|exchange/i],["Privacy policy",/privacy/i],["Shipping and delivery",/shipping|delivery/i]] as const;
   for(const [title,re] of policies){
    findings.push(re.test(links)?{title,detail:"A relevant link or reference was detected on the homepage.",severity:"low"}:{title,detail:"No obvious reference was found among the sampled homepage links. This does not confirm the page is missing.",severity:"medium"});
   }
   if(data.title==="not detected")findings.push({title:"Page title",detail:"A page title was not detected in the sampled HTML.",severity:"medium"});
  }
  findings.push({title:"Google account status",detail:"GMC, Google Ads, GA4 and GTM account settings cannot be verified from a public homepage check.",severity:"unverified"});
  const count=findings.filter(f=>f.severity==="medium").length;
  const report={summary:count?`${count} potential website visibility or trust-signal gaps were identified from publicly available homepage evidence.`:"No specific policy-link gaps were confirmed in this limited check.",findings:findings.slice(0,7),nextStep:"For a complete account, feed, compliance or tracking diagnosis, contact James Emmanuel for a professional review.",limitations:"Preliminary automated review of public homepage information only. Links may be present elsewhere; private account issues and approval outcomes cannot be verified.",website:url.origin,service:b.service,checkedAt:new Date().toISOString()};
  return NextResponse.json({ok:true,report,emailed:false,ownerNotified:false});
 }catch(e){const msg=e instanceof Error?e.message:"Unable to run check.";return NextResponse.json({error:msg},{status:400});}
}

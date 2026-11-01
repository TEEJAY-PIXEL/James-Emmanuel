import data from "@/data/case-studies.json";
export type CaseStudy = (typeof data.caseStudies)[number];
export const caseStudies = data.caseStudies as CaseStudy[];
export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

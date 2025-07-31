/* import { StaticImageData } from "next/image"; */

export interface CoreTemplateFields {
  program: string;
  season: string;
  year: string;
  status: string;
}

export interface SparkAcceptTemplateFields extends CoreTemplateFields {
  location: string;
  timeful: string;
  repo: string;
  beginningWeekOf: Date;
  contactForHelpBy: Date;
}

export interface RejectTemplateFields extends CoreTemplateFields {
  nextYear: string;
  nextSeason: string;
}

export interface SparkInterviewTemplateFields extends CoreTemplateFields {
  calendly: string;
  completeBy: Date;
}

export type TemplateFields =
  | SparkAcceptTemplateFields
  | RejectTemplateFields
  | SparkInterviewTemplateFields;

export interface sparkAccept {
  year: string;
  season: string;
  /* emailBanner: StaticImageData;
  linkedinBanner: StaticImageData; */
  projectName: string;
  timeful: string;
  repo: string;
  beginningWeekOf: string;
  location: string;
  contactForHelpBy: string;
  lead1: string;
  lead2: string;
  status: "accept";
}

export interface createAccept {
  year: string;
  season: string;
  /* emailBanner: StaticImageData;
  linkedinBanner: StaticImageData; */
  beginningWeekOf: string;
  status: "accept";
}

export interface forgeAccept {
  year: string;
  season: string;
  /* emailBanner: StaticImageData;
  linkedinBanner: StaticImageData; */
  projectName: string;
  projectSubname?: string;
  timeful: string;
  beginningWeekOf: string;
  deadline: string;
  status: "accept";
}

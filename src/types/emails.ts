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

export interface ForgeAcceptTemplateFields extends CoreTemplateFields {
  timeful: string;
  beginningWeekOf: Date;
  completeBy: Date;
}

export interface CreateAcceptTemplateFields extends CoreTemplateFields {
  beginningWeekOf: Date;
}

export interface DasAcceptTemplateFields extends CoreTemplateFields {
  timeful: string;
  beginningWeekOf: Date;
  completeBy: Date;
}

export interface RejectTemplateFields extends CoreTemplateFields {
  nextYear: string;
  nextSeason: string;
}

export interface InterviewTemplateFields extends CoreTemplateFields {
  calendly: string;
  completeBy: Date;
}

export type TemplateFields =
  | SparkAcceptTemplateFields
  | ForgeAcceptTemplateFields
  | CreateAcceptTemplateFields
  | DasAcceptTemplateFields
  | RejectTemplateFields
  | InterviewTemplateFields;

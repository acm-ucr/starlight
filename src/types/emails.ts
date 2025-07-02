import { StaticImageData } from "next/image";

export interface reject {
  currentYear: string;
  currentSeason: string;
  nextYear: string;
  nextSeason: string;
}

export interface sparkAccept {
  emailBanner: StaticImageData;
  linkedinBanner: StaticImageData;
  projectName: string;
  timeful: string;
  repo: string;
  beginningWeekOf: string;
  location: string;
  contactForHelpBy: string;
  lead1: string;
  lead2: string;
}

export interface createAccept {
  emailBanner: StaticImageData;
  linkedinBanner: StaticImageData;
  beginningWeekOf: string;
}

export interface forgeAccept {
  emailBanner: StaticImageData;
  linkedinBanner: StaticImageData;
  projectName: string;
  projectSubname?: string;
  timeful: string;
  beginningWeekOf: string;
  deadline: string;
}

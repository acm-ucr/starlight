/* import { StaticImageData } from "next/image"; */

export interface reject {
  year: string;
  season: string;
  nextYear: string;
  nextSeason: string;
  status: "reject";
}

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

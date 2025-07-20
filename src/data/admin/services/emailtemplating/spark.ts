/* import { StaticImageData } from "next/image"; */

import { SEASONS } from "@/data/information";
import {
  BaseFields,
  /*   DateInput,
  Description, */
  RadioInput,
  TextInput,
  /*   SelectInput, */
} from "@/types/forms";

interface Attributes {
  currentSeason: "Fall" | "Winter" | "Summer" | "Spring";
  currentYear: string;
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
  status: "accept" | "reject" | "interview";
}

export const ATTRIBUTES: Attributes = {
  currentSeason: "Fall",
  currentYear: "",
  /* emailBanner: StaticImageData;
  linkedinBanner: StaticImageData; */
  projectName: "",
  timeful: "",
  repo: "",
  beginningWeekOf: "",
  location: "",
  contactForHelpBy: "",
  lead1: "",
  lead2: "",
  status: "accept",
};

interface Fields extends BaseFields {
  currentYear: TextInput;
  currentSeason: RadioInput;
  /* emailBanner: UploadInput;
    linkedinBanner: UploadInput;
    projectName: TextInput;
    timeful: TextInput;
    repo: TextInput;
    beginningWeekOf: DateInput;
    location: TextInput;
    contactForHelpBy: DateInput;
    lead1: SelectInput;
    lead2: SelectInput;
    status: SelectInput; */
}
export const Fields: Fields = {
  currentSeason: {
    input: "radio",
    text: "Season",
    options: SEASONS,
    field: "season",
    width: 12,
    required: true,
    editable: true,
  },
  currentYear: {
    input: "input",
    name: "currentYear",
    type: "text",
    title: "Current Year",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
    placeholder: "eg. 2005",
  },
};

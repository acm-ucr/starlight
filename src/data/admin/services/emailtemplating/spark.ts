/* import { StaticImageData } from "next/image"; */

import { SEASONS, STATUSES } from "@/data/information";
import {
  BaseFields,
  /*   DateInput,
  Description, */
  RadioInput,
  TextInput,
  /*   SelectInput, */
} from "@/types/forms";

interface Attributes {
  season: "";
  year: string;
  status: "";
  projectName: string;
  /* emailBanner: StaticImageData;
  linkedinBanner: StaticImageData; 
  projectName: string;
  timeful: string;
  repo: string;
  beginningWeekOf: string;
  location: string;
  contactForHelpBy: string;*/
}

export const ATTRIBUTES: Attributes = {
  season: "",
  year: "",
  status: "",
  projectName: "",
  /* emailBanner: StaticImageData;
  linkedinBanner: StaticImageData;
  projectName: "",
  timeful: "",
  repo: "",
  beginningWeekOf: "",
  location: "",
  contactForHelpBy: "", */
};

interface Fields extends BaseFields {
  year: TextInput;
  season: RadioInput;
  projectName: TextInput;
  /* emailBanner: UploadInput;
    linkedinBanner: UploadInput;
    timeful: TextInput;
    repo: TextInput;
    beginningWeekOf: DateInput;
    location: TextInput;
    contactForHelpBy: DateInput;
    status: SelectInput; */
}
export const Fields: Fields = {
  season: {
    input: "radio",
    text: "Season",
    options: SEASONS,
    field: "season",
    width: 12,
    required: true,
    editable: true,
  },
  year: {
    input: "input",
    name: "Year",
    type: "text",
    title: "Year",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
    placeholder: "eg. 2005",
  },
  status: {
    input: "radio",
    text: "Status",
    options: STATUSES,
    field: "status",
    width: 12,
    required: true,
    editable: true,
  },
  projectName: {
    input: "input",
    editable: true,
    name: "projectName",
    type: "text",
    title: "Project Name",
    placeholder: "ie. Atlas, CSA, WITL",
    maxLength: 50,
    width: 12,
    required: true,
  },
};

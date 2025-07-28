/* import { StaticImageData } from "next/image"; */

import { LOCATIONS, SEASONS, STATUSES } from "@/data/information";
import {
  BaseFields,
  DateInput,

  /*   Description, */
  RadioInput,
  TextInput,
  /*   SelectInput, */
} from "@/types/forms";

interface Attributes {
  season: "";
  year: string;
  status: "";
  location: string;
  timeful: string;
  repo: string;
  beginningWeekOf: string;

  /*contactForHelpBy: string;
  emailBanner: StaticImageData;
  linkedinBanner: StaticImageData;*/
}

export const ATTRIBUTES: Attributes = {
  season: "",
  year: "",
  status: "",
  location: "",
  timeful: "",
  repo: "",
  beginningWeekOf: "",
  /* 

  contactForHelpBy: "", 
  emailBanner: StaticImageData;
  linkedinBanner: StaticImageData;*/
};

interface Fields extends BaseFields {
  year: TextInput;
  season: RadioInput;
  status: RadioInput;
  location: RadioInput;
  timeful: TextInput;
  repo: TextInput;
  beginningWeekOf: DateInput;
  /*contactForHelpBy: DateInput;
    emailBanner: UploadInput;
    linkedinBanner: UploadInput;*/
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
  location: {
    input: "radio",
    text: "Meeting Location",
    options: LOCATIONS,
    field: "location",
    width: 12,
    required: true,
    editable: true,
  },
  timeful: {
    input: "input",
    name: "Timeful",
    type: "text",
    title: "Timeful",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
    placeholder: "eg. https://timeful.app/e/ST4NL3Y",
  },
  repo: {
    input: "input",
    name: "Repo",
    type: "text",
    title: "Repo",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
    placeholder: "eg. https://github.com/acm-ucr/starlight",
  },
  beginningWeekOf: {
    input: "date",
    title: "Beginning Week Of",
    width: 12,
    editable: true,
    required: true,
  },
};

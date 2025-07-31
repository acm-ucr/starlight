import { BaseFields, DateInput, RadioInput, TextInput } from "@/types/forms";
import { StaticImageData } from "next/image";
import { SEASONS, STATUSES } from "@/data/information";

interface Attributes {
  season: string;
  year: string;
  status: string;
  beginningWeekOf: string;
  emailBanner?: StaticImageData;
  linkedinBanner?: StaticImageData;
}

export const ATTRIBUTES: Attributes = {
  season: "",
  year: "",
  status: "",
  beginningWeekOf: "",
};

interface Fields extends BaseFields {
  season: RadioInput;
  year: TextInput;
  status: RadioInput;
  beginningWeekOf: DateInput;
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
  beginningWeekOf: {
    input: "date",
    title: "Beginning Week Of",
    width: 12,
    editable: true,
    required: true,
  },
};

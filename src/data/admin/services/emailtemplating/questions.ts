import { StaticImageData } from "next/image";
import { LOCATIONS, SEASONS, STATUSES } from "@/data/information";
import {
  BaseFields,
  DateInput,
  RadioInput,
  TextInput,
  /* SelectInput, */
} from "@/types/forms";

interface CoreAttributes {
  season: string;
  year: string;
  status: string;
}

export const COREATTRIBUTES: CoreAttributes = {
  season: "",
  year: "",
  status: "",
};

interface CoreFields extends BaseFields {
  season: RadioInput;
  year: TextInput;
  status: RadioInput;
}

export const COREFIELDS: CoreFields = {
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
};

interface SparkAcceptAttributes {
  location: string;
  timeful: string;
  repo: string;
  beginningWeekOf: string;
  contactForHelpBy: string;
  emailBanner?: StaticImageData;
  linkedinBanner?: StaticImageData;
  lead1: string;
  lead2?: string;
}

export const SPARKACCEPTATTRIBUTES: SparkAcceptAttributes = {
  location: "",
  timeful: "",
  repo: "",
  beginningWeekOf: "",
  contactForHelpBy: "",
  lead1: "",
};

interface SparkAcceptFields extends BaseFields {
  location: RadioInput;
  timeful: TextInput;
  repo: TextInput;
  beginningWeekOf: DateInput;
  contactForHelpBy: DateInput;
  /* emailBanner: UploadInput;
    linkedinBanner: UploadInput;*/
}
export const SPARKACCEPTFIELDS: SparkAcceptFields = {
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
  contactForHelpBy: {
    input: "date",
    title: "Contact for help by",
    width: 12,
    editable: true,
    required: true,
  },
};
interface RejectAttributes {
  nextYear: string;
  nextSeason: string;
}

export const REJECTATTRIBUTES: RejectAttributes = {
  nextYear: "",
  nextSeason: "",
};

interface RejectFields extends BaseFields {
  nextYear: TextInput;
  nextSeason: RadioInput;
}

export const REJECTFIELDS: RejectFields = {
  nextYear: {
    input: "input",
    name: "Next Year",
    type: "text",
    title: "Next Year",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
    placeholder: "eg. 2024",
  },
  nextSeason: {
    input: "radio",
    text: "Next Season",
    options: SEASONS,
    field: "nextSeason",
    width: 12,
    required: true,
    editable: true,
  },
};
interface InterviewAttributes {
  calendly: string;
  completeBy: string;
}

export const INTERVIEWATTRIBUTES: InterviewAttributes = {
  calendly: "",
  completeBy: "",
};

interface InterviewFields extends BaseFields {
  calendly: TextInput;
  completeBy: DateInput;
}
export const INTERVIEWFIELDS: InterviewFields = {
  calendly: {
    input: "input",
    name: "Calendly",
    type: "text",
    title: "Calendly Interview Link",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
    placeholder: "eg. calendly.com/acmucr/acm-spark-summer-25",
  },
  completeBy: {
    input: "date",
    title: "Complete Interview By",
    width: 12,
    editable: true,
    required: true,
  },
};

interface CreateAcceptAttributes {
  beginningWeekOf: string;
}

export const CREATEACCEPTATTRIBUTES: CreateAcceptAttributes = {
  beginningWeekOf: "",
};

interface CreateAcceptFields extends BaseFields {
  beginningWeekOf: DateInput;
  /* emailBanner: UploadInput;
    linkedinBanner: UploadInput;*/
}
export const CREATEACCEPTFIELDS: CreateAcceptFields = {
  beginningWeekOf: {
    input: "date",
    title: "Beginning Week Of",
    width: 12,
    editable: true,
    required: true,
  },
};

interface ForgeAcceptAttributes {
  timeful: string;
  beginningWeekOf: string;
  completeBy: string;
  emailBanner?: StaticImageData;
  linkedinBanner?: StaticImageData;
}
export const FORGEACCEPTATTRIBUTES: ForgeAcceptAttributes = {
  timeful: "",
  beginningWeekOf: "",
  completeBy: "",
};
interface ForgeAcceptFields extends BaseFields {
  timeful: TextInput;
  beginningWeekOf: DateInput;
  completeBy: DateInput;
  /* emailBanner: UploadInput;
    linkedinBanner: UploadInput;*/
}
export const FORGEACCEPTFIELDS: ForgeAcceptFields = {
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
  beginningWeekOf: {
    input: "date",
    title: "Beginning Week Of",
    width: 12,
    editable: true,
    required: true,
  },
  completeBy: {
    input: "date",
    title: "Complete Schej & Intent to Participate By",
    width: 12,
    editable: true,
    required: true,
  },
};

interface DasAcceptAttributes {
  timeful: string;
  beginningWeekOf: string;
  completeBy: string;
  emailBanner?: StaticImageData;
  linkedinBanner?: StaticImageData;
}
export const DASACCEPTATTRIBUTES: DasAcceptAttributes = {
  timeful: "",
  beginningWeekOf: "",
  completeBy: "",
};
interface DasAcceptFields extends BaseFields {
  timeful: TextInput;
  beginningWeekOf: DateInput;
  completeBy: DateInput;
  /* emailBanner: UploadInput;
    linkedinBanner: UploadInput;*/
}
export const DASACCEPTFIELDS: DasAcceptFields = {
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
  beginningWeekOf: {
    input: "date",
    title: "Beginning Week Of",
    width: 12,
    editable: true,
    required: true,
  },
  completeBy: {
    input: "date",
    title: "Complete Schej & Intent to Participate By",
    width: 12,
    editable: true,
    required: true,
  },
};

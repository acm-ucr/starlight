import {
  Description,
  TextInput,
  CheckboxInput,
  BaseFields,
} from "@/types/forms";
import { AFFLIATIONS } from "@/data/affliations";

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  affiliation: string[];
}

interface Fields extends BaseFields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  discord: TextInput;
  affiliation: CheckboxInput;
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  discord: "",
  affiliation: [],
};

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      "Welcome to ACM Starlight Admin Portal.",
      "Admin access is only granted to current leads and program directors.",
      "this is not an application form to become a lead.",
    ],
  },
  firstName: {
    input: "input",
    name: "firstName",
    type: "text",
    title: "First Name",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
    placeholder: "John",
  },
  lastName: {
    input: "input",
    name: "lastName",
    type: "text",
    title: "Last Name",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
    placeholder: "John",
  },
  email: {
    input: "input",
    name: "email",
    type: "email",
    title: "Email Address",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
    placeholder: "john.doe@gmail.com",
  },
  discord: {
    input: "input",
    editable: true,
    name: "discord",
    type: "text",
    title: "Discord Username",
    placeholder: "ie. john_doe#1234",
    maxLength: 50,
    width: 12,
    required: true,
  },
  affiliation: {
    input: "checkboxes",
    width: 12,
    field: "affiliation",
    text: "Affiliation",
    options: Object.values(AFFLIATIONS),
    required: true,
    editable: true,
  },
};

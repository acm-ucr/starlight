import { Description, TextInput, RadioInput } from "@/types/forms";
import { PROGRAMS } from "@/data/programs";

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  program: string;
}

interface Fields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  discord: TextInput;
  program: RadioInput;
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  discord: "",
  program: "",
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
  program: {
    input: "radio",
    text: "Program",
    options: Object.values(PROGRAMS),
    field: "program",
    width: 12,
    required: true,
    editable: true,
  },
};

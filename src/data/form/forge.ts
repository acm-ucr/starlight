import { Description, TextInput, BaseFields } from "@/types/forms";

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  pastProjects: string;
}

interface Fields extends BaseFields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  discord: TextInput;
  pastProjects: TextInput;
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  discord: "",
  pastProjects: "",
};

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      "Welcome to the ACM Forge Application!",
      "Please fill in the information below",
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
  pastProjects: {
    input: "input",
    editable: true,
    name: "pastProjects",
    type: "text",
    title: "Past Projects",
    placeholder: "ie. Drones",
    maxLength: 50,
    width: 12,
    required: true,
  },
};

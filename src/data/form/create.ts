import { Description, TextInput, BaseFields } from "@/types/forms";

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  portfolioLink: string;
}

interface Fields extends BaseFields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  discord: TextInput;
  portfolioLink: TextInput;
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  discord: "",
  portfolioLink: "",
};

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      "Welcome to the ACM Create Application!",
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
  portfolioLink: {
    input: "input",
    editable: true,
    name: "portfolioLink",
    type: "text",
    title: "Portfolio Link",
    placeholder: "https://yourportfolio.com",
    maxLength: 50,
    width: 12,
    required: true,
  },
};

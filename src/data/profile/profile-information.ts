import { Questions } from "@/types/questions";

export const questions: Questions[] = [
  {
    type: "text",
    title: "Name",
    placeholder: "Enter a Name",
    maxLength: 250,
    disabled: false,
    value: "",
  },
  {
    type: "select",
    title: "Major",
    options: ["Computer Science", "Computer Engineering", "Data Science"],
    value: "",
    disabled: false,
  },
  {
    title: "Graduation Year",
    options: [2025, 2026, 2027, 2028],
    type: "radio",
    disabled: false,
    value: "",
  },
  // eventually should be an input thing here, its not in yet though
  {
    title: "Why do you want to join ACM Ignite?",
    placeholder: "I want to join ACM Ignite because...",
    type: "textarea",
    maxLength: 250,
    disabled: false,
    value: "",
  },
  {
    type: "select",
    title: "Tech Stack",
    options: ["Typescript", "Javascript", "C/C++"],
    value: "",
    disabled: false,
  },
];

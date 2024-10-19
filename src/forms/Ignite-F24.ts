import { project } from "@/types/projects";
import { Questions } from "@/types/questions";

export const questions: Questions[] = [
  {
    title: "Do you have prior experience with Git / Github?",
    type: "radio",
    options: ["Yes", "No"],
    value: "",
    disabled: false,
  },
  {
    title:
      "How familiar are you with the tech stack used for these projects? With 1 - Never Used to 5 - Expert",
    type: "radio",
    options: [1, 2, 3, 4, 5],
    value: "",
    disabled: false,
  },
  {
    title: "Why do you want to join ACM projects?",
    type: "textarea",
    placeholder: "I want to join ACM Projects because...",
    maxLength: 300,
    value: "",
    disabled: false,
  },
  {
    title: "What is your major",
    type: "select",
    options: ["Computer Science", "Computer Engineering", "Data Science"],
    value: "",
    disabled: false,
  },
];

export const projects: project[] = [
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
  {
    title: "Organization 1",
    description: "This is a very cool organization!",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
  },
];

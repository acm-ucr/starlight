import { Project } from "@/types/projects";
import { Questions } from "@/types/questions";

const title = "ACM Create Fall 2024";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const questions: Questions[] = [
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

const projects: Project[] = [
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

export default {
  title,
  description,
  questions,
  projects,
};

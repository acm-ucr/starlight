import IgniteF24 from "./IgniteF24";
import CreateF24 from "./CreateF24";
import ForgeF24 from "./ForgeF24";

export const forms = (term: string) => {
  if (term === "IgniteF24") return IgniteF24;
  if (term === "CreateF24") return CreateF24;
  if (term === "ForgeF24") return ForgeF24;
  return { title: "", description: "", projects: [], questions: [] };
};

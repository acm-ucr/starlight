import Acceptance from "./acceptance";
import Rejection from "./rejection";
import Confirmation from "./confirmation";
import { tracks, ids } from "@/utils/email";

interface props {
  id: ids;
  name: string;
  track: tracks;
  preview: string;
}

const Email = ({ id, name, track, preview }: props) => {
  if (id === "confirmation")
    return <Confirmation name={name} track={track} preview={preview} />;
  if (id === "acceptance")
    return <Acceptance name={name} track={track} preview={preview} />;
  if (id === "rejection")
    return <Rejection name={name} track={track} preview={preview} />;
};

export default Email;

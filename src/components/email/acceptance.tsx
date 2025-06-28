import { tracks } from "@/utils/email";

interface AcceptanceProps {
  name: string;
  track: tracks;
  preview: string;
}

const Acceptance = ({ name, track, preview }: AcceptanceProps) => {
  return (
    <div>
      {name}
      {track}
      {preview}
    </div>
  );
};

export default Acceptance;

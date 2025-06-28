import { tracks } from "@/utils/email";

interface ConfirmationProps {
  name: string;
  track: tracks;
  preview: string;
}

const Confirmation = ({ name, track, preview }: ConfirmationProps) => {
  return (
    <div>
      {name}
      {track}
      {preview}
    </div>
  );
};

export default Confirmation;

import { tracks } from "@/utils/email";

interface RejectionProps {
  name: string;
  track: tracks;
  preview: string;
}

const Rejection = ({ name, track, preview }: RejectionProps) => {
  return (
    <div>
      {name}
      {track}
      {preview}
    </div>
  );
};

export default Rejection;

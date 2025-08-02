import capitalize from "@/utils/capitalize";
interface RejectionProps {
  nextSeason: string;
  nextYear: string;
  program: string;
}

const Rejection = ({ nextSeason, nextYear, program }: RejectionProps) => {
  return (
    <div>
      Hello,
      <br />
      <br />
      Thank you for taking the time to interview with us for ACM{" "}
      {capitalize(program)}. We greatly appreciate your interest in the position
      and the effort you've put into the application process.
      <br />
      <br />
      After careful consideration, we regret to inform you that we have decided
      not to move forward with your application. Every quarter, we receive an
      excess of qualified candidates, and although your skills and experience
      are impressive, factors such as missing an interview, last-minute
      rescheduling, not scheduling an interview or other factors also played a
      role in our decision-making process.
      <br />
      <br /> This decision was not a reflection of your abilities or potential
      and we recognize your dedication and enthusiasm for our projects. Feel
      free to be on the lookout for our {nextSeason} {nextYear} ACM{" "}
      {capitalize(program)} application in the near future. Thank you again for
      considering joining ACM {capitalize(program)}.
    </div>
  );
};
export default Rejection;

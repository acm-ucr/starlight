import * as React from "react";

interface RejectionProps {
  nextSeason: string;
  nextYear: string;
  program: string;
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Rejection({ nextSeason, nextYear, program }: RejectionProps) {
  return (
    <div>
      Hello, Thank you for taking the time to interview with us for ACM{" "}
      {capitalizeFirstLetter(program)}. We greatly appreciate your interest in
      the position and the effort you've put into the application process.
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
      {capitalizeFirstLetter(program)} applications in the near future. Thank
      you again for considering joining ACM {capitalizeFirstLetter(program)}.
    </div>
  );
}

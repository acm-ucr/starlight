import capitalize from "@/utils/capitalize";

interface InterviewProps {
  calendly: string;
  completeBy: Date;
  program: string;
}

const ForgeInterview = ({ calendly, completeBy, program }: InterviewProps) => {
  return (
    <div>
      Dear ACM {capitalize(program)} Candidate,
      <br />
      <br />
      Hello! Thank you for your interest in our projects.{" "}
      <strong>
        We are pleased to inform you that you have been selected for an
        interview
      </strong>{" "}
      to discuss your project application further and to learn more about your
      skills and background for ACM {capitalize(program)}. All interviews will
      be in person. Please use the following Calendly link to select an
      interview slot at least 48 hours in advance, at your earliest convenience:{" "}
      <a href={calendly}>
        <strong>{calendly}</strong>
      </a>
      <br />
      <br />
      <strong>Please note:</strong> If you are unable to complete your interview
      before <strong>{completeBy.toLocaleDateString()}</strong>, your
      application will not be considered. If none of the available times work
      for you, please send us an email and we will work with you to find a
      suitable time.
      <br />
      <br />
      Additionally, please be aware that participation in the program requires a
      small donation to help cover the cost of parts. We will explain the
      details and the specific amount during your interview.
      <br />
      <br />
      Thank you for your interest in our {capitalize(program)} Program. We look
      forward to meeting you soon.
    </div>
  );
};
export default ForgeInterview;

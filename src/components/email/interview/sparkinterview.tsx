import capitalize from "@/utils/capitalize";

interface InterviewProps {
  calendly: string;
  completeBy: Date;
  program: string;
}

const SparkInterview = ({ calendly, completeBy, program }: InterviewProps) => {
  return (
    <div>
      Dear ACM {capitalize(program)} Candidate,
      <br />
      <br />
      This is just a friendly reminder! To join ACM {capitalize(program)}, you
      are <strong>required</strong> to complete an interview to discuss your
      project's application further so we can learn more about your skills and
      background.
      <br />
      <br />
      The interview will be in person. If you aren't a current UCR student,
      please let us know when scheduling your interview using the Calendly link
      and we will accommodate for you. Please keep in mind that our interviews
      are in Pacific Standard Time (PST). Please wait for the location to be
      updated on your calendar and book an appointment at this link:{" "}
      <a href={calendly}>{calendly}</a>.
      <br />
      <br />
      This is the final arrangement and{" "}
      <strong>
        if you cannot complete your interview before{" "}
        {completeBy.toLocaleDateString()}
      </strong>{" "}
      then your application will not be considered. During the interview, we
      will discuss your past experience, interests, and have a short technical
      skill assessment.
      <br />
      <br />
      Thank you for your interest in our {capitalize(program)} Program. We look
      forward to meeting you soon.
    </div>
  );
};
export default SparkInterview;

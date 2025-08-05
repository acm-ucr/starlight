interface DasAcceptProps {
  project: string;
  timeful: string;
  beginningWeekOf: Date;
  completeBy: Date;
}
const DasAccept = ({
  project,
  timeful,
  beginningWeekOf,
  completeBy,
}: DasAcceptProps) => {
  return (
    <div>
      Congratulations 🎊! <br />
      <br />
      You have been accepted to be on the {project} Team! Thank you for your
      application and hard work!
      <br />
      <br />
      As a reminder, our sessions will consist of a technical presentation for
      assignments and an integration work session. These meetings will be in
      online. The timeful below will determine when our weekly meetings will be.
      Please fill it out and ensure that you can allocate 1-2 hours of your time
      to come to a in-person meeting.
      <br />
      <br />
      Your project will begin on the week of{" "}
      <strong>{beginningWeekOf.toLocaleDateString()}</strong> (the exact day
      depends on your project team's availability in your Schej), and from that
      week on, the project duration will last for approximately nine weeks.
      <br />
      <br />
      Please join the official{" "}
      <a href="https://discord.gg/qsHw6dhmmY">ACM@UCR Discord Server</a>{" "}
      (general ACM updates) and our{" "}
      <a href="https://discord.gg/Hb6SS3NnGw">ACM Das Discord Server</a> (ACM
      Das’s main source of communication). Once you join, please change your
      name to your full name so that we can identify you and give you the
      appropriate roles! Go ahead and introduce yourself in the introductions
      channel!
      <br />
      <br />
      {/* We highly recommend updating your LinkedIn profile, as it serves as your
      professional portfolio, which recruiters and industry professionals will
      view. Below, we have provided an acceptance banner that you can post on
      LinkedIn to show that you work with ACM@UCR.
      <br />
      <br /> */}
      Furthermore, please fill out this form to let us know about your intent to
      participate.
      <br />
      <br />
      The deadline to fill out both the intent to participate form and Schej
      link is <strong>{completeBy.toLocaleDateString()}, at 11:59 PM </strong>.
      <br />
      <br />
      Please complete the following:
      <br />
      <ul>
        <li>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeS2F_Mcwn1ubZRwPA2yGsqY_j1iONEsKoqw82g_0NprL-fBg/viewform?usp=sharing&ouid=112753035290119824140">
            Fill out Intent to Participate form
          </a>
        </li>
        <li>
          <a href={timeful}>Provide your schedule in Timeful</a>
        </li>
        <li>
          <a href="https://discord.gg/Hb6SS3NnGw">
            Join the ACM Das Discord and introduce yourself!
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DasAccept;

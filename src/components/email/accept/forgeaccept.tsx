interface ForgeAcceptProps {
  project: string;
  timeful: string;
  beginningWeekOf: Date;
  completeBy: Date;
}

const ForgeAccept = ({
  project,
  timeful,
  beginningWeekOf,
  completeBy,
}: ForgeAcceptProps) => {
  return (
    <div>
      Congratulations 🎊! <br />
      <br />
      You have been accepted to be on the {project} Team! Thank you for your
      application and hard work!
      <br />
      <br />
      As a reminder, our sessions will consist of a technical presentation for
      assignments and an integration work session. Both of these meetings will
      be in person and should sum to four hours weekly. The below timeful will
      determine when our weekly meetings will be. Please fill it out and ensure
      that you can allocate four hours of your time to come to a weekly
      in-person meeting.
      <br />
      <br />
      Your project will begin on the week of{" "}
      <strong>{beginningWeekOf.toLocaleDateString()}</strong> (the exact day
      depends on your project team's availability in your Schej), and from that
      week on, the project duration will last for approximately ten weeks.
      <br />
      <br />
      Please join the official{" "}
      <a href="https://discord.gg/qsHw6dhmmY">ACM@UCR Discord Server</a>{" "}
      (general ACM updates) and our{" "}
      <a href="https://discord.gg/G8scNrqtCq">ACM Forge Discord Server</a> (ACM
      Forge’s main source of communication). Once you join, please change your
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
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdP7axviVClmRJ6qJFj6gONHpk-0zrqOYzafMzGGOgi3kCzSw/viewform">
            Fill out Intent to Participate form
          </a>
        </li>
        <li>
          <a href={timeful}>Provide your schedule in Timeful</a>
        </li>
        <li>
          <a href="https://discord.gg/G8scNrqtCq">
            Join the ACM Forge Discord and introduce yourself!
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ForgeAccept;

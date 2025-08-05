interface SparkAcceptProps {
  project: string;
  location: string;
  repo: string;
  timeful: string;
  beginningWeekOf: Date;
}

const SparkAccept = ({
  project,
  location,
  repo,
  timeful,
  beginningWeekOf,
}: SparkAcceptProps) => {
  return (
    <div>
      Congratulations 🎊!
      <br />
      <br />
      You have been accepted to be on the {project} development team! Thank you
      for your application and hard work! We hope to continue this effort
      towards the {project} website. As a reminder, we will be meeting on a
      weekly basis throughout the quarter for an hour to go over progress,
      blockers, plans, and general development guidelines. This meeting will be{" "}
      {location}. The following <a href={timeful}>timeful</a> will determine
      when our weekly meetings will be. Please fill it out and ensure that you
      can allocate one hour of your time to come to a weekly in-person meeting.
      <br />
      <br />
      Your project will begin on the week of{" "}
      <strong>{beginningWeekOf.toLocaleDateString()}</strong> (the exact day
      depends on your project team's availability in the timeful) and from that
      week on, the project duration will last for approximately ten weeks.
      Unless announced otherwise, there will be one weekly {location} project
      check-in meeting, during which your lead will cover material related to
      the project's tech stack as mentioned above.
      <br />
      <br />
      Please join the official{" "}
      <a href="https://discord.gg/qsHw6dhmmY">ACM@UCR Discord Server</a> and our{" "}
      <a href="https://discord.gg/5Exy2EsTjz">ACM Spark Discord Server</a> where
      we can communicate outside of our weekly meetings. Keep in mind this is a
      general software development server for ACM. Once you join, please change
      your name to your full name, so that we can identify you and give you the
      appropriate roles! Go ahead and introduce yourself in the{" "}
      <strong>introductions</strong>
      channel!
      <br />
      <br />
      Under the {project} category, you will see quite a few channels, I will
      briefly go over them.
      <br />
      <br />
      The <strong>announcements</strong> channel is for any announcements such
      as reminders for meetings. The <strong>resources</strong> channel is just
      for us to dump documentation links/tutorials for easy access. It will help
      you syntax-wise in case you are interested in preparing early. The{" "}
      <strong>general</strong> channel will be used for any communication! The{" "}
      <strong>pull-requests</strong> channel will be for us to dump our PRs.
      There is a <strong>meeting</strong> voice channel that will be used for
      weekly meetings or to quickly collaborate on something virtually.
      <br />
      <br />
      Before our first meeting, which will be during Week 1, please review the
      onboarding document and have all the necessary software and tools
      installed:{" "}
      <a href="https://docs.google.com/document/d/1X9lrEtiC8_dZuGHdhnjrOD-cdIqjpnRDB3-bYb1gWBc/edit?usp=sharing">
        New Hire Onboarding Doc
      </a>
      <br />
      <br />
      1. Please also clone the repo before our first meeting:
      <a href={repo}>
        <strong>{repo}</strong>
      </a>
      <br />
      2. Please follow the instructions in README to set up the repo. If you do
      not know how to set up the repo, contact your leads on Discord
      <br />
      <br />
      {/* We highly recommend updating your LinkedIn profile as this serves as your professional portfolio which is to be viewed by recruiters and industry folk. We have attached an acceptance banner below with which you can post on Linkedin that you work with ACM@UCR.
        <br/>
        <br /> */}
      {/* This is still pending on when we add the leads feature for the projects */}
      {/* If you have any additional questions, feel free to ask your project leads, Ricardo Galeano and Hannah Hwang. */}
    </div>
  );
};
export default SparkAccept;

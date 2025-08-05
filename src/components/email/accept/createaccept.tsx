interface CreateAcceptProps {
  beginningWeekOf: Date;
}

const CreateAccept = ({ beginningWeekOf }: CreateAcceptProps) => {
  return (
    <div>
      Congratulations 🎊! You have been accepted to be on the{" "}
      <strong>ACM Create</strong> UI/UX team! Thank you for your application and
      hard work! We hope to continue this effort towards the quarter. As a
      reminder, we will be meeting on a weekly basis throughout the quarter for
      an hour to go over progress, blockers, plans, and general design
      guidelines.
      <br />
      <br /> Your project will begin on the week of{" "}
      <strong>{beginningWeekOf.toLocaleDateString()}</strong> (the exact day
      depends on your project team's availability in your timeful) and from that
      week on, the project duration will last for approximately{" "}
      <strong>ten weeks</strong>. Unless announced otherwise, there will be two{" "}
      <strong>weekly</strong> project check-in meetings, one in which your lead
      will cover material related to the project's tech stack as mentioned
      above.
      <br />
      <br />
      Please join the official{" "}
      <a href="https://discord.gg/qsHw6dhmmY">ACM@UCR Discord Server</a> and our{" "}
      <a href="https://discord.gg/p3wKSqqahJ">ACM Create Discord Server</a>{" "}
      where we can communicate outside of our weekly meetings. Keep in mind this
      is a general development server for ACM. Once you join, please change your
      name to your full name, so that we can identify you and give you the
      appropriate roles! Go ahead and introduce yourself in the introductions
      channel! <br />
      <br />
      {/* We highly recommend updating your Linkedin Profile as this serves as your
      professional portfolio which is to be viewed by recruiters and industry
      folk. We have provided an acceptance banner below with which you can post
      on Linkedin that you work with{" "}
      <a href="https://www.linkedin.com/company/acm-ucr/">ACM@UCR</a>. */}{" "}
      If you have any additional questions, feel free to reach out!
    </div>
  );
};

export default CreateAccept;

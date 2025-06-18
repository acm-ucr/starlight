const About = () => {
  return (
    <div className="mx-auto w-5/6 pb-24">
      <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-30% bg-clip-text pb-2 text-center text-5xl font-bold text-transparent md:text-left">
        What is ACM
      </p>
      <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-30% bg-clip-text pb-6 text-center text-5xl font-bold text-transparent md:text-left">
        Starlight?
      </p>
      <div className="ml-auto flex w-auto justify-end text-center text-xl text-white md:w-2/3 md:text-right">
        ACM Starlight is ACM's official program management portal for ACM Spark,
        Create, Forge, and DAS. ACM Starlight supports ACM@UCR's goal of helping
        our members develop their technical and professional skills to help them
        in school and the tech industry.
      </div>
    </div>
  );
};

export default About;

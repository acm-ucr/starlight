interface ReleaseProps {
  [key: string]: Date;
}

const RELEASES: ReleaseProps = {
  "/": new Date("09/02/2024"),
  "/lead/profile": new Date("09/02/2024"),
  /* more to be added later */
  "/apply/spark": new Date("09/02/2024"),
  "/apply/create": new Date("09/02/2024"),
  "/apply/forge": new Date("09/02/2024"),
  "/apply/das": new Date("09/02/2024"),
  "/apply/lead": new Date("09/02/2024"),
};

export default RELEASES;

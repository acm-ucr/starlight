interface ReleaseProps {
  [key: string]: Date;
}

const RELEASES: ReleaseProps = {
  "/": new Date("09/02/2025"),
  "/lead/profile": new Date("09/02/2025"),
  /* more to be added later */
  "/apply/spark": new Date("09/02/2025"),
  "/apply/create": new Date("09/02/2025"),
  "/apply/forge": new Date("09/02/2025"),
  "/apply/das": new Date("09/02/2025"),
  "/apply/lead": new Date("09/02/2025"),
};

export default RELEASES;

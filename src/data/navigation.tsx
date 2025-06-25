import { FaLock } from "react-icons/fa";
import { ReactElement } from "react";
interface Tab {
  name: string;
  link: string;
  icon: ReactElement;
  target: string;
}

const iconStyle = "text-xl";

interface Tools {
  expand: true;
  tabs: Tab[];
}

interface Tabs {
  [key: string]: {
    [key: string]: Tools;
  };
}

export const TABS: Tabs = {
  admin: {
    Dashboards: {
      expand: true,
      tabs: [
        {
          name: "Admins",
          link: "/admin/dashboard/admins",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
      ],
    },
  },
};

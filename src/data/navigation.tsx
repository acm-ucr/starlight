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
        {
          name: "Create",
          link: "/admin/dashboard/create",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "DAS",
          link: "/admin/dashboard/das",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Forge",
          link: "/admin/dashboard/forge",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Spark",
          link: "/admin/dashboard/spark",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
      ],
    },
  },
};

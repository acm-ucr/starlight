interface props {
  children: string;
}

const mappings: Record<string, string> = {
  "Next.js": "bg-[#000000] text-white",
  TailwindCSS: "bg-[#38BDF8]",
  TypeScript: "bg-[#3178C6]",
};

const Tag = ({ children }: props) => {
  return <div className={`${mappings[children]}`}>{children}</div>;
};

export default Tag;

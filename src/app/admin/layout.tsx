import Navigation from "@/components/global/navigation/side";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;

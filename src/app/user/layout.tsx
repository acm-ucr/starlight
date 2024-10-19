import Navigation from "@/components/global/navigation";

interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;

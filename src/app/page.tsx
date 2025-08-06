import Footer from "@/components/home/footer";
import Landing from "@/components/home/landing";
import TrackCards from "@/components/home/trackcards";
const Home = () => {
  return (
    <div className="to-starlight-blue-primary bg-starlight-blue-primary flex flex-col bg-gradient-to-b from-black/35">
      <Landing />
      <TrackCards />
      <Footer />
    </div>
  );
};

export default Home;

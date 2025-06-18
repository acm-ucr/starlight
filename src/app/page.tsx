import About from "@/components/home/about";
import Footer from "@/components/home/footer";
import Landing from "@/components/home/landing";
import TrackCards from "@/components/home/trackcards";
const Home = () => {
  return (
    <div className="bg-starlight-gray-primary">
      <Landing />
      <About />
      <TrackCards />
      <Footer />
    </div>
  );
};

export default Home;

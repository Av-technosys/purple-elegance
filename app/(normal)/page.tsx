import BestSeller from "@/components/home/BestSeller";
import ExploreCollection from "@/components/home/ExploreCollection";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import HeritageThreads from "@/components/home/HeritageThreads";
import HeroBanner from "@/components/home/HeroBanner";
import InstagramSection from "@/components/home/InstagramSection";
import MadeForYou from "@/components/home/MadeForYou";
import NewArrival from "@/components/home/NewArrival";
import StayConnected from "@/components/home/StayConnected";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroBanner />
      <FeaturedCollection />
      <ExploreCollection />
      <NewArrival />
      <HeritageThreads />
      <BestSeller />
      <MadeForYou />
      <InstagramSection />
      <StayConnected />
   
    </main>
  );
}

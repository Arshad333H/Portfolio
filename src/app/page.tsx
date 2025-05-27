import Image from "next/image";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
   
   <div className="h-full w-full">
    <div className="h-[950px] flex flex-col">

    <HeroSection/>
    </div>
   </div>
  );
}

import Cta from "@/components/modules/Home/Cta";
import Features from "@/components/modules/Home/Features";
import HeroSection from "@/components/modules/Home/HeroSection";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetAvailableRideQuery } from "@/redux/features/ride/riders.api";
import AvailableRide from "./driver/AvailableRide";

export default function Home() {
  const { data } = useGetAvailableRideQuery(undefined);
  const { data: userInfo } = useUserInfoQuery(undefined);
  console.log(data?.data);
  return (
    <div>
      <HeroSection />
      {userInfo?.data?.role === "driver" && <AvailableRide />}
      <Steps />
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}

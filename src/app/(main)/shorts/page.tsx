
import { shorts, users } from "@/lib/shorts-data";
import { ShortsCarousel } from "@/components/shorts/shorts-carousel";

export default function ShortsPage() {
  // We can fetch and pass all shorts to the carousel
  return (
    <div className="h-screen w-full bg-black snap-y snap-mandatory overflow-y-scroll">
      <ShortsCarousel shorts={shorts} users={users} />
    </div>
  );
}

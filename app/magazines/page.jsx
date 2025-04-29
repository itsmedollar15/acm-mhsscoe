import { getAllmagazines } from "@/actions/magazines";
import MagazineDisplay from "@/components/magazines/magazineDisplay";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const MagazinesPage = async () => {
  let magazines;

  try {
    magazines = (await getAllmagazines()).reverse();
  } catch (error) {
    redirect("/not-found");
  }
  return <MagazineDisplay magazines={magazines} />;
};

export default MagazinesPage;

import { getMagazineDetails } from "@/actions/magazines";
import MagazineViewer from "@/components/magazines/magazineViewer";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const MagazineViewPage = async ({ params: { magazineId } }) => {
  let magazine;

  try {
    magazine = await getMagazineDetails(magazineId);
  } catch (error) {
    redirect("/not-found");
  }
  return <MagazineViewer magazine={magazine} />;
};

export default MagazineViewPage;

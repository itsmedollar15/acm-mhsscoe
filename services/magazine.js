import { HTTP_METHODS } from "@/constants/httpMethods";
import httpRequest from "@/utils/httpRequest";

const MagazineService = {
  getAllMagazines: async () => {
    const res = await httpRequest(`/api/magazines`, HTTP_METHODS.GET);
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },
  getMagazineDetails: async (magazineId) => {
    const res = await httpRequest(
      `/api/magazines/${magazineId}`,
      HTTP_METHODS.GET
    );
    if (res.success) {
      return res.data;
    } else {
      throw res.message;
    }
  },
};

export default MagazineService;

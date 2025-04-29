import { errorResponse, successResponse } from "@/utils/sendResponse";
// import { getPdfDocument, getPdfPage } from "@/utils/pdfHandler";
import Magazine from "@/models/magazine";
import { connectDB } from "@/config/database";
import { uploadFile } from "@/utils/fileStorage";

export const GET = async (req) => {
  try {
    await connectDB();
    let magazines = await Magazine.find();
    magazines = magazines.map(({ _doc: { pages, ...details } }) => ({
      ...details,
      thumbnail: pages[0],
    }));

    return successResponse(200, "Magazines", { magazines });
  } catch (error) {
    return errorResponse();
  }
};

// export const POST = async (req) => {
//   try {
//     const { title, description, magazineUrl } = Object.fromEntries(
//       await req.formData()
//     );

//     if (!title || !description || !magazineUrl)
//       return errorResponse(400, "Please fill all the fields");

//     await connectDB();
//     const magazine = await Magazine.create({ title, description });

//     const document = await getPdfDocument(magazineUrl);

//     for (let pageIndex = 0; pageIndex < document.numPages; pageIndex++) {
//       const pageBuffer = (await getPdfPage(document, pageIndex + 1)).toBuffer(
//         "image/jpeg"
//       );

//       pageBuffer.name = `page_${pageIndex + 1}.jpeg`;

//       const pagePath = await uploadFile(
//         pageBuffer,
//         `magazines/${magazine._id}`,
//         undefined,
//         "image/jpeg"
//       );

//       console.log(`Uploaded Page ${pageIndex + 1}/${document.numPages}`);

//       magazine.pages.push(pagePath);
//       await magazine.save();
//     }

//     return successResponse(200, "Magazine Published");
//   } catch (error) {
//     console.log(error);
//     return errorResponse();
//   }
// };

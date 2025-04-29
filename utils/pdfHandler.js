// import * as pdfjs from "pdfjs-dist/build/pdf.min.mjs";
// await import("pdfjs-dist/build/pdf.worker.min.mjs");

// export const getPdfDocument = async (pdfFile) => {
//   try {
//     new URL(pdfFile);
//     return await pdfjs.getDocument({ url: pdfFile, verbosity: 0 }).promise;
//   } catch (error) {
//     return await pdfjs.getDocument({ data: pdfFile, verbosity: 0 }).promise;
//   }
// };

// export const getPdfPage = async (pdfDocument, pageNo = 1) => {
//   const { createCanvas, DOMMatrix } = await import("canvas");
//   global.DOMMatrix = DOMMatrix;
//   const page = await pdfDocument.getPage(pageNo);
//   const viewport = page.getViewport({ scale: 2 });
//   const canvas = createCanvas(viewport.width, viewport.height);
//   const canvasContext = canvas.getContext("2d", {
//     alpha: false,
//     willReadFrequently: true,
//   });
//   const renderContext = { canvasContext, viewport };
//   await page.render(renderContext).promise;
//   return canvas;
// };

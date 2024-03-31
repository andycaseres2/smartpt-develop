import jsPDF from "jspdf";

export const generatePDF = (htmlContent) => {
  const pdf = new jsPDF();
  pdf.fromHTML(htmlContent, 15, 15);
  pdf.save("modal_content.pdf");
};

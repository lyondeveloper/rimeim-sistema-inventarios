import html2Canvas from "html2canvas";
import jsPDF from "jspdf";

export const printDivToPDF = (id_div, pdf_name) => {
  const div = document.getElementById(id_div);
  if (div) {
    var HTML_Height = div.clientHeight;
    var top_left_margin = 2;
    var PDF_Width = 594;
    var PDF_Height = 841;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2Canvas(div)
      .then(function(canvas) {
        var imgData = canvas.toDataURL("image/png");
        var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, "PNG", top_left_margin, top_left_margin);

        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(
            imgData,
            "PNG",
            top_left_margin,
            -(PDF_Height * i) + 4 * top_left_margin
          );
        }
        pdf.save(pdf_name);
      })
      .catch(err => console.log(err));
  }
};

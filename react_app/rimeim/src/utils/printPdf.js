import html2Canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const printDivToPDF = (id_div, pdf_name, callback) => {
  const div = document.getElementById(id_div);
  if (div) {
    var HTML_Height = div.clientHeight;
    var top_left_margin = 2;
    var PDF_Width = 594;
    var PDF_Height = 841;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2Canvas(div)
      .then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin);

        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(
            imgData,
            'PNG',
            top_left_margin,
            -(PDF_Height * i) + 4 * top_left_margin
          );
        }
        pdf.save(pdf_name);
        if (callback) {
          callback();
        }
      })
      .catch(err => console.log(err));
  }
};

export const printQuotation = (id_div, pdf_name, callback) => {
  const div = document.getElementById(id_div);
  if (div) {
    var HTML_Height = div.clientHeight;
    var top_left_margin = 25;
    var PDF_Width = 594;
    var PDF_Height = 841;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2Canvas(div, { allowTaint: true, logging: true })
      .then(canvas => {
        var imgData = canvas.toDataURL('image/jpeg');
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin);

        for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(
            imgData,
            'JPG',
            top_left_margin,
            -(PDF_Height * i) + 4 * top_left_margin
          );
        }
        pdf.save(pdf_name);
        if (callback) {
          callback();
        }
      })
      .catch(err => console.log(err));
  }
};

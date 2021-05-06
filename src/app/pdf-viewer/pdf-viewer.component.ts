import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import * as pdfjsLib from "pdfjs-dist";
import { jsPDF } from "jspdf";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.css"]
})
export class PdfViewerComponent implements OnInit, AfterViewInit {
  pdfSrc =
    "https://res.cloudinary.com/dze7ap73i/image/upload/v1619984699/purchase-order-form-for-free-download_znmojw.pdf";

  @ViewChild("pdfcanvas", { static: true })
  pdfcanvas: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    this.displayPdf();
  }

  displayPdf(): void {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js"; //'//mozilla.github.io/pdf.js/build/pdf.worker.js';
    const loadingTask = pdfjsLib.getDocument(this.pdfSrc);

    // Prepare canvas using PDF page dimensions
    var context = this.pdfcanvas.nativeElement.getContext("2d");

    const pdfcanvasEl = this.pdfcanvas.nativeElement;

    loadingTask.promise.then(function(pdf) {
      console.log(pdf);
      console.log("inside loading task..");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log("Page loaded");

        var scale = 1;
        var viewport = page.getViewport({ scale: scale });

        pdfcanvasEl.height = viewport.height;
        pdfcanvasEl.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          console.log("Page rendered");
        });
      });
    });
  }

  savePDF(): void {
    var imgData = this.pdfcanvas.nativeElement.toDataURL("image/jpeg", 1.0);
    var pdfDoc = new jsPDF();
    pdfDoc.html(this.pdfcanvas.nativeElement).then(()=>pdfDoc.save('test.pdf'));

    //pdf.addImage(imgData, 'JPEG', 0, 0,);
    //pdf.save("download.pdf");
  }
}

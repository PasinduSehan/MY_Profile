// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { X, Download, FileText, Check, Loader } from "lucide-react";

// const CV_PDF_URL = "/Pasindu_Weerathunga_CV.pdf";
// const CV_DOWNLOAD_NAME = "Pasindu_Weerathunga_CV.pdf";

// interface CvViewerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onDownloadIncrement?: () => void;
//   pdfBlobUrl: string | null;
//   pdfFetchStatus: "idle" | "loading" | "success" | "error";
// }

// export default function CvViewer({ 
//   isOpen, 
//   onClose, 
//   onDownloadIncrement, 
//   pdfBlobUrl, 
//   pdfFetchStatus 
// }: CvViewerProps) {
//   const [downloadSuccess, setDownloadSuccess] = useState(false);

//   const handleDownload = () => {
//     try {
//       const downloadUrl = pdfBlobUrl || CV_PDF_URL;
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = CV_DOWNLOAD_NAME;
//       link.target = "_blank";
//       link.rel = "noopener noreferrer";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       // Track download count
//       if (onDownloadIncrement) {
//         onDownloadIncrement();
//       }

//       setDownloadSuccess(true);
//       setTimeout(() => setDownloadSuccess(false), 3000);
//     } catch (err) {
//       console.error("Failed to download PDF:", err);
//     }
//   };

//   // Prevent scroll when fullscreen preview is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-md"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Header Controls */}
//           <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90 backdrop-blur-sm z-10">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center">
//                 <FileText className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Pasindu Weerathunga - CV Preview</h3>
//                 <p className="text-[10px] text-slate-400 font-mono">
//                   {pdfFetchStatus === "loading" ? "Establishing connection..." : "Fullscreen Document Viewer (Blob Mode)"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleDownload}
//                 disabled={pdfFetchStatus === "loading"}
//                 className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-950/40 disabled:text-emerald-700 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-600/25 cursor-pointer"
//               >
//                 {downloadSuccess ? (
//                   <>
//                     <Check className="w-4 h-4 text-white" />
//                     <span>Downloaded!</span>
//                   </>
//                 ) : (
//                   <>
//                     <Download className="w-4 h-4" />
//                     <span>Download CV</span>
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={onClose}
//                 className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
//                 title="Close Viewer"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Embed iframe / object */}
//           <div className="flex-1 w-full h-full p-4 md:p-6 flex items-center justify-center">
//             <div className="w-full h-full max-w-5xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center">
//               {pdfFetchStatus === "loading" ? (
//                 <div className="flex flex-col items-center gap-4 text-slate-400">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
//                     <Loader className="w-10 h-10 animate-spin text-indigo-500 relative z-10" />
//                   </div>
//                   <p className="text-xs font-mono tracking-wider text-slate-300">STREAMING HIGH-FIDELITY DOCUMENT BLOB...</p>
//                 </div>
//               ) : (
//                 <iframe
//                   src={pdfBlobUrl ? `${pdfBlobUrl}#toolbar=1&view=FitH` : `${CV_PDF_URL}#toolbar=1&view=FitH`}
//                   className="w-full h-full border-0"
//                   title="CV Document PDF"
//                 />
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



// CvViewer.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, Check, Loader } from "lucide-react";

const TRANSCRIPT_PDF_URL = "/Transcript (TW Pasindu Sehan).pdf";
const TRANSCRIPT_DOWNLOAD_NAME = "Transcript (TW Pasindu Sehan).pdf";

interface CvViewerProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadIncrement?: () => void;
  pdfBlobUrl: string | null;
  pdfFetchStatus: "idle" | "loading" | "success" | "error";
  pdfUrl?: string;
  downloadName?: string;
  title?: string;
}

export default function CvViewer({ 
  isOpen, 
  onClose, 
  onDownloadIncrement, 
  pdfBlobUrl, 
  pdfFetchStatus,
  pdfUrl = TRANSCRIPT_PDF_URL,
  downloadName = TRANSCRIPT_DOWNLOAD_NAME,
  title = "Pasindu Weerathunga - Transcript Preview"
}: CvViewerProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    try {
      const downloadUrl = pdfBlobUrl || pdfUrl;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = downloadName;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onDownloadIncrement) {
        onDownloadIncrement();
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">{title}</h3>
                <p className="text-[10px] text-slate-400 font-mono">
                  {pdfFetchStatus === "loading" ? "Establishing connection..." : "Fullscreen Document Viewer"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={pdfFetchStatus === "loading"}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-950/40 disabled:text-emerald-700 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-600/25 cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                title="Close Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full h-full p-4 md:p-6 flex items-center justify-center">
            <div className="w-full h-full max-w-5xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center">
              {pdfFetchStatus === "loading" ? (
                <div className="flex flex-col items-center gap-4 text-slate-400">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
                    <Loader className="w-10 h-10 animate-spin text-indigo-500 relative z-10" />
                  </div>
                  <p className="text-xs font-mono tracking-wider text-slate-300">LOADING DOCUMENT...</p>
                </div>
              ) : (
                <iframe
                  src={pdfBlobUrl ? `${pdfBlobUrl}#toolbar=1&view=FitH` : `${pdfUrl}#toolbar=1&view=FitH`}
                  className="w-full h-full border-0"
                  title={title}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

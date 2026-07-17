// import { motion, AnimatePresence } from "motion/react";
// import { createPortal } from "react-dom";
// import CvViewer from "./CvViewer";
// import { 
//   X, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Download, 
//   Eye, 
//   FileText, 
//   Printer, 
//   Briefcase, 
//   GraduationCap, 
//   Award, 
//   CheckCircle2, 
//   BookOpen, 
//   Lock, 
//   Unlock,
//   Loader,
//   ChevronLeft,
//   ChevronRight,
//   ZoomIn,
//   ZoomOut
// } from "lucide-react";
// import React, { useState, useEffect } from "react";

// const CV_PDF_URL = "/Pasindu_Weerathunga_CV.pdf";
// const CV_DOWNLOAD_NAME = "Pasindu_Weerathunga_CV.pdf";

// interface CvModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function CvModal({ isOpen, onClose }: CvModalProps) {
//   const [activeTab, setActiveTab] = useState<"preview" | "interactive">("preview");
//   const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [downloadSuccess, setDownloadSuccess] = useState(false);
//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const [downloadCount, setDownloadCount] = useState<number>(0);

//   useEffect(() => {
//     const saved = localStorage.getItem("pasindu_cv_download_count");
//     if (saved) {
//       setDownloadCount(parseInt(saved, 10) || 0);
//     }
//   }, []);

//   const incrementDownloadCount = () => {
//     setDownloadCount(prev => {
//       const next = prev + 1;
//       localStorage.setItem("pasindu_cv_download_count", next.toString());
//       return next;
//     });
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownloadPdf = async () => {
//     setIsDownloading(true);
//     setDownloadSuccess(false);

//     try {
//       const link = document.createElement("a");
//       link.href = CV_PDF_URL;
//       link.download = CV_DOWNLOAD_NAME;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       incrementDownloadCount();
//       setDownloadSuccess(true);
//       setTimeout(() => setDownloadSuccess(false), 3500);
//     } catch (err) {
//       console.error("PDF download failed:", err);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   // Restore cursor and styles upon modal unmount
//   useEffect(() => {
//     if (!isOpen) {
//       document.body.style.cursor = "";
//       document.body.style.pointerEvents = "";
//       // Explicitly restore custom cursor styling for the parent page
//       if (!window.matchMedia("(pointer: coarse)").matches) {
//         document.body.classList.add("custom-cursor-active");
//       }
//     }
//     return () => {
//       document.body.style.cursor = "";
//       document.body.style.pointerEvents = "";
//       // Explicitly restore custom cursor styling on unmount
//       if (!window.matchMedia("(pointer: coarse)").matches) {
//         document.body.classList.add("custom-cursor-active");
//       }
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Backdrop blur & overlay */}
//           <motion.div
//             className="fixed inset-0 bg-black/85 backdrop-blur-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Centered Scroll Wrapper */}
//           <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
//             {/* Modal Container */}
//             <motion.div
//               className="relative w-full max-w-5xl bg-[#090b11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col print:border-none print:shadow-none print:bg-white print:my-0"
//               initial={{ opacity: 0, scale: 0.95, y: 15 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 15 }}
//               transition={{ type: "spring", duration: 0.5 }}
//             >
//               {/* Header: Hide during browser print */}
//               <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0b0e16] sticky top-0 z-20 print:hidden">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-9 h-9 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center">
//                     <FileText className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Pasindu Weerathunga CV</h3>
//                     <div className="flex items-center gap-3 mt-1 flex-wrap">
//                       <p className="text-[10px] text-slate-400 font-mono">Verify and export the professional resume</p>
//                       <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 font-mono text-[9px] text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
//                         <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
//                         <span className="text-slate-500 font-semibold uppercase tracking-wider">SYS.DL_CTR:</span>
//                         <span className="font-bold tracking-widest">{String(downloadCount).padStart(4, '0')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setIsViewerOpen(true)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
//                     title="Fullscreen PDF Preview"
//                   >
//                     <Eye className="w-3.5 h-3.5" />
//                     <span>Fullscreen</span>
//                   </button>
//                   <button
//                     onClick={handlePrint}
//                     disabled={isPreviewEnabled}
//                     title={isPreviewEnabled ? "Toggle 'Preview' off to enable print" : "Print or Save as PDF"}
//                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
//                       isPreviewEnabled
//                         ? "bg-emerald-950/20 text-emerald-700/50 border border-emerald-950/30 cursor-not-allowed"
//                         : "bg-emerald-600 hover:bg-emerald-500"
//                     }`}
//                   >
//                     <Printer className="w-3.5 h-3.5" />
//                     <span>Print</span>
//                   </button>
//                   <button
//                     onClick={handleDownloadPdf}
//                     disabled={isDownloading}
//                     title="Download Resume PDF"
//                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
//                       downloadSuccess
//                         ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
//                         : isDownloading
//                           ? "bg-indigo-900/60 text-indigo-200"
//                           : "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                     }`}
//                   >
//                     {downloadSuccess ? (
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="flex items-center"
//                       >
//                         <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
//                       </motion.div>
//                     ) : isDownloading ? (
//                       <Loader className="w-3.5 h-3.5 animate-spin" />
//                     ) : (
//                       <Download className="w-3.5 h-3.5" />
//                     )}
//                     <span>
//                       {isPreviewEnabled
//                         ? "Download PDF"
//                         : downloadSuccess
//                           ? "Saved!"
//                           : isDownloading
//                             ? "Downloading..."
//                             : "Download PDF"
//                       }
//                     </span>
//                   </button>
//                   <button
//                     onClick={onClose}
//                     className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Selection Options Bar: Hide during browser print */}
//               <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/5 bg-[#07090d] py-3.5 px-6 gap-4 print:hidden">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setActiveTab("preview")}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
//                       activeTab === "preview"
//                         ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
//                         : "text-slate-400 hover:text-white hover:bg-white/5"
//                     }`}
//                   >
//                     <Eye className="w-4 h-4 text-indigo-400" />
//                     <span>PDF Inline Viewer</span>
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("interactive")}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
//                       activeTab === "interactive"
//                         ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
//                         : "text-slate-400 hover:text-white hover:bg-white/5"
//                     }`}
//                   >
//                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//                     <span>Interactive Tabs</span>
//                   </button>
//                 </div>

//                 {/* Preview Mode Toggle Switch */}
//                 <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-1.5 hover:bg-white/10 transition-colors">
//                   <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
//                     {isPreviewEnabled ? (
//                       <>
//                         <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
//                         <span className="text-amber-400">PREVIEW BLURRED</span>
//                       </>
//                     ) : (
//                       <>
//                         <Unlock className="w-3.5 h-3.5 text-emerald-400" />
//                         <span className="text-emerald-400">FULL VIEW UNLOCKED</span>
//                       </>
//                     )}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => setIsPreviewEnabled(!isPreviewEnabled)}
//                     className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
//                       isPreviewEnabled ? "bg-amber-600/30 border-amber-500/50" : "bg-emerald-600/30 border-emerald-500/50"
//                     }`}
//                     aria-label="Toggle CV Preview Blur"
//                   >
//                     <span
//                       className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
//                         isPreviewEnabled ? "translate-x-0" : "translate-x-5"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               </div>

//               {/* Modal Body / Scroll Content */}
//               <div className="flex-1 p-4 sm:p-8 bg-[#04060a] print:overflow-visible print:bg-white print:p-0 print:text-black relative flex flex-col items-center justify-center min-h-[500px]">
                
//                 {/* INLINE PDF VIEWPORT COMPONENT */}
//                 {activeTab === "preview" && (
//                   <div className="w-full flex flex-col items-center relative">
//                     <div className="w-full max-w-3xl flex flex-col items-center gap-4">
//                       <button
//                         onClick={handleDownloadPdf}
//                         disabled={isDownloading}
//                         className={`w-full group flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-500 border select-none disabled:cursor-not-allowed
//                           ${downloadSuccess 
//                             ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400/30 text-white shadow-[0_0_25px_rgba(16,185,129,0.35)]" 
//                             : isDownloading 
//                               ? "bg-indigo-950/80 border-indigo-500/20 text-slate-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
//                               : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white border-indigo-400/20 hover:border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] cursor-pointer"
//                           } mb-2 text-center sm:text-left`}
//                       >
//                         <div className="flex flex-col sm:flex-row items-center gap-4">
//                           <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-all duration-300
//                             ${downloadSuccess ? "bg-emerald-500/30" : isDownloading ? "bg-indigo-500/20" : "bg-white/10"}`}
//                           >
//                             {downloadSuccess ? (
//                               <motion.div
//                                 initial={{ scale: 0, rotate: -45 }}
//                                 animate={{ scale: 1, rotate: 0 }}
//                                 transition={{ type: "spring", stiffness: 200, damping: 10 }}
//                               >
//                                 <CheckCircle2 className="w-6 h-6 text-emerald-300" />
//                               </motion.div>
//                             ) : isDownloading ? (
//                               <Loader className="w-6 h-6 text-indigo-300 animate-spin" />
//                             ) : (
//                               <Download className="w-6 h-6 animate-bounce" />
//                             )}
//                           </div>
//                           <div className="text-left">
//                             <p className="font-extrabold text-white text-sm tracking-wide transition-all duration-300">
//                               {downloadSuccess 
//                                 ? "Download Successful!" 
//                                 : isDownloading 
//                                   ? "Preparing document..." 
//                                   : "Download Official 2-Page CV"
//                               }
//                             </p>
//                             <p className={`text-[10px] font-normal normal-case mt-1 font-mono transition-colors duration-300 ${downloadSuccess ? "text-emerald-200" : "text-indigo-200"}`}>
//                               {downloadSuccess 
//                                 ? "Saved as your original CV PDF" 
//                                 : "pasindu_weerathunga_CV.pdf • Original document"
//                               }
//                             </p>
//                           </div>
//                         </div>
//                         <div className={`flex h-9 px-4 items-center gap-1.5 rounded-xl text-[10px] font-mono tracking-wider border uppercase transition-all duration-300
//                           ${downloadSuccess 
//                             ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200" 
//                             : isDownloading 
//                               ? "bg-indigo-950/60 border-indigo-500/20 text-indigo-300" 
//                               : "bg-black/30 border-white/5"
//                           }`}
//                         >
//                           <span>{downloadSuccess ? "Saved!" : isDownloading ? "Preparing..." : "Save Document"}</span>
//                           <span className={`w-1.5 h-1.5 rounded-full 
//                             ${downloadSuccess 
//                               ? "bg-emerald-400 animate-ping" 
//                               : isDownloading 
//                                 ? "bg-amber-400 animate-ping" 
//                                 : "bg-emerald-400 animate-pulse"
//                             }`} 
//                           />
//                         </div>
//                       </button>

//                       <div className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 ${isPreviewEnabled ? "blur-md pointer-events-none" : ""}`}>
//                         <iframe
//                           src={CV_PDF_URL}
//                           title="Pasindu Weerathunga CV"
//                           className="w-full h-[70vh] min-h-[500px] border-0"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* INTERACTIVE TAB SYSTEM CONTAINER */}
//                 {activeTab === "interactive" && !window.matchMedia("print").matches && (
//                   <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 text-slate-300">
//                     {/* Left Column contacts summary */}
//                     <div className="md:col-span-4 space-y-6">
//                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
//                         <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest border-b border-white/5 pb-2">Direct Contact</h4>
//                         <div className="space-y-3.5 text-xs">
//                           <div className="flex items-center gap-3">
//                             <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
//                             <span className="truncate">psehan12@gmail.com</span>
//                           </div>
//                           <div className="flex items-center gap-3">
//                             <Phone className="w-4 h-4 text-[#10b981] shrink-0" />
//                             <span>0772415641</span>
//                           </div>
//                           <div className="flex items-start gap-3">
//                             <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
//                             <span className="leading-relaxed">Makuluduwa, Piliyandala</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
//                         <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Core Tech Stack</h4>
//                         <div className="flex flex-wrap gap-1.5">
//                           {["Java", "Python", "TypeScript", "React", "Spring Boot", "Flask", "Flutter", "MySQL", "MongoDB"].map((tech, idx) => (
//                             <span key={idx} className="text-[10px] font-mono font-bold bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 px-2 py-1 rounded-lg">
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right Column Detailed Section Cards */}
//                     <div className="md:col-span-8 space-y-6">
//                       {/* Experience Interactive Block */}
//                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
//                         <h4 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-indigo-400 font-mono flex items-center gap-2">
//                           <Briefcase className="w-4 h-4" />
//                           <span>Experience</span>
//                         </h4>
//                         <div className="space-y-6 text-xs">
//                           {/* Work Experience */}
//                           <div>
//                             <div className="flex justify-between items-start">
//                               <h5 className="font-bold text-slate-100 text-sm">IT Training / Trainee</h5>
//                               <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">10/2025 - 03/2026</span>
//                             </div>
//                             <p className="text-indigo-400 font-medium mt-1">HRDC Department, University of Vocational Technology (UoVT)</p>
//                             <ul className="list-disc pl-4 space-y-1.5 text-slate-400 mt-3 leading-relaxed">
//                               <li>Developed & launched their official responsive online presence/website.</li>
//                               <li>Managed system databases, document portals, and network support.</li>
//                               <li>Assisted with digital portal operations and online examinations administration.</li>
//                             </ul>
//                           </div>

//                           {/* Organization Experience */}
//                           <div className="border-t border-white/5 pt-4">
//                             <div className="flex justify-between items-start">
//                               <h5 className="font-bold text-slate-100 text-sm">Founding Core Member</h5>
//                               <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">2024 - Present</span>
//                             </div>
//                             <p className="text-cyan-400 font-medium mt-1">Back Birds Group</p>
//                             <ul className="list-disc pl-4 space-y-1.5 text-slate-400 mt-3 leading-relaxed">
//                               <li>Active founding member in the Back Birds Group community organization.</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Education Interactive Block */}
//                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
//                         <h4 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-emerald-400 font-mono flex items-center gap-2">
//                           <GraduationCap className="w-4 h-4" />
//                           <span>Education</span>
//                         </h4>
//                         <div className="space-y-4 text-xs">
//                           <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
//                             <p className="font-bold text-slate-100">BSc (Hons) in Software Engineering – Undergraduate</p>
//                             <p className="text-slate-400">ESOFT Metro Campus (Affiliated with London Metropolitan University)</p>
//                             <p className="text-[10px] text-slate-500 font-mono">02/2025 – 01/2026 | Sri Lanka</p>
//                           </div>
//                           <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
//                             <p className="font-bold text-slate-100">Higher National Diploma in Software Engineering</p>
//                             <p className="text-slate-400">National Institute of Business Management (NIBM)</p>
//                           </div>
//                           <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
//                             <p className="font-bold text-slate-100">Diploma in Software Engineering</p>
//                             <p className="text-slate-400">National Institute of Business Management (NIBM)</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Certifications Interactive Block */}
//                       <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
//                         <h4 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-cyan-400 font-mono flex items-center gap-2">
//                           <Award className="w-4 h-4" />
//                           <span>Certifications</span>
//                         </h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
//                           <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
//                             <p className="font-bold text-slate-200">Flutter for Beginners</p>
//                             <p className="text-[10px] text-slate-500 font-mono mt-0.5">ZERO2LEARN • ID: 679f8cf8</p>
//                           </div>
//                           <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
//                             <p className="font-bold text-slate-200">Introduction to Cybersecurity</p>
//                             <p className="text-[10px] text-slate-500 font-mono mt-0.5">Cisco Networking Academy</p>
//                           </div>
//                           <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
//                             <p className="font-bold text-slate-200">Python Programming</p>
//                             <p className="text-[10px] text-slate-500 font-mono mt-0.5">Moratuwa University (UOM)</p>
//                           </div>
//                           <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
//                             <p className="font-bold text-slate-200">API Testing with Postman</p>
//                             <p className="text-[10px] text-slate-500 font-mono mt-0.5">Learnfi Learning</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//       </AnimatePresence>
//       <CvViewer
//         isOpen={isViewerOpen}
//         onClose={() => setIsViewerOpen(false)}
//         onDownloadIncrement={incrementDownloadCount}
//         pdfBlobUrl={null}
//         pdfFetchStatus="success"
//       />
//       {isOpen && createPortal(
//         <div id="printable-cv-document" className="hidden print:block w-full bg-white text-slate-800">
//           {/* PAGE 1 */}
//           <div className="w-[8.5in] h-[11in] flex overflow-hidden relative bg-white text-slate-800" style={{ pageBreakAfter: "always" }}>
//             {/* Left Column (Green) */}
//             <div className="w-[35%] bg-[#314336] text-white p-9 px-5 flex flex-col gap-5 h-full box-border">
//               {/* Header Name */}
//               <div className="mb-2.5">
//                 <h1 className="text-[24pt] font-extrabold leading-tight m-0 tracking-tight text-white">Pasindu</h1>
//                 <h1 className="text-[24pt] font-extrabold leading-tight m-0 tracking-tight text-white">Weerathunga</h1>
//               </div>

//               {/* Contacts Info */}
//               <div className="flex flex-col gap-2 text-[8.5pt]">
//                 <div className="flex items-center gap-2">
//                   <span>📧</span>
//                   <span className="break-all text-white">psehan12@gmail.com</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>📞</span>
//                   <span className="text-white">0772415641</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <span>📍</span>
//                   <span className="text-white">No.116/2, Abeyrathna Mawatha, Makuluduwa, Piliyandala</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>🔗</span>
//                   <span className="text-white">github.com/PasinduSehan</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span>🔗</span>
//                   <span className="text-white">linkedin.com/in/pasinduSehan</span>
//                 </div>
//               </div>

//               {/* Profile Section */}
//               <div className="mt-2.5">
//                 <h3 className="text-[11pt] font-bold border-b border-white/20 pb-1 mb-2.5 uppercase tracking-wider text-white">Profile</h3>
//                 <p className="text-[8.5pt] leading-relaxed font-light m-0 text-slate-200 text-justify">
//                   Aspiring Software Engineer currently pursuing a degree in Software Engineering, with a strong passion for full-stack development, problem-solving, and emerging technologies. Skilled in building real-world applications using Java, Python, MySQL, Flask, and modern front-end tools. Seeking an internship opportunity to contribute meaningfully while continuing to grow and gain hands-on experience in the software development industry.
//                 </p>
//               </div>

//               {/* Work Experience */}
//               <div className="mt-2.5">
//                 <h3 className="text-[11pt] font-bold border-b border-white/20 pb-1 mb-2.5 uppercase tracking-wider text-white">Work Experience</h3>
//                 <div className="flex flex-col gap-2.5">
//                   <div>
//                     <h4 className="text-[9.5pt] font-bold m-0 mb-0.5 text-white">IT Training, HRDC Department</h4>
//                     <p className="text-[7.5pt] text-slate-300 italic m-0 mb-1">University of Vocational Technology – UoVT</p>
//                     <p className="text-[7.5pt] font-mono text-slate-300 m-0 mb-1.5">10/2025 – 03/2026</p>
//                     <ul className="m-0 pl-3.5 text-[8pt] leading-tight text-slate-300 flex flex-col gap-1 list-disc">
//                       <li>Developed and implemented the website for the HRDC Department.</li>
//                       <li>Assisted with document handling and digital record management.</li>
//                       <li>Supported online examination processes including exam setup and student assistance.</li>
//                       <li>Provided IT support to staff and students during daily operations.</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column (White) */}
//             <div className="w-[65%] p-9 px-7 flex flex-col gap-4.5 h-full overflow-hidden bg-white box-border text-[#1e293b]">
//               {/* Education */}
//               <div>
//                 <h3 className="text-[12pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-1 mb-2.5 uppercase tracking-wider">Education</h3>
//                 <div className="flex flex-col gap-2.5">
//                   <div>
//                     <div className="flex justify-between items-start">
//                       <h4 className="text-[9.5pt] font-bold text-[#1e293b] m-0">BSc (Hons) in Software Engineering – Undergraduate</h4>
//                       <span className="text-[7.5pt] font-mono text-[#64748b] font-semibold shrink-0">02/2025 – 01/2026</span>
//                     </div>
//                     <p className="text-[8.5pt] text-[#475569] font-semibold m-0 mt-0.5">ESOFT Metro Campus <span className="font-normal italic">(Matara, Sri Lanka)</span></p>
//                   </div>
//                   <div className="mt-2">
//                     <h4 className="text-[9.5pt] font-bold text-[#1e293b] m-0">Higher National Diploma in Software Engineering</h4>
//                     <p className="text-[8.5pt] text-[#475569] m-0 mt-0.5">National Institute of Business Management (NIBM - Sri Lanka)</p>
//                   </div>
//                   <div className="mt-2">
//                     <h4 className="text-[9.5pt] font-bold text-[#1e293b] m-0">Diploma in Software Engineering</h4>
//                     <p className="text-[8.5pt] text-[#475569] m-0 mt-0.5">National Institute of Business Management (NIBM - Sri Lanka)</p>
//                   </div>
//                   <div className="mt-2">
//                     <div className="flex justify-between">
//                       <h4 className="text-[9.5pt] font-bold text-[#1e293b] m-0">G.C.E. Advanced Level (2020) – Technology Stream</h4>
//                       <span className="text-[7.5pt] font-mono text-[#64748b]">Rahula College, Matara</span>
//                     </div>
//                   </div>
//                   <div className="mt-2">
//                     <div className="flex justify-between">
//                       <h4 className="text-[9.5pt] font-bold text-[#1e293b] m-0">G.C.E. Ordinary Level (2017)</h4>
//                       <span className="text-[7.5pt] font-mono text-[#64748b]">Thelijjawila Central College</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Projects Section */}
//               <div>
//                 <h3 className="text-[12pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-1 mb-2.5 uppercase tracking-wider">Projects</h3>
//                 <div className="flex flex-col gap-2">
//                   <div>
//                     <h4 className="text-[9pt] font-bold text-[#1e293b] m-0 mb-0.5">Blood Donation Mobile App – Android, Firebase</h4>
//                     <p className="text-[8pt] text-[#475569] leading-normal m-0">
//                       Developed a mobile app to match donors and recipients. Features include user login, appointment booking, and notification alerts. <span className="font-semibold">Tech Stack:</span> Java, Firebase, XML
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-[9pt] font-bold text-[#1e293b] m-0 mb-0.5">Chatbot Web Application – Flask, NLP</h4>
//                     <p className="text-[8pt] text-[#475569] leading-normal m-0">
//                       Mental health chatbot using Wikipedia/NLP + local JSON data. <span className="font-semibold">Tech Stack:</span> Python, Flask, HTML/CSS/JS, NLTK
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-[9pt] font-bold text-[#1e293b] m-0 mb-0.5">Bank Transaction Web App – Spring Boot</h4>
//                     <p className="text-[8pt] text-[#475569] leading-normal m-0">
//                       Built a CRUD app to manage financial transactions. Supports add/edit/delete/view records. <span className="font-semibold">Tech Stack:</span> Java, Spring Boot, MySQL
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-[9pt] font-bold text-[#1e293b] m-0 mb-0.5">Hotel Management System</h4>
//                     <p className="text-[8pt] text-[#475569] leading-normal m-0">
//                       Room booking, customer profiles, payment handling. <span className="font-semibold">Tech Stack:</span> Java, MySQL, JavaFX
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* PAGE 2 */}
//           <div className="w-[8.5in] h-[11in] flex overflow-hidden relative bg-white text-slate-800">
//             {/* Left Column (Green) */}
//             <div className="w-[35%] bg-[#314336] text-white p-9 px-5 flex flex-col gap-5 h-full box-border">
//               {/* Technical Skills */}
//               <div>
//                 <h3 className="text-[11pt] font-bold border-b border-white/20 pb-1 mb-2.5 uppercase tracking-wider text-white">Technical Skills</h3>
//                 <div className="flex flex-col gap-2.5 text-[8pt] text-slate-200">
//                   <div>
//                     <strong className="text-white font-semibold">Languages:</strong><br/>
//                     Java, Python, JavaScript, TypeScript, C, C++, C#, PHP
//                   </div>
//                   <div>
//                     <strong className="text-white font-semibold">Frameworks/Libraries:</strong><br/>
//                     Spring Boot, Flask, React.js, React Native, Flutter, Node.js
//                   </div>
//                   <div>
//                     <strong className="text-white font-semibold">Databases:</strong><br/>
//                     MySQL, MongoDB, Oracle, SQL Server
//                   </div>
//                   <div>
//                     <strong className="text-white font-semibold">Web Technologies:</strong><br/>
//                     HTML, CSS, JavaScript, PHP
//                   </div>
//                   <div>
//                     <strong className="text-white font-semibold">Mobile:</strong><br/>
//                     Android Studio (Java), Flutter
//                   </div>
//                   <div>
//                     <strong className="text-white font-semibold">Tools:</strong><br/>
//                     Git, GitHub, VS Code, Postman, Code Blocks
//                   </div>
//                   <div>
//                     <strong className="text-white font-semibold">Methodologies:</strong><br/>
//                     Agile, Scrum, SDLC
//                   </div>
//                 </div>
//               </div>

//               {/* Extra Curricular */}
//               <div>
//                 <h3 className="text-[11pt] font-bold border-b border-white/20 pb-1 mb-2.5 uppercase tracking-wider text-white">Extra Curricular</h3>
//                 <ul className="m-0 pl-3.5 text-[8pt] leading-relaxed text-slate-200 flex flex-col gap-1.5 list-disc">
//                   <li>School Scout - Thelijjawila Central College</li>
//                   <li>Organized a farewell ceremony for a lecturer - NIBM 2022</li>
//                 </ul>
//               </div>

//               {/* Soft Skills */}
//               <div>
//                 <h3 className="text-[11pt] font-bold border-b border-white/20 pb-1 mb-2.5 uppercase tracking-wider text-white">Soft Skills</h3>
//                 <ul className="m-0 pl-3.5 text-[8pt] leading-relaxed text-slate-200 flex flex-col gap-1 list-disc">
//                   <li>Creativity</li>
//                   <li>Teamwork</li>
//                   <li>Time Management</li>
//                   <li>Leadership</li>
//                   <li>Effective Communication</li>
//                   <li>Critical Thinking</li>
//                   <li>Analytical skills</li>
//                 </ul>
//               </div>

//               {/* Languages */}
//               <div>
//                 <h3 className="text-[11pt] font-bold border-b border-white/20 pb-1 mb-2.5 uppercase tracking-wider text-white">Languages</h3>
//                 <div className="text-[8pt] text-slate-200 flex flex-col gap-1">
//                   <div>Sinhala - Native</div>
//                   <div>English - Fluent</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column (White) */}
//             <div className="w-[65%] p-9 px-7 flex flex-col gap-4 h-full overflow-hidden bg-white box-border text-[#1e293b]">
//               {/* More Projects */}
//               <div>
//                 <h3 className="text-[12pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-1 mb-2 uppercase tracking-wider">Projects (Cont.)</h3>
//                 <div className="flex flex-col gap-2">
//                   <div>
//                     <h4 className="text-[9pt] font-bold text-[#1e293b] m-0 mb-0.5">AI Medical Assistant System</h4>
//                     <p className="text-[8pt] text-[#475569] leading-normal m-0">
//                       Developed an AI-powered healthcare assistant system to simplify medical reports and prescriptions for patients. <span className="font-semibold">Tech Stack:</span> Python, Flask, OCR, NLP, HTML, CSS, JavaScript
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-[9pt] font-bold text-[#1e293b] m-0 mb-0.5">Tea Birds Premium E-Commerce Website</h4>
//                     <p className="text-[8pt] text-[#475569] leading-normal m-0">
//                       Designed and developed a modern luxury tea-selling e-commerce platform with responsive UI/UX. <span className="font-semibold">Tech Stack:</span> React.js, JavaScript, HTML, CSS, Node.js
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Certificates */}
//               <div>
//                 <h3 className="text-[12pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-1 mb-2 uppercase tracking-wider">Certificates</h3>
//                 <div className="flex flex-col gap-1.5 text-[8pt] text-[#475569]">
//                   <div>
//                     <strong className="text-[#1e293b]">Flutter for Beginners</strong> - ZERO2LEARN, 2024
//                   </div>
//                   <div>
//                     <strong className="text-[#1e293b]">Diploma in Spoken English</strong> - British Way English Academy
//                   </div>
//                   <div>
//                     <strong className="text-[#1e293b]">Introduction to Cybersecurity</strong> - Cisco Networking Academy, Dec 2023
//                   </div>
//                   <div>
//                     <strong className="text-[#1e293b]">Python Programming</strong> - Moratuwa University (UOM)
//                   </div>
//                   <div>
//                     <strong className="text-[#1e293b]">API Testing with Postman</strong> - Learnfi Learning
//                   </div>
//                 </div>
//               </div>

//               {/* References */}
//               <div>
//                 <h3 className="text-[12pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-1 mb-2 uppercase tracking-wider">References</h3>
//                 <div className="flex gap-6 text-[8pt] text-[#475569]">
//                   <div className="flex-1">
//                     <strong className="text-[#1e293b] text-[8.5pt]">Mrs. Chami Muthugamage</strong><br/>
//                     <span className="italic">Consultant/Lecturer (IT), NIBM</span><br/>
//                     📞 +94 772 222 608
//                   </div>
//                   <div className="flex-1">
//                     <strong className="text-[#1e293b] text-[8.5pt]">Mrs. Nadeeshani N. Gunasekara</strong><br/>
//                     <span className="italic">Consultant/Lecturer (IT), NIBM</span><br/>
//                     📞 +94 710 438 916
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>,
//         document.body
//       )}
//     </>
//   );
// }


// CvModal.tsx
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import CvViewer from "./CvViewer";
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Eye, 
  FileText, 
  Printer, 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Lock, 
  Unlock,
  Loader,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import React, { useState, useEffect } from "react";

const CV_PDF_URL = "/Pasindu_Weerathunga_CV.pdf";
const CV_DOWNLOAD_NAME = "Pasindu_Weerathunga_CV.pdf";
const TRANSCRIPT_PDF_URL = "/Transcript (TW Pasindu Sehan).pdf";
const TRANSCRIPT_DOWNLOAD_NAME = "Transcript (TW Pasindu Sehan).pdf";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "interactive">("preview");
  const [activeDocument, setActiveDocument] = useState<"cv" | "transcript">("cv");
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("pasindu_cv_download_count");
    if (saved) {
      setDownloadCount(parseInt(saved, 10) || 0);
    }
  }, []);

  const incrementDownloadCount = () => {
    setDownloadCount(prev => {
      const next = prev + 1;
      localStorage.setItem("pasindu_cv_download_count", next.toString());
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCv = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const link = document.createElement("a");
      link.href = CV_PDF_URL;
      link.download = CV_DOWNLOAD_NAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      incrementDownloadCount();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error("CV download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadTranscript = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const link = document.createElement("a");
      link.href = TRANSCRIPT_PDF_URL;
      link.download = TRANSCRIPT_DOWNLOAD_NAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      incrementDownloadCount();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error("Transcript download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const openViewerForDocument = (documentType: "cv" | "transcript") => {
    setActiveDocument(documentType);
    setActiveTab("preview");
    setIsViewerOpen(true);
  };

  const currentPdfUrl = activeDocument === "cv" ? CV_PDF_URL : TRANSCRIPT_PDF_URL;

  useEffect(() => {
    if (!isOpen) {
      document.body.style.cursor = "";
      document.body.style.pointerEvents = "";
      if (!window.matchMedia("(pointer: coarse)").matches) {
        document.body.classList.add("custom-cursor-active");
      }
    }
    return () => {
      document.body.style.cursor = "";
      document.body.style.pointerEvents = "";
      if (!window.matchMedia("(pointer: coarse)").matches) {
        document.body.classList.add("custom-cursor-active");
      }
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <motion.div
              className="relative w-full max-w-5xl bg-[#090b11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col print:border-none print:shadow-none print:bg-white print:my-0"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0b0e16] sticky top-0 z-20 print:hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Pasindu Weerathunga CV</h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <p className="text-[10px] text-slate-400 font-mono">Verify and export the professional resume</p>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 font-mono text-[9px] text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-500 font-semibold uppercase tracking-wider">SYS.DL_CTR:</span>
                        <span className="font-bold tracking-widest">{String(downloadCount).padStart(4, '0')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openViewerForDocument("cv")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                    title="View CV"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View CV</span>
                  </button>
                  <button
                    onClick={() => openViewerForDocument("transcript")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                    title="View Transcript"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Transcript</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    disabled={isPreviewEnabled}
                    title={isPreviewEnabled ? "Toggle 'Preview' off to enable print" : "Print or Save as PDF"}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                      isPreviewEnabled
                        ? "bg-emerald-950/20 text-emerald-700/50 border border-emerald-950/30 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-500"
                    }`}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={handleDownloadCv}
                    disabled={isDownloading}
                    title="Download CV PDF"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      downloadSuccess
                        ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : isDownloading
                          ? "bg-indigo-900/60 text-indigo-200"
                          : "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    }`}
                  >
                    {downloadSuccess ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      </motion.div>
                    ) : isDownloading ? (
                      <Loader className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {downloadSuccess
                        ? "Saved!"
                        : isDownloading
                          ? "Downloading..."
                          : "Download CV"
                      }
                    </span>
                  </button>
                  <button
                    onClick={handleDownloadTranscript}
                    disabled={isDownloading}
                    title="Download Transcript PDF"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      downloadSuccess
                        ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : isDownloading
                          ? "bg-indigo-900/60 text-indigo-200"
                          : "bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Transcript</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tab Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/5 bg-[#07090d] py-3.5 px-6 gap-4 print:hidden">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Eye className="w-4 h-4 text-indigo-400" />
                    <span>PDF Inline Viewer</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("interactive")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === "interactive"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Interactive Tabs</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-1.5 hover:bg-white/10 transition-colors">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
                    {isPreviewEnabled ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span className="text-amber-400">PREVIEW BLURRED</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">FULL VIEW UNLOCKED</span>
                      </>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPreviewEnabled(!isPreviewEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isPreviewEnabled ? "bg-amber-600/30 border-amber-500/50" : "bg-emerald-600/30 border-emerald-500/50"
                    }`}
                    aria-label="Toggle CV Preview Blur"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isPreviewEnabled ? "translate-x-0" : "translate-x-5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-4 sm:p-8 bg-[#04060a] print:overflow-visible print:bg-white print:p-0 print:text-black relative flex flex-col items-center justify-center min-h-[500px]">
                
                {/* PDF Preview Tab */}
                {activeTab === "preview" && (
                  <div className="w-full flex flex-col items-center relative">
                    <div className="w-full max-w-3xl flex flex-col items-center gap-4">
                      <button
                        onClick={activeDocument === "cv" ? handleDownloadCv : handleDownloadTranscript}
                        disabled={isDownloading}
                        className={`w-full group flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-500 border select-none disabled:cursor-not-allowed
                          ${downloadSuccess 
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400/30 text-white shadow-[0_0_25px_rgba(16,185,129,0.35)]" 
                            : isDownloading 
                              ? "bg-indigo-950/80 border-indigo-500/20 text-slate-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                              : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white border-indigo-400/20 hover:border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] cursor-pointer"
                          } mb-2 text-center sm:text-left`}
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-all duration-300
                            ${downloadSuccess ? "bg-emerald-500/30" : isDownloading ? "bg-indigo-500/20" : "bg-white/10"}`}
                          >
                            {downloadSuccess ? (
                              <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                              >
                                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                              </motion.div>
                            ) : isDownloading ? (
                              <Loader className="w-6 h-6 text-indigo-300 animate-spin" />
                            ) : (
                              <Download className="w-6 h-6 animate-bounce" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="font-extrabold text-white text-sm tracking-wide transition-all duration-300">
                              {downloadSuccess 
                                ? "Download Successful!" 
                                : isDownloading 
                                  ? "Preparing document..." 
                                  : activeDocument === "cv"
                                    ? "Download Official 2-Page CV"
                                    : "Download Transcript"
                              }
                            </p>
                            <p className={`text-[10px] font-normal normal-case mt-1 font-mono transition-colors duration-300 ${downloadSuccess ? "text-emerald-200" : "text-indigo-200"}`}>
                              {downloadSuccess 
                                ? activeDocument === "cv"
                                  ? "Saved as your original CV PDF"
                                  : "Saved as your transcript PDF"
                                : activeDocument === "cv"
                                  ? "pasindu_weerathunga_CV.pdf • Original document"
                                  : "Transcript (TW Pasindu Sehan).pdf • Original document"
                              }
                            </p>
                          </div>
                        </div>
                        <div className={`flex h-9 px-4 items-center gap-1.5 rounded-xl text-[10px] font-mono tracking-wider border uppercase transition-all duration-300
                          ${downloadSuccess 
                            ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200" 
                            : isDownloading 
                              ? "bg-indigo-950/60 border-indigo-500/20 text-indigo-300" 
                              : "bg-black/30 border-white/5"
                          }`}
                        >
                          <span>{downloadSuccess ? "Saved!" : isDownloading ? "Preparing..." : "Save Document"}</span>
                          <span className={`w-1.5 h-1.5 rounded-full 
                            ${downloadSuccess 
                              ? "bg-emerald-400 animate-ping" 
                              : isDownloading 
                                ? "bg-amber-400 animate-ping" 
                                : "bg-emerald-400 animate-pulse"
                            }`} 
                          />
                        </div>
                      </button>

                      <div className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 ${isPreviewEnabled ? "blur-md pointer-events-none" : ""}`}>
                        <iframe
                          src={currentPdfUrl}
                          title={activeDocument === "cv" ? "Pasindu Weerathunga CV" : "Pasindu Weerathunga Transcript"}
                          className="w-full h-[70vh] min-h-[500px] border-0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Tab */}
                {activeTab === "interactive" && !window.matchMedia("print").matches && (
                  <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 text-slate-300">
                    <div className="md:col-span-4 space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest border-b border-white/5 pb-2">Direct Contact</h4>
                        <div className="space-y-3.5 text-xs">
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span className="truncate">psehan12@gmail.com</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#10b981] shrink-0" />
                            <span>0772415641</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">No.116/2, Abeyrathna Mawatha, Makuluduwa, Piliyandala</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Core Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {["Java", "Python", "TypeScript", "React", "Spring Boot", "Flask", "Flutter", "MySQL", "MongoDB"].map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-mono font-bold bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 px-2 py-1 rounded-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-indigo-400 font-mono flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>Experience</span>
                        </h4>
                        <div className="space-y-6 text-xs">
                          <div>
                            <div className="flex justify-between items-start">
                              <h5 className="font-bold text-slate-100 text-sm">IT Training, HRDC Department</h5>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">10/2025 - 03/2026</span>
                            </div>
                            <p className="text-indigo-400 font-medium mt-1">University of Vocational Technology (UoVT)</p>
                            <ul className="list-disc pl-4 space-y-1.5 text-slate-400 mt-3 leading-relaxed">
                              <li>Developed and implemented the website for the HRDC Department.</li>
                              <li>Assisted with document handling and digital record management.</li>
                              <li>Supported online examination processes including exam setup and student assistance.</li>
                              <li>Provided IT support to staff and students during daily operations.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-emerald-400 font-mono flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>Education</span>
                        </h4>
                        <div className="space-y-4 text-xs">
                          <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
                            <p className="font-bold text-slate-100">BSc (Hons) in Software Engineering – Undergraduate</p>
                            <p className="text-slate-400">ESOFT Metro Campus</p>
                            <p className="text-[10px] text-slate-500 font-mono">02/2025 – 01/2026 | Matara, Sri Lanka</p>
                          </div>
                          <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
                            <p className="font-bold text-slate-100">Higher National Diploma in Software Engineering</p>
                            <p className="text-slate-400">National Institute of Business Management (NIBM - Sri Lanka)</p>
                          </div>
                          <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
                            <p className="font-bold text-slate-100">Diploma in Software Engineering</p>
                            <p className="text-slate-400">National Institute of Business Management (NIBM - Sri Lanka)</p>
                          </div>
                          <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
                            <p className="font-bold text-slate-100">G.C.E. Advanced Level (2020) - Technology Stream</p>
                            <p className="text-slate-400">Rahula College, Matara</p>
                          </div>
                          <div className="border-l-2 border-emerald-500/20 pl-4 space-y-1">
                            <p className="font-bold text-slate-100">G.C.E. Ordinary Level (2017)</p>
                            <p className="text-slate-400">Thelijjawila Central College</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-cyan-400 font-mono flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>Certifications</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
                          <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                            <p className="font-bold text-slate-200">Flutter for Beginners</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">ZERO2LEARN • ID: 679f8cf8</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                            <p className="font-bold text-slate-200">Introduction to Cybersecurity</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Cisco Networking Academy</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                            <p className="font-bold text-slate-200">Python Programming</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Moratuwa University (UOM)</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                            <p className="font-bold text-slate-200">API Testing with Postman</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Learnfi Learning</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        </div>
      )}
      </AnimatePresence>

      {/* Printable Version - Updated to match your CV */}
      {isOpen && createPortal(
        <div id="printable-cv-document" className="hidden print:block w-full bg-white text-slate-800">
          {/* PAGE 1 */}
          <div className="w-[8.5in] h-[11in] flex overflow-hidden relative bg-white text-slate-800" style={{ pageBreakAfter: "always" }}>
            {/* Left Column (Green) */}
            <div className="w-[35%] bg-[#314336] text-white p-9 px-5 flex flex-col gap-3.5 h-full box-border">
              {/* Header Name */}
              <div className="mb-1.5">
                <h1 className="text-[24pt] font-extrabold leading-tight m-0 tracking-tight text-white">Pasindu</h1>
                <h1 className="text-[24pt] font-extrabold leading-tight m-0 tracking-tight text-white">Weerathunga</h1>
              </div>

              {/* Contacts Info */}
              <div className="flex flex-col gap-1.5 text-[7.5pt]">
                <div className="flex items-start gap-2">
                  <span className="text-[8pt]">📧</span>
                  <span className="break-all text-white">psehan12@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8pt]">📞</span>
                  <span className="text-white">0772415641</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[8pt]">📍</span>
                  <span className="text-white leading-tight">No.116/2, Abeyrathna Mawatha, Makuluduwa, Piliyandala</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8pt]">🔗</span>
                  <span className="text-white">github.com/PasinduSehan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8pt]">🔗</span>
                  <span className="text-white">linkedin.com/in/pasinduSehan</span>
                </div>
              </div>

              {/* Profile Section */}
              <div className="mt-1.5">
                <h3 className="text-[10pt] font-bold border-b border-white/20 pb-0.5 mb-1.5 uppercase tracking-wider text-white">Profile</h3>
                <p className="text-[7.5pt] leading-relaxed font-light m-0 text-slate-200 text-justify">
                  Aspiring Software Engineer currently pursuing a degree in Software Engineering, with a strong passion for full-stack development, problem-solving, and emerging technologies. Skilled in building real-world applications using Java, Python, MySQL, Flask, and modern front-end tools. Seeking an internship opportunity to contribute meaningfully while continuing to grow and gain hands-on experience in the software development industry.
                </p>
              </div>

              {/* Work Experience */}
              <div className="mt-1.5">
                <h3 className="text-[10pt] font-bold border-b border-white/20 pb-0.5 mb-1.5 uppercase tracking-wider text-white">Work Experience</h3>
                <div className="flex flex-col gap-2">
                  <div>
                    <h4 className="text-[8.5pt] font-bold m-0 mb-0.5 text-white">IT Training, HRDC Department</h4>
                    <p className="text-[6.5pt] text-slate-300 italic m-0 mb-0.5">University of Vocational Technology - UoVT</p>
                    <p className="text-[6.5pt] font-mono text-slate-300 m-0 mb-1">10/2025 - 03/2026</p>
                    <ul className="m-0 pl-3.5 text-[7pt] leading-tight text-slate-300 flex flex-col gap-0.5 list-disc">
                      <li>Developed and implemented the website for the HRDC Department.</li>
                      <li>Assisted with document handling and digital record management.</li>
                      <li>Supported online examination processes including exam setup and student assistance.</li>
                      <li>Provided IT support to staff and students during daily operations.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (White) */}
            <div className="w-[65%] p-9 px-7 flex flex-col gap-3 h-full overflow-hidden bg-white box-border text-[#1e293b]">
              {/* Education */}
              <div>
                <h3 className="text-[11pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-0.5 mb-2 uppercase tracking-wider">Education</h3>
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-[8.5pt] font-bold text-[#1e293b] m-0">BSc (Hons) in Software Engineering - Undergraduate</h4>
                      <span className="text-[6.5pt] font-mono text-[#64748b] font-semibold shrink-0">02/2025 - 01/2026</span>
                    </div>
                    <p className="text-[7.5pt] text-[#475569] font-semibold m-0 mt-0.5">ESOFT Metro Campus <span className="font-normal italic">(Matara, Sri Lanka)</span></p>
                  </div>
                  <div>
                    <h4 className="text-[8.5pt] font-bold text-[#1e293b] m-0">Higher National Diploma in Software Engineering</h4>
                    <p className="text-[7.5pt] text-[#475569] m-0 mt-0.5">National Institute of Business Management (NIBM - Sri Lanka)</p>
                  </div>
                  <div>
                    <h4 className="text-[8.5pt] font-bold text-[#1e293b] m-0">Diploma in Software Engineering</h4>
                    <p className="text-[7.5pt] text-[#475569] m-0 mt-0.5">National Institute of Business Management (NIBM - Sri Lanka)</p>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-[8.5pt] font-bold text-[#1e293b] m-0">G.C.E. Advanced Level (2020) - Technology Stream</h4>
                      <span className="text-[6.5pt] font-mono text-[#64748b]">Rahula College, Matara</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-[8.5pt] font-bold text-[#1e293b] m-0">G.C.E. Ordinary Level (2017)</h4>
                      <span className="text-[6.5pt] font-mono text-[#64748b]">Thelijjawila Central College</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <h3 className="text-[11pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-0.5 mb-2 uppercase tracking-wider">Projects</h3>
                <div className="flex flex-col gap-1.5">
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Blood Donation Mobile App - Android, Firebase</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Developed a mobile app to match donors and recipients. Features include user login, appointment booking, and notification alerts. <span className="font-semibold">Tech Stack:</span> Java, Firebase, XML
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Chatbot Web Application - Flask, NLP</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Mental health chatbot using Wikipedia/NLP + local JSON data. <span className="font-semibold">Tech Stack:</span> Python, Flask, HTML/CSS/JS, NLTK
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Bank Transaction Web App - Spring Boot</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Built a CRUD app to manage financial transactions. Supports add/edit/delete/view records. <span className="font-semibold">Tech Stack:</span> Java, Spring Boot, MySQL
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Hotel Management System</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Room booking, customer profiles, payment handling. <span className="font-semibold">Tech Stack:</span> Java, MySQL, JavaFX
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Yoga Management System</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      CRUD operations for yoga sessions, instructors, payments. <span className="font-semibold">Tech Stack:</span> C#, SQL Server
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Food Delivery App UI & Backend - Flutter, Firebase</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Designed a modern food delivery app with Firebase authentication and Firestore integration for real-time data handling. <span className="font-semibold">Tech Stack:</span> Flutter, Dart, Firebase, Firestore
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">University Website UI - HTML, CSS</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Developed a responsive website template to showcase university courses, testimonials, and facilities. <span className="font-semibold">Tech Stack:</span> HTML, CSS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="w-[8.5in] h-[11in] flex overflow-hidden relative bg-white text-slate-800">
            {/* Left Column (Green) */}
            <div className="w-[35%] bg-[#314336] text-white p-9 px-5 flex flex-col gap-3.5 h-full box-border">
              {/* Technical Skills */}
              <div>
                <h3 className="text-[10pt] font-bold border-b border-white/20 pb-0.5 mb-1.5 uppercase tracking-wider text-white">Technical Skills</h3>
                <div className="flex flex-col gap-2 text-[7.5pt] text-slate-200">
                  <div>
                    <strong className="text-white font-semibold">Languages:</strong><br/>
                    Java, Python, JavaScript, TypeScript, C, C++, C#, PHP
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Frameworks/Libraries:</strong><br/>
                    Spring Boot, Flask, React.js, React Native, Flutter, Node.js
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Databases:</strong><br/>
                    MySQL, MongoDB, Firebase, Oracle, SQL Server
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Web Technologies:</strong><br/>
                    HTML, CSS, JavaScript, PHP
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Mobile:</strong><br/>
                    Android Studio (Java), Flutter
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Tools:</strong><br/>
                    Git, GitHub, VS Code, Postman, Android Studio, Code Blocks
                  </div>
                  <div>
                    <strong className="text-white font-semibold">Methodologies:</strong><br/>
                    Agile, Scrum, SDLC
                  </div>
                </div>
              </div>

              {/* Extra Curricular */}
              <div>
                <h3 className="text-[10pt] font-bold border-b border-white/20 pb-0.5 mb-1.5 uppercase tracking-wider text-white">Extra Curricular</h3>
                <ul className="m-0 pl-3.5 text-[7.5pt] leading-relaxed text-slate-200 flex flex-col gap-1 list-disc">
                  <li>School Scout - Thelijjawila Central College</li>
                  <li>Organized a farewell ceremony for a lecturer - NIBM 2022</li>
                </ul>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-[10pt] font-bold border-b border-white/20 pb-0.5 mb-1.5 uppercase tracking-wider text-white">Soft Skills</h3>
                <ul className="m-0 pl-3.5 text-[7.5pt] leading-relaxed text-slate-200 flex flex-col gap-0.5 list-disc">
                  <li>Creativity</li>
                  <li>Teamwork</li>
                  <li>Time Management</li>
                  <li>Leadership</li>
                  <li>Effective Communication</li>
                  <li>Critical Thinking</li>
                  <li>Analytical skills</li>
                </ul>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-[10pt] font-bold border-b border-white/20 pb-0.5 mb-1.5 uppercase tracking-wider text-white">Languages</h3>
                <div className="text-[7.5pt] text-slate-200 flex flex-col gap-0.5">
                  <div>Sinhala - Native</div>
                  <div>English - Fluent</div>
                </div>
              </div>
            </div>

            {/* Right Column (White) */}
            <div className="w-[65%] p-9 px-7 flex flex-col gap-3 h-full overflow-hidden bg-white box-border text-[#1e293b]">
              {/* More Projects */}
              <div>
                <h3 className="text-[11pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-0.5 mb-2 uppercase tracking-wider">Projects (Cont.)</h3>
                <div className="flex flex-col gap-1.5">
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">AI Medical Assistant System</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Developed an AI-powered healthcare assistant system to simplify medical reports and prescriptions for patients. <span className="font-semibold">Tech Stack:</span> Python, Flask, OCR, NLP, HTML, CSS, JavaScript
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[8pt] font-bold text-[#1e293b] m-0 mb-0.5">Tea Birds Premium E-Commerce Website</h4>
                    <p className="text-[7pt] text-[#475569] leading-normal m-0">
                      Designed and developed a modern luxury tea-selling e-commerce platform with responsive UI/UX. <span className="font-semibold">Tech Stack:</span> React.js, JavaScript, HTML, CSS, Node.js
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h3 className="text-[11pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-0.5 mb-2 uppercase tracking-wider">Certificates</h3>
                <div className="flex flex-col gap-1 text-[7.5pt] text-[#475569]">
                  <div>
                    <strong className="text-[#1e293b]">Flutter for Beginners</strong> - ZERO2LEARN, 2024
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Diploma in Spoken English</strong> - British Way English Academy
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Introduction to Cybersecurity</strong> - Cisco Networking Academy, Dec 2023
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Python for Beginners</strong> - UOM, Nov 2022
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Python Programming</strong> - UOM
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">API Testing with Postman</strong> - Learnfi Learning
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Human Resource Management</strong> - Foundation Level, Oct 2024
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Business Management & Marketing</strong> - Foundation Level, Oct 2024
                  </div>
                </div>
              </div>

              {/* References */}
              <div>
                <h3 className="text-[11pt] font-bold text-[#314336] border-b-2 border-[#314336] pb-0.5 mb-2 uppercase tracking-wider">References</h3>
                <div className="flex flex-col gap-2 text-[7.5pt] text-[#475569]">
                  <div>
                    <strong className="text-[#1e293b]">Mrs. Chami Muthugamage</strong><br/>
                    <span className="italic">Consultant/Lecturer (IT), NIBM</span><br/>
                    📞 +94 772 222 608
                  </div>
                  <div>
                    <strong className="text-[#1e293b]">Mrs. Nadeeshani N. Gunasekara</strong><br/>
                    <span className="italic">Consultant/Lecturer (IT), NIBM</span><br/>
                    📞 +94 710 438 916
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

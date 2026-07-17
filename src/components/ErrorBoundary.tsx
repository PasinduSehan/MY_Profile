import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error in Contact component tree:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-8 sm:p-10 rounded-2xl bg-rose-950/10 border border-rose-500/20 text-center max-w-lg mx-auto my-6 shadow-2xl backdrop-blur-sm">
          <div className="w-14 h-14 bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-500/5 animate-pulse">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-100 uppercase tracking-widest mb-2 font-sans">Contact Portal Crashed</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
            A rendering error occurred inside the contact component tree. This is handled gracefully by our Error Boundary system.
          </p>
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-6 text-left overflow-auto max-h-32">
            <span className="text-[10px] font-mono text-rose-300 block mb-1 font-bold">Error details:</span>
            <code className="text-[10px] font-mono text-rose-400/90 whitespace-pre-wrap leading-relaxed">
              {this.state.error?.stack || this.state.error?.message || "Unknown rendering exception"}
            </code>
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Contact Portal</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

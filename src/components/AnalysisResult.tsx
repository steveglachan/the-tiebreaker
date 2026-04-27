import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';

interface AnalysisResultProps {
  content: string;
  nextSteps?: string[] | null;
  isSuggestionsLoading?: boolean;
  onReset: () => void;
}

export default function AnalysisResult({ content, nextSteps, isSuggestionsLoading, onReset }: AnalysisResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-[#161B22] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="prose prose-invert prose-slate max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-p:leading-relaxed prose-li:my-1 prose-table:w-full prose-table:border-collapse prose-th:bg-slate-900 prose-th:p-3 prose-th:border prose-th:border-slate-800 prose-th:font-medium prose-th:text-left prose-th:text-slate-400 prose-td:p-3 prose-td:border prose-td:border-slate-800 prose-td:text-slate-300 prose-strong:text-white">
          <Markdown remarkPlugins={[remarkGfm]}>
            {content}
          </Markdown>
        </div>
      </div>
      
      {/* Next Steps Section */}
      <div className="bg-[#161B22] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Related Next Steps</h3>
        </div>
        
        <div className="flex flex-col gap-4">
          {isSuggestionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <span className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-4 h-4 border-2 border-slate-600 border-t-indigo-400 rounded-full animate-spin" />
                Generating logical outcomes...
              </span>
            </div>
          ) : nextSteps && nextSteps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nextSteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 transition-colors rounded-2xl flex items-start gap-3 group">
                  <div className="min-w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold ring-1 ring-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm italic py-4">No specific follow-up steps suggested.</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-full font-medium text-sm transition-all hover:bg-slate-800 shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          Make Another Decision
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowRight, Target, Brain, Split } from 'lucide-react';

export type AnalysisType = 'pros-cons' | 'comparison' | 'swot';

interface DecisionFormProps {
  onSubmit: (decision: string, goal: string, type: AnalysisType) => void;
  isLoading: boolean;
}

export default function DecisionForm({ onSubmit, isLoading }: DecisionFormProps) {
  const [decision, setDecision] = useState('');
  const [goal, setGoal] = useState('');
  const [type, setType] = useState<AnalysisType>('pros-cons');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (decision.trim()) {
      onSubmit(decision, goal, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#161B22] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col gap-6 w-full max-w-2xl mx-auto">
      
      {/* Decision Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="decision" className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <Split className="w-3 h-3" />
          What decision are you facing? <span className="text-red-400">*</span>
        </label>
        <textarea
          id="decision"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="e.g. Should I accept the job offer in New York or stay in my current role in Chicago?"
          className="w-full min-h-[120px] p-4 text-sm bg-slate-900 border border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-y text-slate-200 placeholder:text-slate-600"
          required
        />
      </div>

      {/* Goal Input */}
      <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
        <label htmlFor="goal" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-3 h-3" />
          Desired outcome or goal (Optional)
        </label>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. I want to prioritize long-term career growth while maintaining a good work-life balance."
          className="w-full min-h-[80px] p-4 text-sm bg-slate-900 border border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-y text-slate-200 placeholder:text-slate-600"
        />
      </div>

      {/* Analysis Type */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-1">
          <Brain className="w-3 h-3 text-indigo-400" />
          How should I analyze this?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['pros-cons', 'comparison', 'swot'] as const).map((t) => (
            <label
              key={t}
              className={`relative flex items-center justify-center p-3 sm:p-4 rounded-xl cursor-pointer text-sm font-medium transition-all ${
                type === t
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 ring-1 ring-indigo-500/50'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <input
                type="radio"
                name="analysisType"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {t === 'pros-cons' && 'Pros & Cons'}
              {t === 'comparison' && 'Comparison Table'}
              {t === 'swot' && 'SWOT Analysis'}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={!decision.trim() || isLoading}
          className="w-full px-8 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-slate-200 transition-all disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Tiebreak It
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

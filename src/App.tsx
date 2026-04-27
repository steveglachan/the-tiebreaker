import { useState } from 'react';
import DecisionForm, { AnalysisType } from './components/DecisionForm';
import AnalysisResult from './components/AnalysisResult';
import { analyzeDecision, suggestNextSteps } from './services/geminiService';
import { Sparkles, Scale } from 'lucide-react';

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [nextSteps, setNextSteps] = useState<string[] | null>(null);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  const handleDecisionSubmit = async (decision: string, goal: string, type: AnalysisType) => {
    setIsAnalyzing(true);
    setResult(null); // Clear previous
    setNextSteps(null);
    setIsSuggestionsLoading(true);
    
    try {
      const insight = await analyzeDecision(decision, goal, type);
      setResult(insight);
      
      // Fetch next steps
      suggestNextSteps(decision, goal).then(steps => {
        setNextSteps(steps);
        setIsSuggestionsLoading(false);
      }).catch(err => {
        console.error("Error fetching suggestions:", err);
        setNextSteps([]);
        setIsSuggestionsLoading(false);
      });
    } catch (error) {
      alert("Uh oh! We couldn't analyze that decision right now. Please try again.");
      console.error(error);
      setIsSuggestionsLoading(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-slate-200 font-sans selection:bg-indigo-500/30">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-indigo-600/20">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase">The Tiebreaker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-widest items-center gap-2">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              AI Engine: Analysis v4.2
            </div>
          </div>
        </header>

        <div className="text-center mb-12">
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            AI-powered clarity for your toughest decisions.
          </p>
        </div>

        {/* Content Area */}
        {result ? (
          <AnalysisResult 
            content={result} 
            nextSteps={nextSteps}
            isSuggestionsLoading={isSuggestionsLoading}
            onReset={() => setResult(null)} 
          />
        ) : (
          <DecisionForm 
            onSubmit={handleDecisionSubmit} 
            isLoading={isAnalyzing} 
          />
        )}
      </main>
    </div>
  );
}

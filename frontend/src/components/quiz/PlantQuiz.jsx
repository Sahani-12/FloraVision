import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import PlantCard from '../catalog/PlantCard';

export default function PlantQuiz({ plants, onAddToCart, onQuickView }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      id: 'light',
      title: 'How much sunlight does your plant spot receive?',
      subtitle: 'Observe the room window direction and daily natural light duration.',
      options: [
        { label: 'Low Light / Cozy Dark Room', value: 'Low Light' },
        { label: 'Bright Indirect Sun (Near Window)', value: 'Bright Indirect' },
        { label: 'Direct Sunlight (Balcony / Terrace)', value: 'Full Sun' }
      ]
    },
    {
      id: 'care',
      title: 'How frequently do you remember to water plants?',
      subtitle: 'Be honest! We have perfect low-maintenance options.',
      options: [
        { label: 'Forgetful! Once every 2-3 weeks', value: 'Low' },
        { label: 'Regular! Once a week on weekends', value: 'Weekly' },
        { label: 'Attentive! Love daily care & misting', value: 'Daily' }
      ]
    },
    {
      id: 'pets',
      title: 'Do you have playful pets or toddlers at home?',
      subtitle: 'We highlight 100% non-toxic pet-safe plant species.',
      options: [
        { label: 'Yes! Need 100% Pet-Safe Plants', value: 'pets' },
        { label: 'No pets / High shelves available', value: 'nopets' }
      ]
    },
    {
      id: 'goal',
      title: 'What is your primary goal for adding greenery?',
      subtitle: 'Tell us what mood you want to create.',
      options: [
        { label: 'Purify indoor air & 24/7 oxygen', value: 'O2' },
        { label: 'Enhance office desk focus & calm vibe', value: 'Desk' },
        { label: 'Bold statement indoor tropical décor', value: 'Indoor' }
      ]
    }
  ];

  const handleSelectOption = (optionValue) => {
    const qId = questions[currentQuestion].id;
    const newAnswers = { ...answers, [qId]: optionValue };
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuizFinished(false);
  };

  // Compute matched plants
  const recommendedPlants = plants.filter((plant) => {
    if (!quizFinished) return false;

    // Pet safety strict check
    if (answers.pets === 'pets' && !plant.petFriendly) return false;

    // Goal match
    if (answers.goal === 'O2' && plant.isO2) return true;
    if (answers.goal === 'Desk' && plant.category === 'Desk') return true;
    if (answers.goal === 'Indoor' && plant.category === 'Indoor') return true;

    // Sunlight match
    if (answers.light && plant.light && plant.light.toLowerCase().includes(answers.light.toLowerCase())) {
      return true;
    }

    return true;
  }).slice(0, 3);

  return (
    <section id="plant-quiz" className="py-16 bg-[#121A15] text-white relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            AI Plant Matchmaker
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Find Your Perfect Plant Match
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Answer 4 quick questions about your home environment, and we'll curate your ideal green companion.
          </p>
        </div>

        {/* Quiz Container */}
        {!quizFinished ? (
          <div className="bg-[#18231C] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
            
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-32 bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              {questions[currentQuestion].title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-8">
              {questions[currentQuestion].subtitle}
            </p>

            {/* Options */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-white">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Results View */
          <div className="bg-[#18231C] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" /> Match Found!
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Here are your top recommended plants
                </h3>
              </div>
              <button
                onClick={resetQuiz}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            </div>

            {/* Recommended Plant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedPlants.map((plant) => (
                <div key={plant.id} className="bg-[#121A15] p-4 rounded-2xl border border-white/10">
                  <PlantCard
                    plant={plant}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

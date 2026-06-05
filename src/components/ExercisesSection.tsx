import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { exercisesN5 } from '@/data/lessonData';
import { englishExercisesA1 } from '@/data/englishA1';
import { useState } from 'react';
import { Headphones, BookOpen, MessageSquare, PenTool, CheckCircle, XCircle } from 'lucide-react';
import type { Language, Exercise } from '@/data/languages';

interface ExercisesSectionProps {
  level?: string;
  language?: Language;
}

export default function ExercisesSection({ level, language }: ExercisesSectionProps = {}) {
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  let exercisesData: Exercise[];
  if (language?.code === 'en') {
    exercisesData = !level || level === 'A1' ? englishExercisesA1 : englishExercisesA1.slice(0, 1);
  } else {
    exercisesData = !level || level === 'N5' ? exercisesN5 : exercisesN5.slice(0, 1);
  }

  if (exercisesData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exercices - Niveau {level}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-400">Les exercices pour ce niveau seront bientôt disponibles.</p>
        </CardContent>
      </Card>
    );
  }

  const currentExercise = exercisesData[currentExerciseIdx];
  const isCorrect = selectedAnswer === currentExercise.correctAnswer;

  const getExerciseIcon = () => {
    switch (currentExercise.type) {
      case 'listening': return <Headphones className="w-5 h-5" />;
      case 'speaking': return <MessageSquare className="w-5 h-5" />;
      case 'reading': return <BookOpen className="w-5 h-5" />;
      case 'writing': return <PenTool className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleNext = () => {
    if (currentExerciseIdx < exercisesData.length - 1) {
      setCurrentExerciseIdx(currentExerciseIdx + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIdx > 0) {
      setCurrentExerciseIdx(currentExerciseIdx - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Exercices pratiques</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Headphones className="w-5 h-5 text-blue-600" />, label: 'Écoute', desc: 'Compréhension auditive' },
          { icon: <MessageSquare className="w-5 h-5 text-green-600" />, label: 'Parole', desc: 'Expression orale' },
          { icon: <BookOpen className="w-5 h-5 text-purple-600" />, label: 'Lecture', desc: 'Compréhension écrite' },
          { icon: <PenTool className="w-5 h-5 text-orange-600" />, label: 'Écriture', desc: 'Expression écrite' },
        ].map(({ icon, label, desc }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">{icon}<span className="font-semibold">{label}</span></div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-blue-50 dark:bg-blue-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getExerciseIcon()}
              <div>
                <CardTitle className="text-lg">
                  {currentExercise.type.charAt(0).toUpperCase() + currentExercise.type.slice(1)}
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Exercice {currentExerciseIdx + 1} / {exercisesData.length}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 text-sm rounded">
              {currentExercise.level}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {currentExercise.question}
            </h3>
            {currentExercise.audioUrl && (
              <div className="mb-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Headphones className="w-4 h-4" />
                  Écouter l'audio
                </Button>
              </div>
            )}
          </div>

          {currentExercise.options && (
            <div className="space-y-3">
              {currentExercise.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedAnswer(option); setShowResult(true); }}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === option
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : 'border-red-500 bg-red-50 dark:bg-red-950'
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {selectedAnswer === option && showResult && (
                      isCorrect
                        ? <CheckCircle className="w-5 h-5 text-green-600" />
                        : <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect
                  ? <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  : <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                }
                <div>
                  <h4 className={`font-semibold mb-1 ${isCorrect ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                    {isCorrect ? 'Correct !' : 'Incorrect'}
                  </h4>
                  <p className={`text-sm ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    {currentExercise.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-between pt-4">
            <Button variant="outline" onClick={handlePrevious} disabled={currentExerciseIdx === 0}>
              Précédent
            </Button>
            <div className="flex gap-2">
              {exercisesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentExerciseIdx(idx); setSelectedAnswer(null); setShowResult(false); }}
                  className={`w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                    idx === currentExerciseIdx
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <Button onClick={handleNext} disabled={currentExerciseIdx === exercisesData.length - 1 || !showResult}>
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Progression</span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {currentExerciseIdx + 1} / {exercisesData.length}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentExerciseIdx + 1) / exercisesData.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

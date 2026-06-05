import { Card } from '@/components/ui/card';
import { grammarN5 } from '@/data/lessonData';
import { englishGrammarA1 } from '@/data/englishA1';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Language, GrammarLesson } from '@/data/languages';

interface GrammarLessonsProps {
  level?: string;
  language?: Language;
}

export default function GrammarLessons({ level, language }: GrammarLessonsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  let grammarData: GrammarLesson[];
  if (language?.code === 'en') {
    grammarData = !level || level === 'A1' ? englishGrammarA1 : englishGrammarA1.slice(0, 1);
  } else {
    grammarData = !level || level === 'N5' ? grammarN5 : grammarN5.slice(0, 1);
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          Grammaire {language ? `- ${language.name}` : `- Niveau ${level || 'N5'}`}
        </h3>
        <p className="text-sm text-green-800 dark:text-green-200">
          Leçons structurées avec explications détaillées, exemples contextuels et notes d'utilisation.
        </p>
      </div>

      {grammarData.map((lesson) => (
        <Card key={lesson.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <div onClick={() => toggleExpanded(lesson.id)} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-2xl font-bold text-green-600 mb-2">{lesson.title}</div>
                <div className="text-lg font-mono text-slate-700 dark:text-slate-300 mb-2">{lesson.pattern}</div>
                <div className="text-slate-600 dark:text-slate-400 mb-2">{lesson.meaning}</div>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 text-xs rounded">
                  {lesson.level}
                </span>
              </div>
              <div className="ml-4">
                {expandedId === lesson.id ? (
                  <ChevronUp className="w-6 h-6 text-slate-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                )}
              </div>
            </div>

            {expandedId === lesson.id && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Explication</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lesson.explanation}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Exemples</h4>
                  <div className="space-y-3">
                    {lesson.examples.map((example, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                        <div className="font-mono text-sm text-green-600 dark:text-green-400 mb-1">{example.original}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{example.romanization}</div>
                        <div className="text-sm text-slate-700 dark:text-slate-300">{example.english}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Utilisation</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lesson.usage}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Notes importantes</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{lesson.notes}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { culturalTopics } from '@/data/lessonData';
import { englishCultureA1 } from '@/data/englishA1';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Language, CultureTopic } from '@/data/languages';

interface CultureSectionProps {
  language?: Language;
}

export default function CultureSection({ language }: CultureSectionProps = {}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const topics: CultureTopic[] = language?.code === 'en' ? englishCultureA1 : culturalTopics;
  const label = language?.code === 'en' ? 'Anglophone' : 'Japonaises';

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Culture et Traditions {label}
        </h3>
        <p className="text-sm text-purple-800 dark:text-purple-200">
          Explorez les aspects culturels, les traditions et les valeurs qui façonnent la langue et la société.
        </p>
      </div>

      {topics.map((topic) => (
        <Card key={topic.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <div onClick={() => toggleExpanded(topic.id)} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-2xl font-bold text-purple-600 mb-2">{topic.title}</div>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{topic.content}</p>
              </div>
              <div className="ml-4">
                {expandedId === topic.id ? (
                  <ChevronUp className="w-6 h-6 text-slate-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                )}
              </div>
            </div>

            {expandedId === topic.id && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">À propos</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{topic.content}</p>
                </div>

                {topic.relatedVocabulary.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Vocabulaire associé</h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedVocabulary.map((vocab, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-100 text-sm rounded">
                          {vocab}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {topic.traditions && topic.traditions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Traditions et pratiques</h4>
                    <ul className="space-y-2">
                      {topic.traditions.map((tradition, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                          <span className="text-purple-600 dark:text-purple-400 font-bold mt-1">•</span>
                          <span className="text-sm">{tradition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

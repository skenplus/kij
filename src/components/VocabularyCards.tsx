import { Card } from '@/components/ui/card';
import { vocabularyN5, type JapaneseVocabularyCard } from '@/data/lessonData';
import { englishVocabularyA1 } from '@/data/englishA1';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Language, VocabularyCard } from '@/data/languages';

type AnyVocab = JapaneseVocabularyCard | VocabularyCard;

function getDisplay(vocab: AnyVocab): string {
  if ('japanese' in vocab) return vocab.japanese;
  return vocab.word.original;
}

function getRomanization(vocab: AnyVocab): string {
  if ('romaji' in vocab) return vocab.romaji;
  return vocab.word.romanization;
}

function getEtymologyText(vocab: AnyVocab): string {
  if ('etymology' in vocab && typeof vocab.etymology === 'string') return vocab.etymology;
  const e = vocab.etymology as { origin: string; evolution: string };
  return `${e.origin} — ${e.evolution}`;
}

function getExampleOriginal(ex: Record<string, string>): string {
  return ex.japanese ?? ex.original;
}

function getExampleRoman(ex: Record<string, string>): string {
  return ex.romaji ?? ex.romanization;
}

interface VocabularyCardsProps {
  level?: string;
  language?: Language;
}

export default function VocabularyCards({ level, language }: VocabularyCardsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  let vocabularyData: AnyVocab[];
  if (language?.code === 'en' && (!level || level === 'A1')) {
    vocabularyData = englishVocabularyA1;
  } else if (!level || level === 'N5') {
    vocabularyData = vocabularyN5;
  } else {
    vocabularyData = vocabularyN5.slice(0, 1);
  }

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Vocabulaire {language ? `- ${language.name}` : `- Niveau ${level || 'N5'}`}
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Fiches de vocabulaire complètes avec étymologie, traductions multilingues et techniques de mémorisation.
        </p>
      </div>

      {vocabularyData.map((vocab) => {
        const id = vocab.id;
        const display = getDisplay(vocab);
        const romanization = getRomanization(vocab);
        const examples = vocab.examples as Array<Record<string, string>>;

        return (
          <Card key={id} className="cursor-pointer hover:shadow-md transition-shadow">
            <div onClick={() => toggleExpanded(id)} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-red-600 mb-2">{display}</div>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">{romanization}</div>
                  <div className="text-slate-600 dark:text-slate-400">{vocab.meaning}</div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 text-xs rounded">
                      {vocab.category}
                    </span>
                    <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded">
                      {vocab.level}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedId === id ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </div>
              </div>

              {expandedId === id && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Étymologie</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{getEtymologyText(vocab)}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Exemples</h4>
                    <div className="space-y-3">
                      {examples.map((example, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                          <div className="font-mono text-sm text-red-600 dark:text-red-400 mb-1">
                            {getExampleOriginal(example)}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                            {getExampleRoman(example)}
                          </div>
                          <div className="text-sm text-slate-700 dark:text-slate-300">{example.english}</div>
                          <span className="inline-block mt-2 px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded">
                            {example.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Techniques de mémorisation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded">
                        <div className="font-semibold text-purple-900 dark:text-purple-100 text-sm mb-1">Visuel</div>
                        <p className="text-xs text-purple-800 dark:text-purple-200">{vocab.mnemonics.visual}</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded">
                        <div className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">Auditif</div>
                        <p className="text-xs text-blue-800 dark:text-blue-200">{vocab.mnemonics.auditory}</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900 rounded">
                        <div className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">Kinesthésique</div>
                        <p className="text-xs text-green-800 dark:text-green-200">{vocab.mnemonics.kinesthetic}</p>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded">
                        <div className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm mb-1">Logique</div>
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">{vocab.mnemonics.logical}</p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900 rounded">
                      <div className="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">Narratif</div>
                      <p className="text-xs text-orange-800 dark:text-orange-200">{vocab.mnemonics.narrative}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Notes culturelles</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{vocab.culturalNotes}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Traductions multilingues</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left py-2 px-2 text-slate-700 dark:text-slate-300">Langue</th>
                            <th className="text-left py-2 px-2 text-slate-700 dark:text-slate-300">Famille</th>
                            <th className="text-left py-2 px-2 text-slate-700 dark:text-slate-300">Traduction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vocab.translations.map((trans, idx) => (
                            <tr key={idx} className="border-b border-slate-100 dark:border-slate-800">
                              <td className="py-2 px-2 text-slate-600 dark:text-slate-400">{trans.language}</td>
                              <td className="py-2 px-2 text-slate-600 dark:text-slate-400">{trans.family}</td>
                              <td className="py-2 px-2 text-slate-700 dark:text-slate-300 font-mono">{trans.translation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

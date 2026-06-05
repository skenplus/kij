import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { languages, type Language, getContentCompleteness } from '@/data/languages';
import { Search, Globe, Users, Zap } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onSelect: (language: Language) => void;
}

export default function LanguageSelector({ selectedLanguage, onSelect }: LanguageSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'difficulty' | 'name'>('popularity');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);

  let filteredLanguages = languages.filter((lang) => {
    const matchesSearch =
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.includes(searchQuery) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !filterDifficulty || lang.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  if (sortBy === 'popularity') {
    filteredLanguages = [...filteredLanguages].sort((a, b) => b.speakers - a.speakers);
  } else if (sortBy === 'difficulty') {
    const difficultyOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2, very_hard: 3 };
    filteredLanguages = [...filteredLanguages].sort(
      (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );
  } else if (sortBy === 'name') {
    filteredLanguages = [...filteredLanguages].sort((a, b) => a.name.localeCompare(b.name));
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-100';
      case 'hard': return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-100';
      case 'very_hard': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      case 'very_hard': return 'Very Hard';
      default: return 'Unknown';
    }
  };

  const formatSpeakers = (speakers: number) => {
    if (speakers >= 1_000_000_000) return `${(speakers / 1_000_000_000).toFixed(1)}B`;
    if (speakers >= 1_000_000) return `${(speakers / 1_000_000).toFixed(0)}M`;
    return `${speakers}`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Langues Vivantes</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Choisissez une langue et commencez votre apprentissage réaliste et authentique
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Rechercher une langue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant={sortBy === 'popularity' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('popularity')} className="gap-2">
            <Users className="w-4 h-4" />Popularité
          </Button>
          <Button variant={sortBy === 'difficulty' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('difficulty')} className="gap-2">
            <Zap className="w-4 h-4" />Difficulté
          </Button>
          <Button variant={sortBy === 'name' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('name')} className="gap-2">
            <Globe className="w-4 h-4" />Nom
          </Button>
          <div className="ml-auto flex gap-2">
            <Button variant={!filterDifficulty ? 'default' : 'outline'} size="sm" onClick={() => setFilterDifficulty(null)}>
              Tous
            </Button>
            {(['easy', 'medium', 'hard', 'very_hard'] as const).map((diff) => (
              <Button
                key={diff}
                variant={filterDifficulty === diff ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterDifficulty(diff)}
              >
                {getDifficultyLabel(diff)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLanguages.map((language) => {
          const completeness = getContentCompleteness(language);
          const isSelected = selectedLanguage?.code === language.code;

          return (
            <Card
              key={language.code}
              className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'border-2 border-red-600 bg-red-50 dark:bg-red-950' : ''}`}
              onClick={() => onSelect(language)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{language.name}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{language.nativeName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(language.difficulty)}`}>
                    {getDifficultyLabel(language.difficulty)}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Locuteurs</p>
                    <p className="font-semibold">{formatSpeakers(language.speakers)}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Famille</p>
                    <p className="font-semibold text-xs line-clamp-2">{language.family}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Systèmes d'écriture</p>
                  <div className="flex flex-wrap gap-1">
                    {language.writingSystems.map((system) => (
                      <span key={system} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">
                        {system.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Contenu</p>
                    <p className="text-xs font-semibold">{completeness}%</p>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full transition-all" style={{ width: `${completeness}%` }} />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Niveaux disponibles</p>
                  <p className="text-xs font-mono">{language.levels.join(', ')}</p>
                </div>

                <Button className="w-full mt-2" variant={isSelected ? 'default' : 'outline'} onClick={() => onSelect(language)}>
                  {isSelected ? '✓ Sélectionné' : 'Sélectionner'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLanguages.length === 0 && (
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600 dark:text-slate-400">Aucune langue ne correspond à votre recherche.</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{languages.length}</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Langues disponibles</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {languages.filter((l) => getContentCompleteness(l) > 0).length}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Avec contenu</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {(languages.reduce((acc, l) => acc + l.speakers, 0) / 1_000_000_000).toFixed(1)}B+
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Locuteurs totaux</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

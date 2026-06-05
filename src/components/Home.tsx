import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Headphones, MessageSquare, PenTool, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { type Language, languages } from '@/data/languages';
import LanguageSelector from '@/components/LanguageSelector';
import VocabularyCards from '@/components/VocabularyCards';
import GrammarLessons from '@/components/GrammarLessons';
import CultureSection from '@/components/CultureSection';
import ExercisesSection from '@/components/ExercisesSection';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(languages[0]);
  const [currentTab, setCurrentTab] = useState('languages');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 dark:from-red-900 dark:to-red-800 py-16 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">🌍 Langues Vivantes</h1>
          <p className="text-xl text-red-100 mb-8">
            Apprendre n'importe quelle langue de manière réaliste et authentique
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-red-50" onClick={() => setCurrentTab('languages')}>
              Choisir une langue
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-red-700" onClick={() => setCurrentTab('overview')}>
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <BookOpen className="w-8 h-8 text-red-600 mb-2" />, title: 'Vocabulaire Vivant', desc: 'Fiches de vocabulaire complètes avec étymologie, traductions multilingues et mnémoniques adaptées à tous les profils d\'apprentissage.' },
            { icon: <Globe className="w-8 h-8 text-red-600 mb-2" />, title: 'Grammaire Progressive', desc: 'Leçons structurées avec exemples contextuels et explications culturelles pour chaque concept, adaptées à chaque système de niveaux.' },
            { icon: <Sparkles className="w-8 h-8 text-red-600 mb-2" />, title: 'Culture et Traditions', desc: 'Explorez la culture, les traditions, les valeurs et l\'histoire à travers la langue et les concepts clés de chaque pays.' },
            { icon: <Headphones className="w-8 h-8 text-red-600 mb-2" />, title: 'Écoute Active', desc: 'Exercices d\'écoute avec contenus authentiques, dialogues naturels et prononciation correcte de locuteurs natifs.' },
            { icon: <MessageSquare className="w-8 h-8 text-red-600 mb-2" />, title: 'Traduction Interactive', desc: 'Traduction bidirectionnelle avec explications des nuances, contextes culturels et alternatives de traduction.' },
            { icon: <PenTool className="w-8 h-8 text-red-600 mb-2" />, title: 'Exercices Pratiques', desc: 'Exercices d\'écoute, parole, lecture et écriture pour développer les quatre compétences linguistiques essentielles.' },
          ].map(({ icon, title, desc }) => (
            <Card key={title} className="hover:shadow-lg transition-shadow">
              <CardHeader>{icon}<CardTitle>{title}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p></CardContent>
            </Card>
          ))}
        </section>

        {/* Main Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="languages">Langues</TabsTrigger>
            <TabsTrigger value="overview" disabled={!selectedLanguage}>Aperçu</TabsTrigger>
            <TabsTrigger value="learning" disabled={!selectedLanguage}>Apprentissage</TabsTrigger>
            <TabsTrigger value="resources" disabled={!selectedLanguage}>Ressources</TabsTrigger>
          </TabsList>

          <TabsContent value="languages">
            <LanguageSelector selectedLanguage={selectedLanguage} onSelect={setSelectedLanguage} />
          </TabsContent>

          {selectedLanguage && (
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{selectedLanguage.name}</CardTitle>
                  <CardDescription className="text-lg">{selectedLanguage.nativeName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Informations générales</h4>
                      <ul className="space-y-2 text-sm">
                        <li><span className="text-slate-600 dark:text-slate-400">Famille linguistique : </span><span className="font-semibold">{selectedLanguage.family}</span></li>
                        <li><span className="text-slate-600 dark:text-slate-400">Locuteurs : </span><span className="font-semibold">{(selectedLanguage.speakers / 1_000_000).toFixed(0)}M+</span></li>
                        <li><span className="text-slate-600 dark:text-slate-400">Code langue : </span><span className="font-mono">{selectedLanguage.code}</span></li>
                        <li><span className="text-slate-600 dark:text-slate-400">Difficulté : </span><span className="font-semibold capitalize">{selectedLanguage.difficulty.replace('_', ' ')}</span></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Systèmes d'écriture</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLanguage.writingSystems.map((system) => (
                          <span key={system} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 text-sm rounded">
                            {system.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Niveaux d'apprentissage</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLanguage.levels.map((level) => (
                        <span key={level} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded">
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Ressources officielles</h4>
                    <div className="space-y-2">
                      {selectedLanguage.officialSources.map((source, idx) => (
                        <a key={idx} href={source.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                          <ArrowRight className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="font-semibold text-sm">{source.name}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">{source.type}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {selectedLanguage && (
            <TabsContent value="learning">
              <Tabs defaultValue="vocabulary" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="vocabulary">Vocabulaire</TabsTrigger>
                  <TabsTrigger value="grammar">Grammaire</TabsTrigger>
                  <TabsTrigger value="culture">Culture</TabsTrigger>
                  <TabsTrigger value="exercises">Exercices</TabsTrigger>
                </TabsList>

                <TabsContent value="vocabulary" className="mt-6">
                  {selectedLanguage.contentCompleteness.vocabulary > 0 ? (
                    <VocabularyCards language={selectedLanguage} />
                  ) : (
                    <Card className="bg-slate-50 dark:bg-slate-900">
                      <CardContent className="pt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400">Le vocabulaire pour {selectedLanguage.name} sera bientôt disponible.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="grammar" className="mt-6">
                  {selectedLanguage.contentCompleteness.grammar > 0 ? (
                    <GrammarLessons language={selectedLanguage} />
                  ) : (
                    <Card className="bg-slate-50 dark:bg-slate-900">
                      <CardContent className="pt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400">La grammaire pour {selectedLanguage.name} sera bientôt disponible.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="culture" className="mt-6">
                  {selectedLanguage.contentCompleteness.culture > 0 ? (
                    <CultureSection language={selectedLanguage} />
                  ) : (
                    <Card className="bg-slate-50 dark:bg-slate-900">
                      <CardContent className="pt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400">Le contenu culturel pour {selectedLanguage.name} sera bientôt disponible.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="exercises" className="mt-6">
                  {selectedLanguage.contentCompleteness.exercises > 0 ? (
                    <ExercisesSection language={selectedLanguage} />
                  ) : (
                    <Card className="bg-slate-50 dark:bg-slate-900">
                      <CardContent className="pt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400">Les exercices pour {selectedLanguage.name} seront bientôt disponibles.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>
          )}

          {selectedLanguage && (
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources officielles pour {selectedLanguage.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedLanguage.officialSources.map((source, idx) => (
                      <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardHeader><CardTitle className="text-lg">{source.name}</CardTitle></CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Type : <span className="font-semibold capitalize">{source.type}</span>
                          </p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => window.open(source.url, '_blank')}>
                            Visiter le site
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

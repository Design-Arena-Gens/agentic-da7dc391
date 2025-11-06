'use client';

import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  status: string;
  timestamp: string;
}

export default function Home() {
  const [inputType, setInputType] = useState<'text' | 'voice' | 'link'>('text');
  const [inputContent, setInputContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentStep, setCurrentStep] = useState('');

  const processInput = async () => {
    if (!inputContent.trim()) return;

    setProcessing(true);
    setCurrentStep('Analisando entrada...');

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: inputType,
          content: inputContent
        })
      });

      const data = await response.json();

      if (data.success) {
        setPosts(prev => [data.post, ...prev]);
        setInputContent('');
        setCurrentStep('Concluído!');
      } else {
        setCurrentStep(`Erro: ${data.error}`);
      }
    } catch (error) {
      setCurrentStep('Erro ao processar');
    } finally {
      setTimeout(() => {
        setProcessing(false);
        setCurrentStep('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            🤖 Automação N8N
          </h1>
          <p className="text-gray-600">
            Telegram → Análise → Blog de Finanças
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Input Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📱 Entrada do Telegram
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Entrada
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setInputType('text')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    inputType === 'text'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📝 Texto
                </button>
                <button
                  onClick={() => setInputType('voice')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    inputType === 'voice'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🎤 Voz
                </button>
                <button
                  onClick={() => setInputType('link')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    inputType === 'link'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔗 Link
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo
              </label>
              <textarea
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder={
                  inputType === 'text'
                    ? 'Digite ou cole a mensagem de texto...'
                    : inputType === 'voice'
                    ? 'Cole o texto transcrito da mensagem de voz...'
                    : 'Cole o link do artigo/notícia...'
                }
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={processing}
              />
            </div>

            <button
              onClick={processInput}
              disabled={processing || !inputContent.trim()}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {processing ? '⏳ Processando...' : '🚀 Processar e Publicar'}
            </button>

            {currentStep && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">{currentStep}</p>
              </div>
            )}
          </div>

          {/* Workflow Steps */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ⚙️ Fluxo de Automação
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-medium text-gray-800">Receber do Telegram</p>
                  <p className="text-sm text-gray-600">Texto, voz ou link</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="font-medium text-gray-800">Análise com IA</p>
                  <p className="text-sm text-gray-600">Entender comando e extrair informação</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="font-medium text-gray-800">Criar Resumo Financeiro</p>
                  <p className="text-sm text-gray-600">Gerar conteúdo para blog</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <p className="font-medium text-gray-800">Gerar Imagem</p>
                  <p className="text-sm text-gray-600">Criar ilustração relacionada ao tema</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                <span className="text-2xl">5️⃣</span>
                <div>
                  <p className="font-medium text-gray-800">Publicar no Blogger</p>
                  <p className="text-sm text-gray-600">Post com imagem no topo + texto</p>
                </div>
              </div>
            </div>
          </div>

          {/* Posts List */}
          {posts.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                📰 Posts Publicados
              </h3>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start gap-4">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800 mb-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                            {post.status}
                          </span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpenText, Flame, Menu, Monitor, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <Image
        src="/bg.png"
        alt="Background"
        fill
        className="absolute inset-0 z-0 opacity-60 object-cover"
        priority
      />

      {/* Right Character */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[900px] z-10 flex items-end justify-end pointer-events-none">
        <div className="relative w-full h-full scale-150 sm:scale-200 md:scale-250 -translate-x-10 translate-y-24 sm:translate-y-32 md:translate-y-115 md:-translate-x-40 transition-transform duration-700 ease-in-out">
          <Image
            src="/person.png"
            alt="Personagem CS2"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-[80px]">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 w-full z-30 bg-black/30 shadow-md">
          <div className="relative max-w-full px-4 sm:px-6 py-6 flex items-center justify-between">
            {/* Esquerda: Título */}
            <div className="flex-shrink-0">
              <h1 className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest text-white font-orbitron uppercase">
                <Image
                  src="/logo.svg"
                  alt="Ducks Gaming Logo"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg"
                />
                Ducks Gaming
              </h1>
            </div>

            {/* Centro: Nav responsiva */}
            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex gap-4 md:gap-6 items-center text-sm">
              <Button
                variant="default"
                className={`text-white bg-transparent hover:bg-transparent px-4 md:px-6 cursor-pointer ${
                  selected === 'inicio' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('inicio')}
              >
                Inicio
              </Button>
              <Button
                variant="default"
                className={`text-white bg-transparent hover:bg-transparent px-4 md:px-6 cursor-pointer ${
                  selected === 'mixs' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('mixs')}
              >
                Mixs
              </Button>
              <Button
                variant="default"
                className={`text-white bg-transparent hover:bg-transparent  px-4 md:px-6 cursor-pointer ${
                  selected === 'rivals' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('rivals')}
              >
                Rivals
              </Button>
              <Button
                variant="default"
                className={`text-white bg-transparent hover:bg-transparent px-4 md:px-6 cursor-pointer ${
                  selected === 'blogs' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('blogs')}
              >
                Blogs
              </Button>
            </nav>

            {/* Bandeira */}
            <div className="hidden sm:flex items-center gap-1 text-white font-medium text-sm sm:text-base">
              <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                <Image
                  src="/icon-brasil.svg"
                  alt="Bandeira do Brasil"
                  width={24}
                  height={24}
                  className="inline-block"
                />
              </span>
              <span>BR</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-white cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden bg-black/90 px-4 py-4 flex flex-col items-center gap-4 transition-all duration-300">
              <button
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'inicio' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('inicio');
                  setMobileMenuOpen(false);
                }}
              >
                Inicio
              </button>
              <button
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'mixs' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('mixs');
                  setMobileMenuOpen(false);
                }}
              >
                Mixs
              </button>
              <button
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'rivals' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('rivals');
                  setMobileMenuOpen(false);
                }}
              >
                Rivals
              </button>
              <button
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'blogs' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('blogs');
                  setMobileMenuOpen(false);
                }}
              >
                Blogs
              </button>
            </div>
          )}
        </header>

        {/* Main Section */}
        <section className="mt-12 sm:mt-16 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex-1 max-w-xl space-y-6 text-center sm:text-left px-4 sm:px-0">
            {selected === 'inicio' && (
              <>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  Bem-vindo ao Ducks Gaming!
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  A plataforma definitiva para jogadores competitivos de CS2.
                  Conecte-se com outros jogadores, participe de mixs, desafie
                  rivais e fique por dentro das últimas notícias do cenário.
                </p>
              </>
            )}
            {selected === 'mixs' && (
              <>
                <Badge
                  variant="outline"
                  className="text-yellow-400 border-yellow-400 px-3 py-1 inline-flex items-center gap-2"
                >
                  <Monitor size={16} />
                  MIXS
                </Badge>

                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Sorteie Mixs Balanceados com Facilidade
                </h2>

                <p className="bg-yellow-800/20 p-4 rounded-xl border border-yellow-400/40 text-gray-100 text-base leading-relaxed">
                  Monte partidas equilibradas com base no nível dos jogadores e
                  funções específicas. Ideal para treinos, scrims ou diversão
                  com amigos.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/mixs"
                    className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
                  >
                    Ir para o Sorteador de Mixs
                  </Link>
                </div>
              </>
            )}

            {selected === 'rivals' && (
              <>
                <Badge
                  variant="outline"
                  className="text-blue-400 border-blue-400 px-3 py-1 inline-flex items-center gap-2"
                >
                  <Flame size={16} />
                  RIVALS
                </Badge>
                <p className="bg-blue-800/20 p-4 rounded-xl border border-blue-400/40 text-gray-100 text-base leading-relaxed">
                  Crie ou desafie outros times da comunidade e mostre seu poder
                  em campo. Ranking ao vivo e estatísticas completas.
                </p>
              </>
            )}

            {selected === 'blogs' && (
              <>
                <Badge
                  variant="outline"
                  className="text-green-400 border-green-400 px-3 py-1 inline-flex items-center gap-2"
                >
                  <BookOpenText size={16} />
                  BLOGS
                </Badge>
                <p className="bg-green-800/20 p-4 rounded-xl border border-green-400/40 text-gray-100 text-base leading-relaxed">
                  Fique por dentro das últimas notícias do cenário competitivo,
                  análises de partidas, entrevistas e muito mais.
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

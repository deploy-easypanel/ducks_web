'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu, Monitor, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState('adicionar');
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
              <Link
                href="/mixs"
                className={`text-white bg-transparent hover:bg-transparent px-4 py-1 md:px-6 md:py-2 rounded-md cursor-pointer ${
                  selected === 'adicionar' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('adicionar')}
              >
                Mixs
              </Link>
              <Button
                variant="default"
                className={`text-white bg-transparent hover:bg-transparent  px-4 md:px-6 cursor-pointer ${
                  selected === 'promover' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('promover')}
              >
                Home
              </Button>
              <Button
                variant="default"
                className={`text-white bg-transparent hover:bg-transparent px-4 md:px-6 cursor-pointer ${
                  selected === 'entrar' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => setSelected('entrar')}
              >
                Entrar
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
              <Link
                href="/mixs"
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'adicionar' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('adicionar');
                  setMobileMenuOpen(false);
                }}
              >
                Mixs
              </Link>
              <button
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'promover' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('promover');
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </button>
              <button
                className={`w-full text-center py-2 rounded-md ${
                  selected === 'entrar' ? 'border-2 border-yellow-400' : ''
                }`}
                onClick={() => {
                  setSelected('entrar');
                  setMobileMenuOpen(false);
                }}
              >
                Entrar
              </button>
            </div>
          )}
        </header>

        {/* Main Section */}
        <section className="mt-12 sm:mt-16 flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-xl space-y-6 text-center sm:text-left px-4 sm:px-0">
            <Badge
              variant="outline"
              className="text-yellow-400 border-yellow-400 px-3 py-1 inline-flex items-center gap-2"
            >
              <Monitor size={16} />
              MONITORAMENTO DE SERVIDORES
            </Badge>

            <p className="bg-yellow-800/20 p-4 rounded-xl border border-yellow-400/40 text-gray-100 text-base leading-relaxed">
              Acompanhe em tempo real os melhores servidores dos seus jogos
              favoritos.
              <br />
              DucksGaming traz a performance que você precisa.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

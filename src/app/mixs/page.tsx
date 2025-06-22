'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Crown, Pencil, Shuffle, Trash2, Users, XCircle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

type Funcao = 'Rifler' | 'AWP' | 'Support' | 'Entry Fragger';

type Jogador = {
  nickname: string;
  nivel: number;
  funcao: Funcao;
};

const FUNCOES: Funcao[] = ['Rifler', 'AWP', 'Support', 'Entry Fragger'];

const funcaoIcons = {
  Rifler: <Users className="text-blue-500" size={16} aria-label="Rifler" />,
  AWP: <Crown className="text-purple-500" size={16} aria-label="AWP" />,
  Support: <Users className="text-green-500" size={16} aria-label="Support" />,
  'Entry Fragger': (
    <Users className="text-orange-500" size={16} aria-label="Entry Fragger" />
  ),
};

function getNivelColor(nivel: number) {
  if (nivel <= 4) return 'bg-green-200 text-green-900';
  if (nivel <= 7) return 'bg-yellow-200 text-yellow-900';
  return 'bg-red-200 text-red-900';
}

function getFuncaoColor(funcao: Funcao) {
  switch (funcao) {
    case 'Rifler':
      return 'bg-blue-100 text-blue-800';
    case 'AWP':
      return 'bg-purple-100 text-purple-800';
    case 'Support':
      return 'bg-green-100 text-green-800';
    case 'Entry Fragger':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}

interface JogadorCardProps {
  jogador: Jogador;
  onEdit: () => void;
  onRemove: () => void;
}

function JogadorCard({ jogador, onEdit, onRemove }: JogadorCardProps) {
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex flex-col items-center text-center gap-2">
        <strong className="text-lg truncate">{jogador.nickname}</strong>
        <div className="flex gap-2 flex-wrap justify-center">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${getNivelColor(
              jogador.nivel
            )}`}
            aria-label={`Nível ${jogador.nivel}`}
          >
            Nível: {jogador.nivel}
          </span>
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${getFuncaoColor(
              jogador.funcao
            )}`}
            aria-label={`Função ${jogador.funcao}`}
          >
            {funcaoIcons[jogador.funcao]} {jogador.funcao}
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Editar jogador ${jogador.nickname}`}
            onClick={onEdit}
          >
            <Pencil className="text-blue-500" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Remover jogador ${jogador.nickname}`}
            onClick={onRemove}
          >
            <Trash2 className="text-red-500" size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface TimeCardProps {
  time: Jogador[];
  numero: number;
}

function TimeCard({ time, numero }: TimeCardProps) {
  const soma = useMemo(() => time.reduce((acc, j) => acc + j.nivel, 0), [time]);
  const maiorNivel = useMemo(
    () => Math.max(...time.map((j) => j.nivel)),
    [time]
  );

  return (
    <Card className="rounded-xl shadow-md">
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-center">Time {numero}</h3>
          <p className="text-sm text-muted-foreground text-center">
            Total de nível: {soma}
          </p>
        </div>
        <div className="space-y-2">
          {time.map((j, i) => {
            const ehCapitao = j.nivel === maiorNivel;
            return (
              <div
                key={i}
                className={`flex items-center justify-between p-2 rounded-lg shadow-sm ${getNivelColor(
                  j.nivel
                )}`}
              >
                <div className="flex items-center gap-2">
                  {ehCapitao && (
                    <Crown
                      size={16}
                      className="text-yellow-500"
                      aria-label="Capitão do time"
                    />
                  )}
                  <span className="font-semibold truncate">
                    {j.nickname} – Nível: {j.nivel}
                  </span>
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${getFuncaoColor(
                    j.funcao
                  )}`}
                  aria-label={`Função ${j.funcao}`}
                >
                  {funcaoIcons[j.funcao]} {j.funcao}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MixsPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [form, setForm] = useState<Jogador>({
    nickname: '',
    nivel: 1,
    funcao: 'Rifler',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [times, setTimes] = useState<[Jogador[], Jogador[]] | null>(null);
  const [balanceamento, setBalanceamento] = useState<number>(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ nickname?: string }>({});

  const handleChange = useCallback(
    (field: keyof Jogador, value: string | number) => {
      setForm((f) => ({ ...f, [field]: value }));
      setFormErrors({}); // limpar erros ao alterar
    },
    []
  );

  const abrirEdicao = useCallback(
    (index: number) => {
      setForm(jogadores[index]);
      setEditingIndex(index);
      setIsEditOpen(true);
      setFormErrors({});
    },
    [jogadores]
  );

  const fecharEdicao = useCallback(() => {
    setForm({ nickname: '', nivel: 1, funcao: 'Rifler' });
    setEditingIndex(null);
    setIsEditOpen(false);
    setFormErrors({});
  }, []);

  const validarForm = useCallback(() => {
    let valid = true;
    const errors: { nickname?: string } = {};

    if (!form.nickname.trim()) {
      errors.nickname = 'O nickname é obrigatório.';
      valid = false;
    } else {
      // Evitar nick duplicado (exceto se estiver editando o mesmo índice)
      const duplicado = jogadores.some(
        (j, i) =>
          j.nickname.toLowerCase() === form.nickname.trim().toLowerCase() &&
          i !== editingIndex
      );
      if (duplicado) {
        errors.nickname = 'Nickname já existe na lista.';
        valid = false;
      }
    }

    if (form.nivel < 1 || form.nivel > 10) {
      errors.nickname = 'Nível inválido.';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  }, [form, jogadores, editingIndex]);

  const salvarEdicao = useCallback(() => {
    if (!validarForm()) {
      toast.error('Corrija os erros antes de salvar.');
      return;
    }
    if (editingIndex === null) return;
    const atualizados = [...jogadores];
    atualizados[editingIndex] = form;
    setJogadores(atualizados);
    toast.success(`Jogador "${form.nickname}" editado com sucesso!`);
    fecharEdicao();
    setTimes(null);
    setBalanceamento(0);
  }, [form, jogadores, fecharEdicao, validarForm, editingIndex]);

  const adicionarJogador = useCallback(() => {
    if (!validarForm()) {
      toast.error('Corrija os erros antes de adicionar.');
      return;
    }
    if (jogadores.length >= 10) {
      toast.error('Limite de 10 jogadores atingido.');
      return;
    }
    setJogadores((j) => [...j, form]);
    toast.success(`Jogador "${form.nickname}" adicionado!`);
    setForm({ nickname: '', nivel: 1, funcao: 'Rifler' });
    setTimes(null);
    setBalanceamento(0);
  }, [form, jogadores, validarForm]);

  const removerJogador = useCallback(
    (index: number) => {
      setJogadores((j) => j.filter((_, i) => i !== index));
      toast.error('Jogador removido');
      setTimes(null);
      setBalanceamento(0);
      if (editingIndex === index) fecharEdicao();
    },
    [fecharEdicao, editingIndex]
  );

  const resetarTudo = useCallback(() => {
    setJogadores([]);
    setForm({ nickname: '', nivel: 1, funcao: 'Rifler' });
    setEditingIndex(null);
    setTimes(null);
    setBalanceamento(0);
    setFormErrors({});
    toast.warning('Todos os jogadores foram removidos');
  }, []);

  const sortearTimes = useCallback(() => {
    if (jogadores.length !== 10) {
      toast.error('Adicione exatamente 10 jogadores para sortear.');
      return;
    }
    setIsSorting(true);
    setTimeout(() => {
      const resultado = gerarTimes(jogadores);
      setTimes(resultado.melhor);
      setBalanceamento(resultado.percentualBalanceamento);
      toast.success('Times sorteados com sucesso!');
      setIsSorting(false);
    }, 500); // simular delay para UX
  }, [jogadores]);

  function gerarTimes(lista: Jogador[]) {
    let melhorDiferenca = Infinity;
    let melhor: [Jogador[], Jogador[]] = [[], []];
    let melhorSoma1 = 0;
    let melhorSoma2 = 0;

    for (let i = 0; i < 1000; i++) {
      const embaralhados = [...lista].sort(() => Math.random() - 0.5);
      const time1 = embaralhados.slice(0, 5);
      const time2 = embaralhados.slice(5);
      const soma1 = time1.reduce((acc, j) => acc + j.nivel, 0);
      const soma2 = time2.reduce((acc, j) => acc + j.nivel, 0);
      const diff = Math.abs(soma1 - soma2);
      if (diff < melhorDiferenca) {
        melhorDiferenca = diff;
        melhor = [time1, time2];
        melhorSoma1 = soma1;
        melhorSoma2 = soma2;
      }
    }

    const percentualBalanceamento = calcularBalanceamento(
      melhorSoma1,
      melhorSoma2
    );

    return { melhor, percentualBalanceamento };
  }

  function calcularBalanceamento(soma1: number, soma2: number) {
    const total = soma1 + soma2;
    const diff = Math.abs(soma1 - soma2);
    return 100 - (diff / total) * 100;
  }

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <h2 className="text-4xl font-bold text-center flex items-center justify-center gap-3">
        <Users size={36} aria-hidden /> Sorteador de Mixs
      </h2>

      {/* Formulário de cadastro */}
      <section aria-labelledby="form-titulo" className="space-y-4">
        <h3 id="form-titulo" className="sr-only">
          Cadastro de Jogadores
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            aria-label="Nickname do jogador"
            placeholder="Nickname"
            value={form.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
            autoComplete="off"
            spellCheck={false}
            maxLength={20}
            className={`${formErrors.nickname ? 'border-red-500' : ''} w-full`}
          />
          <Select
            onValueChange={(v) => handleChange('nivel', Number(v))}
            value={String(form.nivel)}
            aria-label="Selecione o nível do jogador"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  Nível {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(v) => handleChange('funcao', v)}
            value={form.funcao}
            aria-label="Selecione a função do jogador"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Função" />
            </SelectTrigger>
            <SelectContent>
              {FUNCOES.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {formErrors.nickname && (
          <p
            className="text-red-600 text-sm mt-1"
            role="alert"
            aria-live="assertive"
          >
            {formErrors.nickname}
          </p>
        )}

        <div className="flex gap-4 flex-wrap">
          {editingIndex === null ? (
            <Button onClick={adicionarJogador} disabled={isSorting}>
              Adicionar Jogador
            </Button>
          ) : (
            <>
              <Button onClick={salvarEdicao} disabled={isSorting}>
                Salvar Edição
              </Button>
              <Button
                variant="destructive"
                onClick={fecharEdicao}
                disabled={isSorting}
              >
                Cancelar
              </Button>
            </>
          )}
          <Button
            variant="destructive"
            onClick={resetarTudo}
            disabled={isSorting}
          >
            <XCircle className="mr-2" size={18} />
            Resetar Todos
          </Button>
        </div>
      </section>

      {/* Lista de jogadores */}
      {jogadores.length > 0 && (
        <section aria-labelledby="lista-jogadores-titulo">
          <h3 id="lista-jogadores-titulo" className="sr-only">
            Lista de jogadores adicionados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {jogadores.map((j, i) => (
              <JogadorCard
                key={i}
                jogador={j}
                onEdit={() => abrirEdicao(i)}
                onRemove={() => removerJogador(i)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Botão de sortear */}
      <div className="text-center">
        <Button
          variant="secondary"
          size="lg"
          onClick={sortearTimes}
          disabled={isSorting}
          aria-busy={isSorting}
          aria-label={isSorting ? 'Sorteando times...' : 'Sortear times'}
        >
          <Shuffle className="mr-2 animate-spin-slow" size={20} />
          {isSorting ? 'Sorteando...' : 'Sortear Times'}
        </Button>
      </div>

      {/* Resultado */}
      {times && (
        <section aria-live="polite" aria-atomic className="space-y-6">
          <div className="text-center space-y-2 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              Balanceamento entre os times:
            </p>
            <Progress
              value={balanceamento}
              className="h-3 w-full max-w-md mx-auto"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={balanceamento}
            />
            <p className="text-xs text-muted-foreground">
              {balanceamento.toFixed(1)}% equilibrado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {times.map((time, i) => (
              <TimeCard key={i} time={time} numero={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Modal de edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Jogador</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <Input
              aria-label="Editar nickname"
              placeholder="Nickname"
              value={form.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              autoFocus
              maxLength={20}
              spellCheck={false}
              className={formErrors.nickname ? 'border-red-500' : ''}
            />
            {formErrors.nickname && (
              <p
                className="text-red-600 text-sm mt-1"
                role="alert"
                aria-live="assertive"
              >
                {formErrors.nickname}
              </p>
            )}
            <Select
              onValueChange={(v) => handleChange('nivel', Number(v))}
              value={String(form.nivel)}
              aria-label="Editar nível"
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    Nível {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(v) => handleChange('funcao', v)}
              value={form.funcao}
              aria-label="Editar função"
            >
              <SelectTrigger>
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                {FUNCOES.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={fecharEdicao} disabled={isSorting}>
              Cancelar
            </Button>
            <Button onClick={salvarEdicao} disabled={isSorting}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

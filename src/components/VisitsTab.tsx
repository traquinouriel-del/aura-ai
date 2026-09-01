import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { RefreshCw, Clock, CalendarDays, CalendarRange, BarChart3, Users, UserX, Loader2, Trash2, X } from 'lucide-react';
import { useExitAnimation } from '@/lib/useExitAnimation';

type VisitStats = {
  today: number;
  week: number;
  month: number;
  total: number;
  anonymousToday: number;
  registeredToday: number;
};

const cardClass = 'rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-ink-900/50 p-3';
const labelClass = 'text-xs text-slate-600 dark:text-slate-400';
const valueTextClass = 'text-slate-900 dark:text-white';
const subtleClass = 'text-slate-500 dark:text-slate-500';

export default function VisitsTab() {
  const { language } = useSettings();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearing, setClearing] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const now = new Date();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const weekStart = new Date(todayStart);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const results = await Promise.allSettled([
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('created_at', weekStart.toISOString()),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).gte('created_at', monthStart.toISOString()),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).eq('is_anonymous', true).gte('created_at', todayStart.toISOString()),
        supabase.from('site_visits').select('*', { count: 'exact', head: true }).eq('is_anonymous', false).gte('created_at', todayStart.toISOString()),
      ]);

      const [todayR, weekR, monthR, totalR, anonR, regR] = results;
      if (todayR.status === 'fulfilled' && todayR.value.error) throw todayR.value.error;

      setStats({
        today: todayR.status === 'fulfilled' ? (todayR.value.count ?? 0) : 0,
        week: weekR.status === 'fulfilled' ? (weekR.value.count ?? 0) : 0,
        month: monthR.status === 'fulfilled' ? (monthR.value.count ?? 0) : 0,
        total: totalR.status === 'fulfilled' ? (totalR.value.count ?? 0) : 0,
        anonymousToday: anonR.status === 'fulfilled' ? (anonR.value.count ?? 0) : 0,
        registeredToday: regR.status === 'fulfilled' ? (regR.value.count ?? 0) : 0,
      });
    } catch {
      setError(t('admin.visitorsError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchStats();

    const channel = supabase
      .channel('visits-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_visits' }, () => fetchStats())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  const handleClearVisits = async () => {
    setClearing(true);
    try {
      await supabase.from('site_visits').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      setShowClearModal(false);
      fetchStats();
    } catch {
      // ignore
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-xs text-slate-500 dark:text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin mr-2" /> {t('admin.visitorsLoading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-xs text-red-500 dark:text-red-400">
        {error}
        <button onClick={fetchStats} className="block mx-auto mt-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline">
          {t('admin.usersRetry')}
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const temporalCards = [
    { label: t('admin.visitsToday'), value: stats.today, icon: Clock, accent: 'text-aura-zinc' },
    { label: t('admin.visitsWeek'), value: stats.week, icon: CalendarDays, accent: 'text-aura-slate' },
    { label: t('admin.visitsMonth'), value: stats.month, icon: CalendarRange, accent: 'text-aura-zinc' },
    { label: t('admin.visitsTotal'), value: stats.total, icon: BarChart3, accent: 'text-aura-slate' },
  ];

  return (
    <div className="space-y-5 pt-2">
      <div className={cardClass}>
        <div className={`flex items-center gap-1.5 text-xs mb-1 ${labelClass}`}>
          <BarChart3 className="w-3.5 h-3.5" /> {t('admin.visitsTitle')}
        </div>
        <p className={`text-[10px] mb-4 ${subtleClass}`}>Cliques e acessos ao link da Aura</p>
        <div className="grid grid-cols-2 gap-3">
          {temporalCards.map((c) => (
            <div key={c.label} className="rounded-xl p-3 bg-white/[0.04] border border-white/10">
              <div className={`flex items-center gap-1.5 text-[10px] ${labelClass} mb-1`}>
                <c.icon className={`w-3.5 h-3.5 ${c.accent}`} /> {c.label}
              </div>
              <div className={`text-2xl font-display font-bold tabular-nums ${valueTextClass}`}>
                {c.value.toLocaleString()}
              </div>
              <div className={`text-[10px] ${subtleClass}`}>visitas</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={cardClass}>
          <div className={`flex items-center gap-1.5 text-xs mb-1 ${labelClass}`}>
            <UserX className="w-3.5 h-3.5 text-aura-zinc" /> {t('admin.anonymousVisitors')}
          </div>
          <div className={`text-xl font-display font-bold tabular-nums ${valueTextClass}`}>{stats.anonymousToday}</div>
          <div className={`text-[10px] ${subtleClass}`}>hoje (sem conta)</div>
        </div>
        <div className={cardClass}>
          <div className={`flex items-center gap-1.5 text-xs mb-1 ${labelClass}`}>
            <Users className="w-3.5 h-3.5 text-aura-slate" /> {t('admin.registeredVisitors')}
          </div>
          <div className={`text-xl font-display font-bold tabular-nums ${valueTextClass}`}>{stats.registeredToday}</div>
          <div className={`text-[10px] ${subtleClass}`}>hoje (com conta)</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={fetchStats}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs ${labelClass} hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition`}
        >
          <RefreshCw className="w-3.5 h-3.5" /> {t('admin.metricsRefresh')}
        </button>
        <button
          onClick={() => setShowClearModal(true)}
          title={t('admin.deleteUser')}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <ClearVisitsModal
        open={showClearModal}
        clearing={clearing}
        onCancel={() => setShowClearModal(false)}
        onConfirm={handleClearVisits}
        t={t}
      />
    </div>
  );
}

function ClearVisitsModal({
  open,
  clearing,
  onCancel,
  onConfirm,
  t,
}: {
  open: boolean;
  clearing: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  t: (k: TranslationKey) => string;
}) {
  const { mounted, exiting } = useExitAnimation(open, 250);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!mounted || typeof document === 'undefined') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`}
        onClick={onCancel}
      />
      <div className={`relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 border border-white/15 ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}>
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-4 h-4" />
        </button>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-center mb-3 text-white">
          {t('admin.deleteUser')}
        </h2>
        <p className="text-sm text-slate-300 text-center leading-relaxed mb-7">
          {t('admin.deleteFromAppDesc')}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={clearing}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-white/10 text-slate-200 hover:bg-white/5 transition disabled:opacity-50"
          >
            {t('admin.cancelDelete')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={clearing}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition btn-gradient disabled:opacity-50"
          >
            {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 text-white" />}
            {t('admin.deleteConfirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Shield, Activity, Users, BarChart3, RefreshCw,
  UserCheck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';

import UsersTab from '@/components/UsersTab';
import VisitsTab from '@/components/VisitsTab';

type TabId = 'metricas' | 'utilizadores' | 'visitas';

type Metrics = {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  restrictedUsers: number;
  totalReferrals: number;
};

const cardClass = 'rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-ink-900/50 p-3';
const labelClass = 'text-xs text-slate-600 dark:text-slate-400';
const valueTextClass = 'text-slate-900 dark:text-white';
const subtleClass = 'text-slate-500 dark:text-slate-500';

const TABS: { id: TabId; label: string; icon: typeof Users }[] = [
  { id: 'metricas', label: 'Utilizadores e Métricas', icon: Users },
  { id: 'utilizadores', label: 'Gestão de Utilizadores', icon: UserCheck },
  { id: 'visitas', label: 'Tráfego e Visitas', icon: BarChart3 },
];

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>('metricas');
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-[80] w-10 h-10 rounded-xl glass flex items-center justify-center text-aura-slate hover:text-white hover:bg-white/10 transition shadow-lg"
        title="Painel de Administração"
      >
        <Shield className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-16 right-4 z-40 w-[28rem] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl animate-fade-up max-h-[78vh] flex flex-col bg-white dark:bg-ink-900/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 px-4 pt-4 pb-2">
            <Shield className="w-4 h-4 text-aura-slate" />
            <h3 className={`font-display text-sm font-bold ${valueTextClass}`}>Painel de Administração</h3>
            <span className={`ml-auto text-xs flex items-center gap-1 ${labelClass}`}>
              <Activity className="w-3 h-3" /> em direto
            </span>
          </div>

          <div className="flex gap-1 px-3 pb-2 overflow-x-auto">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                    active
                      ? 'bg-aura-slate/20 text-aura-slate'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="overflow-y-auto px-4 pb-4">
            {tab === 'metricas' && <MetricsTab />}
            {tab === 'utilizadores' && <UsersTab />}
            {tab === 'visitas' && <VisitsTab />}
          </div>
        </div>
      )}
    </>
  );
}

function MetricsTab() {
  const { language } = useSettings();
  const t = useCallback((k: TranslationKey) => translate(language, k), [language]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.allSettled([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('banned', false).eq('restricted', false),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('banned', true),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('restricted', true),
      ]);

      const [totalR, activeR, bannedR, restrictedR] = results;
      if (totalR.status === 'rejected' || (totalR.status === 'fulfilled' && totalR.value.error)) throw new Error('DB error');

      const { data: referralData } = await supabase.from('profiles').select('referral_count');
      const totalReferrals = referralData?.reduce((sum, u) => sum + (u.referral_count || 0), 0) ?? 0;

      setMetrics({
        totalUsers: totalR.status === 'fulfilled' ? (totalR.value.count ?? 0) : 0,
        activeUsers: activeR.status === 'fulfilled' ? (activeR.value.count ?? 0) : 0,
        bannedUsers: bannedR.status === 'fulfilled' ? (bannedR.value.count ?? 0) : 0,
        restrictedUsers: restrictedR.status === 'fulfilled' ? (restrictedR.value.count ?? 0) : 0,
        totalReferrals,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.metricsError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchMetrics();

    const channel = supabase
      .channel('metrics-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => fetchMetrics())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMetrics]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-8 text-xs ${labelClass}`}>
        <RefreshCw className="w-4 h-4 animate-spin mr-2" /> {t('admin.metricsLoading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-xs text-red-500 dark:text-red-400">
        {error}
        <button onClick={fetchMetrics} className={`block mx-auto mt-2 ${labelClass} hover:text-slate-900 dark:hover:text-white underline`}>
          {t('admin.metricsRetry')}
        </button>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="space-y-5 pt-2">
      <div className={cardClass}>
        <div className={`flex items-center gap-1.5 text-xs mb-1 ${labelClass}`}>
          <Activity className="w-3.5 h-3.5" /> {t('admin.metricsTemporalTitle')}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { label: t('admin.metricsUsers'), value: metrics.totalUsers },
            { label: t('admin.activeUsers'), value: metrics.activeUsers },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl p-3 bg-white/[0.04] border border-white/10`}>
              <div className={`text-[10px] ${labelClass} mb-1`}>{c.label}</div>
              <div className={`text-2xl font-display font-bold tabular-nums ${valueTextClass}`}>
                {c.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={UserCheck} label={t('admin.activeUsers')} value={metrics.activeUsers} />
        <StatCard icon={Users} label={t('admin.referrals')} value={metrics.totalReferrals} />
      </div>

      {(metrics.bannedUsers > 0 || metrics.restrictedUsers > 0) && (
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Shield} label={t('admin.banned')} value={metrics.bannedUsers} />
          <StatCard icon={Shield} label={t('admin.restricted')} value={metrics.restrictedUsers} />
        </div>
      )}

      <button
        onClick={fetchMetrics}
        className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs ${labelClass} hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition`}
      >
        <RefreshCw className="w-3.5 h-3.5" /> {t('admin.metricsRefresh')}
      </button>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) {
  return (
    <div className={cardClass}>
      <div className={`flex items-center gap-1.5 text-xs mb-1 ${labelClass}`}>
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className={`text-xl font-display font-bold tabular-nums ${valueTextClass}`}>{value}</div>
    </div>
  );
}

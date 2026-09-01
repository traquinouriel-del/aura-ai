import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { RefreshCw, Ban, ShieldCheck, UserCheck, AlertTriangle, Loader2, Trash2, X, Users2, ChevronDown, ChevronUp } from 'lucide-react';
import { useExitAnimation } from '@/lib/useExitAnimation';

type UserProfile = {
  id: string;
  email: string;
  first_name: string | null;
  banned: boolean;
  restricted: boolean;
  created_at: string;
  referral_code: string | null;
  referral_count: number;
  referred_by: string | null;
};

type DeleteMode = 'panel' | 'app' | null;

export default function UsersTab() {
  const { language } = useSettings();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserProfile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [expandedReferrals, setExpandedReferrals] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('id, email, first_name, banned, restricted, created_at, referral_code, referral_count, referred_by')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setUsers((data ?? []) as UserProfile[]);
    } catch {
      setError(t('admin.usersError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel('profiles-admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUsers]);

  const toggleBan = async (user: UserProfile) => {
    setUpdating(user.id);
    try {
      const { error: err } = await supabase
        .from('profiles')
        .update({ banned: !user.banned })
        .eq('id', user.id);
      if (err) throw err;
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, banned: !u.banned } : u));
    } catch {
      // ignore
    } finally {
      setUpdating(null);
    }
  };

  const toggleRestrict = async (user: UserProfile) => {
    setUpdating(user.id);
    try {
      const { error: err } = await supabase
        .from('profiles')
        .update({ restricted: !user.restricted })
        .eq('id', user.id);
      if (err) throw err;
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, restricted: !u.restricted } : u));
    } catch {
      // ignore
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (mode: DeleteMode) => {
    if (!deleteTarget || !mode) return;
    setDeleting(true);
    try {
      if (mode === 'panel') {
        setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      } else if (mode === 'app') {
        await supabase.from('suitors').delete().eq('user_id', deleteTarget.id);
        await supabase.from('pretendente_reports').delete().eq('user_id', deleteTarget.id);
        await supabase.from('profiles').delete().eq('id', deleteTarget.id);
        setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      }
      setDeleteTarget(null);
    } catch {
      // ignore
    } finally {
      setDeleting(false);
    }
  };

  const activeUsers = users.filter((u) => !u.banned).length;
  const totalReferrals = users.reduce((sum, u) => sum + (u.referral_count || 0), 0);

  const getInvitedEmails = useCallback((userId: string) => {
    return users.filter((u) => u.referred_by === userId);
  }, [users]);

  const getInviterName = useCallback((referredById: string | null) => {
    if (!referredById) return null;
    const inviter = users.find((u) => u.id === referredById);
    return inviter ? (inviter.first_name || inviter.email) : null;
  }, [users]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-xs text-slate-500 dark:text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin mr-2" /> {t('admin.usersLoading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-xs text-red-500 dark:text-red-400">
        {error}
        <button onClick={fetchUsers} className="block mx-auto mt-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline">
          {t('admin.usersRetry')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-600 dark:text-slate-400">
          {t('admin.usersList')} ({users.length}) · {t('admin.activeUsers')}: {activeUsers} · {t('admin.referrals')}: {totalReferrals}
        </span>
        <button onClick={fetchUsers} className="text-xs text-slate-500 dark:text-slate-400 hover:text-aura-slate transition-colors">
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2.5 max-h-[50vh] overflow-y-auto">
        {users.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">Sem utilizadores.</p>
        ) : (
          users.map((u) => (
            <div key={u.id} className="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-ink-900/50 p-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                    {u.first_name || u.email}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{u.email}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {u.banned && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 font-medium">
                      {t('admin.banned')}
                    </span>
                  )}
                  {u.restricted && !u.banned && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium">
                      {t('admin.restricted')}
                    </span>
                  )}
                  {!u.banned && !u.restricted && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
                      {t('admin.active')}
                    </span>
                  )}
                  <button
                    onClick={() => toggleBan(u)}
                    disabled={updating === u.id}
                    title={u.banned ? t('admin.unban') : t('admin.ban')}
                    className={`p-1 rounded transition-colors disabled:opacity-50 ${u.banned ? 'hover:bg-emerald-50 dark:hover:bg-emerald-500/10' : 'hover:bg-red-50 dark:hover:bg-red-500/10'}`}
                  >
                    {updating === u.id ? (
                      <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                    ) : u.banned ? (
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Ban className="w-3 h-3 text-red-500" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleRestrict(u)}
                    disabled={updating === u.id}
                    title={u.restricted ? t('admin.unrestrict') : t('admin.restrict')}
                    className={`p-1 rounded transition-colors disabled:opacity-50 ${u.restricted ? 'hover:bg-emerald-50 dark:hover:bg-emerald-500/10' : 'hover:bg-amber-50 dark:hover:bg-amber-500/10'}`}
                  >
                    {updating === u.id ? (
                      <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                    ) : u.restricted ? (
                      <UserCheck className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(u)}
                    title={t('admin.deleteUser')}
                    className="p-1 rounded transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-600 mt-1">
                {new Date(u.created_at).toLocaleDateString('pt-PT')}
              </div>
              {/* Referral info */}
              <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Users2 className="w-3 h-3 text-aura-slate" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t('admin.referralCount')}: <span className="font-semibold text-slate-700 dark:text-slate-300">{u.referral_count || 0}</span>
                  </span>
                  {u.referral_count > 0 && (
                    <button
                      onClick={() => setExpandedReferrals(expandedReferrals === u.id ? null : u.id)}
                      className="ml-auto p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                    >
                      {expandedReferrals === u.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                </div>
                {u.referral_code && (
                  <div className="text-[9px] text-slate-400 dark:text-slate-600">
                    Code: <code className="font-mono text-slate-500 dark:text-slate-400">{u.referral_code}</code>
                  </div>
                )}
                {u.referred_by && (
                  <div className="text-[9px] text-slate-400 dark:text-slate-600">
                    {t('admin.invitedBy')}: <span className="text-slate-500 dark:text-slate-400">{getInviterName(u.referred_by) || u.referred_by.slice(0, 8)}</span>
                  </div>
                )}
                {expandedReferrals === u.id && u.referral_count > 0 && (
                  <div className="mt-1.5 pl-4 space-y-0.5">
                    {getInvitedEmails(u.id).map((invited) => (
                      <div key={invited.id} className="text-[9px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-aura-slate" />
                        {invited.email}
                      </div>
                    ))}
                    {getInvitedEmails(u.id).length === 0 && (
                      <div className="text-[9px] text-slate-400 italic">—</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteUserModal
        user={deleteTarget}
        deleting={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        t={t}
      />
    </div>
  );
}

function DeleteUserModal({
  user,
  deleting,
  onCancel,
  onConfirm,
  t,
}: {
  user: UserProfile | null;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: (mode: DeleteMode) => void;
  t: (k: TranslationKey) => string;
}) {
  const [selectedMode, setSelectedMode] = useState<DeleteMode>(null);
  const { mounted, exiting } = useExitAnimation(!!user, 250);

  useEffect(() => {
    if (!user) setSelectedMode(null);
  }, [user]);

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

        <h2 className="font-display text-xl sm:text-2xl font-bold text-center mb-2 text-white">
          {t('admin.deleteUser')}
        </h2>
        <p className="text-sm text-slate-300 text-center leading-relaxed mb-6">
          {t('admin.deleteUserDesc')}
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setSelectedMode('panel')}
            className={`w-full text-left p-4 rounded-xl border transition ${
              selectedMode === 'panel'
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Trash2 className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">{t('admin.deleteFromPanel')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{t('admin.deleteFromPanelDesc')}</p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMode('app')}
            className={`w-full text-left p-4 rounded-xl border transition ${
              selectedMode === 'app'
                ? 'border-red-400 bg-red-500/10'
                : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">{t('admin.deleteFromApp')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{t('admin.deleteFromAppDesc')}</p>
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-white/10 text-slate-200 hover:bg-white/5 transition disabled:opacity-50"
          >
            {t('admin.cancelDelete')}
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selectedMode)}
            disabled={!selectedMode || deleting}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 text-white" />}
            {t('admin.deleteConfirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

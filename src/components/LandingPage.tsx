import { useState, useCallback, useEffect, type ReactNode } from 'react';
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Coffee,
  HeartCrack,
  MessagesSquare,
  Edit3,
  Smile,
  Flame,
  Zap,
  HeartPulse,
  SlidersHorizontal,
  ArrowRight,
  ScanLine,
  Brain,
  Shield,
  Layers,
  Wand2,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import AuraLogo from './AuraLogo';
import PhoneMockup from './PhoneMockup';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSettings } from '@/lib/settings';
import { translateLanding, type LandingKey } from '@/lib/landingI18n';
import { translate, type TranslationKey } from '@/lib/i18n';

type Props = {
  onTryNow: () => void;
  onLogin: () => void;
  onSignUp: () => void;
};

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {children}
        </h2>
        {sub && (
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">{sub}</p>
        )}
      </Reveal>
    </div>
  );
}

export default function LandingPage({ onTryNow, onLogin, onSignUp }: Props) {
  const { language } = useSettings();
  const t = (k: LandingKey) => translateLanding(language, k);
  const ti = (k: TranslationKey) => translate(language, k);

  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileNav(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const NAV_LINKS: { label: string; id: string }[] = [
    { label: t('nav.features'), id: 'recursos' },
    { label: t('nav.howItWorks'), id: 'como-funciona' },
    { label: t('nav.examples'), id: 'exemplos' },
    { label: t('nav.faq'), id: 'faq' },
  ];

  const STATS = [
    { value: '30+', label: t('stats.contexts') },
    { value: '20+', label: t('stats.tones') },
    { value: '6', label: t('stats.styles') },
    { value: '5', label: t('stats.languages') },
  ];

  const STEPS = [
    { num: '01', icon: MessagesSquare, title: t('how.step1Title'), desc: t('how.step1Desc') },
    { num: '02', icon: SlidersHorizontal, title: t('how.step2Title'), desc: t('how.step2Desc') },
    { num: '03', icon: ImageIcon, title: t('how.step3Title'), desc: t('how.step3Desc') },
    { num: '04', icon: Wand2, title: t('how.step4Title'), desc: t('how.step4Desc') },
  ];

  const CONTEXTS_LIST = [
    { icon: MessagesSquare, name: ti('ctx.puxar-assunto.label'), desc: ti('ctx.puxar-assunto.desc') },
    { icon: Sparkles, name: ti('ctx.quebrar-gelo.label'), desc: ti('ctx.quebrar-gelo.desc') },
    { icon: MessageSquare, name: ti('ctx.flertar.label'), desc: ti('ctx.flertar.desc') },
    { icon: ImageIcon, name: ti('ctx.reagir-foto.label'), desc: ti('ctx.reagir-foto.desc') },
    { icon: Coffee, name: ti('ctx.convidar-sair.label'), desc: ti('ctx.convidar-sair.desc') },
    { icon: MessagesSquare, name: ti('ctx.manter-conversa.label'), desc: ti('ctx.manter-conversa.desc') },
    { icon: HeartCrack, name: ti('ctx.dar-fora.label'), desc: ti('ctx.dar-fora.desc') },
    { icon: Edit3, name: ti('ctx.personalizado.label'), desc: ti('ctx.personalizado.desc') },
  ];

  const TONES_LIST = [
    { icon: Smile, name: ti('tone.divertido'), color: 'text-amber-300' },
    { icon: Flame, name: ti('tone.provocador'), color: 'text-orange-400' },
    { icon: Zap, name: ti('tone.direto'), color: 'text-sky-300' },
    { icon: HeartPulse, name: ti('tone.picante'), color: 'text-red-500' },
    { icon: SlidersHorizontal, name: ti('tone.outro'), color: 'text-aura-zinc' },
  ];

  const FEATURES = [
    { icon: Brain, title: t('features.contextTitle'), desc: t('features.contextDesc') },
    { icon: SlidersHorizontal, title: t('features.toneTitle'), desc: t('features.toneDesc') },
    { icon: ScanLine, title: t('features.screenshotTitle'), desc: t('features.screenshotDesc') },
    { icon: Edit3, title: t('features.customTitle'), desc: t('features.customDesc') },
    { icon: Layers, title: t('features.multiTitle'), desc: t('features.multiDesc') },
    { icon: Shield, title: t('features.privacyTitle'), desc: t('features.privacyDesc') },
  ];

  const FAQ = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ];

  const SIM_CONVERSATION = [
    { side: 'left', text: t('examples.msg1') },
    { side: 'right', text: t('examples.msg2') },
    { side: 'left', text: t('examples.msg3') },
  ];

  const SIM_RESPONSES = [
    { label: ti('style.ideal.label'), text: t('examples.respIdeal'), highlight: true },
    { label: ti('style.sedutora.label'), text: t('examples.respSedutora') },
    { label: ti('style.informal.label'), text: t('examples.respInformal') },
    { label: ti('style.romantica.label'), text: t('examples.respRomantica') },
    { label: ti('style.provocadora.label'), text: t('examples.respProvocadora') },
    { label: ti('style.picante.label'), text: t('examples.respPicante') },
  ];

  const SCREENSHOT_STEPS = [
    t('screenshot.step1'), t('screenshot.step2'), t('screenshot.step3'), t('screenshot.step4'),
  ];

  return (
    <div className="min-h-screen">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40">
        <div
          className={`transition-all duration-300 ${
            scrolled ? 'bg-ink-900/60 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent border-b border-transparent'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Brand */}
              <button
                onClick={() => scrollTo('hero')}
                className="flex items-center gap-2.5 shrink-0 group cursor-pointer"
                aria-label="Aura — home"
              >
                <div className="relative w-9 h-9 rounded-xl bg-aura-gradient flex items-center justify-center shadow-lg shadow-aura-slate/30 transition-transform group-hover:scale-105">
                  <AuraLogo className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <p className="font-display font-bold text-white text-base tracking-tight">Aura AI</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{t('nav.brandTag')}</p>
                </div>
              </button>

              {/* Desktop nav links */}
              <nav className="ml-auto hidden md:flex items-center gap-6">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-sm font-medium text-slate-400 hover:text-white transition"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>

              {/* Desktop auth */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={onLogin}
                  className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-1.5"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={onSignUp}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-white btn-gradient transition"
                >
                  {t('nav.createAccount')}
                </button>
              </div>

              {/* Mobile: auth buttons inline + menu toggle */}
              <div className="ml-auto flex items-center gap-2 md:hidden">
                <button
                  onClick={onLogin}
                  className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-1.5"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={onSignUp}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold text-white btn-gradient transition"
                >
                  {t('nav.createAccount')}
                </button>
                <button
                  onClick={() => setMobileNav((v) => !v)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition"
                  aria-label={t('nav.features')}
                >
                  {mobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileNav && (
          <>
            <div
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileNav(false)}
            />
            <div className="md:hidden fixed top-[64px] left-0 right-0 z-40 px-4 animate-fade-up">
              <div className="glass rounded-2xl p-3 space-y-1">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-aura-slate/8 blur-[100px] animate-drift" />
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-aura-zinc/6 blur-[90px] animate-drift" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-aura-zinc" />
                  {t('hero.badge')}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span className="text-white">{t('hero.title1')}</span>
                  <br />
                  <span className="text-gradient">{t('hero.title2')}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-slate-400 mt-5 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
                  <button
                    onClick={onTryNow}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-semibold text-white btn-gradient transition-all duration-300 hover:scale-[1.02]"
                  >
                    {t('hero.ctaTry')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollTo('como-funciona')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-medium text-slate-200 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  >
                    {t('hero.ctaHowItWorks')}
                  </button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative">
              <div className="relative flex justify-center items-center min-h-[480px]">
                <div className="absolute left-0 sm:left-4 top-8 opacity-50 scale-90 hidden sm:block">
                  <PhoneMockup floating delay={1}>
                    <HeroPhoneContent variant="tones" t={t} ti={ti} />
                  </PhoneMockup>
                </div>
                <div className="relative z-10">
                  <PhoneMockup floating>
                    <HeroPhoneContent variant="main" t={t} ti={ti} />
                  </PhoneMockup>
                </div>
                <div className="absolute right-0 sm:right-4 top-12 opacity-50 scale-90 hidden sm:block">
                  <PhoneMockup floating delay={2}>
                    <HeroPhoneContent variant="responses" t={t} ti={ti} />
                  </PhoneMockup>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="glass-soft rounded-2xl px-6 py-6 sm:py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-gradient">{s.value}</p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="como-funciona" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle sub={t('how.subtitle')}>
            {t('how.title')}
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div className="glass rounded-2xl p-6 h-full hover:border-white/20 transition group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-aura-gradient group-hover:border-transparent transition">
                        <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition" />
                      </div>
                      <span className="font-display text-2xl font-bold text-white/10">{step.num}</span>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1.5">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contexts ── */}
      <section id="recursos" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle sub={t('contexts.subtitle')}>
            {t('contexts.title')}
          </SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CONTEXTS_LIST.map((ctx, i) => {
              const Icon = ctx.icon;
              return (
                <Reveal key={ctx.name} delay={i * 0.05}>
                  <div className="glass-soft rounded-2xl p-5 hover:border-aura-slate/40 hover:bg-aura-slate/[0.05] transition group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3 group-hover:bg-aura-gradient group-hover:border-transparent transition">
                      <Icon className="w-4.5 h-4.5 text-slate-300 group-hover:text-white transition" />
                    </div>
                    <p className="font-semibold text-sm text-white">{ctx.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{ctx.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tones ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle sub={t('tones.subtitle')}>
            {t('tones.title')}
          </SectionTitle>
          <Reveal>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {TONES_LIST.map((tone) => {
                  const Icon = tone.icon;
                  return (
                    <div
                      key={tone.name}
                      className="flex flex-col items-center justify-center gap-2.5 py-5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition"
                    >
                      <Icon className={`w-7 h-7 ${tone.color}`} />
                      <span className="text-sm font-medium text-slate-200">{tone.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Screenshot feature ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="flex justify-center">
                <PhoneMockup floating>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ScanLine className="w-4 h-4 text-aura-zinc" />
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{t('phone.screenshotLabel')}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-ink-800/60 p-3">
                      <div className="space-y-2">
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-xl rounded-bl-md bg-ink-700/80 px-3 py-2 text-xs text-slate-200">
                            {t('phone.msgReceived')}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="max-w-[80%] rounded-xl rounded-br-md bg-aura-gradient px-3 py-2 text-xs text-white font-medium">
                            {t('phone.msgReply')}
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-xl rounded-bl-md bg-ink-700/80 px-3 py-2 text-xs text-slate-200">
                            {t('phone.msgFollowUp')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-1">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-aura-slate/30" />
                      <ScanLine className="w-4 h-4 text-aura-zinc animate-pulse-soft" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-aura-slate/30" />
                    </div>
                    <div className="rounded-xl bg-aura-gradient/10 border border-aura-zinc/30 p-3 animate-bubble-in">
                      <p className="text-xs text-slate-100 leading-relaxed">
                        {t('phone.screenshotCaption')}
                      </p>
                    </div>
                  </div>
                </PhoneMockup>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="order-1 lg:order-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                {t('screenshot.title')}
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                {t('screenshot.desc')}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {SCREENSHOT_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/10 text-slate-200">
                      {step}
                    </span>
                    {i < 3 && <ArrowRight className="w-4 h-4 text-slate-500" />}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Example conversation ── */}
      <section id="exemplos" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle sub={t('examples.subtitle')}>
            {t('examples.title')}
          </SectionTitle>

          <Reveal>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="flex justify-center">
                <PhoneMockup floating>
                  <div className="space-y-2.5">
                    <div className="text-center mb-2">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{t('examples.conversationLabel')}</p>
                    </div>
                    {SIM_CONVERSATION.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'} animate-bubble-in`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                            msg.side === 'right'
                              ? 'rounded-br-md bg-aura-gradient text-white font-medium'
                              : 'rounded-bl-md bg-ink-700/80 text-slate-200'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </PhoneMockup>
              </div>

              <div className="space-y-3">
                {SIM_RESPONSES.map((resp, i) => (
                  <Reveal key={resp.label} delay={i * 0.08}>
                    <div
                      className={`rounded-xl p-4 transition ${
                        resp.highlight
                          ? 'bg-aura-gradient/10 border border-aura-zinc/40 shadow-lg shadow-aura-zinc/10'
                          : 'glass-soft hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {resp.highlight ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-white btn-gradient">
                            <Sparkles className="w-3 h-3 shrink-0" />
                            {resp.label}
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-aura-slate/15 text-aura-slate border border-aura-slate/20">
                            {resp.label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-100 leading-relaxed">{resp.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle sub={t('features.subtitle')}>
            {t('features.title')}
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full hover:border-white/20 transition group">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4 group-hover:bg-aura-gradient group-hover:border-transparent transition">
                      <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1.5">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Value statement ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                <span className="text-white">{t('value.title1')}</span>
                <br />
                <span className="text-gradient">{t('value.title2')}</span>
              </h2>
              <p className="text-slate-400 mt-5 max-w-xl mx-auto leading-relaxed">
                {t('value.desc')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle>
            {t('faq.title')}
          </SectionTitle>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="glass-soft rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-white">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 animate-fade-up">
                      <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="glass-strong rounded-3xl px-6 py-12 sm:py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-aura-slate/10 blur-[80px]" />
              </div>
              <div className="relative">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                  {t('cta.title')}
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto mb-8">
                  {t('cta.desc')}
                </p>
                <button
                  onClick={onTryNow}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold text-white btn-gradient transition-all duration-300 hover:scale-[1.02]"
                >
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-aura-gradient flex items-center justify-center">
                  <AuraLogo className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <p className="font-display font-bold text-white text-sm">Aura AI</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{t('nav.brandTag')}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.14em] mb-3">{t('footer.product')}</p>
              <ul className="space-y-2">
                <li><button onClick={() => scrollTo('recursos')} className="text-sm text-slate-400 hover:text-white transition">{t('nav.features')}</button></li>
                <li><button onClick={() => scrollTo('como-funciona')} className="text-sm text-slate-400 hover:text-white transition">{t('nav.howItWorks')}</button></li>
                <li><button onClick={() => scrollTo('exemplos')} className="text-sm text-slate-400 hover:text-white transition">{t('nav.examples')}</button></li>
                <li><button onClick={() => scrollTo('faq')} className="text-sm text-slate-400 hover:text-white transition">{t('nav.faq')}</button></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.14em] mb-3">{t('footer.company')}</p>
              <ul className="space-y-2">
                <li><span className="text-sm text-slate-400">{t('footer.about')}</span></li>
                <li><span className="text-sm text-slate-400">{t('footer.contact')}</span></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.14em] mb-3">{t('footer.account')}</p>
              <ul className="space-y-2">
                <li><button onClick={onLogin} className="text-sm text-slate-400 hover:text-white transition">{t('footer.login')}</button></li>
                <li><button onClick={onSignUp} className="text-sm text-slate-400 hover:text-white transition">{t('footer.createAccount')}</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-aura-gradient flex items-center justify-center">
                <AuraLogo className="w-3 h-3" />
              </div>
              <p className="text-xs text-slate-500">{t('footer.rights')}</p>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-xs text-slate-500 hover:text-slate-300 transition cursor-default">{t('footer.privacy')}</span>
              <span className="text-xs text-slate-500 hover:text-slate-300 transition cursor-default">{t('footer.terms')}</span>
              <p className="text-xs text-slate-600">{t('footer.builtBy')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Phone content variants for the hero ── */
function HeroPhoneContent({
  variant,
  t,
  ti,
}: {
  variant: 'main' | 'tones' | 'responses';
  t: (k: LandingKey) => string;
  ti: (k: TranslationKey) => string;
}) {
  if (variant === 'tones') {
    return (
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400 mb-2">{t('phone.toneLabel')}</p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: Smile, name: ti('tone.divertido'), color: 'text-amber-300' },
            { icon: Flame, name: ti('tone.provocador'), color: 'text-orange-400' },
            { icon: Zap, name: ti('tone.direto'), color: 'text-sky-300' },
            { icon: HeartPulse, name: ti('tone.picante'), color: 'text-red-500' },
          ].map((tone) => {
            const Icon = tone.icon;
            return (
              <div key={tone.name} className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <Icon className={`w-5 h-5 ${tone.color}`} />
                <span className="text-[11px] text-slate-300">{tone.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'responses') {
    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-aura-zinc animate-pulse-soft" />
          <p className="text-xs font-semibold text-white">{t('phone.responsesLabel')}</p>
        </div>
        {[
          { label: ti('style.ideal.label'), text: t('examples.respIdeal'), highlight: true },
          { label: ti('style.sedutora.label'), text: t('examples.respSedutora') },
          { label: ti('style.informal.label'), text: t('examples.respInformal') },
        ].map((r, i) => (
          <div
            key={r.label}
            className={`rounded-lg p-2.5 animate-bubble-in ${r.highlight ? 'bg-aura-gradient/10 border border-aura-zinc/30' : 'bg-white/[0.04] border border-white/8'}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${r.highlight ? 'text-white btn-gradient' : 'bg-aura-slate/15 text-aura-slate'}`}>
              {r.label}
            </span>
            <p className="text-[11px] text-slate-100 mt-1.5 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    );
  }

  // main variant
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-lg bg-aura-gradient flex items-center justify-center">
          <AuraLogo className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs font-bold text-white">Aura AI</p>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">{t('phone.contextLabel')}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            ti('ctx.flertar.label'),
            ti('ctx.convidar-sair.label'),
          ].map((c) => (
            <div key={c} className="px-2 py-1.5 rounded-lg border border-aura-slate/40 bg-aura-slate/10 text-[10px] text-white text-center">
              {c}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">{t('phone.messageLabel')}</p>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
          <p className="text-[11px] text-slate-300 leading-relaxed">{t('examples.msg1')}</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">{t('phone.screenshotLabel')}</p>
        <div className="rounded-lg border-2 border-dashed border-white/15 p-2.5 text-center">
          <ImageIcon className="w-4 h-4 text-slate-500 mx-auto" />
          <p className="text-[9px] text-slate-500 mt-1">{t('phone.optional')}</p>
        </div>
      </div>

      <div className="rounded-xl btn-gradient py-2.5 text-center">
        <span className="text-[11px] font-semibold text-white">{t('phone.generate')}</span>
      </div>
    </div>
  );
}

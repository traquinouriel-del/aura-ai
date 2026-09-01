import type { Language } from './settings';

export type TranslationKey =
  // Nav
  | 'nav.gerador'
  | 'nav.melhorar'
  | 'nav.dicas'
  | 'nav.perfil'
  | 'nav.entrar'
  | 'nav.criarConta'
  | 'nav.sair'
  | 'nav.brandTag'
  | 'nav.user'
  // Common
  | 'common.copy'
  | 'common.copied'
  | 'common.loading'
  | 'common.errorTitle'
  | 'common.menu'
  | 'common.close'
  | 'common.paste'
  | 'common.clear'
  // Generator tab
  | 'gen.badge'
  | 'gen.titleA'
  | 'gen.titleB'
  | 'gen.subtitle'
  | 'gen.contextLabel'
  | 'gen.toneLabel'
  | 'gen.messageLabel'
  | 'gen.messagePlaceholder'
  | 'gen.screenshotLabel'
  | 'gen.screenshotAlt'
  | 'gen.screenshotRemove'
  | 'gen.dropText'
  | 'gen.dropHint'
  | 'gen.generate'
  | 'gen.copy'
  | 'gen.generating'
  | 'gen.readingImage'
  | 'gen.customContextPlaceholder'
  | 'gen.errorNoContext'
  | 'gen.errorGeneric'
  | 'gen.errorFriendly'
  | 'gen.errorImageFormat'
  | 'gen.errorImageSize'
  | 'gen.errorImageRead'
  | 'gen.errorImageProcess'
  | 'gen.pretendenteTitle'
  | 'gen.pretendenteSubtitle'
  | 'gen.pretendenteName'
  | 'gen.pretendenteVinculo'
  | 'gen.perfilPsicologico'
  | 'gen.dicasAbordagem'
  | 'gen.pretendenteGenerate'
  // Contexts
  | 'ctx.puxar-assunto.label'
  | 'ctx.puxar-assunto.desc'
  | 'ctx.quebrar-gelo.label'
  | 'ctx.quebrar-gelo.desc'
  | 'ctx.flertar.label'
  | 'ctx.flertar.desc'
  | 'ctx.reagir-foto.label'
  | 'ctx.reagir-foto.desc'
  | 'ctx.convidar-sair.label'
  | 'ctx.convidar-sair.desc'
  | 'ctx.manter-conversa.label'
  | 'ctx.manter-conversa.desc'
  | 'ctx.dar-fora.label'
  | 'ctx.dar-fora.desc'
  | 'ctx.personalizado.label'
  | 'ctx.personalizado.desc'
  // Tones
  | 'tone.divertido'
  | 'tone.provocador'
  | 'tone.direto'
  | 'tone.picante'
  | 'tone.outro'
  | 'tone.customPlaceholder'
  // Response styles
  | 'style.ideal.label'
  | 'style.ideal.desc'
  | 'style.sedutora.label'
  | 'style.sedutora.desc'
  | 'style.informal.label'
  | 'style.informal.desc'
  | 'style.romantica.label'
  | 'style.romantica.desc'
  | 'style.provocadora.label'
  | 'style.provocadora.desc'
  | 'style.picante.label'
  | 'style.picante.desc'
  | 'style.recommended'
  | 'style.adequada'
  // Response cards
  | 'responses.title'
  | 'responses.regenerate'
  | 'responses.composing'
  | 'responses.streaming'
  | 'responses.empty'
  // Improve tab
  | 'improve.badge'
  | 'improve.titleA'
  | 'improve.titleB'
  | 'improve.subtitle'
  | 'improve.messageLabel'
  | 'improve.messagePlaceholder'
  | 'improve.goalLabel'
  | 'improve.goalPlaceholder'
  | 'improve.button'
  | 'improving'
  | 'improve.outputTitle'
  | 'improve.refining'
  | 'improve.errorGeneric'
  | 'improve.errorFriendly'
  | 'improve.errorEmpty'
  | 'improve.emptyOutput'
  | 'improve.partialWarning'
  // Goal presets
  | 'goal.confident'
  | 'goal.funny'
  | 'goal.flirty'
  | 'goal.mysterious'
  | 'goal.natural'
  | 'goal.casual'
  | 'goal.picante'
  // Tips tab
  | 'tips.badge'
  | 'tips.titleA'
  | 'tips.titleB'
  | 'tips.subtitle'
  | 'tips.categoryAll'
  | 'tips.categoryPsychology'
  | 'tips.categoryConnection'
  | 'tips.categoryConversation'
  | 'tips.categoryMindset'
  // Tips articles
  | 'tip.curiosidade.title'
  | 'tip.curiosidade.category'
  | 'tip.curiosidade.summary'
  | 'tip.curiosidade.body'
  | 'tip.espelho.title'
  | 'tip.espelho.category'
  | 'tip.espelho.summary'
  | 'tip.espelho.body'
  | 'tip.nao-fechar.title'
  | 'tip.nao-fechar.category'
  | 'tip.nao-fechar.summary'
  | 'tip.nao-fechar.body'
  | 'tip.tensao.title'
  | 'tip.tensao.category'
  | 'tip.tensao.summary'
  | 'tip.tensao.body'
  | 'tip.autenticidade.title'
  | 'tip.autenticidade.category'
  | 'tip.autenticidade.summary'
  | 'tip.autenticidade.body'
  | 'tip.tempo.title'
  | 'tip.tempo.category'
  | 'tip.tempo.summary'
  | 'tip.tempo.body'
  // Cantadas
  | 'cantadas.badge'
  | 'cantadas.titleA'
  | 'cantadas.titleB'
  | 'cantadas.subtitle'
  | 'cantadas.generateMore'
  | 'cantadas.empty'
  | 'cantadas.filterAll'
  // Cantada categories
  | 'cat.Divertidas'
  | 'cat.Fofas'
  | 'cat.Confiantes'
  | 'cat.Criativas'
  | 'cat.Inteligentes'
  | 'cat.Elogios'
  | 'cat.Elogios2'
  | 'cat.Românticas'
  | 'cat.Sedutoras'
  | 'cat.Provocadoras'
  | 'cat.Tentação'
  | 'cat.Picantes'
  // Profile
  | 'profile.title'
  | 'profile.subtitle'
  | 'profile.account'
  | 'profile.name'
  | 'profile.lastName'
  | 'profile.email'
  | 'profile.phone'
  | 'profile.password'
  | 'profile.changePassword'
  | 'profile.newPassword'
  | 'profile.save'
  | 'profile.saving'
  | 'profile.saved'
  | 'profile.suitors'
  | 'profile.suitorsSubtitle'
  | 'profile.addSuitor'
  | 'profile.suitorName'
  | 'profile.suitorNotes'
  | 'profile.suitorStatus'
  | 'profile.statusTalking'
  | 'profile.statusFlirting'
  | 'profile.statusDating'
  | 'profile.statusCold'
  | 'profile.statusWon'
  | 'profile.statusLost'
  | 'profile.saveSuitor'
  | 'profile.noSuitors'
  | 'profile.deleteSuitor'
  | 'profile.editSuitor'
  | 'profile.appearance'
  | 'profile.appearanceSubtitle'
  | 'profile.shareTitle'
  | 'profile.shareSubtitle'
  | 'profile.shareButton'
  | 'profile.shareCopied'
  | 'profile.copyDirectLink'
  | 'profile.instagramCopied'
  | 'profile.shareText'
  | 'profile.shareTextWa'
  | 'profile.darkMode'
  | 'profile.lightMode'
  | 'profile.language'
  | 'profile.languageSubtitle'
  | 'profile.errorPasswordShort'
  | 'profile.errorGeneric'
  // Auth modal
  | 'auth.signupTitle'
  | 'auth.loginTitle'
  | 'auth.signupSubtitle'
  | 'auth.loginSubtitle'
  | 'auth.namePlaceholder'
  | 'auth.emailPlaceholder'
  | 'auth.passwordPlaceholder'
  | 'auth.processing'
  | 'auth.errorGeneric'
  | 'auth.errorEmpty'
  | 'auth.errorPasswordShort'
  | 'auth.errorInvalidEmail'
  | 'auth.errorAlreadyRegistered'
  | 'auth.errorDeviceLimit'
  | 'auth.firstNamePlaceholder'
  | 'auth.lastNamePlaceholder'
  | 'auth.errorEmailNotConfirmed'
  | 'auth.errorInvalidCredentials'
  | 'auth.phonePlaceholder'
  | 'auth.sendCode'
  | 'auth.searchCountry'
  | 'auth.errorInvalidPhone'
  | 'auth.errorPhoneRegistered'
  | 'auth.errorSmsFailed'
  | 'auth.usePhoneInstead'
  | 'auth.useEmailInstead'
  | 'auth.verifyEmailTitle'
  | 'auth.verifyEmailSubtitle'
  | 'auth.verifyEmailHint'
  | 'auth.verifying'
  | 'auth.resendCode'
  | 'auth.resendIn'
  | 'auth.errorInvalidCode'
  | 'auth.goToLogin'
  | 'auth.verifyExitTitle'
  | 'auth.verifyExitMessage'
  | 'auth.verifyExitConfirm'
  | 'auth.verifyExitCancel'
  | 'auth.errorTooMany'
  | 'auth.haveAccount'
  | 'auth.pinTitle'
  | 'auth.pinSubtitle'
  | 'auth.errorWrongPin'
  | 'auth.forgotPin'
  | 'auth.pinRecoverySent'
  | 'auth.errorPinRecovery'
  | 'popup.title'
  | 'popup.subtitle'
  | 'popup.createAccount'
  | 'popup.login'
  | 'popup.continueGuest'
  | 'welcome.headline'
  | 'welcome.subtitle'
  | 'welcome.createAccount'
  | 'welcome.login'
  | 'profile.pinTitle'
  | 'profile.pinSubtitle'
  | 'profile.pinActive'
  | 'profile.pinEnabledDesc'
  | 'profile.pinNew'
  | 'profile.pinConfirm'
  | 'profile.pinSave'
  | 'profile.pinRemove'
  | 'profile.pinSaved'
  | 'profile.pinRemoved'
  | 'profile.pinErrorDigits'
  | 'profile.pinErrorMatch'
  | 'auth.noAccount'
  | 'auth.signup'
  | 'auth.login'
  // Footer
  | 'footer.text'
  // Clear all
  | 'common.clearAll'
  | 'common.clearAllConfirm'
  // Profile danger zone
  | 'profile.dangerZone'
  | 'profile.dangerZoneSubtitle'
  | 'profile.deleteAllData'
  | 'profile.deleteAllConfirm'
  | 'profile.deleteAllDone'
  // Tips custom compliments
  | 'tips.customCategory'
  | 'tips.customPlaceholder'
  | 'tips.customFocusPlaceholder'
  | 'tips.customGenerate'
  | 'tips.customGenerating'
  | 'tips.customError'
  | 'tips.customEmpty'
  | 'tips.generateMoreStyle'
  | 'tips.generatingMore'
  | 'compliment.ideal'
  | 'compliment.sedutora'
  | 'compliment.divertida'
  | 'compliment.inteligente'
  | 'compliment.provocante'
  // Confirm modal
  | 'modal.clearTitle'
  | 'modal.clearDescription'
  | 'modal.deleteAllTitle'
  | 'modal.deleteAllDescription'
  | 'modal.cancel'
  | 'modal.confirmClear'
  | 'modal.confirmDelete'
  // Paste hint
  | 'common.pasteHint'
  // Cantadas outras
  | 'cantadas.outras'
  | 'cantadas.translating'
  | 'gen.savedReports'
  | 'intensity.fraca'
  | 'intensity.media'
  | 'intensity.forte'
  | 'length.curta'
  | 'length.media'
  | 'length.longa'
  | 'responses.intensity'
  | 'improve.length'
  | 'profile.optional'

  | 'pin.setupTitle'
  | 'pin.setupSubtitle'
  | 'pin.verifyTitle'
  | 'pin.verifySubtitle'
  | 'pin.confirm'
  | 'pin.errorSet'
  | 'pin.errorWrong'
  | 'pin.errorGeneric'
  | 'pin.forgotPin'
  | 'pin.recoverySent'
  | 'pin.signOut'
  | 'pin.errorRecovery'
  | 'pin.setupButton'
  | 'pin.confirmPlaceholder'
  | 'pin.errorMismatch'
  // Advanced AI settings
  | 'error.cardTitle'
  | 'error.retry'
  | 'support.button'
  | 'support.title'
  | 'support.subject'
  | 'support.subjectPlaceholder'
  | 'support.message'
  | 'support.messagePlaceholder'
  | 'support.email'
  | 'support.emailPlaceholder'
  | 'support.send'
  | 'support.sending'
  | 'support.sent'
  | 'support.error'
  | 'support.bugAi'
  | 'support.bugUi'
  | 'support.bugLogin'
  | 'support.bugData'
  | 'support.bugOther'
  | 'support.bugPerformance'
  | 'support.cancel'
  | 'support.categoryLabel'
  | 'auth.otpTitle'
  | 'auth.otpSubtitle'
  | 'auth.otpCode'
  | 'auth.otpVerify'
  | 'auth.otpCancel'
  | 'auth.otpResend'
  | 'auth.otpSending'
  | 'auth.otpVerifying'
  | 'auth.otpErrorInvalid'
  | 'auth.otpErrorExpired'
  | 'auth.otpErrorGeneric'
  | 'auth.otpSent'
  | 'auth.otpResent'
  | 'admin.usersList'
  | 'admin.usersLoading'
  | 'admin.usersError'
  | 'admin.usersRetry'
  | 'admin.deleteUser'
  | 'admin.deleteUserDesc'
  | 'admin.deleteFromPanel'
  | 'admin.deleteFromPanelDesc'
  | 'admin.deleteFromApp'
  | 'admin.deleteFromAppDesc'
  | 'admin.deleteConfirm'
  | 'admin.cancelDelete'
  | 'admin.activeUsers'
  | 'admin.ban'
  | 'admin.unban'
  | 'admin.restrict'
  | 'admin.unrestrict'
  | 'admin.banned'
  | 'admin.restricted'
  | 'admin.active'
  | 'admin.referrals'
  | 'admin.referralCount'
  | 'admin.invitedBy'
  | 'admin.visitsTitle'
  | 'admin.visitsToday'
  | 'admin.visitsWeek'
  | 'admin.visitsMonth'
  | 'admin.visitsTotal'
  | 'admin.anonymousVisitors'
  | 'admin.registeredVisitors'
  | 'admin.visitorsLoading'
  | 'admin.visitorsError'
  | 'antiflood.cooldown'
  | 'admin.metricsToday'
  | 'admin.metricsWeek'
  | 'admin.metricsMonth'
  | 'admin.metricsTotal'
  | 'admin.metricsUsers'
  | 'admin.metricsAvg'
  | 'admin.metricsPeakHour'
  | 'admin.metricsByHour'
  | 'admin.metricsByFeature'
  | 'admin.metricsRefresh'
  | 'admin.metricsLoading'
  | 'admin.metricsError'
  | 'admin.metricsRetry'
  | 'admin.metricsMessages'
  | 'admin.metricsTemporalTitle'
  | 'admin.metricsTemporalDesc'
  // Share gate popup
  | 'shareGate.title'
  | 'shareGate.subtitle'
  | 'shareGate.progress'
  | 'shareGate.yourLink'
  | 'shareGate.locked'
  | 'shareGate.unlocked'
  // SEDUX engine placeholders
  | 'sedux.enginePlaceholder'
  | 'sedux.engineBuilding';

type Dict = Record<TranslationKey, string>;

const pt: Dict = {
  'nav.gerador': 'Gerador de Respostas',
  'nav.melhorar': 'Melhorar Mensagem',
  'nav.dicas': 'Dicas & Lábias',
  'nav.perfil': 'Perfil',
  'nav.entrar': 'Entrar',
  'nav.criarConta': 'Criar Conta',
  'nav.sair': 'Sair',
  'nav.brandTag': 'Respostas por IA',
  'nav.user': 'Utilizador',
  'common.copy': 'Copiar',
  'common.copied': 'Copiado!',
  'common.loading': 'A carregar…',
  'common.errorTitle': 'Algo correu mal',
  'common.menu': 'Menu',
  'common.close': 'Fechar',
  'common.paste': 'Colar',
  'common.clear': 'Limpar',
  'gen.badge': 'Composição inteligente de mensagens',
  'gen.titleA': 'Escreve a ',
  'gen.titleB': 'resposta perfeita',
  'gen.subtitle':
    'Escolhe um contexto, define o tom e o Aura gera 6 respostas curtas em estilos diferentes, prontas a copiar.',
  'gen.contextLabel': 'Contexto',
  'gen.toneLabel': 'Tom da resposta',
  'gen.messageLabel': 'A tua mensagem',
  'gen.messagePlaceholder': 'Escreve aqui a mensagem que recebeste ou a situação que queres responder…',
  'gen.screenshotLabel': 'Screenshot (opcional)',
  'gen.screenshotAlt': 'Pré-visualização do screenshot',
  'gen.screenshotRemove': 'Remover imagem',
  'gen.dropText': 'Clica ou arrasta um screenshot da conversa',
  'gen.dropHint': 'PNG, JPEG, WebP ou GIF · máx. 8 MB',
  'gen.generate': 'Gerar resposta',
  'gen.copy': 'Copiar',
  'gen.generating': 'A gerar…',
  'gen.readingImage': 'A ler imagem…',
  'gen.customContextPlaceholder':
    'Descreve o contexto: quem é a pessoa, que relação têm, o que se passou…',
  'gen.errorNoContext': 'Escreve o teu contexto personalizado antes de gerar.',
  'gen.errorGeneric': 'Não foi possível gerar a resposta. Tenta novamente.',
  'gen.errorFriendly': 'Infelizmente, a leitura por screenshot e a geração de respostas estão temporariamente indisponíveis no momento. Enquanto ajustamos os nossos motores, aproveita para explorar a nossa aba de Dicas & Lábias para elevar o teu jogo!',
  'gen.errorImageFormat': 'Formato não suportado. Usa PNG, JPEG, WebP ou GIF.',
  'gen.errorImageSize': 'A imagem é demasiado grande (máx. 8 MB).',
  'gen.errorImageRead': 'Não foi possível ler a imagem.',
  'gen.errorImageProcess': 'Não foi possível analisar a imagem. Tenta com um screenshot mais nítido ou gera a resposta sem imagem.',
  'gen.pretendenteTitle': 'Relatório da Pretendente',
  'gen.pretendenteSubtitle': 'Preenche o nome e o vínculo para personalizar a análise e as respostas.',
  'gen.pretendenteName': 'Nome dela',
  'gen.pretendenteVinculo': 'Vínculo/Situação (ex: Ex, Colega, Paquera…)',
  'gen.perfilPsicologico': 'Perfil Psicológico de Ação',
  'gen.dicasAbordagem': 'Dicas de Abordagem para esta Pretendente',
  'gen.pretendenteGenerate': 'Gerar Relatório',
  'ctx.puxar-assunto.label': 'Puxar Assunto',
  'ctx.puxar-assunto.desc': 'Retomar ou iniciar um tema',
  'ctx.quebrar-gelo.label': 'Quebrar Gelo',
  'ctx.quebrar-gelo.desc': 'Iniciar conversa com alguém novo',
  'ctx.flertar.label': 'Flertar',
  'ctx.flertar.desc': 'Mostrar interesse com charme',
  'ctx.reagir-foto.label': 'Reagir a Foto',
  'ctx.reagir-foto.desc': 'Comentar um story ou foto',
  'ctx.convidar-sair.label': 'Convidar para Sair',
  'ctx.convidar-sair.desc': 'Propor um encontro',
  'ctx.manter-conversa.label': 'Manter Conversa',
  'ctx.manter-conversa.desc': 'Evitar o silêncio',
  'ctx.dar-fora.label': 'Dar um Fora Leve',
  'ctx.dar-fora.desc': 'Recusar sem magoar',
  'ctx.personalizado.label': 'Personalizado',
  'ctx.personalizado.desc': 'Escreve o teu próprio contexto',
  'tone.divertido': 'Divertido',
  'tone.provocador': 'Provocador',
  'tone.direto': 'Direto',
  'tone.outro': 'Outro',
  'tone.picante': 'Picante',
  'tone.customPlaceholder': 'Ex: Amigável, Profissional, Poético…',
  'style.ideal.label': 'Resposta Ideal',
  'style.ideal.desc': 'A mais equilibrada e certeira',
  'style.sedutora.label': 'Sedutora',
  'style.sedutora.desc': 'Charme e interesse',
  'style.informal.label': 'Informal',
  'style.informal.desc': 'Jovem e natural',
  'style.romantica.label': 'Romântica',
  'style.romantica.desc': 'Atenciosa e carinhosa',
  'style.provocadora.label': 'Direta & Provocadora',
  'style.provocadora.desc': 'Ousada e desafiadora',
  'style.picante.label': 'Picante',
  'style.picante.desc': 'Máxima intensidade e sedução sem filtros',
  'style.recommended': 'Recomendada pela Aura',
  'style.adequada': '% adequada',
  'responses.title': 'Respostas geradas',
  'responses.regenerate': 'Gerar outras',
  'responses.composing': 'A compor as respostas perfeitas…',
  'responses.streaming': 'A escrever…',
  'responses.empty': 'As tuas respostas vão aparecer aqui.',
  'improve.badge': 'Refinar e potencializar',
  'improve.titleA': 'Melhorar ',
  'improve.titleB': 'Mensagem',
  'improve.subtitle':
    'Cola uma mensagem que tenhas escrito e deixa o Aura reescrevê-la para ficar mais atraente, eficaz e natural.',
  'improve.messageLabel': 'A tua mensagem',
  'improve.messagePlaceholder': 'Cola aqui o rascunho da mensagem que queres melhorar…',
  'improve.goalLabel': 'Objetivo (opcional)',
  'improve.goalPlaceholder': 'Ex: soar mais confiante, criar curiosidade…',
  'improve.button': 'Melhorar mensagem',
  'improving': 'A melhorar…',
  'improve.outputTitle': 'Mensagem melhorada',
  'improve.refining': 'A refinar a mensagem…',
  'improve.errorGeneric': 'Não foi possível melhorar a mensagem. Tenta novamente.',
  'improve.errorFriendly': 'Infelizmente, a leitura por screenshot e a geração de respostas estão temporariamente indisponíveis no momento. Enquanto ajustamos os nossos motores, aproveita para explorar a nossa aba de Dicas & Lábias para elevar o teu jogo!',
  'improve.errorEmpty': 'Cola primeiro a mensagem que queres melhorar.',
  'improve.emptyOutput': 'A mensagem melhorada vai aparecer aqui.',
  'improve.partialWarning': 'Apenas algumas variantes foram geradas. Tenta novamente para obter as três versões completas.',
  'goal.confident': 'Soar mais confiante',
  'goal.funny': 'Ficará mais engraçada',
  'goal.flirty': 'Criar tensão flertadora',
  'goal.mysterious': 'Ser mais misterioso',
  'goal.natural': 'Parecer natural e fluido',
  'goal.casual': 'Dar uma saída sem pressa',
  'goal.picante': 'Tornar picante e provocante',
  'tips.badge': 'Aprende enquanto usas',
  'tips.titleA': 'Dicas & ',
  'tips.titleB': 'Lábias',
  'tips.subtitle':
    'Artigos curtos sobre conversação e psicologia de atração, seguidos de uma biblioteca de cantadas prontas para copiar.',
  'tips.categoryAll': 'Todos',
  'tips.categoryPsychology': 'Psicologia de atração',
  'tips.categoryConnection': 'Conexão',
  'tips.categoryConversation': 'Conversação',
  'tips.categoryMindset': 'Mindset',
  'tip.curiosidade.title': 'O poder da curiosidade',
  'tip.curiosidade.category': 'Psicologia de atração',
  'tip.curiosidade.summary': 'Deixa sempre uma porta aberta para a próxima mensagem.',
  'tip.curiosidade.body':
    'As melhores conversas não se fecham numa só mensagem. Acaba sempre com um gancho — uma pergunta leve, uma referência a algo que vais contar depois, ou um mistério pequeno. Quem está do outro lado deve ficar com vontade de responder, não com a sensação de que a conversa já acabou.\n\nExemplo prático: em vez de "Gostei da tua foto", usa "Tens um estilo muito teu… há uma história por trás disso?". A primeira fecha a conversa; a segunda convida-a a continuar.',
  'tip.espelho.title': 'Efeito espelho',
  'tip.espelho.category': 'Conexão',
  'tip.espelho.summary': 'Imita o ritmo e o tom da outra pessoa nos primeiros minutos.',
  'tip.espelho.body':
    'Nos primeiros minutos de conversa, as pessoas estão atentas a sinais de afinidade. Se ela escreve com frases curtas e emojis, não respondas com parágrafos longos. Se ela é mais expansiva, abre-te um pouco mais também. Este "espelho" cria a sensação subconsciente de que estão na mesma sintonia.\n\nDepois, à medida que a conversa cresce, podes começar a liderar o tom para onde queres.',
  'tip.nao-fechar.title': 'Nunca fechar com pergunta fechada',
  'tip.nao-fechar.category': 'Conversação',
  'tip.nao-fechar.summary': 'Perguntas de "sim/não" matam a conversa.',
  'tip.nao-fechar.body':
    'Evita perguntas que se respondem com uma palavra. "Gostas de cinema?" é um beco sem saída. "Qual foi o último filme que te surpreendeu?" é uma porta aberta para uma história.\n\nRegra simples: troca "gostas de X?" por "o que gostas em X?" ou "qual é o teu X favorito?". A conversa ganha profundidade sem esforço.',
  'tip.tensao.title': 'Tensão flertadora',
  'tip.tensao.category': 'Psicologia de atração',
  'tip.tensao.summary': 'O flerte é um jogo de avançar e recuar.',
  'tip.tensao.body':
    'A atração não vive de elogios constantes — vive do contraste. Mostra interesse, depois recua com humor ou um pequeno desafio. Esta oscilação cria tensão, e a tensão é o que torna a conversa memorável.\n\nExemplo: "Estavas quase a convencer-me… mas agora meteste essa série e perdeste pontos." É leve, é brincadeira, mas cria um pequeno "e agora?" que mantém a outra pessoa investida.',
  'tip.autenticidade.title': 'Autenticidade vence o roteiro',
  'tip.autenticidade.category': 'Mindset',
  'tip.autenticidade.summary': 'Técnicas ajudam, mas não substituem ser tu mesmo.',
  'tip.autenticidade.body':
    'Todas estas dicas são ferramentas, não uma máscara. Se usares uma técnica mas o teu tom soar forçado, o efeito é oposto. As pessoas sentem incoerência.\n\nUsa o Aura como inspiração, adapta à tua voz, e não tenhas medo de ser espontâneo. Uma mensagem tua, imperfeita mas genuína, vale mais do que dez mensagens "perfeitas" que não te representam.',
  'tip.tempo.title': 'O tempo certo de responder',
  'tip.tempo.category': 'Conversação',
  'tip.tempo.summary': 'Não é sobre jogar difícil — é sobre ter vida.',
  'tip.tempo.body':
    'Responder imediatamente a tudo não demonstra mais interesse; demonstra menos vida própria. Não forces esperas artificiais, mas também não estejas colado ao ecrã.\n\nTem coisas a fazer, responde quando puderes, e quando responderes, foca-te na conversa. Essa combinação — disponível mas não dependente — é naturalmente atraente.',
  'cantadas.badge': 'Biblioteca local · {n} cantadas',
  'cantadas.titleA': '1000 Cantadas ',
  'cantadas.titleB': 'Infalíveis',
  'cantadas.subtitle':
    'Cantadas prontas para copiar, organizadas por estilo. Sem internet, sem espera — só escolher e usar.',
  'cantadas.generateMore': 'Gerar Mais',
  'cantadas.empty': 'Sem cantadas nesta categoria.',
  'cantadas.filterAll': 'Todas',
  'cat.Divertidas': 'Divertidas',
  'cat.Fofas': 'Fofas',
  'cat.Confiantes': 'Confiantes',
  'cat.Criativas': 'Criativas',
  'cat.Inteligentes': 'Inteligentes',
  'cat.Elogios': 'Elogios',
  'cat.Elogios2': 'Elogios 2.0',
  'cat.Românticas': 'Românticas',
  'cat.Sedutoras': 'Sedutoras',
  'cat.Provocadoras': 'Provocadoras',
  'cat.Tentação': 'Tentação',
  'cat.Picantes': 'Picantes',
  'profile.title': 'Perfil & Definições',
  'profile.subtitle': 'Gere a tua conta, pretendentes e preferências.',
  'profile.account': 'Conta',
  'profile.name': 'Nome',
  'profile.lastName': 'Apelido',
  'profile.email': 'Email',
  'profile.phone': 'Telemóvel',
  'profile.password': 'Palavra-passe',
  'profile.changePassword': 'Alterar palavra-passe',
  'profile.newPassword': 'Nova palavra-passe (mín. 6 caracteres)',
  'profile.save': 'Guardar',
  'profile.saving': 'A guardar…',
  'profile.saved': 'Guardado!',
  'profile.suitors': 'Gerir Pretendentes / Vínculos',
  'profile.suitorsSubtitle': 'Acompanha com quem estás a falar e o progresso de cada vínculo.',
  'profile.addSuitor': '+ Adicionar Pretendente',
  'profile.suitorName': 'Nome da pessoa',
  'profile.suitorNotes': 'Notas / relatório de progresso',
  'profile.suitorStatus': 'Estado do vínculo',
  'profile.statusTalking': 'A falar',
  'profile.statusFlirting': 'A flertar',
  'profile.statusDating': 'Encontros',
  'profile.statusCold': 'Es fria',
  'profile.statusWon': 'Conquistada',
  'profile.statusLost': 'Perdida',
  'profile.saveSuitor': 'Adicionar',
  'profile.noSuitors': 'Ainda não adicionaste nenhum pretendente.',
  'profile.deleteSuitor': 'Eliminar',
  'profile.editSuitor': 'Editar',
  'profile.appearance': 'Aparência',
  'profile.appearanceSubtitle': 'Escolhe o tema do site. O padrão é o modo escuro.',
  'profile.shareTitle': 'Partilhar a Aura',
  'profile.shareSubtitle': 'Partilha a Aura com os teus amigos — direto no WhatsApp, Instagram, Telegram ou copiando o link.',
  'profile.shareButton': 'Partilhar a Aura',
  'profile.shareCopied': 'Link copiado!',
  'profile.copyDirectLink': 'Copiar link direto',
  'profile.instagramCopied': 'Texto copiado! Cola no chat da pessoa no Instagram',
  'profile.shareText': 'Chega de ficar horas a olhar para o telemóvel a pensar no que responder. 📱✨ A **Aura** lê a situação e diz-te exatamente o que escrever para acertar em cheio. Vê com os teus próprios olhos: 👇',
  'profile.shareTextWa': 'Já te aconteceu não saberes o que responder no momento certo? 🤫 A partir de hoje, isso acabou. Conhece a **Aura**, a IA que cria a resposta perfeita e irresistível para qualquer conversa. Experimenta grátis aqui: 👇',
  'profile.darkMode': 'Modo Escuro',
  'profile.lightMode': 'Modo Claro',
  'profile.language': 'Idioma',
  'profile.languageSubtitle': 'Traduz a interface do site.',
  'profile.errorPasswordShort': 'A palavra-passe deve ter pelo menos 6 caracteres.',
  'profile.errorGeneric': 'Não foi possível guardar.',
  'auth.signupTitle': 'Criar Conta',
  'auth.loginTitle': 'Entrar',
  'auth.signupSubtitle': 'Cria a tua conta para guardar o teu histórico.',
  'auth.loginSubtitle': 'Bem-vindo de volta!',
  'auth.namePlaceholder': 'Nome (opcional)',
  'auth.emailPlaceholder': 'Email',
  'auth.passwordPlaceholder': 'Palavra-passe',
  'auth.phonePlaceholder': 'Número de telemóvel',
  'auth.sendCode': 'Enviar código',
  'auth.searchCountry': 'Pesquisar país...',
  'auth.processing': 'A processar…',
  'auth.errorInvalidPhone': 'Número de telemóvel inválido.',
  'auth.errorPhoneRegistered': 'Este número já está registado. Tenta entrar.',
  'auth.errorEmpty': 'Preenche o email e a palavra-passe.',
  'auth.errorPasswordShort': 'A palavra-passe deve ter pelo menos 6 caracteres.',
  'auth.errorInvalidEmail': 'O email inserido não é válido. Verifica o formato (ex: nome@dominio.com).',
  'auth.errorAlreadyRegistered': 'Este email já está registado. Tenta entrar.',
  'auth.errorDeviceLimit': 'Limite de contas atingido neste dispositivo. Não é possível criar mais do que 3 contas a partir do mesmo dispositivo.',
  'auth.firstNamePlaceholder': 'Nome',
  'auth.lastNamePlaceholder': 'Apelido',
  'auth.errorEmailNotConfirmed': 'O teu email ainda não foi confirmado. Verifica a tua caixa de correio.',
  'auth.errorInvalidCredentials': 'Email ou palavra-passe incorretos. Verifica os dados e tenta novamente.',
  'auth.usePhoneInstead': 'Preferes usar o telemóvel?',
  'auth.useEmailInstead': 'Preferes usar o email?',
  'auth.errorGeneric': 'Não foi possível autenticar.',

  'auth.verifyEmailTitle': 'Verifica o teu email',
  'auth.verifyEmailSubtitle': 'Enviámos um código de 6 dígitos para',
  'auth.verifyEmailHint': 'Verifica a caixa de entrada e a pasta de spam. O código pode demorar até 2 minutos a chegar. Se não receber, podes reenviar.',
  'auth.verifying': 'A verificar código…',
  'auth.resendCode': 'Reenviar código',
  'auth.resendIn': 'Reenviar em {s}s',
  'auth.errorInvalidCode': 'Código inválido ou expirado. Tenta novamente.',
  'auth.goToLogin': 'Ir para início de sessão',
  'auth.verifyExitTitle': 'Sair sem verificar?',
  'auth.verifyExitMessage': 'Se não concluíres a verificação, podes perder o acesso à tua conta, histórico e atualizações importantes. Toda a comunicação e recuperação de conta acontece por e-mail. Podes sair agora se quiseres, mas fica avisado do risco.',
  'auth.verifyExitConfirm': 'Sair mesmo assim',
  'auth.verifyExitCancel': 'Continuar verificação',

  'auth.errorTooMany': 'Muitas tentativas. Aguarda um momento antes de tentar novamente.',

  'auth.haveAccount': 'Já tens conta?',
  'auth.pinTitle': 'Insere o teu PIN',
  'auth.pinSubtitle': 'A tua conta está protegida com um PIN de 4 dígitos. Insere-o para continuar.',
  'auth.errorWrongPin': 'PIN incorreto. Tenta novamente.',
  'auth.forgotPin': 'Esqueci a minha senha',
  'auth.pinRecoverySent': 'Enviámos um código de recuperação para o teu email. Usa-o para redefinir o PIN.',
  'auth.errorPinRecovery': 'Não foi possível enviar o email de recuperação. Tenta novamente.',
  'popup.title': 'A tua experiência pode ser ainda melhor',
  'popup.subtitle': 'Cria uma conta para guardar o teu histórico, personalizar cantadas e aceder a funcionalidades exclusivas.',
  'popup.createAccount': 'Criar conta grátis',
  'popup.login': 'Já tenho conta',
  'popup.continueGuest': 'Continuar como visitante',
  'shareGate.title': 'Partilha a Aura AI e desbloqueia mais',
  'shareGate.subtitle': 'Partilha a Aura AI com 10 amigos para continuar a gerar respostas. Cada amigo que entrar através do teu link conta para o teu progresso.',
  'shareGate.progress': 'Amigos convidados',
  'shareGate.yourLink': 'O teu link de convite',
  'shareGate.locked': 'Partilha com 10 amigos para desbloquear e continuar',
  'shareGate.unlocked': 'Desbloqueado! Podes continuar a usar a Aura AI',
  'sedux.enginePlaceholder': 'A processar…',
  'sedux.engineBuilding': 'O motor SEDUX está a ser reconfigurado. Em breve voltará a gerar respostas.',
  'welcome.headline': 'Conquista qualquer mulher com a mensagem certa na hora certa.',
  'welcome.subtitle': 'A tua IA especialista em sedução, lábias afiadas e respostas irresistíveis. Cria a tua conta agora e experimenta GRÁTIS!',
  'welcome.createAccount': 'Criar Conta Grátis',
  'welcome.login': 'Já tenho uma conta / Entrar',
  'profile.pinTitle': 'PIN de 4 Dígitos',
  'profile.pinSubtitle': 'Define um PIN numérico de 4 dígitos para proteger o acesso à tua conta.',
  'profile.pinActive': 'Ativo',
  'profile.pinEnabledDesc': 'O teu PIN está ativo. Sempre que inicias sessão, será pedido o PIN após o email e palavra-passe.',
  'profile.pinNew': 'Novo PIN (4 dígitos)',
  'profile.pinConfirm': 'Confirmar PIN',
  'profile.pinSave': 'Definir PIN',
  'profile.pinRemove': 'Remover PIN',
  'profile.pinSaved': 'PIN definido com sucesso.',
  'profile.pinRemoved': 'PIN removido.',
  'profile.pinErrorDigits': 'O PIN deve ter exatamente 4 dígitos numéricos.',
  'profile.pinErrorMatch': 'Os PINs não coincidem.',
  'auth.noAccount': 'Ainda não tens conta?',
  'auth.signup': 'Criar conta',
  'auth.login': 'Entrar',
  'footer.text': 'Aura AI — Uriel Traquino',
  'common.clearAll': 'Limpar tudo',
  'common.clearAllConfirm': 'Limpar todos os campos e respostas?',
  'profile.dangerZone': 'Zona de Perigo',
  'profile.dangerZoneSubtitle': 'Apaga permanentemente todo o histórico e dados locais.',
  'profile.deleteAllData': 'Apagar Todos os Dados e Histórico',
  'profile.deleteAllConfirm': 'Tens a certeza? Isto apaga permanentemente todo o histórico e dados locais.',
  'profile.deleteAllDone': 'Todos os dados foram apagados.',
  'tips.customCategory': 'Personalizado',
  'tips.customPlaceholder': 'Ex: os olhos dela, o sorriso, o estilo…',
  'tips.customFocusPlaceholder': 'Ex: intenção — fazer rir, criar tensão, ser discreto…',
  'tips.customGenerate': 'Gerar Elogios',
  'tips.customGenerating': 'A gerar elogios…',
  'tips.customError': 'Não foi possível gerar os elogios. Tenta novamente.',
  'tips.customEmpty': 'Descreve o que queres elogiar e gera 5 elogios criativos.',
  'tips.generateMoreStyle': 'Gerar mais deste estilo',
  'tips.generatingMore': 'A gerar…',
  'compliment.ideal': 'Ideal / Recomendada',
  'compliment.sedutora': 'Sedutora',
  'compliment.divertida': 'Divertida',
  'compliment.inteligente': 'Inteligente',
  'compliment.provocante': 'Provocante',
  'modal.clearTitle': 'Apagar Histórico de Conversa',
  'modal.clearDescription': 'Esta ação apagará permanentemente todo o histórico de conversas e respostas geradas nesta aba da Aura AI. Desejas continuar?',
  'modal.deleteAllTitle': 'Apagar Todos os Dados',
  'modal.deleteAllDescription': 'Esta ação apagará permanentemente todo o histórico de mensagens, fotos analisadas e dados locais da sessão. A tua conta permanece ativa. Desejas continuar?',
  'modal.cancel': 'CANCELAR',
  'modal.confirmClear': 'LIMPAR TUDO',
  'modal.confirmDelete': 'APAGAR TUDO',
  'common.pasteHint': 'Usa o toque longo do teu dispositivo para colar',
  'cantadas.outras': 'Outras',
  'cantadas.translating': 'A traduzir…',
  'intensity.fraca': 'Fraca',
  'intensity.media': 'Média',
  'intensity.forte': 'Forte',
  'length.curta': 'Curta',
  'length.media': 'Média',
  'length.longa': 'Longa',
  'responses.intensity': 'Intensidade',
  'improve.length': 'Comprimento',
  'profile.optional': 'Opcional',
  'gen.savedReports': 'Relatórios guardados',
  'auth.errorSmsFailed': 'Falha ao enviar SMS. Verifique o número.',
  'pin.setupTitle': 'Configurar PIN de Segurança',
  'pin.setupSubtitle': 'Crie um PIN de 4 dígitos para proteger a sua conta.',
  'pin.verifyTitle': 'Introduza o seu PIN',
  'pin.verifySubtitle': 'Confirme a sua identidade com o PIN de 4 dígitos.',
  'pin.confirm': 'Confirmar',
  'pin.errorSet': 'Erro ao guardar o PIN. Tente novamente.',
  'pin.errorWrong': 'PIN incorreto. Tente novamente.',
  'pin.errorGeneric': 'Erro ao verificar o PIN. Tente novamente.',
  'pin.forgotPin': 'Esqueci-me da minha senha',
  'pin.recoverySent': 'E-mail de recuperação enviado. Verifique a sua caixa de entrada.',
  'pin.signOut': 'Esqueceu o PIN? Sair / Criar nova conta',
  'pin.errorRecovery': 'Erro ao enviar e-mail de recuperação. Tente novamente.',
  'pin.setupButton': 'Definir PIN',
  'pin.confirmPlaceholder': 'Confirmar PIN',
  'pin.errorMismatch': 'Os PINs não coincidem. Tente novamente.',
  'error.cardTitle': 'Erro de ligação ao motor de IA',
  'error.retry': 'Tentar novamente',
  'support.button': 'Suporte',
  'support.title': 'Suporte e Reportar Problemas',
  'support.subject': 'Assunto',
  'support.subjectPlaceholder': 'Ex: Erro ao gerar resposta',
  'support.message': 'Mensagem',
  'support.messagePlaceholder': 'Descreve o problema ou o teu feedback…',
  'support.email': 'E-mail (opcional)',
  'support.emailPlaceholder': 'o.teu@email.com',
  'support.send': 'Enviar',
  'support.sending': 'A enviar…',
  'support.sent': 'Obrigado! O teu relatório foi enviado.',
  'support.error': 'Não foi possível enviar. Tenta novamente.',
  'support.bugAi': 'Erro de IA',
  'support.bugUi': 'Interface não funciona',
  'support.bugLogin': 'Problema de login/registo',
  'support.bugData': 'Dados não guardam',
  'support.bugOther': 'Outro problema',
  'support.bugPerformance': 'Lentidão/Travamento',
  'support.cancel': 'Cancelar',
  'support.categoryLabel': 'Tipo de problema',
  'auth.otpTitle': 'Verifica o teu e-mail',
  'auth.otpSubtitle': 'Enviámos um código de 6 dígitos para o teu e-mail. Insere-o abaixo para confirmar a tua conta.',
  'auth.otpCode': 'Código de verificação',
  'auth.otpVerify': 'Verificar',
  'auth.otpCancel': 'Cancelar registo',
  'auth.otpResend': 'Reenviar código',
  'auth.otpSending': 'A enviar código…',
  'auth.otpVerifying': 'A verificar…',
  'auth.otpErrorInvalid': 'Código incorreto. Tenta novamente.',
  'auth.otpErrorExpired': 'O código expirou. Pede um novo.',
  'auth.otpErrorGeneric': 'Erro ao verificar o código. Tenta novamente.',
  'auth.otpSent': 'Código enviado! Verifica o teu e-mail.',
  'auth.otpResent': 'Novo código enviado!',
  'admin.usersList': 'Utilizadores Registados',
  'admin.usersLoading': 'A carregar utilizadores…',
  'admin.usersError': 'Erro ao carregar utilizadores.',
  'admin.usersRetry': 'Tentar novamente',
  'admin.deleteUser': 'Apagar Utilizador',
  'admin.deleteUserDesc': 'Escolha o tipo de remoção para este utilizador.',
  'admin.deleteFromPanel': 'Apagar do Painel',
  'admin.deleteFromPanelDesc': 'Remove o utilizador da vista administrativa. A conta continua ativa.',
  'admin.deleteFromApp': 'Apagar do Aplicativo',
  'admin.deleteFromAppDesc': 'Elimina permanentemente todos os dados, conta e registos associados.',
  'admin.deleteConfirm': 'Apagar',
  'admin.cancelDelete': 'Cancelar',
  'admin.activeUsers': 'Ativos',
  'admin.ban': 'Banir',
  'admin.unban': 'Desbanir',
  'admin.restrict': 'Restringir',
  'admin.unrestrict': 'Remover restrição',
  'admin.banned': 'Banida',
  'admin.restricted': 'Restrita',
  'admin.active': 'Ativa',
  'admin.referrals': 'Convites',
  'admin.referralCount': 'Amigos convidados',
  'admin.invitedBy': 'Convidado por',
  'admin.visitsTitle': 'Tráfego e Visitas',
  'admin.visitsToday': 'Hoje',
  'admin.visitsWeek': 'Esta semana',
  'admin.visitsMonth': 'Este mês',
  'admin.visitsTotal': 'Total',
  'admin.anonymousVisitors': 'Visitantes anónimos',
  'admin.registeredVisitors': 'Visitantes registados',
  'admin.visitorsLoading': 'A carregar visitas…',
  'admin.visitorsError': 'Erro ao carregar visitas.',
  'antiflood.cooldown': 'Proteção Anti-Spam: Aguarde {s}s...',
  'admin.metricsTemporalTitle': 'Mensagens por Período',
  'admin.metricsTemporalDesc': 'Volume de mensagens geradas ao longo do tempo.',
  'admin.metricsToday': 'Hoje',
  'admin.metricsWeek': 'Esta Semana',
  'admin.metricsMonth': 'Este Mês',
  'admin.metricsTotal': 'Total Geral',
  'admin.metricsUsers': 'Utilizadores',
  'admin.metricsAvg': 'Média / Utilizador',
  'admin.metricsPeakHour': 'Pico de Tráfego',
  'admin.metricsByHour': 'Mensagens por Hora',
  'admin.metricsByFeature': 'Mensagens por Funcionalidade',
  'admin.metricsRefresh': 'Atualizar métricas',
  'admin.metricsLoading': 'A carregar métricas…',
  'admin.metricsError': 'Erro ao carregar métricas',
  'admin.metricsRetry': 'Tentar novamente',
  'admin.metricsMessages': 'mensagens',
};

const en: Dict = {
  'nav.gerador': 'Reply Generator',
  'nav.melhorar': 'Improve Message',
  'nav.dicas': 'Tips & Lines',
  'nav.perfil': 'Profile',
  'nav.entrar': 'Sign in',
  'nav.criarConta': 'Sign up',
  'nav.sair': 'Sign out',
  'nav.brandTag': 'AI-powered replies',
  'nav.user': 'User',
  'common.copy': 'Copy',
  'common.copied': 'Copied!',
  'common.loading': 'Loading…',
  'common.errorTitle': 'Something went wrong',
  'common.menu': 'Menu',
  'common.close': 'Close',
  'common.paste': 'Paste',
  'common.clear': 'Clear',
  'gen.badge': 'Smart message composition',
  'gen.titleA': 'Write the ',
  'gen.titleB': 'perfect reply',
  'gen.subtitle':
    'Pick a context, set the tone and Aura generates 6 short replies in different styles, ready to copy.',
  'gen.contextLabel': 'Context',
  'gen.toneLabel': 'Reply tone',
  'gen.messageLabel': 'Your message',
  'gen.messagePlaceholder': 'Paste the message you received or the situation you want to reply to…',
  'gen.screenshotLabel': 'Screenshot (optional)',
  'gen.screenshotAlt': 'Screenshot preview',
  'gen.screenshotRemove': 'Remove image',
  'gen.dropText': 'Click or drag a chat screenshot',
  'gen.dropHint': 'PNG, JPEG, WebP or GIF · max 8 MB',
  'gen.generate': 'Generate reply',
  'gen.copy': 'Copy',
  'gen.generating': 'Generating…',
  'gen.readingImage': 'Reading image…',
  'gen.customContextPlaceholder':
    'Describe the context: who the person is, your relationship, what happened…',
  'gen.errorNoContext': 'Write your custom context before generating.',
  'gen.errorGeneric': 'Could not generate the reply. Try again.',
  'gen.errorFriendly': 'Unfortunately, screenshot reading and reply generation are temporarily unavailable right now. While we tune our engines, take the chance to explore our Tips & Lines tab to level up your game!',
  'gen.errorImageFormat': 'Unsupported format. Use PNG, JPEG, WebP or GIF.',
  'gen.errorImageSize': 'The image is too large (max 8 MB).',
  'gen.errorImageRead': 'Could not read the image.',
  'gen.errorImageProcess': 'Could not analyze the image. Try a clearer screenshot or generate without an image.',
  'gen.pretendenteTitle': 'Target Report',
  'gen.pretendenteSubtitle': 'Fill in her name and relationship to personalize the analysis and replies.',
  'gen.pretendenteName': 'Her name',
  'gen.pretendenteVinculo': 'Relationship/Situation (e.g. Ex, Coworker, Crush…)',
  'gen.perfilPsicologico': 'Psychological Action Profile',
  'gen.dicasAbordagem': 'Approach Tips for This Target',
  'gen.pretendenteGenerate': 'Generate Report',
  'ctx.puxar-assunto.label': 'Start a Topic',
  'ctx.puxar-assunto.desc': 'Resume or start a theme',
  'ctx.quebrar-gelo.label': 'Break the Ice',
  'ctx.quebrar-gelo.desc': 'Start a chat with someone new',
  'ctx.flertar.label': 'Flirt',
  'ctx.flertar.desc': 'Show interest with charm',
  'ctx.reagir-foto.label': 'React to a Photo',
  'ctx.reagir-foto.desc': 'Comment on a story or photo',
  'ctx.convidar-sair.label': 'Ask Them Out',
  'ctx.convidar-sair.desc': 'Propose a date',
  'ctx.manter-conversa.label': 'Keep It Going',
  'ctx.manter-conversa.desc': 'Avoid the silence',
  'ctx.dar-fora.label': 'Let Down Gently',
  'ctx.dar-fora.desc': 'Decline without hurting',
  'ctx.personalizado.label': 'Custom',
  'ctx.personalizado.desc': 'Write your own context',
  'tone.divertido': 'Playful',
  'tone.provocador': 'Provocative',
  'tone.direto': 'Direct',
  'tone.outro': 'Other',
  'tone.picante': 'Spicy',
  'tone.customPlaceholder': 'e.g. Friendly, Professional, Poetic…',
  'style.ideal.label': 'Ideal Reply',
  'style.ideal.desc': 'The most balanced and spot-on',
  'style.sedutora.label': 'Seductive',
  'style.sedutora.desc': 'Charm and interest',
  'style.informal.label': 'Informal',
  'style.informal.desc': 'Young and natural',
  'style.romantica.label': 'Romantic',
  'style.romantica.desc': 'Caring and sweet',
  'style.provocadora.label': 'Direct & Provocative',
  'style.provocadora.desc': 'Bold and challenging',
  'style.picante.label': 'Spicy',
  'style.picante.desc': 'Maximum intensity and unfiltered seduction',
  'style.recommended': 'Recommended by Aura',
  'style.adequada': '% suitable',
  'responses.title': 'Generated replies',
  'responses.regenerate': 'Generate more',
  'responses.composing': 'Composing the perfect replies…',
  'responses.streaming': 'Writing…',
  'responses.empty': 'Your replies will appear here.',
  'improve.badge': 'Refine and elevate',
  'improve.titleA': 'Improve ',
  'improve.titleB': 'Message',
  'improve.subtitle':
    'Paste a message you wrote and let Aura rewrite it to be more attractive, effective and natural.',
  'improve.messageLabel': 'Your message',
  'improve.messagePlaceholder': 'Paste the draft of the message you want to improve…',
  'improve.goalLabel': 'Goal (optional)',
  'improve.goalPlaceholder': 'e.g. sound more confident, create curiosity…',
  'improve.button': 'Improve message',
  'improving': 'Improving…',
  'improve.outputTitle': 'Improved message',
  'improve.refining': 'Refining the message…',
  'improve.errorGeneric': 'Could not improve the message. Try again.',
  'improve.errorFriendly': 'Unfortunately, screenshot reading and reply generation are temporarily unavailable right now. While we tune our engines, take the chance to explore our Tips & Lines tab to level up your game!',
  'improve.errorEmpty': 'Paste the message you want to improve first.',
  'improve.emptyOutput': 'The improved message will appear here.',
  'improve.partialWarning': 'Only some variants were generated. Try again to get all three complete versions.',
  'goal.confident': 'Sound more confident',
  'goal.funny': 'Make it funnier',
  'goal.flirty': 'Create flirty tension',
  'goal.mysterious': 'Be more mysterious',
  'goal.natural': 'Sound natural and fluid',
  'goal.casual': 'Let it down easy',
  'goal.picante': 'Make it spicy and provocative',
  'tips.badge': 'Learn while you use',
  'tips.titleA': 'Tips & ',
  'tips.titleB': 'Lines',
  'tips.subtitle':
    'Short articles on conversation and the psychology of attraction, followed by a library of ready-to-copy lines.',
  'tips.categoryAll': 'All',
  'tips.categoryPsychology': 'Attraction psychology',
  'tips.categoryConnection': 'Connection',
  'tips.categoryConversation': 'Conversation',
  'tips.categoryMindset': 'Mindset',
  'tip.curiosidade.title': 'The power of curiosity',
  'tip.curiosidade.category': 'Attraction psychology',
  'tip.curiosidade.summary': 'Always leave a door open for the next message.',
  'tip.curiosidade.body':
    'The best conversations don\'t close in a single message. Always end with a hook — a light question, a reference to something you\'ll tell later, a small mystery. The other person should want to reply, not feel the conversation already ended.\n\nPractical example: instead of "I liked your photo", use "You have a style all your own… is there a story behind it?". The first closes the chat; the second invites her to continue.',
  'tip.espelho.title': 'The mirror effect',
  'tip.espelho.category': 'Connection',
  'tip.espelho.summary': 'Match the other person\'s rhythm and tone in the first few minutes.',
  'tip.espelho.body':
    'In the first minutes of a conversation, people watch for signs of affinity. If she writes short messages with emojis, don\'t reply with long paragraphs. If she\'s more expansive, open up a bit more too. This "mirror" creates the subconscious feeling that you\'re on the same wavelength.\n\nThen, as the conversation grows, you can start leading the tone where you want.',
  'tip.nao-fechar.title': 'Never close with a closed question',
  'tip.nao-fechar.category': 'Conversation',
  'tip.nao-fechar.summary': 'Yes/no questions kill the conversation.',
  'tip.nao-fechar.body':
    'Avoid questions answered with a single word. "Do you like movies?" is a dead end. "What was the last movie that surprised you?" is an open door to a story.\n\nSimple rule: swap "do you like X?" for "what do you like about X?" or "what\'s your favorite X?". The conversation deepens effortlessly.',
  'tip.tensao.title': 'Flirty tension',
  'tip.tensao.category': 'Attraction psychology',
  'tip.tensao.summary': 'Flirting is a game of pushing and pulling.',
  'tip.tensao.body':
    'Attraction doesn\'t live on constant compliments — it lives on contrast. Show interest, then pull back with humor or a small challenge. This oscillation creates tension, and tension is what makes the conversation memorable.\n\nExample: "You were almost winning me over… but then you brought up that series and lost points." It\'s light, it\'s playful, but it creates a little "now what?" that keeps the other person invested.',
  'tip.autenticidade.title': 'Authenticity beats the script',
  'tip.autenticidade.category': 'Mindset',
  'tip.autenticidade.summary': 'Techniques help, but they don\'t replace being yourself.',
  'tip.autenticidade.body':
    'All these tips are tools, not a mask. If you use a technique but your tone sounds forced, the effect is the opposite. People sense incoherence.\n\nUse Aura as inspiration, adapt it to your voice, and don\'t be afraid to be spontaneous. A message of yours, imperfect but genuine, is worth more than ten "perfect" messages that don\'t represent you.',
  'tip.tempo.title': 'The right time to reply',
  'tip.tempo.category': 'Conversation',
  'tip.tempo.summary': 'It\'s not about playing hard to get — it\'s about having a life.',
  'tip.tempo.body':
    'Replying instantly to everything doesn\'t show more interest; it shows less of a life of your own. Don\'t force artificial waits, but don\'t be glued to the screen either.\n\nHave things to do, reply when you can, and when you do reply, focus on the conversation. That combination — available but not dependent — is naturally attractive.',
  'cantadas.badge': 'Local library · {n} lines',
  'cantadas.titleA': '1000 Foolproof ',
  'cantadas.titleB': 'Lines',
  'cantadas.subtitle':
    'Ready-to-copy lines organized by style. No internet, no waiting — just pick and use.',
  'cantadas.generateMore': 'Generate More',
  'cantadas.empty': 'No lines in this category.',
  'cantadas.filterAll': 'All',
  'cat.Divertidas': 'Funny',
  'cat.Fofas': 'Cute',
  'cat.Confiantes': 'Confident',
  'cat.Criativas': 'Creative',
  'cat.Inteligentes': 'Smart',
  'cat.Elogios': 'Compliments',
  'cat.Elogios2': 'Compliments 2.0',
  'cat.Românticas': 'Romantic',
  'cat.Sedutoras': 'Seductive',
  'cat.Provocadoras': 'Provocative',
  'cat.Tentação': 'Temptation',
  'cat.Picantes': 'Spicy',
  'profile.title': 'Profile & Settings',
  'profile.subtitle': 'Manage your account, suitors and preferences.',
  'profile.account': 'Account',
  'profile.name': 'Name',
  'profile.lastName': 'Last name',
  'profile.email': 'Email',
  'profile.phone': 'Phone',
  'profile.password': 'Password',
  'profile.changePassword': 'Change password',
  'profile.newPassword': 'New password (min. 6 characters)',
  'profile.save': 'Save',
  'profile.saving': 'Saving…',
  'profile.saved': 'Saved!',
  'profile.suitors': 'Manage Suitors / Connections',
  'profile.suitorsSubtitle': 'Track who you are talking to and the progress of each connection.',
  'profile.addSuitor': '+ Add Suitor',
  'profile.suitorName': "Person's name",
  'profile.suitorNotes': 'Notes / progress report',
  'profile.suitorStatus': 'Connection status',
  'profile.statusTalking': 'Talking',
  'profile.statusFlirting': 'Flirting',
  'profile.statusDating': 'Dating',
  'profile.statusCold': 'Gone cold',
  'profile.statusWon': 'Won over',
  'profile.statusLost': 'Lost',
  'profile.saveSuitor': 'Add',
  'profile.noSuitors': "You haven't added any suitor yet.",
  'profile.deleteSuitor': 'Delete',
  'profile.editSuitor': 'Edit',
  'profile.appearance': 'Appearance',
  'profile.appearanceSubtitle': 'Choose the site theme. Default is dark mode.',
  'profile.shareTitle': 'Share Aura',
  'profile.shareSubtitle': 'Share Aura with your friends — directly on WhatsApp, Instagram, Telegram or by copying the link.',
  'profile.shareButton': 'Share Aura',
  'profile.shareCopied': 'Link copied!',
  'profile.copyDirectLink': 'Copy direct link',
  'profile.instagramCopied': 'Text copied! Paste it into the person\'s Instagram chat',
  'profile.shareText': 'Tired of staring at your phone for hours wondering what to reply. 📱✨ **Aura** reads the situation and tells you exactly what to write to nail it. See for yourself: 👇',
  'profile.shareTextWa': 'Ever happened to not know what to reply at the right moment? 🤫 From today, that\'s over. Meet **Aura**, the AI that creates the perfect and irresistible reply for any conversation. Try it free here: 👇',
  'profile.darkMode': 'Dark Mode',
  'profile.lightMode': 'Light Mode',
  'profile.language': 'Language',
  'profile.languageSubtitle': 'Translate the site interface.',
  'profile.errorPasswordShort': 'Password must be at least 6 characters.',
  'profile.errorGeneric': 'Could not save.',
  'auth.signupTitle': 'Sign up',
  'auth.loginTitle': 'Sign in',
  'auth.signupSubtitle': 'Create your account to save your history.',
  'auth.loginSubtitle': 'Welcome back!',
  'auth.namePlaceholder': 'Name (optional)',
  'auth.emailPlaceholder': 'Email',
  'auth.passwordPlaceholder': 'Password',
  'auth.phonePlaceholder': 'Phone number',
  'auth.sendCode': 'Send code',
  'auth.searchCountry': 'Search country...',
  'auth.processing': 'Processing…',
  'auth.errorInvalidPhone': 'Invalid phone number.',
  'auth.errorPhoneRegistered': 'This phone number is already registered. Try signing in.',
  'auth.errorEmpty': 'Fill in email and password.',
  'auth.errorPasswordShort': 'Password must be at least 6 characters.',
  'auth.errorInvalidEmail': 'The email entered is not valid. Check the format (e.g. name@domain.com).',
  'auth.errorAlreadyRegistered': 'This email is already registered. Try signing in.',
  'auth.errorDeviceLimit': 'Account limit reached on this device. You cannot create more than 3 accounts from the same device.',
  'auth.firstNamePlaceholder': 'First name',
  'auth.lastNamePlaceholder': 'Last name',
  'auth.errorEmailNotConfirmed': 'Your email has not been confirmed yet. Check your inbox.',
  'auth.errorInvalidCredentials': 'Incorrect email or password. Check your details and try again.',
  'auth.usePhoneInstead': 'Prefer to use your phone?',
  'auth.useEmailInstead': 'Prefer to use your email?',
  'auth.errorGeneric': 'Could not authenticate.',

  'auth.verifyEmailTitle': 'Verify your email',
  'auth.verifyEmailSubtitle': 'We sent a 6-digit code to',
  'auth.verifyEmailHint': 'Check your inbox and spam folder. The code can take up to 2 minutes to arrive. If you don\'t receive it, you can resend.',
  'auth.verifying': 'Verifying code…',
  'auth.resendCode': 'Resend code',
  'auth.resendIn': 'Resend in {s}s',
  'auth.errorInvalidCode': 'Invalid or expired code. Please try again.',
  'auth.goToLogin': 'Go to login',
  'auth.verifyExitTitle': 'Leave without verifying?',
  'auth.verifyExitMessage': 'If you don\'t complete verification, you may lose access to your account, history, and important updates. All communication and account recovery happens via email. You\'re free to leave now, but consider this a warning about the risk.',
  'auth.verifyExitConfirm': 'Leave anyway',
  'auth.verifyExitCancel': 'Continue verification',

  'auth.errorTooMany': 'Too many attempts. Please wait a moment before trying again.',

  'auth.haveAccount': 'Already have an account?',
  'auth.pinTitle': 'Enter your PIN',
  'auth.pinSubtitle': 'Your account is protected with a 4-digit PIN. Enter it to continue.',
  'auth.errorWrongPin': 'Incorrect PIN. Please try again.',
  'auth.forgotPin': 'I forgot my password',
  'auth.pinRecoverySent': 'We sent a recovery code to your email. Use it to reset your PIN.',
  'auth.errorPinRecovery': 'Could not send recovery email. Please try again.',
  'popup.title': 'Your experience can be even better',
  'popup.subtitle': 'Create an account to save your history, customize pickup lines, and access exclusive features.',
  'popup.createAccount': 'Create free account',
  'popup.login': 'I already have an account',
  'popup.continueGuest': 'Continue as guest',
  'shareGate.title': 'Share Aura AI to unlock more',
  'shareGate.subtitle': 'Share Aura AI with 10 friends to keep generating responses. each friend who joins through your link counts toward your progress.',
  'shareGate.progress': 'Friends invited',
  'shareGate.yourLink': 'Your invite link',
  'shareGate.locked': 'Share with 10 friends to unlock and continue',
  'shareGate.unlocked': 'Unlocked! You can continue using Aura AI',
  'sedux.enginePlaceholder': 'Processing…',
  'sedux.engineBuilding': 'The SEDUX engine is being reconfigured. It will generate responses again soon.',
  'welcome.headline': 'Win over any woman with the right message at the right time.',
  'welcome.subtitle': 'Your AI expert in seduction, sharp lines and irresistible replies. Create your account now and try it FREE!',
  'welcome.createAccount': 'Create Free Account',
  'welcome.login': 'I already have an account / Log in',
  'profile.pinTitle': '4-Digit PIN',
  'profile.pinSubtitle': 'Set a 4-digit numeric PIN to protect access to your account.',
  'profile.pinActive': 'Active',
  'profile.pinEnabledDesc': 'Your PIN is active. Each time you log in, you will be asked for your PIN after your email and password.',
  'profile.pinNew': 'New PIN (4 digits)',
  'profile.pinConfirm': 'Confirm PIN',
  'profile.pinSave': 'Set PIN',
  'profile.pinRemove': 'Remove PIN',
  'profile.pinSaved': 'PIN set successfully.',
  'profile.pinRemoved': 'PIN removed.',
  'profile.pinErrorDigits': 'PIN must be exactly 4 numeric digits.',
  'profile.pinErrorMatch': 'PINs do not match.',
  'auth.noAccount': "Don't have an account yet?",
  'auth.signup': 'Sign up',
  'auth.login': 'Sign in',
  'footer.text': 'Aura AI — Uriel Traquino',
  'common.clearAll': 'Clear all',
  'common.clearAllConfirm': 'Clear all fields and responses?',
  'profile.dangerZone': 'Danger Zone',
  'profile.dangerZoneSubtitle': 'Permanently deletes all history and local data.',
  'profile.deleteAllData': 'Erase All Data & History',
  'profile.deleteAllConfirm': 'Are you sure? This permanently deletes all history and local data.',
  'profile.deleteAllDone': 'All data has been erased.',
  'tips.customCategory': 'Custom',
  'tips.customPlaceholder': 'e.g. her eyes, her smile, her style…',
  'tips.customFocusPlaceholder': 'e.g. intention — make her laugh, create tension, be subtle…',
  'tips.customGenerate': 'Generate Compliments',
  'tips.customGenerating': 'Generating compliments…',
  'tips.customError': 'Could not generate compliments. Try again.',
  'tips.customEmpty': 'Describe what you want to compliment and generate 5 creative compliments.',
  'tips.generateMoreStyle': 'Generate more of this style',
  'tips.generatingMore': 'Generating…',
  'compliment.ideal': 'Ideal / Recommended',
  'compliment.sedutora': 'Seductive',
  'compliment.divertida': 'Fun',
  'compliment.inteligente': 'Smart',
  'compliment.provocante': 'Provocative',
  'modal.clearTitle': 'Clear Conversation History',
  'modal.clearDescription': 'This action will permanently erase all conversation history and generated responses in this Aura AI tab. Do you wish to continue?',
  'modal.deleteAllTitle': 'Erase All Data',
  'modal.deleteAllDescription': 'This action will permanently erase all message history, analyzed photos and local session data. Your account stays active. Do you wish to continue?',
  'modal.cancel': 'CANCEL',
  'modal.confirmClear': 'CLEAR ALL',
  'modal.confirmDelete': 'ERASE ALL',
  'common.pasteHint': 'Use long-press on your device to paste',
  'cantadas.outras': 'More',
  'cantadas.translating': 'Translating…',
  'gen.savedReports': 'Saved reports',
  'intensity.fraca': 'Mild',
  'intensity.media': 'Medium',
  'intensity.forte': 'Strong',
  'length.curta': 'Short',
  'length.media': 'Medium',
  'length.longa': 'Long',
  'responses.intensity': 'Intensity',
  'improve.length': 'Length',
  'profile.optional': 'Optional',
  'auth.errorSmsFailed': 'Failed to send SMS. Check the number.',
  'pin.setupTitle': 'Set Up Security PIN',
  'pin.setupSubtitle': 'Create a 4-digit PIN to protect your account.',
  'pin.verifyTitle': 'Enter Your PIN',
  'pin.verifySubtitle': 'Confirm your identity with your 4-digit PIN.',
 'pin.confirm': 'Confirm',
  'pin.errorSet': 'Failed to save PIN. Try again.',
  'pin.errorWrong': 'Wrong PIN. Try again.',
  'pin.errorGeneric': 'Error verifying PIN. Try again.',
  'pin.forgotPin': 'Forgot my password',
  'pin.recoverySent': 'Recovery email sent. Check your inbox.',
  'pin.signOut': 'Forgot PIN? Sign out / Create new account',
  'pin.errorRecovery': 'Error sending recovery email. Try again.',
  'pin.setupButton': 'Set PIN',
  'pin.confirmPlaceholder': 'Confirm PIN',
  'pin.errorMismatch': 'PINs do not match. Try again.',
  'error.cardTitle': 'AI engine connection error',
  'error.retry': 'Try again',
  'support.button': 'Support',
  'support.title': 'Support & Report a Problem',
  'support.subject': 'Subject',
  'support.subjectPlaceholder': 'Ex: Error generating response',
  'support.message': 'Message',
  'support.messagePlaceholder': 'Describe the issue or your feedback…',
  'support.email': 'Email (optional)',
  'support.emailPlaceholder': 'your@email.com',
  'support.send': 'Send',
  'support.sending': 'Sending…',
  'support.sent': 'Thank you! Your report has been sent.',
  'support.error': 'Could not send. Please try again.',
  'support.bugAi': 'AI Error',
  'support.bugUi': 'Interface not working',
  'support.bugLogin': 'Login/Signup issue',
  'support.bugData': 'Data not saving',
  'support.bugOther': 'Other issue',
  'support.bugPerformance': 'Slow/Crashing',
  'support.cancel': 'Cancel',
  'support.categoryLabel': 'Issue type',
  'auth.otpTitle': 'Verify your email',
  'auth.otpSubtitle': 'We sent a 6-digit code to your email. Enter it below to confirm your account.',
  'auth.otpCode': 'Verification code',
  'auth.otpVerify': 'Verify',
  'auth.otpCancel': 'Cancel signup',
  'auth.otpResend': 'Resend code',
  'auth.otpSending': 'Sending code…',
  'auth.otpVerifying': 'Verifying…',
  'auth.otpErrorInvalid': 'Wrong code. Try again.',
  'auth.otpErrorExpired': 'Code expired. Request a new one.',
  'auth.otpErrorGeneric': 'Error verifying code. Try again.',
  'auth.otpSent': 'Code sent! Check your email.',
  'auth.otpResent': 'New code sent!',
  'admin.usersList': 'Registered Users',
  'admin.usersLoading': 'Loading users…',
  'admin.usersError': 'Error loading users.',
  'admin.usersRetry': 'Try again',
  'admin.deleteUser': 'Delete User',
  'admin.deleteUserDesc': 'Choose the type of removal for this user.',
  'admin.deleteFromPanel': 'Delete from Panel',
  'admin.deleteFromPanelDesc': 'Removes the user from the admin view. The account stays active.',
  'admin.deleteFromApp': 'Delete from App',
  'admin.deleteFromAppDesc': 'Permanently deletes all data, account, and associated records.',
  'admin.deleteConfirm': 'Delete',
  'admin.cancelDelete': 'Cancel',
  'admin.activeUsers': 'Active',
  'admin.ban': 'Ban',
  'admin.unban': 'Unban',
  'admin.restrict': 'Restrict',
  'admin.unrestrict': 'Remove restriction',
  'admin.banned': 'Banned',
  'admin.restricted': 'Restricted',
  'admin.active': 'Active',
  'admin.referrals': 'Referrals',
  'admin.referralCount': 'Friends invited',
  'admin.invitedBy': 'Invited by',
  'admin.visitsTitle': 'Traffic & Visits',
  'admin.visitsToday': 'Today',
  'admin.visitsWeek': 'This week',
  'admin.visitsMonth': 'This month',
  'admin.visitsTotal': 'Total',
  'admin.anonymousVisitors': 'Anonymous visitors',
  'admin.registeredVisitors': 'Registered visitors',
  'admin.visitorsLoading': 'Loading visits…',
  'admin.visitorsError': 'Error loading visits.',
  'antiflood.cooldown': 'Anti-Spam Protection: Wait {s}s...',
  'admin.metricsTemporalTitle': 'Messages by Period',
  'admin.metricsTemporalDesc': 'Volume of messages generated over time.',
  'admin.metricsToday': 'Today',
  'admin.metricsWeek': 'This Week',
  'admin.metricsMonth': 'This Month',
  'admin.metricsTotal': 'All Time',
  'admin.metricsUsers': 'Users',
  'admin.metricsAvg': 'Avg / User',
  'admin.metricsPeakHour': 'Peak Traffic',
  'admin.metricsByHour': 'Messages by Hour',
  'admin.metricsByFeature': 'Messages by Feature',
  'admin.metricsRefresh': 'Refresh metrics',
  'admin.metricsLoading': 'Loading metrics…',
  'admin.metricsError': 'Error loading metrics',
  'admin.metricsRetry': 'Try again',
  'admin.metricsMessages': 'messages',
};

const es: Dict = {
  'nav.gerador': 'Generador de Respuestas',
  'nav.melhorar': 'Mejorar Mensaje',
  'nav.dicas': 'Consejos y Piropos',
  'nav.perfil': 'Perfil',
  'nav.entrar': 'Entrar',
  'nav.criarConta': 'Crear cuenta',
  'nav.sair': 'Salir',
  'nav.brandTag': 'Respuestas con IA',
  'nav.user': 'Usuario',
  'common.copy': 'Copiar',
  'common.copied': '¡Copiado!',
  'common.loading': 'Cargando…',
  'common.errorTitle': 'Algo salió mal',
  'common.menu': 'Menú',
  'common.close': 'Cerrar',
  'common.paste': 'Pegar',
  'common.clear': 'Limpiar',
  'gen.badge': 'Composición inteligente de mensajes',
  'gen.titleA': 'Escribe la ',
  'gen.titleB': 'respuesta perfecta',
  'gen.subtitle':
    'Elige un contexto, define el tono y Aura genera 6 respuestas cortas en estilos diferentes, listas para copiar.',
  'gen.contextLabel': 'Contexto',
  'gen.toneLabel': 'Tono de respuesta',
  'gen.messageLabel': 'Tu mensaje',
  'gen.messagePlaceholder': 'Pega aquí el mensaje que recibiste o la situación a la que quieres responder…',
  'gen.screenshotLabel': 'Captura (opcional)',
  'gen.screenshotAlt': 'Vista previa de la captura',
  'gen.screenshotRemove': 'Quitar imagen',
  'gen.dropText': 'Clica o arrastra una captura del chat',
  'gen.dropHint': 'PNG, JPEG, WebP o GIF · máx. 8 MB',
  'gen.generate': 'Generar respuesta',
  'gen.copy': 'Copiar',
  'gen.generating': 'Generando…',
  'gen.readingImage': 'Leyendo imagen…',
  'gen.customContextPlaceholder':
    'Describe el contexto: quién es la persona, qué relación tienen, qué pasó…',
  'gen.errorNoContext': 'Escribe tu contexto personalizado antes de generar.',
  'gen.errorGeneric': 'No se pudo generar la respuesta. Inténtalo de nuevo.',
  'gen.errorFriendly': 'Lamentablemente, la lectura por screenshot y la generación de respuestas están temporalmente no disponibles ahora mismo. Mientras ajustamos nuestros motores, aprovecha para explorar nuestra pestaña de Consejos y Piropos para subir tu nivel!',
  'gen.errorImageFormat': 'Formato no admitido. Usa PNG, JPEG, WebP o GIF.',
  'gen.errorImageSize': 'La imagen es demasiado grande (máx. 8 MB).',
  'gen.errorImageRead': 'No se pudo leer la imagen.',
  'gen.errorImageProcess': 'No se pudo analizar la imagen. Prueba con una captura más nítida o genera sin imagen.',
  'gen.pretendenteTitle': 'Informe de la Pretendiente',
  'gen.pretendenteSubtitle': 'Rellena su nombre y vínculo para personalizar el análisis y las respuestas.',
  'gen.pretendenteName': 'Nombre de ella',
  'gen.pretendenteVinculo': 'Vínculo/Situación (ej: Ex, Colega, Coqueteo…)',
  'gen.perfilPsicologico': 'Perfil Psicológico de Acción',
  'gen.dicasAbordagem': 'Consejos de Acercamiento para esta Pretendiente',
  'gen.pretendenteGenerate': 'Generar Informe',
  'ctx.puxar-assunto.label': 'Sacar Tema',
  'ctx.puxar-assunto.desc': 'Retomar o iniciar un tema',
  'ctx.quebrar-gelo.label': 'Romper el Hielo',
  'ctx.quebrar-gelo.desc': 'Empezar a hablar con alguien nuevo',
  'ctx.flertar.label': 'Coquetear',
  'ctx.flertar.desc': 'Mostrar interés con encanto',
  'ctx.reagir-foto.label': 'Reaccionar a una Foto',
  'ctx.reagir-foto.desc': 'Comentar un story o foto',
  'ctx.convidar-sair.label': 'Invitar a Salir',
  'ctx.convidar-sair.desc': 'Proponer una cita',
  'ctx.manter-conversa.label': 'Mantener la Conversación',
  'ctx.manter-conversa.desc': 'Evitar el silencio',
  'ctx.dar-fora.label': 'Rechazo Suave',
  'ctx.dar-fora.desc': 'Declinar sin lastimar',
  'ctx.personalizado.label': 'Personalizado',
  'ctx.personalizado.desc': 'Escribe tu propio contexto',
  'tone.divertido': 'Juguetón',
  'tone.provocador': 'Provocador',
  'tone.direto': 'Directo',
  'tone.outro': 'Otro',
  'tone.picante': 'Picante',
  'tone.customPlaceholder': 'ej. Amistoso, Profesional, Poético…',
  'style.ideal.label': 'Respuesta Ideal',
  'style.ideal.desc': 'La más equilibrada y certera',
  'style.sedutora.label': 'Seductora',
  'style.sedutora.desc': 'Encanto e interés',
  'style.informal.label': 'Informal',
  'style.informal.desc': 'Joven y natural',
  'style.romantica.label': 'Romántica',
  'style.romantica.desc': 'Cariñosa y atenta',
  'style.provocadora.label': 'Directa & Provocadora',
  'style.provocadora.desc': 'Audaz y desafiante',
  'style.picante.label': 'Picante',
  'style.picante.desc': 'Máxima intensidad y seducción sin filtros',
  'style.recommended': 'Recomendada por Aura',
  'style.adequada': '% adecuada',
  'responses.title': 'Respuestas generadas',
  'responses.regenerate': 'Generar otras',
  'responses.composing': 'Componiendo las respuestas perfectas…',
  'responses.streaming': 'Escribiendo…',
  'responses.empty': 'Tus respuestas aparecerán aquí.',
  'improve.badge': 'Refinar y potenciar',
  'improve.titleA': 'Mejorar ',
  'improve.titleB': 'Mensaje',
  'improve.subtitle':
    'Pega un mensaje que hayas escrito y deja que Aura lo reescriba para que sea más atractivo, eficaz y natural.',
  'improve.messageLabel': 'Tu mensaje',
  'improve.messagePlaceholder': 'Pega aquí el borrador del mensaje que quieres mejorar…',
  'improve.goalLabel': 'Objetivo (opcional)',
  'improve.goalPlaceholder': 'ej. sonar más seguro, crear curiosidad…',
  'improve.button': 'Mejorar mensaje',
  'improving': 'Mejorando…',
  'improve.outputTitle': 'Mensaje mejorado',
  'improve.refining': 'Refinando el mensaje…',
  'improve.errorGeneric': 'No se pudo mejorar el mensaje. Inténtalo de nuevo.',
  'improve.errorFriendly': 'Lamentablemente, la lectura por screenshot y la generación de respuestas están temporalmente no disponibles ahora mismo. Mientras ajustamos nuestros motores, aprovecha para explorar nuestra pestaña de Consejos y Piropos para subir tu nivel!',
  'improve.errorEmpty': 'Pega primero el mensaje que quieres mejorar.',
  'improve.emptyOutput': 'El mensaje mejorado aparecerá aquí.',
  'improve.partialWarning': 'Solo se generaron algunas variantes. Intenta de nuevo para obtener las tres versiones completas.',
  'goal.confident': 'Sonar más seguro',
  'goal.funny': 'Hacerlo más gracioso',
  'goal.flirty': 'Crear tensión coqueta',
  'goal.mysterious': 'Ser más misterioso',
  'goal.natural': 'Parecer natural y fluido',
  'goal.casual': 'Dejarlo sin prisa',
  'goal.picante': 'Hacerlo picante y provocativo',
  'tips.badge': 'Aprende mientras usas',
  'tips.titleA': 'Consejos & ',
  'tips.titleB': 'Piropos',
  'tips.subtitle':
    'Artículos cortos sobre conversación y psicología de la atracción, seguidos de una biblioteca de piropos listos para copiar.',
  'tips.categoryAll': 'Todos',
  'tips.categoryPsychology': 'Psicología de la atracción',
  'tips.categoryConnection': 'Conexión',
  'tips.categoryConversation': 'Conversación',
  'tips.categoryMindset': 'Mentalidad',
  'tip.curiosidade.title': 'El poder de la curiosidad',
  'tip.curiosidade.category': 'Psicología de la atracción',
  'tip.curiosidade.summary': 'Deja siempre una puerta abierta para el próximo mensaje.',
  'tip.curiosidade.body':
    'Las mejores conversaciones no se cierran en un solo mensaje. Termina siempre con un gancho — una pregunta ligera, una referencia a algo que contarás después, un pequeño misterio. La otra persona debe quedar con ganas de responder, no con la sensación de que la conversación ya terminó.\n\nEjemplo práctico: en vez de "Me gustó tu foto", usa "Tienes un estilo muy tuyo… ¿hay una historia detrás?". La primera cierra el chat; la segunda la invita a continuar.',
  'tip.espelho.title': 'El efecto espejo',
  'tip.espelho.category': 'Conexión',
  'tip.espelho.summary': 'Imita el ritmo y el tono de la otra persona en los primeros minutos.',
  'tip.espelho.body':
    'En los primeros minutos de una conversación, la gente atiende a señales de afinidad. Si ella escribe con frases cortas y emojis, no respondas con párrafos largos. Si es más expansiva, ábrete un poco más también. Este "espejo" crea la sensación subconsciente de que están en la misma sintonía.\n\nLuego, a medida que la conversación crece, puedes empezar a liderar el tono hacia donde quieras.',
  'tip.nao-fechar.title': 'Nunca cerrar con una pregunta cerrada',
  'tip.nao-fechar.category': 'Conversación',
  'tip.nao-fechar.summary': 'Las preguntas de "sí/no" matan la conversación.',
  'tip.nao-fechar.body':
    'Evita preguntas que se responden con una sola palabra. "¿Te gusta el cine?" es un callejón sin salida. "¿Cuál fue la última película que te sorprendió?" es una puerta abierta a una historia.\n\nRegla simple: cambia "¿te gusta X?" por "¿qué te gusta de X?" o "¿cuál es tu X favorito?". La conversación gana profundidad sin esfuerzo.',
  'tip.tensao.title': 'Tensión coqueta',
  'tip.tensao.category': 'Psicología de la atracción',
  'tip.tensao.summary': 'El coqueteo es un juego de avanzar y retroceder.',
  'tip.tensao.body':
    'La atracción no vive de cumplidos constantes — vive del contraste. Muestra interés, luego retrocede con humor o un pequeño desafío. Esta oscilación crea tensión, y la tensión es lo que hace memorable la conversación.\n\nEjemplo: "Casi me convencías… pero sacaste esa serie y perdiste puntos". Es ligero, es juego, pero crea un pequeño "¿y ahora?" que mantiene a la otra persona invertida.',
  'tip.autenticidade.title': 'La autenticidad vence al guion',
  'tip.autenticidade.category': 'Mentalidad',
  'tip.autenticidade.summary': 'Las técnicas ayudan, pero no reemplazan ser tú mismo.',
  'tip.autenticidade.body':
    'Todos estos consejos son herramientas, no una máscara. Si usas una técnica pero tu tono suena forzado, el efecto es el opuesto. La gente siente la incoherencia.\n\nUsa Aura como inspiración, adáptalo a tu voz y no tengas miedo de ser espontáneo. Un mensaje tuyo, imperfecto pero genuino, vale más que diez mensajes "perfectos" que no te representan.',
  'tip.tempo.title': 'El momento justo para responder',
  'tip.tempo.category': 'Conversación',
  'tip.tempo.summary': 'No se trata de hacerte el difícil — se trata de tener vida.',
  'tip.tempo.body':
    'Responder de inmediato a todo no demuestra más interés; demuestra menos vida propia. No fuerces esperas artificiales, pero tampoco estés pegado a la pantalla.\n\nTen cosas que hacer, responde cuando puedas, y cuando respondas, céntrate en la conversación. Esa combinación — disponible pero no dependiente — es naturalmente atractiva.',
  'cantadas.badge': 'Biblioteca local · {n} piropos',
  'cantadas.titleA': '1000 Piropos ',
  'cantadas.titleB': 'Infalibles',
  'cantadas.subtitle':
    'Piropos listos para copiar, organizados por estilo. Sin internet, sin espera — solo elegir y usar.',
  'cantadas.generateMore': 'Generar Más',
  'cantadas.empty': 'No hay piropos en esta categoría.',
  'cantadas.filterAll': 'Todas',
  'cat.Divertidas': 'Divertidas',
  'cat.Fofas': 'Tiernas',
  'cat.Confiantes': 'Seguras',
  'cat.Criativas': 'Creativas',
  'cat.Inteligentes': 'Inteligentes',
  'cat.Elogios': 'Elogios',
  'cat.Elogios2': 'Elogios 2.0',
  'cat.Românticas': 'Románticas',
  'cat.Sedutoras': 'Seductoras',
  'cat.Provocadoras': 'Provocadoras',
  'cat.Tentação': 'Tentación',
  'cat.Picantes': 'Picantes',
  'profile.title': 'Perfil y Ajustes',
  'profile.subtitle': 'Gestiona tu cuenta, pretendientes y preferencias.',
  'profile.account': 'Cuenta',
  'profile.name': 'Nombre',
  'profile.lastName': 'Apellido',
  'profile.email': 'Correo',
  'profile.phone': 'Teléfono',
  'profile.password': 'Contraseña',
  'profile.changePassword': 'Cambiar contraseña',
  'profile.newPassword': 'Nueva contraseña (mín. 6 caracteres)',
  'profile.save': 'Guardar',
  'profile.saving': 'Guardando…',
  'profile.saved': '¡Guardado!',
  'profile.suitors': 'Gestionar Pretendientes / Vínculos',
  'profile.suitorsSubtitle': 'Sigue con quién hablas y el progreso de cada vínculo.',
  'profile.addSuitor': '+ Añadir Pretendiente',
  'profile.suitorName': 'Nombre de la persona',
  'profile.suitorNotes': 'Notas / informe de progreso',
  'profile.suitorStatus': 'Estado del vínculo',
  'profile.statusTalking': 'Hablando',
  'profile.statusFlirting': 'Coqueteando',
  'profile.statusDating': 'Citas',
  'profile.statusCold': 'Enfriado',
  'profile.statusWon': 'Conquistado',
  'profile.statusLost': 'Perdido',
  'profile.saveSuitor': 'Añadir',
  'profile.noSuitors': 'Todavía no has añadido ningún pretendiente.',
  'profile.deleteSuitor': 'Eliminar',
  'profile.editSuitor': 'Editar',
  'profile.appearance': 'Apariencia',
  'profile.appearanceSubtitle': 'Elige el tema del sitio. Por defecto es modo oscuro.',
  'profile.shareTitle': 'Compartir Aura',
  'profile.shareSubtitle': 'Comparte Aura con tus amigos — directamente en WhatsApp, Instagram, Telegram o copiando el enlace.',
  'profile.shareButton': 'Compartir Aura',
  'profile.shareCopied': '¡Enlace copiado!',
  'profile.copyDirectLink': 'Copiar enlace directo',
  'profile.instagramCopied': '¡Texto copiado! Pégalo en el chat de la persona en Instagram',
  'profile.shareText': 'Deja de estar horas mirando el teléfono pensando qué responder. 📱✨ **Aura** lee la situación y te dice exactamente qué escribir para acertar. Compruébalo tú mismo: 👇',
  'profile.shareTextWa': '¿Te ha pasado no saber qué responder en el momento justo? 🤫 A partir de hoy, se acabó. Conoce **Aura**, la IA que crea la respuesta perfecta e irresistible para cualquier conversación. Pruébalo gratis aquí: 👇',
  'profile.darkMode': 'Modo Oscuro',
  'profile.lightMode': 'Modo Claro',
  'profile.language': 'Idioma',
  'profile.languageSubtitle': 'Traduce la interfaz del sitio.',
  'profile.errorPasswordShort': 'La contraseña debe tener al menos 6 caracteres.',
  'profile.errorGeneric': 'No se pudo guardar.',
  'auth.signupTitle': 'Crear cuenta',
  'auth.loginTitle': 'Entrar',
  'auth.signupSubtitle': 'Crea tu cuenta para guardar tu historial.',
  'auth.loginSubtitle': '¡Bienvenido de vuelta!',
  'auth.namePlaceholder': 'Nombre (opcional)',
  'auth.emailPlaceholder': 'Correo',
  'auth.passwordPlaceholder': 'Contraseña',
  'auth.phonePlaceholder': 'Número de teléfono',
  'auth.sendCode': 'Enviar código',
  'auth.searchCountry': 'Buscar país...',
  'auth.processing': 'Procesando…',
  'auth.errorInvalidPhone': 'Número de teléfono inválido.',
  'auth.errorPhoneRegistered': 'Este número ya está registrado. Intenta entrar.',
  'auth.errorEmpty': 'Rellena el correo y la contraseña.',
  'auth.errorPasswordShort': 'La contraseña debe tener al menos 6 caracteres.',
  'auth.errorInvalidEmail': 'El correo ingresado no es válido. Verifica el formato (ej: nombre@dominio.com).',
  'auth.errorAlreadyRegistered': 'Este correo ya está registrado. Intenta entrar.',
  'auth.errorDeviceLimit': 'Límite de cuentas alcanzado en este dispositivo. No puedes crear más de 3 cuentas desde el mismo dispositivo.',
  'auth.firstNamePlaceholder': 'Nombre',
  'auth.lastNamePlaceholder': 'Apellido',
  'auth.errorEmailNotConfirmed': 'Tu correo aún no ha sido confirmado. Revisa tu bandeja de entrada.',
  'auth.errorInvalidCredentials': 'Correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.',
  'auth.usePhoneInstead': '¿Prefieres usar tu teléfono?',
  'auth.useEmailInstead': '¿Prefieres usar tu correo?',
  'auth.errorGeneric': 'No se pudo autenticar.',

  'auth.verifyEmailTitle': 'Verifica tu correo',
  'auth.verifyEmailSubtitle': 'Enviamos un código de 6 dígitos a',
  'auth.verifyEmailHint': 'Revisa tu bandeja de entrada y carpeta de spam. El código puede tardar hasta 2 minutos en llegar. Si no lo recibes, puedes reenviar.',
  'auth.verifying': 'Verificando código…',
  'auth.resendCode': 'Reenviar código',
  'auth.resendIn': 'Reenviar en {s}s',
  'auth.errorInvalidCode': 'Código inválido o expirado. Inténtalo de nuevo.',
  'auth.goToLogin': 'Ir a inicio de sesión',
  'auth.verifyExitTitle': '¿Salir sin verificar?',
  'auth.verifyExitMessage': 'Si no completas la verificación, puedes perder el acceso a tu cuenta, historial y actualizaciones importantes. Toda la comunicación y recuperación de cuenta se realiza por correo electrónico. Puedes salir ahora si quieres, pero queda avisado del riesgo.',
  'auth.verifyExitConfirm': 'Salir de todos modos',
  'auth.verifyExitCancel': 'Continuar verificación',

  'auth.errorTooMany': 'Demasiados intentos. Espera un momento antes de intentar de nuevo.',

  'auth.haveAccount': '¿Ya tienes cuenta?',
  'auth.pinTitle': 'Introduce tu PIN',
  'auth.pinSubtitle': 'Tu cuenta está protegida con un PIN de 4 dígitos. Introdúcelo para continuar.',
  'auth.errorWrongPin': 'PIN incorrecto. Inténtalo de nuevo.',
  'auth.forgotPin': 'Olvidé mi contraseña',
  'auth.pinRecoverySent': 'Enviamos un código de recuperación a tu correo. Úsalo para restablecer tu PIN.',
  'auth.errorPinRecovery': 'No se pudo enviar el correo de recuperación. Inténtalo de nuevo.',
  'popup.title': 'Tu experiencia puede ser aún mejor',
  'popup.subtitle': 'Crea una cuenta para guardar tu historial, personalizar piropos y acceder a funciones exclusivas.',
  'popup.createAccount': 'Crear cuenta gratis',
  'popup.login': 'Ya tengo cuenta',
  'popup.continueGuest': 'Continuar como invitado',
  'shareGate.title': 'Comparte Aura AI para desbloquear más',
  'shareGate.subtitle': 'Comparte Aura AI con 10 amigos para seguir generando respuestas. Cada amigo que entre a través de tu enlace cuenta para tu progreso.',
  'shareGate.progress': 'Amigos invitados',
  'shareGate.yourLink': 'Tu enlace de invitación',
  'shareGate.locked': 'Comparte con 10 amigos para desbloquear y continuar',
  'shareGate.unlocked': '¡Desbloqueado! Puedes seguir usando Aura AI',
  'sedux.enginePlaceholder': 'Procesando…',
  'sedux.engineBuilding': 'El motor SEDUX se está reconfigurando. Pronto volverá a generar respuestas.',
  'welcome.headline': 'Conquista a cualquier mujer con el mensaje correcto en el momento adecuado.',
  'welcome.subtitle': 'Tu IA experta en seducción, líneas afiladas y respuestas irresistibles. Crea tu cuenta ahora y pruébalo GRATIS.',
  'welcome.createAccount': 'Crear Cuenta Gratis',
  'welcome.login': 'Ya tengo una cuenta / Entrar',
  'profile.pinTitle': 'PIN de 4 Dígitos',
  'profile.pinSubtitle': 'Define un PIN numérico de 4 dígitos para proteger el acceso a tu cuenta.',
  'profile.pinActive': 'Activo',
  'profile.pinEnabledDesc': 'Tu PIN está activo. Cada vez que inicies sesión, se te pedirá el PIN después del correo y contraseña.',
  'profile.pinNew': 'Nuevo PIN (4 dígitos)',
  'profile.pinConfirm': 'Confirmar PIN',
  'profile.pinSave': 'Definir PIN',
  'profile.pinRemove': 'Eliminar PIN',
  'profile.pinSaved': 'PIN definido con éxito.',
  'profile.pinRemoved': 'PIN eliminado.',
  'profile.pinErrorDigits': 'El PIN debe tener exactamente 4 dígitos numéricos.',
  'profile.pinErrorMatch': 'Los PINs no coinciden.',
  'auth.noAccount': '¿Aún no tienes cuenta?',
  'auth.signup': 'Crear cuenta',
  'auth.login': 'Entrar',
  'footer.text': 'Aura AI — Uriel Traquino',
  'common.clearAll': 'Limpiar todo',
  'common.clearAllConfirm': '¿Limpiar todos los campos y respuestas?',
  'profile.dangerZone': 'Zona de Peligro',
  'profile.dangerZoneSubtitle': 'Borra permanentemente todo el historial y datos locales.',
  'profile.deleteAllData': 'Borrar Todos los Datos e Historial',
  'profile.deleteAllConfirm': '¿Estás seguro? Esto borra permanentemente todo el historial y datos locales.',
  'profile.deleteAllDone': 'Todos los datos han sido borrados.',
  'tips.customCategory': 'Personalizado',
  'tips.customPlaceholder': 'ej: sus ojos, su sonrisa, su estilo…',
  'tips.customFocusPlaceholder': 'ej: intención — hacerla reír, crear tensión, ser discreto…',
  'tips.customGenerate': 'Generar Elogios',
  'tips.customGenerating': 'Generando elogios…',
  'tips.customError': 'No se pudieron generar los elogios. Inténtalo de nuevo.',
  'tips.customEmpty': 'Describe lo que quieres elogiar y genera 5 elogios creativos.',
  'tips.generateMoreStyle': 'Generar más de este estilo',
  'tips.generatingMore': 'Generando…',
  'compliment.ideal': 'Ideal / Recomendada',
  'compliment.sedutora': 'Seductora',
  'compliment.divertida': 'Divertida',
  'compliment.inteligente': 'Inteligente',
  'compliment.provocante': 'Provocante',
  'modal.clearTitle': 'Borrar Historial de Conversación',
  'modal.clearDescription': 'Esta acción borrará permanentemente todo el historial de conversaciones y respuestas generadas en esta pestaña de Aura AI. ¿Deseas continuar?',
  'modal.deleteAllTitle': 'Borrar Todos los Datos',
  'modal.deleteAllDescription': 'Esta acción borrará permanentemente todo el historial de mensajes, fotos analizadas y datos locales de la sesión. Tu cuenta permanece activa. ¿Deseas continuar?',
  'modal.cancel': 'CANCELAR',
  'modal.confirmClear': 'LIMPIAR TODO',
  'modal.confirmDelete': 'BORRAR TODO',
  'common.pasteHint': 'Usa la pulsación larga de tu dispositivo para pegar',
  'cantadas.outras': 'Otras',
  'cantadas.translating': 'Traduciendo…',
  'gen.savedReports': 'Informes guardados',
  'intensity.fraca': 'Suave',
  'intensity.media': 'Media',
  'intensity.forte': 'Fuerte',
  'length.curta': 'Corta',
  'length.media': 'Media',
  'length.longa': 'Larga',
  'responses.intensity': 'Intensidad',
  'improve.length': 'Longitud',
  'profile.optional': 'Opcional',
  'auth.errorSmsFailed': 'Error al enviar SMS. Verifica el número.',
  'pin.setupTitle': 'Configurar PIN de Seguridad',
  'pin.setupSubtitle': 'Crea un PIN de 4 dígitos para proteger tu cuenta.',
  'pin.verifyTitle': 'Introduce tu PIN',
  'pin.verifySubtitle': 'Confirma tu identidad con tu PIN de 4 dígitos.',
  'pin.confirm': 'Confirmar',
  'pin.errorSet': 'Error al guardar el PIN. Inténtalo de nuevo.',
  'pin.errorWrong': 'PIN incorrecto. Inténtalo de nuevo.',
  'pin.errorGeneric': 'Error al verificar el PIN. Inténtalo de nuevo.',
  'pin.forgotPin': 'Olvidé mi contraseña',
  'pin.recoverySent': 'Correo de recuperación enviado. Revisa tu bandeja de entrada.',
  'pin.signOut': '¿Olvidaste el PIN? Cerrar sesión / Crear nueva cuenta',
  'pin.errorRecovery': 'Error al enviar correo de recuperación. Inténtalo de nuevo.',
  'pin.setupButton': 'Establecer PIN',
  'pin.confirmPlaceholder': 'Confirmar PIN',
  'pin.errorMismatch': 'Los PIN no coinciden. Inténtalo de nuevo.',
  'error.cardTitle': 'Error de conexión al motor de IA',
  'error.retry': 'Intentar de nuevo',
  'support.button': 'Soporte',
  'support.title': 'Soporte y Reportar un Problema',
  'support.subject': 'Asunto',
  'support.subjectPlaceholder': 'Ej: Error al generar respuesta',
  'support.message': 'Mensaje',
  'support.messagePlaceholder': 'Describe el problema o tu comentario…',
  'support.email': 'Email (opcional)',
  'support.emailPlaceholder': 'tu@email.com',
  'support.send': 'Enviar',
  'support.sending': 'Enviando…',
  'support.sent': '¡Gracias! Tu reporte ha sido enviado.',
  'support.error': 'No se pudo enviar. Inténtalo de nuevo.',
  'support.bugAi': 'Error de IA',
  'support.bugUi': 'Interfaz no funciona',
  'support.bugLogin': 'Problema de inicio de sesión',
  'support.bugData': 'Los datos no se guardan',
  'support.bugOther': 'Otro problema',
  'support.bugPerformance': 'Lentitud/Bloqueo',
  'support.cancel': 'Cancelar',
  'support.categoryLabel': 'Tipo de problema',
  'auth.otpTitle': 'Verifica tu correo',
  'auth.otpSubtitle': 'Enviamos un código de 6 dígitos a tu correo. Introdúcelo para confirmar tu cuenta.',
  'auth.otpCode': 'Código de verificación',
  'auth.otpVerify': 'Verificar',
  'auth.otpCancel': 'Cancelar registro',
  'auth.otpResend': 'Reenviar código',
  'auth.otpSending': 'Enviando código…',
  'auth.otpVerifying': 'Verificando…',
  'auth.otpErrorInvalid': 'Código incorrecto. Inténtalo de nuevo.',
  'auth.otpErrorExpired': 'Código expirado. Pide uno nuevo.',
  'auth.otpErrorGeneric': 'Error al verificar el código. Inténtalo de nuevo.',
  'auth.otpSent': '¡Código enviado! Revisa tu correo.',
  'auth.otpResent': '¡Nuevo código enviado!',
  'admin.usersList': 'Usuarios Registrados',
  'admin.usersLoading': 'Cargando usuarios…',
  'admin.usersError': 'Error al cargar usuarios.',
  'admin.usersRetry': 'Intentar de nuevo',
  'admin.deleteUser': 'Eliminar Usuario',
  'admin.deleteUserDesc': 'Elija el tipo de eliminación para este usuario.',
  'admin.deleteFromPanel': 'Eliminar del Panel',
  'admin.deleteFromPanelDesc': 'Elimina al usuario de la vista administrativa. La cuenta sigue activa.',
  'admin.deleteFromApp': 'Eliminar de la App',
  'admin.deleteFromAppDesc': 'Elimina permanentemente todos los datos, cuenta y registros asociados.',
  'admin.deleteConfirm': 'Eliminar',
  'admin.cancelDelete': 'Cancelar',
  'admin.activeUsers': 'Activos',
  'admin.ban': 'Banear',
  'admin.unban': 'Desbanear',
  'admin.restrict': 'Restringir',
  'admin.unrestrict': 'Quitar restricción',
  'admin.banned': 'Baneada',
  'admin.restricted': 'Restringida',
  'admin.active': 'Activa',
  'admin.referrals': 'Invitaciones',
  'admin.referralCount': 'Amigos invitados',
  'admin.invitedBy': 'Invitado por',
  'admin.visitsTitle': 'Tráfico y Visitas',
  'admin.visitsToday': 'Hoy',
  'admin.visitsWeek': 'Esta semana',
  'admin.visitsMonth': 'Este mes',
  'admin.visitsTotal': 'Total',
  'admin.anonymousVisitors': 'Visitantes anónimos',
  'admin.registeredVisitors': 'Visitantes registrados',
  'admin.visitorsLoading': 'Cargando visitas…',
  'admin.visitorsError': 'Error al cargar visitas.',
  'antiflood.cooldown': 'Protección Anti-Spam: Espera {s}s...',
  'admin.metricsTemporalTitle': 'Mensajes por Período',
  'admin.metricsTemporalDesc': 'Volumen de mensajes generados a lo largo del tiempo.',
  'admin.metricsToday': 'Hoy',
  'admin.metricsWeek': 'Esta Semana',
  'admin.metricsMonth': 'Este Mes',
  'admin.metricsTotal': 'Total General',
  'admin.metricsUsers': 'Usuarios',
  'admin.metricsAvg': 'Media / Usuario',
  'admin.metricsPeakHour': 'Pico de Tráfico',
  'admin.metricsByHour': 'Mensajes por Hora',
  'admin.metricsByFeature': 'Mensajes por Función',
  'admin.metricsRefresh': 'Actualizar métricas',
  'admin.metricsLoading': 'Cargando métricas…',
  'admin.metricsError': 'Error al cargar métricas',
  'admin.metricsRetry': 'Intentar de nuevo',
  'admin.metricsMessages': 'mensajes',
};

const fr: Dict = {
  'nav.gerador': 'Générateur de réponses',
  'nav.melhorar': 'Améliorer le message',
  'nav.dicas': 'Conseils & Répliques',
  'nav.perfil': 'Profil',
  'nav.entrar': 'Connexion',
  'nav.criarConta': 'Inscription',
  'nav.sair': 'Déconnexion',
  'nav.brandTag': 'Réponses par IA',
  'nav.user': 'Utilisateur',
  'common.copy': 'Copier',
  'common.copied': 'Copié !',
  'common.loading': 'Chargement…',
  'common.errorTitle': 'Une erreur est survenue',
  'common.menu': 'Menu',
  'common.close': 'Fermer',
  'common.paste': 'Coller',
  'common.clear': 'Effacer',
  'gen.badge': 'Composition intelligente de messages',
  'gen.titleA': 'Écris la ',
  'gen.titleB': 'réponse parfaite',
  'gen.subtitle':
    'Choisis un contexte, définis le ton et Aura génère 6 réponses courtes dans des styles différents, prêtes à copier.',
  'gen.contextLabel': 'Contexte',
  'gen.toneLabel': 'Ton de la réponse',
  'gen.messageLabel': 'Ton message',
  'gen.messagePlaceholder': 'Colle ici le message que tu as reçu ou la situation à laquelle tu veux répondre…',
  'gen.screenshotLabel': 'Capture d\'écran (optionnel)',
  'gen.screenshotAlt': 'Aperçu de la capture d\'écran',
  'gen.screenshotRemove': 'Retirer l\'image',
  'gen.dropText': 'Clique ou glisse une capture de la conversation',
  'gen.dropHint': 'PNG, JPEG, WebP ou GIF · max 8 Mo',
  'gen.generate': 'Générer la réponse',
  'gen.copy': 'Copier',
  'gen.generating': 'Génération…',
  'gen.readingImage': 'Lecture de l\'image…',
  'gen.customContextPlaceholder':
    'Décris le contexte : qui est la personne, votre relation, ce qui s\'est passé…',
  'gen.errorNoContext': 'Écris ton contexte personnalisé avant de générer.',
  'gen.errorGeneric': 'Impossible de générer la réponse. Réessaie.',
  'gen.errorFriendly': 'Malheureusement, la lecture par screenshot et la génération de réponses sont temporairement indisponibles pour le moment. Pendant que nous réglons nos moteurs, profites-en pour explorer notre onglet Conseils & Répliques pour améliorer ton jeu!',
  'gen.errorImageFormat': 'Format non pris en charge. Utilise PNG, JPEG, WebP ou GIF.',
  'gen.errorImageSize': 'L\'image est trop grande (max 8 Mo).',
  'gen.errorImageRead': 'Impossible de lire l\'image.',
  'gen.errorImageProcess': 'Impossible d\'analyser l\'image. Essaie une capture plus nette ou génère sans image.',
  'gen.pretendenteTitle': 'Rapport de la Prétendante',
  'gen.pretendenteSubtitle': 'Remplis son nom et le lien pour personnaliser l\'analyse et les réponses.',
  'gen.pretendenteName': 'Son nom',
  'gen.pretendenteVinculo': 'Lien/Situation (ex : Ex, Collègue, Coup de foudre…)',
  'gen.perfilPsicologico': 'Profil Psychologique d\'Action',
  'gen.dicasAbordagem': 'Conseils d\'Approche pour cette Prétendante',
  'gen.pretendenteGenerate': 'Générer le Rapport',
  'ctx.puxar-assunto.label': 'Lancer un Sujet',
  'ctx.puxar-assunto.desc': 'Reprendre ou lancer un thème',
  'ctx.quebrar-gelo.label': 'Briser la Glace',
  'ctx.quebrar-gelo.desc': 'Démarrer une conversation avec quelqu\'un de nouveau',
  'ctx.flertar.label': 'Flirter',
  'ctx.flertar.desc': 'Montrer de l\'intérêt avec charme',
  'ctx.reagir-foto.label': 'Réagir à une Photo',
  'ctx.reagir-foto.desc': 'Commenter un story ou une photo',
  'ctx.convidar-sair.label': 'Proposer un Rendez-vous',
  'ctx.convidar-sair.desc': 'Proposer de sortir',
  'ctx.manter-conversa.label': 'Maintenir la Conversation',
  'ctx.manter-conversa.desc': 'Éviter le silence',
  'ctx.dar-fora.label': 'Éconduire en Douceur',
  'ctx.dar-fora.desc': 'Refuser sans blesser',
  'ctx.personalizado.label': 'Personnalisé',
  'ctx.personalizado.desc': 'Écris ton propre contexte',
  'tone.divertido': 'Drôle',
  'tone.provocador': 'Provocateur',
  'tone.direto': 'Direct',
  'tone.outro': 'Autre',
  'tone.picante': 'Épicé',
  'tone.customPlaceholder': 'ex : Amical, Professionnel, Poétique…',
  'style.ideal.label': 'Réponse Idéale',
  'style.ideal.desc': 'La plus équilibrée et précise',
  'style.sedutora.label': 'Séduisante',
  'style.sedutora.desc': 'Charme et intérêt',
  'style.informal.label': 'Informel',
  'style.informal.desc': 'Jeune et naturel',
  'style.romantica.label': 'Romantique',
  'style.romantica.desc': 'Attentionné et doux',
  'style.provocadora.label': 'Directe & Provocante',
  'style.provocadora.desc': 'Audacieuse et provocante',
  'style.picante.label': 'Épicé',
  'style.picante.desc': 'Intensité maximale et séduction sans filtres',
  'style.recommended': 'Recommandée par Aura',
  'style.adequada': '% adéquate',
  'responses.title': 'Réponses générées',
  'responses.regenerate': 'Générer d\'autres',
  'responses.composing': 'Composition des réponses parfaites…',
  'responses.streaming': 'Écriture…',
  'responses.empty': 'Tes réponses apparaîtront ici.',
  'improve.badge': 'Affiner et sublimer',
  'improve.titleA': 'Améliorer ',
  'improve.titleB': 'le Message',
  'improve.subtitle':
    'Colle un message que tu as écrit et laisse Aura le réécrire pour le rendre plus attirant, efficace et naturel.',
  'improve.messageLabel': 'Ton message',
  'improve.messagePlaceholder': 'Colle ici le brouillon du message que tu veux améliorer…',
  'improve.goalLabel': 'Objectif (optionnel)',
  'improve.goalPlaceholder': 'ex : paraître plus confiant, créer de la curiosité…',
  'improve.button': 'Améliorer le message',
  'improving': 'Amélioration…',
  'improve.outputTitle': 'Message amélioré',
  'improve.refining': 'Affinement du message…',
  'improve.errorGeneric': 'Impossible d\'améliorer le message. Réessaie.',
  'improve.errorFriendly': 'Malheureusement, la lecture par screenshot et la génération de réponses sont temporairement indisponibles pour le moment. Pendant que nous réglons nos moteurs, profites-en pour explorer notre onglet Conseils & Répliques pour améliorer ton jeu!',
  'improve.errorEmpty': 'Colle d\'abord le message que tu veux améliorer.',
  'improve.emptyOutput': 'Le message amélioré apparaîtra ici.',
  'improve.partialWarning': 'Seules quelques variantes ont été générées. Réessaye pour obtenir les trois versions complètes.',
  'goal.confident': 'Paraître plus confiant',
  'goal.funny': 'Le rendre plus drôle',
  'goal.flirty': 'Créer une tension flirteuse',
  'goal.mysterious': 'Être plus mystérieux',
  'goal.natural': 'Paraître naturel et fluide',
  'goal.casual': 'Laisser tomber en douceur',
  'goal.picante': 'Le rendre épicé et provocant',
  'tips.badge': 'Apprends en utilisant',
  'tips.titleA': 'Conseils & ',
  'tips.titleB': 'Répliques',
  'tips.subtitle':
    'Articles courts sur la conversation et la psychologie de l\'attraction, suivis d\'une bibliothèque de répliques prêtes à copier.',
  'tips.categoryAll': 'Tous',
  'tips.categoryPsychology': 'Psychologie de l\'attraction',
  'tips.categoryConnection': 'Connexion',
  'tips.categoryConversation': 'Conversation',
  'tips.categoryMindset': 'État d\'esprit',
  'tip.curiosidade.title': 'Le pouvoir de la curiosité',
  'tip.curiosidade.category': 'Psychologie de l\'attraction',
  'tip.curiosidade.summary': 'Laisse toujours une porte ouverte pour le prochain message.',
  'tip.curiosidade.body':
    'Les meilleures conversations ne se ferment pas en un seul message. Termine toujours par un accroche — une question légère, une référence à quelque chose que tu raconteras plus tard, un petit mystère. L\'autre personne doit avoir envie de répondre, pas sentir que la conversation est déjà terminée.\n\nExemple pratique : au lieu de "J\'ai aimé ta photo", utilise "Tu as un style bien à toi… il y a une histoire derrière ?". La première ferme le chat ; la seconde l\'invite à continuer.',
  'tip.espelho.title': 'L\'effet miroir',
  'tip.espelho.category': 'Connexion',
  'tip.espelho.summary': 'Imite le rythme et le ton de l\'autre personne dans les premières minutes.',
  'tip.espelho.body':
    'Dans les premières minutes d\'une conversation, les gens guettent les signes d\'affinité. Si elle écrit des phrases courtes avec des emojis, ne réponds pas avec de longs paragraphes. Si elle est plus expansive, ouvre-toi un peu plus aussi. Ce "miroir" crée le sentiment subconscient d\'être sur la même longueur d\'onde.\n\nEnsuite, à mesure que la conversation grandit, tu peux commencer à mener le ton où tu veux.',
  'tip.nao-fechar.title': 'Ne jamais fermer par une question fermée',
  'tip.nao-fechar.category': 'Conversation',
  'tip.nao-fechar.summary': 'Les questions "oui/non" tuent la conversation.',
  'tip.nao-fechar.body':
    'Évite les questions qui se répondent par un seul mot. "Tu aimes le cinéma ?" est une impasse. "Quel a été le dernier film qui t\'a surprise ?" est une porte ouverte à une histoire.\n\nRègle simple : remplace "tu aimes X ?" par "qu\'est-ce que tu aimes dans X ?" ou "quel est ton X préféré ?". La conversation gagne en profondeur sans effort.',
  'tip.tensao.title': 'Tension flirteuse',
  'tip.tensao.category': 'Psychologie de l\'attraction',
  'tip.tensao.summary': 'Le flirt est un jeu d\'avancée et de recul.',
  'tip.tensao.body':
    'L\'attraction ne vit pas de compliments constants — elle vit du contraste. Montre de l\'intérêt, puis recule avec humour ou un petit défi. Cette oscillation crée la tension, et la tension est ce qui rend la conversation mémorable.\n\nExemple : "Tu étais presque en train de me convaincre… mais tu as sorti cette série et tu as perdu des points." C\'est léger, c\'est un jeu, mais ça crée un petit "et maintenant ?" qui garde l\'autre personne investie.',
  'tip.autenticidade.title': 'L\'authenticité bat le scénario',
  'tip.autenticidade.category': 'État d\'esprit',
  'tip.autenticidade.summary': 'Les techniques aident, mais ne remplacent pas d\'être soi-même.',
  'tip.autenticidade.body':
    'Tous ces conseils sont des outils, pas un masque. Si tu utilises une technique mais que ton ton sonne forcé, l\'effet est inverse. Les gens sentent l\'incohérence.\n\nUtilise Aura comme inspiration, adapte-le à ta voix, et n\'aie pas peur d\'être spontané. Un message de toi, imparfait mais sincère, vaut plus que dix messages "parfaits" qui ne te représentent pas.',
  'tip.tempo.title': 'Le bon moment pour répondre',
  'tip.tempo.category': 'Conversation',
  'tip.tempo.summary': 'Ce n\'est pas jouer le difficile — c\'est avoir une vie.',
  'tip.tempo.body':
    'Répondre immédiatement à tout ne montre pas plus d\'intérêt ; ça montre moins de vie propre. Ne force pas des attentes artificielles, mais ne sois pas non plus collé à l\'écran.\n\nAie des choses à faire, réponds quand tu peux, et quand tu réponds, concentre-toi sur la conversation. Cette combinaison — disponible mais pas dépendant — est naturellement attirante.',
  'cantadas.badge': 'Bibliothèque locale · {n} répliques',
  'cantadas.titleA': '1000 Répliques ',
  'cantadas.titleB': 'Infaillibles',
  'cantadas.subtitle':
    'Répliques prêtes à copier, organisées par style. Sans internet, sans attente — juste choisir et utiliser.',
  'cantadas.generateMore': 'Générer Plus',
  'cantadas.empty': 'Pas de répliques dans cette catégorie.',
  'cantadas.filterAll': 'Toutes',
  'cat.Divertidas': 'Drôles',
  'cat.Fofas': 'Mignonnes',
  'cat.Confiantes': 'Confiantes',
  'cat.Criativas': 'Créatives',
  'cat.Inteligentes': 'Intelligentes',
  'cat.Elogios': 'Compliments',
  'cat.Elogios2': 'Compliments 2.0',
  'cat.Românticas': 'Romantiques',
  'cat.Sedutoras': 'Séduisantes',
  'cat.Provocadoras': 'Provocantes',
  'cat.Tentação': 'Tentation',
  'cat.Picantes': 'Épicées',
  'profile.title': 'Profil & Réglages',
  'profile.subtitle': 'Gère ton compte, prétendants et préférences.',
  'profile.account': 'Compte',
  'profile.name': 'Nom',
  'profile.lastName': 'Nom de famille',
  'profile.email': 'Email',
  'profile.phone': 'Téléphone',
  'profile.password': 'Mot de passe',
  'profile.changePassword': 'Changer le mot de passe',
  'profile.newPassword': 'Nouveau mot de passe (min. 6 caractères)',
  'profile.save': 'Enregistrer',
  'profile.saving': 'Enregistrement…',
  'profile.saved': 'Enregistré !',
  'profile.suitors': 'Gérer les Prétendants / Liens',
  'profile.suitorsSubtitle': 'Suis avec qui tu parles et l\'évolution de chaque lien.',
  'profile.addSuitor': '+ Ajouter un Prétendant',
  'profile.suitorName': 'Nom de la personne',
  'profile.suitorNotes': 'Notes / rapport d\'évolution',
  'profile.suitorStatus': 'Statut du lien',
  'profile.statusTalking': 'En discussion',
  'profile.statusFlirting': 'Flirt',
  'profile.statusDating': 'Rendez-vous',
  'profile.statusCold': 'Refroidi',
  'profile.statusWon': 'Conquise',
  'profile.statusLost': 'Perdue',
  'profile.saveSuitor': 'Ajouter',
  'profile.noSuitors': 'Tu n\'as pas encore ajouté de prétendant.',
  'profile.deleteSuitor': 'Supprimer',
  'profile.editSuitor': 'Modifier',
  'profile.appearance': 'Apparence',
  'profile.appearanceSubtitle': 'Choisis le thème du site. Le mode sombre est par défaut.',
  'profile.shareTitle': 'Partager Aura',
  'profile.shareSubtitle': 'Partage Aura avec tes amis — directement sur WhatsApp, Instagram, Telegram ou en copiant le lien.',
  'profile.shareButton': 'Partager Aura',
  'profile.shareCopied': 'Lien copié!',
  'profile.copyDirectLink': 'Copier le lien direct',
  'profile.instagramCopied': 'Texte copié ! Colle-le dans le chat de la personne sur Instagram',
  'profile.shareText': 'Arrête de regarder ton téléphone pendant des heures à réfléchir quoi répondre. 📱✨ **Aura** lit la situation et te dit exactement quoi écrire pour réussir. Vois par toi-même: 👇',
  'profile.shareTextWa': 'T\'est-il arrivé de ne pas savoir quoi répondre au bon moment? 🤫 À partir d\'aujourd\'hui, c\'est fini. Découvre **Aura**, l\'IA qui crée la réponse parfaite et irrésistible pour toute conversation. Essaie gratuitement ici: 👇',
  'profile.darkMode': 'Mode Sombre',
  'profile.lightMode': 'Mode Clair',
  'profile.language': 'Langue',
  'profile.languageSubtitle': 'Traduis l\'interface du site.',
  'profile.errorPasswordShort': 'Le mot de passe doit comporter au moins 6 caractères.',
  'profile.errorGeneric': 'Impossible d\'enregistrer.',
  'auth.signupTitle': 'Inscription',
  'auth.loginTitle': 'Connexion',
  'auth.signupSubtitle': 'Crée ton compte pour sauvegarder ton historique.',
  'auth.loginSubtitle': 'Bon retour !',
  'auth.namePlaceholder': 'Nom (optionnel)',
  'auth.emailPlaceholder': 'Email',
  'auth.passwordPlaceholder': 'Mot de passe',
  'auth.phonePlaceholder': 'Numéro de téléphone',
  'auth.sendCode': 'Envoyer le code',
  'auth.searchCountry': 'Rechercher un pays...',
  'auth.processing': 'Traitement…',
  'auth.errorInvalidPhone': 'Numéro de téléphone invalide.',
  'auth.errorPhoneRegistered': 'Ce numéro est déjà enregistré. Essaie de te connecter.',
  'auth.errorEmpty': 'Remplis l\'email et le mot de passe.',
  'auth.errorPasswordShort': 'Le mot de passe doit comporter au moins 6 caractères.',
  'auth.errorInvalidEmail': "L'email saisi n'est pas valide. Vérifie le format (ex: nom@domaine.com).",
  'auth.errorAlreadyRegistered': 'Cet email est déjà enregistré. Essaie de te connecter.',
  'auth.errorDeviceLimit': 'Limite de comptes atteint sur cet appareil. Tu ne peux pas créer plus de 3 comptes depuis le même appareil.',
  'auth.firstNamePlaceholder': 'Prénom',
  'auth.lastNamePlaceholder': 'Nom de famille',
  'auth.errorEmailNotConfirmed': 'Ton email n\'a pas encore été confirmé. Vérifie ta boîte de réception.',
  'auth.errorInvalidCredentials': 'Email ou mot de passe incorrect. Vérifie tes informations et réessaie.',
  'auth.usePhoneInstead': 'Tu préfères utiliser ton téléphone ?',
  'auth.useEmailInstead': 'Tu préfères utiliser ton email ?',
  'auth.errorGeneric': 'Impossible de s\'authentifier.',

  'auth.verifyEmailTitle': 'Vérifie ton email',
  'auth.verifyEmailSubtitle': 'Nous avons envoyé un code à 6 chiffres à',
  'auth.verifyEmailHint': "Vérifie ta boîte de réception et le dossier spam. Le code peut prendre jusqu'à 2 minutes pour arriver. Si tu ne le reçois pas, tu peux le renvoyer.",
  'auth.verifying': 'Vérification du code…',
  'auth.resendCode': 'Renvoyer le code',
  'auth.resendIn': 'Renvoyer dans {s}s',
  'auth.errorInvalidCode': 'Code invalide ou expiré. Réessaie.',
  'auth.goToLogin': 'Aller à la connexion',
  'auth.verifyExitTitle': 'Quitter sans vérifier ?',
  'auth.verifyExitMessage': "Si tu ne termines pas la vérification, tu peux perdre l'accès à ton compte, ton historique et les mises à jour importantes. Toute la communication et la récupération de compte se font par e-mail. Tu es libre de partir maintenant, mais sois averti du risque.",
  'auth.verifyExitConfirm': 'Quitter quand même',
  'auth.verifyExitCancel': 'Continuer la vérification',

  'auth.errorTooMany': 'Trop de tentatives. Attends un moment avant de réessayer.',

  'auth.haveAccount': 'Déjà un compte ?',
  'auth.pinTitle': 'Saisis ton PIN',
  'auth.pinSubtitle': 'Ton compte est protégé par un code PIN à 4 chiffres. Saisis-le pour continuer.',
  'auth.errorWrongPin': 'PIN incorrect. Réessaie.',
  'auth.forgotPin': 'J\'ai oublié mon mot de passe',
  'auth.pinRecoverySent': 'Nous avons envoyé un code de récupération à ton email. Utilise-le pour réinitialiser ton PIN.',
  'auth.errorPinRecovery': 'Impossible d\'envoyer l\'email de récupération. Réessaie.',
  'popup.title': 'Ton expérience peut être encore meilleure',
  'popup.subtitle': 'Crée un compte pour sauvegarder ton historique, personnaliser tes répliques et accéder à des fonctionnalités exclusives.',
  'popup.createAccount': 'Créer un compte gratuit',
  'popup.login': 'J\'ai déjà un compte',
  'popup.continueGuest': 'Continuer en tant qu\'invité',
  'shareGate.title': 'Partage Aura AI pour débloquer plus',
  'shareGate.subtitle': 'Partage Aura AI avec 10 amis pour continuer à générer des réponses. Chaque ami qui rejoint via ton lien compte pour ta progression.',
  'shareGate.progress': 'Amis invités',
  'shareGate.yourLink': 'Ton lien d\'invitation',
  'shareGate.locked': 'Partage avec 10 amis pour débloquer et continuer',
  'shareGate.unlocked': 'Débloqué! Tu peux continuer à utiliser Aura AI',
  'sedux.enginePlaceholder': 'Traitement…',
  'sedux.engineBuilding': "Le moteur SEDUX est en cours de reconfiguration. Il générera bientôt des réponses.",
  'welcome.headline': 'Séduis n\'importe quelle femme avec le bon message au bon moment.',
  'welcome.subtitle': 'Ton IA experte en séduction, répliques acérées et réponses irrésistibles. Crée ton compte maintenant et essaie GRATUITEMENT.',
  'welcome.createAccount': 'Créer un Compte Gratuit',
  'welcome.login': 'J\'ai déjà un compte / Se connecter',
  'profile.pinTitle': 'PIN à 4 chiffres',
  'profile.pinSubtitle': 'Définis un PIN numérique à 4 chiffres pour protéger l\'accès à ton compte.',
  'profile.pinActive': 'Actif',
  'profile.pinEnabledDesc': 'Ton PIN est actif. À chaque connexion, ton PIN te sera demandé après ton email et mot de passe.',
  'profile.pinNew': 'Nouveau PIN (4 chiffres)',
  'profile.pinConfirm': 'Confirmer le PIN',
  'profile.pinSave': 'Définir le PIN',
  'profile.pinRemove': 'Supprimer le PIN',
  'profile.pinSaved': 'PIN défini avec succès.',
  'profile.pinRemoved': 'PIN supprimé.',
  'profile.pinErrorDigits': 'Le PIN doit comporter exactement 4 chiffres.',
  'profile.pinErrorMatch': 'Les PINs ne correspondent pas.',
  'auth.noAccount': 'Pas encore de compte ?',
  'auth.signup': 'S\'inscrire',
  'auth.login': 'Se connecter',
  'footer.text': 'Aura AI — Uriel Traquino',
  'common.clearAll': 'Tout effacer',
  'common.clearAllConfirm': 'Effacer tous les champs et réponses ?',
  'profile.dangerZone': 'Zone de Danger',
  'profile.dangerZoneSubtitle': 'Supprime définitivement tout l\'historique et les données locales.',
  'profile.deleteAllData': 'Effacer Toutes les Données et l\'Historique',
  'profile.deleteAllConfirm': 'Tu es sûr ? Cela supprime définitivement tout l\'historique et les données locales.',
  'profile.deleteAllDone': 'Toutes les données ont été effacées.',
  'tips.customCategory': 'Personnalisé',
  'tips.customPlaceholder': 'ex : ses yeux, son sourire, son style…',
  'tips.customFocusPlaceholder': 'ex : intention — la faire rire, créer de la tension, être discret…',
  'tips.customGenerate': 'Générer des Compliments',
  'tips.customGenerating': 'Génération des compliments…',
  'tips.customError': 'Impossible de générer les compliments. Réessaie.',
  'tips.customEmpty': 'Décris ce que tu veux complimenter et génère 5 compliments créatifs.',
  'tips.generateMoreStyle': 'Générer plus de ce style',
  'tips.generatingMore': 'Génération…',
  'compliment.ideal': 'Idéal / Recommandé',
  'compliment.sedutora': 'Séduisante',
  'compliment.divertida': 'Drôle',
  'compliment.inteligente': 'Intelligent',
  'compliment.provocante': 'Provocant',
  'modal.clearTitle': 'Effacer l\'Historique des Conversations',
  'modal.clearDescription': 'Cette action supprimera définitivement tout l\'historique des conversations et les réponses générées dans cet onglet Aura AI. Souhaites-tu continuer ?',
  'modal.deleteAllTitle': 'Effacer Toutes les Données',
  'modal.deleteAllDescription': 'Cette action supprimera définitivement tout l\'historique des messages, les photos analysées et les données locales de session. Ton compte reste actif. Souhaites-tu continuer ?',
  'modal.cancel': 'ANNULER',
  'modal.confirmClear': 'TOUT EFFACER',
  'modal.confirmDelete': 'TOUT SUPPRIMER',
  'common.pasteHint': 'Utilise l\'appui long sur ton appareil pour coller',
  'cantadas.outras': 'Autres',
  'cantadas.translating': 'Traduction…',
  'gen.savedReports': 'Rapports enregistrés',
  'intensity.fraca': 'Légère',
  'intensity.media': 'Moyenne',
  'intensity.forte': 'Forte',
  'length.curta': 'Courte',
  'length.media': 'Moyenne',
  'length.longa': 'Longue',
  'responses.intensity': 'Intensité',
  'improve.length': 'Longueur',
  'profile.optional': 'Optionnel',
  'auth.errorSmsFailed': "Échec de l'envoi SMS. Vérifiez le numéro.",
  'pin.setupTitle': 'Configurer le PIN de sécurité',
  'pin.setupSubtitle': 'Créez un PIN à 4 chiffres pour protéger votre compte.',
  'pin.verifyTitle': 'Saisissez votre PIN',
  'pin.verifySubtitle': 'Confirmez votre identité avec votre PIN à 4 chiffres.',
  'pin.confirm': 'Confirmer',
  'pin.errorSet': 'Échec de la sauvegarde du PIN. Réessayez.',
  'pin.errorWrong': 'PIN incorrect. Réessayez.',
  'pin.errorGeneric': 'Erreur de vérification du PIN. Réessayez.',
  'pin.forgotPin': "J'ai oublié mon mot de passe",
  'pin.recoverySent': "E-mail de récupération envoyé. Vérifiez votre boîte de réception.",
  'pin.signOut': "PIN oublié ? Se déconnecter / Créer un nouveau compte",
  'pin.errorRecovery': "Erreur lors de l'envoi de l'e-mail de récupération. Réessayez.",
  'pin.setupButton': 'Définir le PIN',
  'pin.confirmPlaceholder': 'Confirmer le PIN',
  'pin.errorMismatch': 'Les PIN ne correspondent pas. Réessayez.',
  'error.cardTitle': 'Erreur de connexion au moteur IA',
  'error.retry': 'Réessayer',
  'support.button': 'Support',
  'support.title': 'Support et Signaler un Problème',
  'support.subject': 'Sujet',
  'support.subjectPlaceholder': 'Ex: Erreur de génération',
  'support.message': 'Message',
  'support.messagePlaceholder': 'Décris le problème ou ton commentaire…',
  'support.email': 'Email (optionnel)',
  'support.emailPlaceholder': 'ton@email.com',
  'support.send': 'Envoyer',
  'support.sending': 'Envoi…',
  'support.sent': 'Merci ! Ton rapport a été envoyé.',
  'support.error': 'Envoi impossible. Réessaie.',
  'support.bugAi': 'Erreur IA',
  'support.bugUi': 'Interface ne fonctionne pas',
  'support.bugLogin': 'Problème de connexion',
  'support.bugData': 'Les données ne s\u2019enregistrent pas',
  'support.bugOther': 'Autre problème',
  'support.bugPerformance': 'Lenteur/Blocage',
  'support.cancel': 'Annuler',
  'support.categoryLabel': 'Type de problème',
  'auth.otpTitle': 'Vérifie ton e-mail',
  'auth.otpSubtitle': 'Nous avons envoyé un code à 6 chiffres à ton e-mail. Saisis-le pour confirmer ton compte.',
  'auth.otpCode': 'Code de vérification',
  'auth.otpVerify': 'Vérifier',
  'auth.otpCancel': 'Annuler l\u2019inscription',
  'auth.otpResend': 'Renvoyer le code',
  'auth.otpSending': 'Envoi du code…',
  'auth.otpVerifying': 'Vérification…',
  'auth.otpErrorInvalid': 'Code incorrect. Réessaie.',
  'auth.otpErrorExpired': 'Code expiré. Demande-en un nouveau.',
  'auth.otpErrorGeneric': 'Erreur lors de la vérification. Réessaie.',
  'auth.otpSent': 'Code envoyé ! Vérifie ton e-mail.',
  'auth.otpResent': 'Nouveau code envoyé !',
  'admin.usersList': 'Utilisateurs Inscrits',
  'admin.usersLoading': 'Chargement des utilisateurs…',
  'admin.usersError': 'Erreur lors du chargement.',
  'admin.usersRetry': 'Réessayer',
  'admin.deleteUser': "Supprimer l'utilisateur",
  'admin.deleteUserDesc': 'Choisissez le type de suppression pour cet utilisateur.',
  'admin.deleteFromPanel': 'Supprimer du Panneau',
  'admin.deleteFromPanelDesc': "Supprime l'utilisateur de la vue admin. Le compte reste actif.",
  'admin.deleteFromApp': "Supprimer de l'App",
  'admin.deleteFromAppDesc': 'Supprime définitivement toutes les données, le compte et les enregistrements associés.',
  'admin.deleteConfirm': 'Supprimer',
  'admin.cancelDelete': 'Annuler',
  'admin.activeUsers': 'Actifs',
  'admin.ban': 'Bannir',
  'admin.unban': 'Débannir',
  'admin.restrict': 'Restreindre',
  'admin.unrestrict': 'Lever la restriction',
  'admin.banned': 'Bannie',
  'admin.restricted': 'Restreinte',
  'admin.active': 'Active',
  'admin.referrals': 'Parrainages',
  'admin.referralCount': 'Amis invités',
  'admin.invitedBy': 'Invité par',
  'admin.visitsTitle': 'Trafic et Visites',
  'admin.visitsToday': "Aujourd'hui",
  'admin.visitsWeek': 'Cette semaine',
  'admin.visitsMonth': 'Ce mois',
  'admin.visitsTotal': 'Total',
  'admin.anonymousVisitors': 'Visiteurs anonymes',
  'admin.registeredVisitors': 'Visiteurs inscrits',
  'admin.visitorsLoading': 'Chargement des visites…',
  'admin.visitorsError': 'Erreur lors du chargement des visites.',
  'antiflood.cooldown': 'Protection Anti-Spam : Attendez {s}s...',
  'admin.metricsTemporalTitle': 'Messages par Période',
  'admin.metricsTemporalDesc': 'Volume de messages générés au fil du temps.',
  'admin.metricsToday': "Aujourd'hui",
  'admin.metricsWeek': 'Cette Semaine',
  'admin.metricsMonth': 'Ce Mois',
  'admin.metricsTotal': 'Total Général',
  'admin.metricsUsers': 'Utilisateurs',
  'admin.metricsAvg': 'Moy. / Utilisateur',
  'admin.metricsPeakHour': 'Pic de Trafic',
  'admin.metricsByHour': 'Messages par Heure',
  'admin.metricsByFeature': 'Messages par Fonctionnalité',
  'admin.metricsRefresh': 'Actualiser les métriques',
  'admin.metricsLoading': 'Chargement des métriques…',
  'admin.metricsError': 'Erreur lors du chargement des métriques',
  'admin.metricsRetry': 'Réessayer',
  'admin.metricsMessages': 'messages',
};

const de: Dict = {
  'nav.gerador': 'Antwort-Generator',
  'nav.melhorar': 'Nachricht verbessern',
  'nav.dicas': 'Tipps & Sprüche',
  'nav.perfil': 'Profil',
  'nav.entrar': 'Anmelden',
  'nav.criarConta': 'Registrieren',
  'nav.sair': 'Abmelden',
  'nav.brandTag': 'KI-Antworten',
  'nav.user': 'Benutzer',
  'common.copy': 'Kopieren',
  'common.copied': 'Kopiert!',
  'common.loading': 'Laden…',
  'common.errorTitle': 'Etwas ist schiefgelaufen',
  'common.menu': 'Menü',
  'common.close': 'Schließen',
  'common.paste': 'Einfügen',
  'common.clear': 'Löschen',
  'gen.badge': 'Intelligente Nachrichtenkomposition',
  'gen.titleA': 'Schreib die ',
  'gen.titleB': 'perfekte Antwort',
  'gen.subtitle':
    'Wähle einen Kontext, lege den Ton fest und Aura generiert 6 kurze Antworten in verschiedenen Stilen, bereit zum Kopieren.',
  'gen.contextLabel': 'Kontext',
  'gen.toneLabel': 'Antwortton',
  'gen.messageLabel': 'Deine Nachricht',
  'gen.messagePlaceholder': 'Füge hier die Nachricht ein, die du erhalten hast, oder die Situation, auf die du antworten willst…',
  'gen.screenshotLabel': 'Screenshot (optional)',
  'gen.screenshotAlt': 'Screenshot-Vorschau',
  'gen.screenshotRemove': 'Bild entfernen',
  'gen.dropText': 'Klicke oder ziehe einen Chat-Screenshot',
  'gen.dropHint': 'PNG, JPEG, WebP oder GIF · max 8 MB',
  'gen.generate': 'Antwort generieren',
  'gen.copy': 'Kopieren',
  'gen.generating': 'Generieren…',
  'gen.readingImage': 'Bild wird gelesen…',
  'gen.customContextPlaceholder':
    'Beschreibe den Kontext: wer die Person ist, eure Beziehung, was passiert ist…',
  'gen.errorNoContext': 'Schreibe deinen benutzerdefinierten Kontext vor dem Generieren.',
  'gen.errorGeneric': 'Antwort konnte nicht generiert werden. Versuche es erneut.',
  'gen.errorFriendly': 'Leider sind die Screenshot-Lesung und die Antwortgenerierung momentan vorübergehend nicht verfügbar. Während wir unsere Motoren einstellen, nutze die Chance, unseren Tipps & Sprüche-Tab zu erkunden, um dein Spiel zu verbessern!',
  'gen.errorImageFormat': 'Format nicht unterstützt. Verwende PNG, JPEG, WebP oder GIF.',
  'gen.errorImageSize': 'Das Bild ist zu groß (max 8 MB).',
  'gen.errorImageRead': 'Bild konnte nicht gelesen werden.',
  'gen.errorImageProcess': 'Bild konnte nicht analysiert werden. Versuche einen klareren Screenshot oder generiere ohne Bild.',
  'gen.pretendenteTitle': 'Bericht der Angebeteten',
  'gen.pretendenteSubtitle': 'Fülle ihren Namen und die Beziehung aus, um die Analyse und die Antworten zu personalisieren.',
  'gen.pretendenteName': 'Ihr Name',
  'gen.pretendenteVinculo': 'Beziehung/Situation (z.B. Ex, Kollegin, Schwarm…)',
  'gen.perfilPsicologico': 'Psychologisches Aktionsprofil',
  'gen.dicasAbordagem': 'Annäherungstipps für diese Angebetete',
  'gen.pretendenteGenerate': 'Bericht generieren',
  'ctx.puxar-assunto.label': 'Thema starten',
  'ctx.puxar-assunto.desc': 'Thema aufgreifen oder starten',
  'ctx.quebrar-gelo.label': 'Eis brechen',
  'ctx.quebrar-gelo.desc': 'Conversation mit jemand Neuem starten',
  'ctx.flertar.label': 'Flirten',
  'ctx.flertar.desc': 'Interesse mit Charme zeigen',
  'ctx.reagir-foto.label': 'Auf Foto reagieren',
  'ctx.reagir-foto.desc': 'Story oder Foto kommentieren',
  'ctx.convidar-sair.label': 'Um Treffen bitten',
  'ctx.convidar-sair.desc': 'Ein Treffen vorschlagen',
  'ctx.manter-conversa.label': 'Conversation am Laufen',
  'ctx.manter-conversa.desc': 'Schweigen vermeiden',
  'ctx.dar-fora.label': 'Sanft abweisen',
  'ctx.dar-fora.desc': 'Abweisen ohne zu verletzen',
  'ctx.personalizado.label': 'Benutzerdefiniert',
  'ctx.personalizado.desc': 'Schreibe deinen eigenen Kontext',
  'tone.divertido': 'Locker',
  'tone.provocador': 'Provokant',
  'tone.direto': 'Direkt',
  'tone.outro': 'Andere',
  'tone.picante': 'Scharf',
  'tone.customPlaceholder': 'z.B. Freundlich, Professionell, Poetisch…',
  'style.ideal.label': 'Ideale Antwort',
  'style.ideal.desc': 'Die ausgewogenste und treffsicherste',
  'style.sedutora.label': 'Verführerisch',
  'style.sedutora.desc': 'Charme und Interesse',
  'style.informal.label': 'Informell',
  'style.informal.desc': 'Jung und natürlich',
  'style.romantica.label': 'Romantisch',
  'style.romantica.desc': 'Fürsorglich und süß',
  'style.provocadora.label': 'Direkt & Provokant',
  'style.provocadora.desc': 'Mutig und herausfordernd',
  'style.picante.label': 'Scharf',
  'style.picante.desc': 'Maximale Intensität und ungefilterte Verführung',
  'style.recommended': 'Von Aura empfohlen',
  'style.adequada': '% angemessen',
  'responses.title': 'Generierte Antworten',
  'responses.regenerate': 'Mehr generieren',
  'responses.composing': 'Perfekte Antworten werden verfasst…',
  'responses.streaming': 'Schreiben…',
  'responses.empty': 'Deine Antworten erscheinen hier.',
  'improve.badge': 'Verfeinern und aufwerten',
  'improve.titleA': 'Nachricht ',
  'improve.titleB': 'verbessern',
  'improve.subtitle':
    'Füge eine Nachricht ein, die du geschrieben hast, und lass Aura sie umschreiben, damit sie attraktiver, effektiver und natürlicher wird.',
  'improve.messageLabel': 'Deine Nachricht',
  'improve.messagePlaceholder': 'Füge hier den Entwurf der Nachricht ein, die du verbessern willst…',
  'improve.goalLabel': 'Ziel (optional)',
  'improve.goalPlaceholder': 'z.B. selbstbewusster klingen, Neugier wecken…',
  'improve.button': 'Nachricht verbessern',
  'improving': 'Verbessern…',
  'improve.outputTitle': 'Verbesserte Nachricht',
  'improve.refining': 'Nachricht wird verfeinert…',
  'improve.errorGeneric': 'Nachricht konnte nicht verbessert werden. Versuche es erneut.',
  'improve.errorFriendly': 'Leider sind die Screenshot-Lesung und die Antwortgenerierung momentan vorübergehend nicht verfügbar. Während wir unsere Motoren einstellen, nutze die Chance, unseren Tipps & Sprüche-Tab zu erkunden, um dein Spiel zu verbessern!',
  'improve.errorEmpty': 'Füge zuerst die Nachricht ein, die du verbessern willst.',
  'improve.emptyOutput': 'Die verbesserte Nachricht erscheint hier.',
  'improve.partialWarning': 'Es wurden nur einige Varianten generiert. Versuche es erneut, um alle drei Versionen zu erhalten.',
  'goal.confident': 'Selbstbewusster klingen',
  'goal.funny': 'Lustiger machen',
  'goal.flirty': 'Flirtspannung erzeugen',
  'goal.mysterious': 'Geheimnisvoller sein',
  'goal.natural': 'Natürlich und flüssig klingen',
  'goal.casual': 'Locker abwinken',
  'goal.picante': 'Scharf und provokant machen',
  'tips.badge': 'Lernen beim Nutzen',
  'tips.titleA': 'Tipps & ',
  'tips.titleB': 'Sprüche',
  'tips.subtitle':
    'Kurze Artikel über Conversation und Psychologie der Anziehung, gefolgt von einer Bibliothek fertiger Sprüche zum Kopieren.',
  'tips.categoryAll': 'Alle',
  'tips.categoryPsychology': 'Anziehungspsychologie',
  'tips.categoryConnection': 'Verbindung',
  'tips.categoryConversation': 'Conversation',
  'tips.categoryMindset': 'Mindset',
  'tip.curiosidade.title': 'Die Macht der Neugier',
  'tip.curiosidade.category': 'Anziehungspsychologie',
  'tip.curiosidade.summary': 'Lass immer eine Tür für die nächste Nachricht offen.',
  'tip.curiosidade.body':
    'Die besten Conversations enden nicht in einer einzigen Nachricht. Beende immer mit einem Haken — einer leichten Frage, einer Andeutung auf etwas, das du später erzählst, einem kleinen Mysterium. Die andere Person sollte antworten wollen, nicht das Gefühl haben, die Conversation sei schon vorbei.\n\nPraktisches Beispiel: Statt "Ich mag dein Foto" verwende "Du hast einen ganz eigenen Stil… gibt es eine Geschichte dahinter?". Das erste schließt den Chat; das zweite lädt sie ein, weiterzumachen.',
  'tip.espelho.title': 'Der Spiegeleffekt',
  'tip.espelho.category': 'Verbindung',
  'tip.espelho.summary': 'Imitiere Rhythmus und Ton der anderen Person in den ersten Minuten.',
  'tip.espelho.body':
    'In den ersten Minuten einer Conversation achten Menschen auf Zeichen von Affinität. Wenn sie kurze Nachrichten mit Emojis schreibt, antworte nicht mit langen Absätzen. Wenn sie expansiver ist, öffne dich auch etwas mehr. Dieser "Spiegel" erzeugt das unterbewusste Gefühl, auf derselben Wellenlänge zu sein.\n\nDann, wenn die Conversation wächst, kannst du den Ton dahin führen, wohin du willst.',
  'tip.nao-fechar.title': 'Nie mit einer geschlossenen Frage enden',
  'tip.nao-fechar.category': 'Conversation',
  'tip.nao-fechar.summary': 'Ja/Nein-Fragen töten die Conversation.',
  'tip.nao-fechar.body':
    'Vermeide Fragen, die mit einem einzigen Wort beantwortet werden. "Magst du Filme?" ist eine Sackgasse. "Welcher Film hat dich zuletzt überrascht?" ist eine offene Tür zu einer Geschichte.\n\nEinfache Regel: Tausche "magst du X?" gegen "was magst du an X?" oder "was ist dein Lieblings-X?". Die Conversation gewinnt mühelos an Tiefe.',
  'tip.tensao.title': 'Flirtspannung',
  'tip.tensao.category': 'Anziehungspsychologie',
  'tip.tensao.summary': 'Flirten ist ein Spiel von Vor und Zurück.',
  'tip.tensao.body':
    'Anziehung lebt nicht von ständigen Komplimenten — sie lebt vom Kontrast. Zeige Interesse, dann zieh dich mit Humor oder einer kleinen Herausforderung zurück. Dieses Pendeln erzeugt Spannung, und Spannung macht die Conversation memorable.\n\nBeispiel: "Du hast mich fast überzeugt… aber dann diese Serie und du hast Punkte verloren." Es ist leicht, es ist ein Spiel, aber es erzeugt ein kleines "und jetzt?", das die andere Person investiert hält.',
  'tip.autenticidade.title': 'Authentizität schlägt das Drehbuch',
  'tip.autenticidade.category': 'Mindset',
  'tip.autenticidade.summary': 'Techniken helfen, ersetzen aber nicht, du selbst zu sein.',
  'tip.autenticidade.body':
    'Alle diese Tipps sind Werkzeuge, keine Maske. Wenn du eine Technik anwendest, aber dein Ton gezwungen klingt, ist der Effekt umgekehrt. Menschen spüren Inkohärenz.\n\nNutze Aura als Inspiration, passe es an deine Stimme an und hab keine Angst, spontan zu sein. Eine Nachricht von dir, unperfekt aber echt, ist mehr wert als zehn "perfekte" Nachrichten, die dich nicht repräsentieren.',
  'tip.tempo.title': 'Der richtige Zeitpunkt zum Antworten',
  'tip.tempo.category': 'Conversation',
  'tip.tempo.summary': 'Es geht nicht darum, schwer zu kriegen zu sein — es geht darum, ein Leben zu haben.',
  'tip.tempo.body':
    'Sofort auf alles zu antworten zeigt nicht mehr Interesse; es zeigt weniger eigenes Leben. Erzwinge keine künstlichen Wartezeiten, aber klebe auch nicht am Bildschirm.\n\nHab Dinge zu tun, antworte, wenn du kannst, und wenn du antwortest, konzentriere dich auf die Conversation. Diese Kombination — verfügbar aber nicht abhängig — ist natürlich attraktiv.',
  'cantadas.badge': 'Lokale Bibliothek · {n} Sprüche',
  'cantadas.titleA': '1000 Unfehlbare ',
  'cantadas.titleB': 'Sprüche',
  'cantadas.subtitle':
    'Fertige Sprüche zum Kopieren, nach Stil geordnet. Kein Internet, kein Warten — nur auswählen und verwenden.',
  'cantadas.generateMore': 'Mehr generieren',
  'cantadas.empty': 'Keine Sprüche in dieser Kategorie.',
  'cantadas.filterAll': 'Alle',
  'cat.Divertidas': 'Lustig',
  'cat.Fofas': 'Süß',
  'cat.Confiantes': 'Selbstbewusst',
  'cat.Criativas': 'Kreativ',
  'cat.Inteligentes': 'Intelligent',
  'cat.Elogios': 'Komplimente',
  'cat.Elogios2': 'Komplimente 2.0',
  'cat.Românticas': 'Romantisch',
  'cat.Sedutoras': 'Verführerisch',
  'cat.Provocadoras': 'Provokant',
  'cat.Tentação': 'Versuchung',
  'cat.Picantes': 'Scharf',
  'profile.title': 'Profil & Einstellungen',
  'profile.subtitle': 'Verwalte dein Konto, Verehrer und Einstellungen.',
  'profile.account': 'Konto',
  'profile.name': 'Name',
  'profile.lastName': 'Nachname',
  'profile.email': 'E-Mail',
  'profile.phone': 'Telefonnummer',
  'profile.password': 'Passwort',
  'profile.changePassword': 'Passwort ändern',
  'profile.newPassword': 'Neues Passwort (min. 6 Zeichen)',
  'profile.save': 'Speichern',
  'profile.saving': 'Speichern…',
  'profile.saved': 'Gespeichert!',
  'profile.suitors': 'Verehrer / Verbindungen verwalten',
  'profile.suitorsSubtitle': 'Verfolge, mit wem du sprichst und den Fortschritt jeder Verbindung.',
  'profile.addSuitor': '+ Verehrer hinzufügen',
  'profile.suitorName': 'Name der Person',
  'profile.suitorNotes': 'Notizen / Fortschrittsbericht',
  'profile.suitorStatus': 'Status der Verbindung',
  'profile.statusTalking': 'Im Gespräch',
  'profile.statusFlirting': 'Flirten',
  'profile.statusDating': 'Treffen',
  'profile.statusCold': 'Abgekühlt',
  'profile.statusWon': 'Erobert',
  'profile.statusLost': 'Verloren',
  'profile.saveSuitor': 'Hinzufügen',
  'profile.noSuitors': 'Du hast noch keinen Verehrer hinzugefügt.',
  'profile.deleteSuitor': 'Löschen',
  'profile.editSuitor': 'Bearbeiten',
  'profile.appearance': 'Erscheinungsbild',
  'profile.appearanceSubtitle': 'Wähle das Theme der Seite. Standard ist der Dunkelmodus.',
  'profile.shareTitle': 'Aura teilen',
  'profile.shareSubtitle': 'Teile Aura mit deinen Freunden — direkt auf WhatsApp, Instagram, Telegram oder durch Kopieren des Links.',
  'profile.shareButton': 'Aura teilen',
  'profile.shareCopied': 'Link kopiert!',
  'profile.copyDirectLink': 'Direkten Link kopieren',
  'profile.instagramCopied': 'Text kopiert! Füge ihn in den Instagram-Chat der Person ein',
  'profile.shareText': 'Hör auf, stundenlang aufs Handy zu starren und zu überlegen, was du antworten sollst. 📱✨ **Aura** liest die Situation und sagt dir genau, was du schreiben sollst. Überzeuge dich selbst: 👇',
  'profile.shareTextWa': 'Ist dir schon mal passiert, dass du im richtigen Moment nicht wusstest, was du antworten sollst? 🤫 Ab heute ist das vorbei. Lerne **Aura** kennen, die KI, die die perfekte und unwiderstehliche Antwort für jede Konversation erstellt. Teste es kostenlos hier: 👇',
  'profile.darkMode': 'Dunkelmodus',
  'profile.lightMode': 'Hellmodus',
  'profile.language': 'Sprache',
  'profile.languageSubtitle': 'Übersetzt die Oberfläche der Seite.',
  'profile.errorPasswordShort': 'Das Passwort muss mindestens 6 Zeichen lang sein.',
  'profile.errorGeneric': 'Speichern nicht möglich.',
  'auth.signupTitle': 'Registrieren',
  'auth.loginTitle': 'Anmelden',
  'auth.signupSubtitle': 'Erstelle ein Konto, um deinen Verlauf zu speichern.',
  'auth.loginSubtitle': 'Willkommen zurück!',
  'auth.namePlaceholder': 'Name (optional)',
  'auth.emailPlaceholder': 'E-Mail',
  'auth.passwordPlaceholder': 'Passwort',
  'auth.phonePlaceholder': 'Telefonnummer',
  'auth.sendCode': 'Code senden',
  'auth.searchCountry': 'Land suchen...',
  'auth.processing': 'Verarbeitung…',
  'auth.errorInvalidPhone': 'Ungültige Telefonnummer.',
  'auth.errorPhoneRegistered': 'Diese Nummer ist bereits registriert. Versuche dich anzumelden.',
  'auth.errorEmpty': 'Fülle E-Mail und Passwort aus.',
  'auth.errorPasswordShort': 'Das Passwort muss mindestens 6 Zeichen lang sein.',
  'auth.errorInvalidEmail': 'Die eingegebene E-Mail ist ungültig. Überprüfe das Format (z.B. name@domain.com).',
  'auth.errorAlreadyRegistered': 'Diese E-Mail ist bereits registriert. Versuche dich anzumelden.',
  'auth.errorDeviceLimit': 'Kontingent auf diesem Gerät erreicht. Du kannst nicht mehr als 3 Konten vom selben Gerät erstellen.',
  'auth.firstNamePlaceholder': 'Vorname',
  'auth.lastNamePlaceholder': 'Nachname',
  'auth.errorEmailNotConfirmed': 'Deine E-Mail wurde noch nicht bestätigt. Überprüfe deinen Posteingang.',
  'auth.errorInvalidCredentials': 'Falsche E-Mail oder falsches Passwort. Überprüfe deine Angaben und versuche es erneut.',
  'auth.usePhoneInstead': 'Lieber per Telefon anmelden?',
  'auth.useEmailInstead': 'Lieber per E-Mail anmelden?',
  'auth.errorGeneric': 'Authentifizierung nicht möglich.',

  'auth.verifyEmailTitle': 'Bestätige deine E-Mail',
  'auth.verifyEmailSubtitle': 'Wir haben einen 6-stelligen Code gesendet an',
  'auth.verifyEmailHint': 'Überprüfe deinen Posteingang und den Spam-Ordner. Der Code kann bis zu 2 Minuten dauern. Wenn du ihn nicht erhältst, kannst du ihn erneut senden.',
  'auth.verifying': 'Code wird überprüft…',
  'auth.resendCode': 'Code erneut senden',
  'auth.resendIn': 'Erneut senden in {s}s',
  'auth.errorInvalidCode': 'Ungültiger oder abgelaufener Code. Bitte versuche es erneut.',
  'auth.goToLogin': 'Zum Login',
  'auth.verifyExitTitle': 'Ohne Verifizierung verlassen?',
  'auth.verifyExitMessage': 'Wenn du die Verifizierung nicht abschließt, kannst du den Zugriff auf dein Konto, deinen Verlauf und wichtige Updates verlieren. Die gesamte Kommunikation und Kontowiederherstellung erfolgt per E-Mail. Du kannst jetzt gehen, aber sei dir des Risikos bewusst.',
  'auth.verifyExitConfirm': 'Trotzdem verlassen',
  'auth.verifyExitCancel': 'Verifizierung fortsetzen',

  'auth.errorTooMany': 'Zu viele Versuche. Warte einen Moment, bevor du es erneut versuchst.',

  'auth.haveAccount': 'Schon ein Konto?',
  'auth.pinTitle': 'Gib deine PIN ein',
  'auth.pinSubtitle': 'Dein Konto ist durch eine 4-stellige PIN geschützt. Gib sie ein, um fortzufahren.',
  'auth.errorWrongPin': 'Falsche PIN. Bitte versuche es erneut.',
  'auth.forgotPin': 'Ich habe mein Passwort vergessen',
  'auth.pinRecoverySent': 'Wir haben einen Wiederherstellungscode an deine E-Mail gesendet. Verwende ihn, um deine PIN zurückzusetzen.',
  'auth.errorPinRecovery': 'Wiederherstellungs-E-Mail konnte nicht gesendet werden. Bitte versuche es erneut.',
  'popup.title': 'Deine Erfahrung kann noch besser sein',
  'popup.subtitle': 'Erstelle ein Konto, um deinen Verlauf zu speichern, Sprüche anzupassen und exklusive Funktionen zu nutzen.',
  'popup.createAccount': 'Kostenloses Konto erstellen',
  'popup.login': 'Ich habe schon ein Konto',
  'popup.continueGuest': 'Als Gast fortfahren',
  'welcome.headline': 'Erobern Sie jede Frau mit der richtigen Nachricht zur richtigen Zeit.',
  'welcome.subtitle': 'Ihre KI-Expertin für Verführung, schlagfertige Sprüche und unwiderstehliche Antworten. Erstellen Sie jetzt Ihr Konto und testen Sie es KOSTENLOS.',
  'welcome.createAccount': 'Kostenloses Konto erstellen',
  'welcome.login': 'Ich habe schon ein Konto / Anmelden',
  'profile.pinTitle': '4-stellige PIN',
  'profile.pinSubtitle': 'Lege eine numerische 4-stellige PIN fest, um den Zugriff auf dein Konto zu schützen.',
  'profile.pinActive': 'Aktiv',
  'profile.pinEnabledDesc': 'Deine PIN ist aktiv. Bei jeder Anmeldung wird deine PIN nach E-Mail und Passwort abgefragt.',
  'profile.pinNew': 'Neue PIN (4 Ziffern)',
  'profile.pinConfirm': 'PIN bestätigen',
  'profile.pinSave': 'PIN festlegen',
  'profile.pinRemove': 'PIN entfernen',
  'profile.pinSaved': 'PIN erfolgreich festgelegt.',
  'profile.pinRemoved': 'PIN entfernt.',
  'profile.pinErrorDigits': 'Die PIN muss genau 4 numerische Ziffern haben.',
  'profile.pinErrorMatch': 'Die PINs stimmen nicht überein.',
  'auth.noAccount': 'Noch kein Konto?',
  'auth.signup': 'Registrieren',
  'auth.login': 'Anmelden',
  'footer.text': 'Aura AI — Uriel Traquino',
  'common.clearAll': 'Alles löschen',
  'common.clearAllConfirm': 'Alle Felder und Antworten löschen?',
  'profile.dangerZone': 'Gefahrenzone',
  'profile.dangerZoneSubtitle': 'Löscht dauerhaft den gesamten Verlauf und alle lokalen Daten.',
  'profile.deleteAllData': 'Alle Daten und Verlauf löschen',
  'profile.deleteAllConfirm': 'Bist du sicher? Dies löscht dauerhaft den gesamten Verlauf und alle lokalen Daten.',
  'profile.deleteAllDone': 'Alle Daten wurden gelöscht.',
  'tips.customCategory': 'Benutzerdefiniert',
  'tips.customPlaceholder': 'z.B. ihre Augen, ihr Lächeln, ihr Stil…',
  'tips.customFocusPlaceholder': 'z.B. Intention — sie zum Lachen bringen, Spannung erzeugen, subtil sein…',
  'tips.customGenerate': 'Komplimente generieren',
  'tips.customGenerating': 'Komplimente werden generiert…',
  'tips.customError': 'Komplimente konnten nicht generiert werden. Versuche es erneut.',
  'tips.customEmpty': 'Beschreibe, was du komplimentieren willst, und generiere 5 kreative Komplimente.',
  'tips.generateMoreStyle': 'Mehr von diesem Stil generieren',
  'tips.generatingMore': 'Generieren…',
  'compliment.ideal': 'Ideal / Empfohlen',
  'compliment.sedutora': 'Verführerisch',
  'compliment.divertida': 'Lustig',
  'compliment.inteligente': 'Intelligent',
  'compliment.provocante': 'Provokant',
  'modal.clearTitle': 'Conversation-Verlauf löschen',
  'modal.clearDescription': 'Diese Aktion wird dauerhaft den gesamten Conversation-Verlauf und alle generierten Antworten in diesem Aura AI-Tab löschen. Möchtest du fortfahren?',
  'modal.deleteAllTitle': 'Alle Daten löschen',
  'modal.deleteAllDescription': 'Diese Aktion wird dauerhaft den gesamten Nachrichtenverlauf, alle analysierten Fotos und lokalen Sitzungsdaten löschen. Dein Konto bleibt aktiv. Möchtest du fortfahren?',
  'modal.cancel': 'ABBRECHEN',
  'modal.confirmClear': 'ALLES LÖSCHEN',
  'modal.confirmDelete': 'ALLES LÖSCHEN',
  'common.pasteHint': 'Verwende langes Drücken auf deinem Gerät zum Einfügen',
  'cantadas.outras': 'Weitere',
  'cantadas.translating': 'Übersetzen…',
  'gen.savedReports': 'Gespeicherte Berichte',
  'intensity.fraca': 'Leicht',
  'intensity.media': 'Mittel',
  'intensity.forte': 'Stark',
  'length.curta': 'Kurz',
  'length.media': 'Mittel',
  'length.longa': 'Lang',
  'responses.intensity': 'Intensität',
  'improve.length': 'Länge',
  'profile.optional': 'Optional',
  'auth.errorSmsFailed': 'SMS-Versand fehlgeschlagen. Nummer prüfen.',
  'pin.setupTitle': 'Sicherheits-PIN einrichten',
  'pin.setupSubtitle': 'Erstellen Sie eine 4-stellige PIN zum Schutz Ihres Kontos.',
  'pin.verifyTitle': 'Geben Sie Ihre PIN ein',
  'pin.verifySubtitle': 'Bestätigen Sie Ihre Identität mit Ihrer 4-stelligen PIN.',
  'pin.confirm': 'Bestätigen',
  'pin.errorSet': 'PIN konnte nicht gespeichert werden. Erneut versuchen.',
  'pin.errorWrong': 'Falsche PIN. Erneut versuchen.',
  'pin.errorGeneric': 'Fehler beim Überprüfen der PIN. Erneut versuchen.',
  'pin.forgotPin': 'Passwort vergessen',
  'pin.recoverySent': 'Wiederherstellungs-E-Mail gesendet. Prüfen Sie Ihren Posteingang.',
  'pin.signOut': 'PIN vergessen? Abmelden / Neues Konto erstellen',
  'pin.errorRecovery': 'Fehler beim Senden der Wiederherstellungs-E-Mail. Erneut versuchen.',
  'pin.setupButton': 'PIN festlegen',
  'pin.confirmPlaceholder': 'PIN bestätigen',
  'pin.errorMismatch': 'PINs stimmen nicht überein. Erneut versuchen.',
  'error.cardTitle': 'Verbindungsfehler zum KI-Motor',
  'error.retry': 'Erneut versuchen',
  'support.button': 'Support',
  'support.title': 'Support & Problem melden',
  'support.subject': 'Betreff',
  'support.subjectPlaceholder': 'Bsp: Fehler bei der Generierung',
  'support.message': 'Nachricht',
  'support.messagePlaceholder': 'Beschreibe das Problem oder dein Feedback…',
  'support.email': 'E-Mail (optional)',
  'support.emailPlaceholder': 'deine@email.com',
  'support.send': 'Senden',
  'support.sending': 'Senden…',
  'support.sent': 'Danke! Dein Bericht wurde gesendet.',
  'support.error': 'Senden fehlgeschlagen. Versuche es erneut.',
  'support.bugAi': 'KI-Fehler',
  'support.bugUi': 'Oberfläche funktioniert nicht',
  'support.bugLogin': 'Login/Registrierung Problem',
  'support.bugData': 'Daten werden nicht gespeichert',
  'support.bugOther': 'Anderes Problem',
  'support.bugPerformance': 'Langsam/Absturz',
  'support.cancel': 'Abbrechen',
  'support.categoryLabel': 'Problemtyp',
  'auth.otpTitle': 'Bestätige deine E-Mail',
  'auth.otpSubtitle': 'Wir haben einen 6-stelligen Code an deine E-Mail gesendet. Gib ihn ein, um dein Konto zu bestätigen.',
  'auth.otpCode': 'Bestätigungscode',
  'auth.otpVerify': 'Bestätigen',
  'auth.otpCancel': 'Registrierung abbrechen',
  'auth.otpResend': 'Code erneut senden',
  'auth.otpSending': 'Code wird gesendet…',
  'auth.otpVerifying': 'Überprüfung…',
  'auth.otpErrorInvalid': 'Falscher Code. Versuche es erneut.',
  'auth.otpErrorExpired': 'Code abgelaufen. Fordere einen neuen an.',
  'auth.otpErrorGeneric': 'Fehler bei der Überprüfung. Versuche es erneut.',
  'auth.otpSent': 'Code gesendet! Prüfe deine E-Mail.',
  'auth.otpResent': 'Neuer Code gesendet!',
  'admin.usersList': 'Registrierte Nutzer',
  'admin.usersLoading': 'Nutzer werden geladen…',
  'admin.usersError': 'Fehler beim Laden der Nutzer.',
  'admin.usersRetry': 'Erneut versuchen',
  'admin.deleteUser': 'Benutzer löschen',
  'admin.deleteUserDesc': 'Wählen Sie die Art der Löschung für diesen Benutzer.',
  'admin.deleteFromPanel': 'Aus dem Panel löschen',
  'admin.deleteFromPanelDesc': 'Entfernt den Benutzer aus der Admin-Ansicht. Das Konto bleibt aktiv.',
  'admin.deleteFromApp': 'Aus der App löschen',
  'admin.deleteFromAppDesc': 'Löscht dauerhaft alle Daten, das Konto und zugehörige Einträge.',
  'admin.deleteConfirm': 'Löschen',
  'admin.cancelDelete': 'Abbrechen',
  'admin.activeUsers': 'Aktiv',
  'admin.ban': 'Sperren',
  'admin.unban': 'Entsperren',
  'admin.restrict': 'Einschränken',
  'admin.unrestrict': 'Einschränkung aufheben',
  'admin.banned': 'Gesperrt',
  'admin.restricted': 'Eingeschränkt',
  'admin.active': 'Aktiv',
  'admin.referrals': 'Einladungen',
  'admin.referralCount': 'Eingeladene Freunde',
  'admin.invitedBy': 'Eingeladen von',
  'admin.visitsTitle': 'Traffic & Besuche',
  'admin.visitsToday': 'Heute',
  'admin.visitsWeek': 'Diese Woche',
  'admin.visitsMonth': 'Dieser Monat',
  'admin.visitsTotal': 'Gesamt',
  'admin.anonymousVisitors': 'Anonyme Besucher',
  'admin.registeredVisitors': 'Registrierte Besucher',
  'admin.visitorsLoading': 'Besuche werden geladen…',
  'admin.visitorsError': 'Fehler beim Laden der Besuche.',
  'antiflood.cooldown': 'Anti-Spam-Schutz: Warte {s}s...',
  'admin.metricsTemporalTitle': 'Nachrichten nach Zeitraum',
  'admin.metricsTemporalDesc': 'Anzahl der generierten Nachrichten im Zeitverlauf.',
  'admin.metricsToday': 'Heute',
  'admin.metricsWeek': 'Diese Woche',
  'admin.metricsMonth': 'Dieser Monat',
  'admin.metricsTotal': 'Gesamt',
  'admin.metricsUsers': 'Nutzer',
  'admin.metricsAvg': 'Ø / Nutzer',
  'admin.metricsPeakHour': 'Spitzenverkehr',
  'admin.metricsByHour': 'Nachrichten nach Stunde',
  'admin.metricsByFeature': 'Nachrichten nach Funktion',
  'admin.metricsRefresh': 'Metriken aktualisieren',
  'admin.metricsLoading': 'Metriken werden geladen…',
  'admin.metricsError': 'Fehler beim Laden der Metriken',
  'admin.metricsRetry': 'Erneut versuchen',
  'admin.metricsMessages': 'Nachrichten',
  'shareGate.title': 'Teile Aura AI, um mehr freizuschalten',
  'shareGate.subtitle': 'Teile Aura AI mit 10 Freunden, um weiter Antworten zu generieren. Jeder Freund, der über deinen Link beitritt, zählt für deinen Fortschritt.',
  'shareGate.progress': 'Eingeladene Freunde',
  'shareGate.yourLink': 'Dein Einladungslink',
  'shareGate.locked': 'Teile mit 10 Freunden, um freizuschalten und fortzufahren',
  'shareGate.unlocked': 'Freigeschaltet! Du kannst Aura AI weiter nutzen',
  'sedux.enginePlaceholder': 'Verarbeitung…',
  'sedux.engineBuilding': 'Die SEDUX-Engine wird neu konfiguriert. Sie wird bald wieder Antworten generieren.',
};

const DICTS: Record<Language, Dict> = { pt, en, es, fr, de };

export function translate(lang: Language, key: TranslationKey, vars?: Record<string, string | number>): string {
  let str = DICTS[lang][key] ?? DICTS.pt[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}

export const LANGUAGES: { id: Language; label: string; flag: string }[] = [
  { id: 'pt', label: 'Português', flag: 'PT' },
  { id: 'en', label: 'English', flag: 'EN' },
  { id: 'es', label: 'Español', flag: 'ES' },
  { id: 'fr', label: 'Français', flag: 'FR' },
  { id: 'de', label: 'Deutsch', flag: 'DE' },
];

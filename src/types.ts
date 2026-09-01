export type Tone = 'divertido' | 'provocador' | 'direto' | 'picante' | 'outro';

export type Context = {
  id: string;
  labelKey: string;
  descKey: string;
  promptHint: { pt: string; en: string; es: string; fr: string; de: string };
  icon: string;
  custom?: boolean;
};

export type TabId = 'gerador' | 'melhorar' | 'dicas' | 'perfil';

export type ResponseOption = {
  style: string;
  label: string;
  text: string;
};

export type ResponseStyle = {
  id: string;
  labelKey: string;
  descKey: string;
};

export const RESPONSE_STYLES: ResponseStyle[] = [
  { id: 'ideal', labelKey: 'style.ideal.label', descKey: 'style.ideal.desc' },
  { id: 'sedutora', labelKey: 'style.sedutora.label', descKey: 'style.sedutora.desc' },
  { id: 'informal', labelKey: 'style.informal.label', descKey: 'style.informal.desc' },
  { id: 'romantica', labelKey: 'style.romantica.label', descKey: 'style.romantica.desc' },
  { id: 'provocadora', labelKey: 'style.provocadora.label', descKey: 'style.provocadora.desc' },
  { id: 'picante', labelKey: 'style.picante.label', descKey: 'style.picante.desc' },
];

export type HistoryEntry = {
  id: string;
  createdAt: number;
  context: string;
  tone: string;
  input: string;
  output: string;
};

export const TONES: { id: Tone; labelKey: string; icon: string }[] = [
  { id: 'divertido', labelKey: 'tone.divertido', icon: 'smile' },
  { id: 'provocador', labelKey: 'tone.provocador', icon: 'flame' },
  { id: 'direto', labelKey: 'tone.direto', icon: 'zap' },
  { id: 'picante', labelKey: 'tone.picante', icon: 'flame' },
  { id: 'outro', labelKey: 'tone.outro', icon: 'sliders' },
];

export const CONTEXTS: Context[] = [
  {
    id: 'puxar-assunto',
    labelKey: 'ctx.puxar-assunto.label',
    descKey: 'ctx.puxar-assunto.desc',
    promptHint: {
      pt: 'uma mensagem para puxar assunto e iniciar ou retomar uma conversa com naturalidade, a partir de um tema ou situação',
      en: 'a message to start a topic and begin or resume a conversation naturally, from a theme or situation',
      es: 'un mensaje para sacar tema e iniciar o retomar una conversación con naturalidad, a partir de un tema o situación',
      fr: 'un message pour lancer un sujet et démarrer ou reprendre une conversation naturellement, à partir d\'un thème ou d\'une situation',
      de: 'eine Nachricht, um ein Thema zu starten und eine Conversation natürlich zu beginnen oder fortzusetzen, ausgehend von einem Thema oder einer Situation',
    },
    icon: 'messages-square',
  },
  {
    id: 'quebrar-gelo',
    labelKey: 'ctx.quebrar-gelo.label',
    descKey: 'ctx.quebrar-gelo.desc',
    promptHint: {
      pt: 'uma mensagem para quebrar o gelo e iniciar uma conversa',
      en: 'a message to break the ice and start a conversation',
      es: 'un mensaje para romper el hielo e iniciar una conversación',
      fr: 'un message pour briser la glace et démarrer une conversation',
      de: 'eine Nachricht, um das Eis zu brechen und eine Conversation zu starten',
    },
    icon: 'sparkles',
  },
  {
    id: 'flertar',
    labelKey: 'ctx.flertar.label',
    descKey: 'ctx.flertar.desc',
    promptHint: {
      pt: 'uma mensagem flerte com charme e leveza, mostrando interesse',
      en: 'a flirty message with charm and lightness, showing interest',
      es: 'un mensaje coqueto con encanto y ligereza, mostrando interés',
      fr: 'un message flirteux avec charme et légèreté, montrant de l\'intérêt',
      de: 'eine flirty Nachricht mit Charme und Leichtigkeit, die Interesse zeigt',
    },
    icon: 'wink',
  },
  {
    id: 'reagir-foto',
    labelKey: 'ctx.reagir-foto.label',
    descKey: 'ctx.reagir-foto.desc',
    promptHint: {
      pt: 'uma reação criativa e elogiosa a uma foto ou story',
      en: 'a creative and complimentary reaction to a photo or story',
      es: 'una reacción creativa y elogiosa a una foto o story',
      fr: 'une réaction créative et flatteuse à une photo ou un story',
      de: 'eine kreative und komplimentierende Reaktion auf ein Foto oder eine Story',
    },
    icon: 'image',
  },
  {
    id: 'convidar-sair',
    labelKey: 'ctx.convidar-sair.label',
    descKey: 'ctx.convidar-sair.desc',
    promptHint: {
      pt: 'um convite natural e confiante para sair/encontro',
      en: 'a natural and confident invitation to go out / on a date',
      es: 'una invitación natural y segura para salir / una cita',
      fr: 'une invitation naturelle et confiante pour sortir / un rendez-vous',
      de: 'eine natürliche und selbstbewusste Einladung zum Ausgehen / Treffen',
    },
    icon: 'coffee',
  },
  {
    id: 'manter-conversa',
    labelKey: 'ctx.manter-conversa.label',
    descKey: 'ctx.manter-conversa.desc',
    promptHint: {
      pt: 'uma pergunta ou comentário para manter a conversa a fluir, evitando o silêncio',
      en: 'a question or comment to keep the conversation flowing, avoiding silence',
      es: 'una pregunta o comentario para mantener la conversación fluyendo, evitando el silencio',
      fr: 'une question ou un commentaire pour maintenir la conversation fluide, éviter le silence',
      de: 'eine Frage oder ein Kommentar, um die Conversation am Laufen zu halten, Schweigen vermeiden',
    },
    icon: 'messages-square',
  },
  {
    id: 'dar-fora',
    labelKey: 'ctx.dar-fora.label',
    descKey: 'ctx.dar-fora.desc',
    promptHint: {
      pt: 'uma resposta educada e leve para recusar um interesse romântico sem magoar a pessoa',
      en: 'a polite and light reply to decline a romantic interest without hurting the person',
      es: 'una respuesta educada y ligera para rechazar un interés romántico sin lastimar a la persona',
      fr: 'une réponse polie et légère pour décliner un intérêt romantique sans blesser la personne',
      de: 'eine höfliche und leichte Antwort, um ein romantisches Interesse abzulehnen ohne die Person zu verletzen',
    },
    icon: 'heart-crack',
  },
  {
    id: 'personalizado',
    labelKey: 'ctx.personalizado.label',
    descKey: 'ctx.personalizado.desc',
    promptHint: {
      pt: 'uma mensagem personalizada de acordo com o contexto indicado pelo utilizador',
      en: 'a personalized message according to the context indicated by the user',
      es: 'un mensaje personalizado según el contexto indicado por el usuario',
      fr: 'un message personnalisé selon le contexte indiqué par l\'utilisateur',
      de: 'eine personalisierte Nachricht gemäß dem vom Nutzer angegebenen Kontext',
    },
    icon: 'edit',
    custom: true,
  },
];

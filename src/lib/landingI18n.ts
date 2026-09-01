import type { Language } from './settings';

export type LandingKey =
  | 'nav.features'
  | 'nav.howItWorks'
  | 'nav.examples'
  | 'nav.faq'
  | 'nav.login'
  | 'nav.createAccount'
  | 'nav.brandTag'
  | 'hero.badge'
  | 'hero.title1'
  | 'hero.title2'
  | 'hero.subtitle'
  | 'hero.ctaTry'
  | 'hero.ctaHowItWorks'
  | 'stats.contexts'
  | 'stats.tones'
  | 'stats.styles'
  | 'stats.languages'
  | 'how.title'
  | 'how.subtitle'
  | 'how.step1Title'
  | 'how.step1Desc'
  | 'how.step2Title'
  | 'how.step2Desc'
  | 'how.step3Title'
  | 'how.step3Desc'
  | 'how.step4Title'
  | 'how.step4Desc'
  | 'contexts.title'
  | 'contexts.subtitle'
  | 'tones.title'
  | 'tones.subtitle'
  | 'screenshot.title'
  | 'screenshot.desc'
  | 'screenshot.step1'
  | 'screenshot.step2'
  | 'screenshot.step3'
  | 'screenshot.step4'
  | 'screenshot.caption'
  | 'examples.title'
  | 'examples.subtitle'
  | 'examples.conversationLabel'
  | 'examples.msg1'
  | 'examples.msg2'
  | 'examples.msg3'
  | 'examples.respIdeal'
  | 'examples.respSedutora'
  | 'examples.respInformal'
  | 'examples.respRomantica'
  | 'examples.respProvocadora'
  | 'examples.respPicante'
  | 'features.title'
  | 'features.subtitle'
  | 'features.contextTitle'
  | 'features.contextDesc'
  | 'features.toneTitle'
  | 'features.toneDesc'
  | 'features.screenshotTitle'
  | 'features.screenshotDesc'
  | 'features.customTitle'
  | 'features.customDesc'
  | 'features.multiTitle'
  | 'features.multiDesc'
  | 'features.privacyTitle'
  | 'features.privacyDesc'
  | 'value.title1'
  | 'value.title2'
  | 'value.desc'
  | 'faq.title'
  | 'faq.q1'
  | 'faq.a1'
  | 'faq.q2'
  | 'faq.a2'
  | 'faq.q3'
  | 'faq.a3'
  | 'faq.q4'
  | 'faq.a4'
  | 'cta.title'
  | 'cta.desc'
  | 'cta.button'
  | 'footer.tagline'
  | 'footer.product'
  | 'footer.company'
  | 'footer.about'
  | 'footer.contact'
  | 'footer.account'
  | 'footer.login'
  | 'footer.createAccount'
  | 'footer.privacy'
  | 'footer.terms'
  | 'footer.builtBy'
  | 'footer.rights'
  | 'phone.toneLabel'
  | 'phone.responsesLabel'
  | 'phone.contextLabel'
  | 'phone.messageLabel'
  | 'phone.screenshotLabel'
  | 'phone.optional'
  | 'phone.generate'
  | 'phone.screenshotCaption'
  | 'phone.msgReceived'
  | 'phone.msgReply'
  | 'phone.msgFollowUp';

type LandingDict = Record<LandingKey, string>;

const pt: LandingDict = {
  'nav.features': 'Recursos',
  'nav.howItWorks': 'Como funciona',
  'nav.examples': 'Exemplos',
  'nav.faq': 'FAQ',
  'nav.login': 'Entrar',
  'nav.createAccount': 'Criar conta',
  'nav.brandTag': 'Respostas por IA',
  'hero.badge': 'Respostas por IA',
  'hero.title1': 'Conquista qualquer pessoa',
  'hero.title2': 'com a mensagem certa.',
  'hero.subtitle': 'A Aura entende o contexto, o tom e o que realmente queres dizer — e transforma isso numa resposta natural, confiante e à tua maneira.',
  'hero.ctaTry': 'Experimentar grátis',
  'hero.ctaHowItWorks': 'Ver como funciona',
  'stats.contexts': 'Contextos',
  'stats.tones': 'Tons',
  'stats.styles': 'Estilos de resposta',
  'stats.languages': 'Idiomas',
  'how.title': 'Como funciona',
  'how.subtitle': 'Da mensagem à resposta certa.',
  'how.step1Title': 'Escolhe o contexto',
  'how.step1Desc': 'A Aura percebe o que queres fazer na conversa.',
  'how.step2Title': 'Define o tom',
  'how.step2Desc': 'Escolhe como queres soar.',
  'how.step3Title': 'Envia a mensagem ou screenshot',
  'how.step3Desc': 'A Aura analisa o conteúdo da conversa.',
  'how.step4Title': 'Recebe respostas prontas',
  'how.step4Desc': 'Escolhe a que encaixa e copia.',
  'contexts.title': 'Escolhes a intenção',
  'contexts.subtitle': 'Escolhe um contexto predefinido ou descreve o teu. A Aura adapta-se.',
  'tones.title': 'Adapta o tom',
  'tones.subtitle': 'Não é só o que dizes. É como dizes. E podes criar o teu próprio tom.',
  'screenshot.title': 'Não precisas de explicar a conversa toda.',
  'screenshot.desc': 'Envia um screenshot. A Aura analisa o contexto da conversa, identifica a mensagem relevante e ajuda-te a responder de forma coerente.',
  'screenshot.step1': 'Screenshot',
  'screenshot.step2': 'Análise',
  'screenshot.step3': 'Contexto',
  'screenshot.step4': 'Resposta',
  'screenshot.caption': 'A Aura identifica a última mensagem e cria respostas coerentes com a conversa.',
  'examples.title': 'Uma conversa real',
  'examples.subtitle': 'Vê a Aura em ação.',
  'examples.conversationLabel': 'Conversa',
  'examples.msg1': 'Então, quando me vais surpreender? 😏',
  'examples.msg2': 'Depende… estás mesmo a postos para te surpreender?',
  'examples.msg3': 'Agora ficaste-me curioso 😂',
  'examples.respIdeal': 'Tenho uma ideia. Mas primeiro diz-me uma coisa: preferes dia ou noite?',
  'examples.respSedutora': 'Cuidado com o que pedes. Posso surpreender-te a qualquer momento.',
  'examples.respInformal': 'logo vês. mas já tenho algo em mente 😉',
  'examples.respRomantica': 'Quando menos esperares. E vai valer a pena esperar por isso.',
  'examples.respProvocadora': 'Em breve. A questão não é quando, mas se estás pronto para isso.',
  'examples.respPicante': 'Surpresa minha. A única coisa que te digo é que não vais esquecer.',
  'features.title': 'O que faz a Aura diferente',
  'features.subtitle': 'Mais do que gerar texto.',
  'features.contextTitle': 'Contexto',
  'features.contextDesc': 'A resposta tem em conta o que está realmente a acontecer.',
  'features.toneTitle': 'Tom',
  'features.toneDesc': 'Decides como queres soar.',
  'features.screenshotTitle': 'Screenshot',
  'features.screenshotDesc': 'A Aura consegue analisar uma conversa visual.',
  'features.customTitle': 'Personalização',
  'features.customDesc': 'Descreve o teu próprio contexto e tom. A Aura interpreta e adapta-se.',
  'features.multiTitle': 'Múltiplas respostas',
  'features.multiDesc': 'Várias opções à escolha.',
  'features.privacyTitle': 'Privacidade',
  'features.privacyDesc': 'O teu histórico fica no teu dispositivo.',
  'value.title1': 'Sabes o que queres dizer.',
  'value.title2': 'A Aura ajuda-te a dizer melhor.',
  'value.desc': 'Escolhe o contexto. Define o tom. Envia a mensagem. A Aura transforma o que tens em mente em respostas naturais.',
  'faq.title': 'Perguntas frequentes',
  'faq.q1': 'A Aura é gratuita?',
  'faq.a1': 'Podes experimentar a Aura gratuitamente. Cria uma conta para começar.',
  'faq.q2': 'Que idiomas suporta?',
  'faq.a2': 'Português, Inglês, Espanhol, Francês e Alemão.',
  'faq.q3': 'Preciso de instalar alguma coisa?',
  'faq.a3': 'Não. A Aura funciona diretamente no navegador, no telemóvel ou computador.',
  'faq.q4': 'A Aura guarda as minhas conversas?',
  'faq.a4': 'O teu histórico de geração é guardado localmente no teu dispositivo. Não partilhamos as tuas mensagens.',
  'cta.title': 'Uma melhor conversa começa com a resposta certa.',
  'cta.desc': 'Experimenta a Aura agora. Sem instalação. Sem complicação.',
  'cta.button': 'Experimentar grátis',
  'footer.tagline': 'Sabes o que queres dizer. A Aura ajuda-te a dizer melhor.',
  'footer.product': 'Produto',
  'footer.company': 'Empresa',
  'footer.about': 'Sobre',
  'footer.contact': 'Contacto',
  'footer.account': 'Conta',
  'footer.login': 'Entrar',
  'footer.createAccount': 'Criar conta',
  'footer.privacy': 'Privacidade',
  'footer.terms': 'Termos',
  'footer.builtBy': 'Criado por Uriel Traquino',
  'footer.rights': '© 2026 Aura AI. Todos os direitos reservados.',
  'phone.toneLabel': 'Tom da resposta',
  'phone.responsesLabel': 'Respostas geradas',
  'phone.contextLabel': 'Contexto',
  'phone.messageLabel': 'Mensagem',
  'phone.screenshotLabel': 'Screenshot',
  'phone.optional': 'Opcional',
  'phone.generate': 'Gerar resposta',
  'phone.screenshotCaption': 'A Aura identifica a última mensagem e cria respostas coerentes.',
  'phone.msgReceived': 'Estava a pensar em ti hoje',
  'phone.msgReply': 'A sério? E o que pensaste?',
  'phone.msgFollowUp': 'Que gostava de te conhecer melhor',
};

const en: LandingDict = {
  'nav.features': 'Features',
  'nav.howItWorks': 'How it works',
  'nav.examples': 'Examples',
  'nav.faq': 'FAQ',
  'nav.login': 'Log in',
  'nav.createAccount': 'Create account',
  'nav.brandTag': 'AI-powered replies',
  'hero.badge': 'AI-powered replies',
  'hero.title1': 'Win anyone over',
  'hero.title2': 'with the right message.',
  'hero.subtitle': 'Aura understands the context, the tone, and what you really want to say — and turns it into a natural, confident reply in your own voice.',
  'hero.ctaTry': 'Try Aura for free',
  'hero.ctaHowItWorks': 'See how it works',
  'stats.contexts': 'Contexts',
  'stats.tones': 'Tones',
  'stats.styles': 'Response styles',
  'stats.languages': 'Languages',
  'how.title': 'How it works',
  'how.subtitle': 'From message to the right reply.',
  'how.step1Title': 'Choose the context',
  'how.step1Desc': 'Aura understands what you want to do in the conversation.',
  'how.step2Title': 'Set the tone',
  'how.step2Desc': 'Choose how you want to sound.',
  'how.step3Title': 'Send the message or screenshot',
  'how.step3Desc': 'Aura analyzes the conversation content.',
  'how.step4Title': 'Get ready-made responses',
  'how.step4Desc': 'Pick the one that fits and copy it.',
  'contexts.title': 'You choose the intention',
  'contexts.subtitle': 'Choose a preset context or describe your own. Aura adapts.',
  'tones.title': 'Adapt the tone',
  'tones.subtitle': "It's not just what you say. It's how you say it. And you can create your own tone.",
  'screenshot.title': "You don't need to explain the whole conversation.",
  'screenshot.desc': 'Send a screenshot. Aura analyzes the conversation context, identifies the relevant message, and helps you reply coherently.',
  'screenshot.step1': 'Screenshot',
  'screenshot.step2': 'Analysis',
  'screenshot.step3': 'Context',
  'screenshot.step4': 'Reply',
  'screenshot.caption': 'Aura identifies the last message and creates responses that match the conversation.',
  'examples.title': 'A real conversation',
  'examples.subtitle': 'See Aura in action.',
  'examples.conversationLabel': 'Conversation',
  'examples.msg1': 'So, when are you going to surprise me? 😏',
  'examples.msg2': 'Depends… are you actually ready to be surprised?',
  'examples.msg3': 'Now you\'ve got me curious 😂',
  'examples.respIdeal': 'I have an idea. But first tell me: do you prefer day or night?',
  'examples.respSedutora': 'Careful what you wish for. I might surprise you at any moment.',
  'examples.respInformal': 'you\'ll see. but I already have something in mind 😉',
  'examples.respRomantica': 'When you least expect it. And it\'ll be worth the wait.',
  'examples.respProvocadora': 'Soon. The question isn\'t when, but whether you\'re ready for it.',
  'examples.respPicante': 'That\'s my surprise. All I\'ll say is you won\'t forget it.',
  'features.title': 'What makes Aura different',
  'features.subtitle': 'More than generating text.',
  'features.contextTitle': 'Context',
  'features.contextDesc': 'The response considers what is actually happening.',
  'features.toneTitle': 'Tone',
  'features.toneDesc': 'You decide how you want to sound.',
  'features.screenshotTitle': 'Screenshot',
  'features.screenshotDesc': 'Aura can analyze a visual conversation.',
  'features.customTitle': 'Customization',
  'features.customDesc': 'Describe your own context and tone. Aura interprets and adapts.',
  'features.multiTitle': 'Multiple responses',
  'features.multiDesc': 'Several options to choose from.',
  'features.privacyTitle': 'Privacy',
  'features.privacyDesc': 'Your history stays on your device.',
  'value.title1': 'You know what you want to say.',
  'value.title2': 'Aura helps you say it better.',
  'value.desc': 'Choose the context. Set the tone. Send the message. Aura turns what you have in mind into natural responses.',
  'faq.title': 'Frequently asked questions',
  'faq.q1': 'Is Aura free?',
  'faq.a1': 'You can try Aura for free. Create an account to get started.',
  'faq.q2': 'What languages does it support?',
  'faq.a2': 'Portuguese, English, Spanish, French, and German.',
  'faq.q3': 'Do I need to install anything?',
  'faq.a3': 'No. Aura works directly in your browser, on phone or computer.',
  'faq.q4': 'Does Aura store my conversations?',
  'faq.a4': 'Your generation history is stored locally on your device. We do not share your messages.',
  'cta.title': 'A better conversation starts with the right reply.',
  'cta.desc': 'Try Aura now. No installation. No complication.',
  'cta.button': 'Try Aura for free',
  'footer.tagline': 'Know what you want to say. Aura helps you say it better.',
  'footer.product': 'Product',
  'footer.company': 'Company',
  'footer.about': 'About',
  'footer.contact': 'Contact',
  'footer.account': 'Account',
  'footer.login': 'Log in',
  'footer.createAccount': 'Create account',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.builtBy': 'Built by Uriel Traquino',
  'footer.rights': '© 2026 Aura AI. All rights reserved.',
  'phone.toneLabel': 'Reply tone',
  'phone.responsesLabel': 'Generated replies',
  'phone.contextLabel': 'Context',
  'phone.messageLabel': 'Message',
  'phone.screenshotLabel': 'Screenshot',
  'phone.optional': 'Optional',
  'phone.generate': 'Generate reply',
  'phone.screenshotCaption': 'Aura identifies the last message and creates coherent replies.',
  'phone.msgReceived': 'Was thinking about you today',
  'phone.msgReply': 'Really? What were you thinking?',
  'phone.msgFollowUp': 'That I\'d like to get to know you better',
};

const es: LandingDict = {
  'nav.features': 'Funciones',
  'nav.howItWorks': 'Cómo funciona',
  'nav.examples': 'Ejemplos',
  'nav.faq': 'FAQ',
  'nav.login': 'Entrar',
  'nav.createAccount': 'Crear cuenta',
  'nav.brandTag': 'Respuestas con IA',
  'hero.badge': 'Respuestas con IA',
  'hero.title1': 'Conquista a cualquiera',
  'hero.title2': 'con el mensaje correcto.',
  'hero.subtitle': 'Aura entiende el contexto, el tono y lo que realmente quieres decir — y lo transforma en una respuesta natural, segura y a tu manera.',
  'hero.ctaTry': 'Probar gratis',
  'hero.ctaHowItWorks': 'Ver cómo funciona',
  'stats.contexts': 'Contextos',
  'stats.tones': 'Tons',
  'stats.styles': 'Estilos de respuesta',
  'stats.languages': 'Idiomas',
  'how.title': 'Cómo funciona',
  'how.subtitle': 'Del mensaje a la respuesta correcta.',
  'how.step1Title': 'Elige el contexto',
  'how.step1Desc': 'Aura entiende lo que quieres hacer en la conversación.',
  'how.step2Title': 'Define el tono',
  'how.step2Desc': 'Elige cómo quieres sonar.',
  'how.step3Title': 'Envía el mensaje o captura',
  'how.step3Desc': 'Aura analiza el contenido de la conversación.',
  'how.step4Title': 'Recibe respuestas listas',
  'how.step4Desc': 'Elige la que encaja y cópiala.',
  'contexts.title': 'Tú eliges la intención',
  'contexts.subtitle': 'Elige un contexto predefinido o describe el tuyo. Aura se adapta.',
  'tones.title': 'Adapta el tono',
  'tones.subtitle': 'No es solo lo que dices. Es cómo lo dices. Y puedes crear tu propio tono.',
  'screenshot.title': 'No necesitas explicar toda la conversación.',
  'screenshot.desc': 'Envía una captura. Aura analiza el contexto de la conversación, identifica el mensaje relevante y te ayuda a responder coherentemente.',
  'screenshot.step1': 'Captura',
  'screenshot.step2': 'Análisis',
  'screenshot.step3': 'Contexto',
  'screenshot.step4': 'Respuesta',
  'screenshot.caption': 'Aura identifica el último mensaje y crea respuestas coherentes con la conversación.',
  'examples.title': 'Una conversación real',
  'examples.subtitle': 'Ve a Aura en acción.',
  'examples.conversationLabel': 'Conversación',
  'examples.msg1': 'Entonces, ¿cuándo me vas a sorprender? 😏',
  'examples.msg2': 'Depende… ¿de verdad estás listo para que te sorprenda?',
  'examples.msg3': 'Ahora me dejaste curioso 😂',
  'examples.respIdeal': 'Tengo una idea. Pero primero dime algo: ¿prefieres de día o de noche?',
  'examples.respSedutora': 'Cuidado con lo que pides. Puedo sorprenderte en cualquier momento.',
  'examples.respInformal': 'ya verás. pero ya tengo algo en mente 😉',
  'examples.respRomantica': 'Cuando menos lo esperes. Y valdrá la pena esperar.',
  'examples.respProvocadora': 'Pronto. La cuestión no es cuándo, sino si estás listo.',
  'examples.respPicante': 'Sorpresa mía. Lo único que te digo es que no lo olvidarás.',
  'features.title': 'Qué hace a Aura diferente',
  'features.subtitle': 'Más que generar texto.',
  'features.contextTitle': 'Contexto',
  'features.contextDesc': 'La respuesta tiene en cuenta lo que realmente está pasando.',
  'features.toneTitle': 'Tono',
  'features.toneDesc': 'Tú decides cómo quieres sonar.',
  'features.screenshotTitle': 'Captura',
  'features.screenshotDesc': 'Aura puede analizar una conversación visual.',
  'features.customTitle': 'Personalización',
  'features.customDesc': 'Describe tu propio contexto y tono. Aura interpreta y se adapta.',
  'features.multiTitle': 'Múltiples respuestas',
  'features.multiDesc': 'Varias opciones a elegir.',
  'features.privacyTitle': 'Privacidad',
  'features.privacyDesc': 'Tu historial se queda en tu dispositivo.',
  'value.title1': 'Sabes lo que quieres decir.',
  'value.title2': 'Aura te ayuda a decirlo mejor.',
  'value.desc': 'Elige el contexto. Define el tono. Envía el mensaje. Aura transforma lo que tienes en mente en respuestas naturales.',
  'faq.title': 'Preguntas frecuentes',
  'faq.q1': '¿Aura es gratis?',
  'faq.a1': 'Puedes probar Aura gratis. Crea una cuenta para empezar.',
  'faq.q2': '¿Qué idiomas soporta?',
  'faq.a2': 'Portugués, Inglés, Español, Francés y Alemán.',
  'faq.q3': '¿Necesito instalar algo?',
  'faq.a3': 'No. Aura funciona directamente en el navegador, en el móvil o el ordenador.',
  'faq.q4': '¿Aura guarda mis conversaciones?',
  'faq.a4': 'Tu historial de generación se guarda localmente en tu dispositivo. No compartimos tus mensajes.',
  'cta.title': 'Una mejor conversación empieza con la respuesta correcta.',
  'cta.desc': 'Prueba Aura ahora. Sin instalación. Sin complicación.',
  'cta.button': 'Probar gratis',
  'footer.tagline': 'Sabes lo que quieres decir. Aura te ayuda a decirlo mejor.',
  'footer.product': 'Producto',
  'footer.company': 'Empresa',
  'footer.about': 'Acerca',
  'footer.contact': 'Contacto',
  'footer.account': 'Cuenta',
  'footer.login': 'Entrar',
  'footer.createAccount': 'Crear cuenta',
  'footer.privacy': 'Privacidad',
  'footer.terms': 'Términos',
  'footer.builtBy': 'Creado por Uriel Traquino',
  'footer.rights': '© 2026 Aura AI. Todos los derechos reservados.',
  'phone.toneLabel': 'Tono de respuesta',
  'phone.responsesLabel': 'Respuestas generadas',
  'phone.contextLabel': 'Contexto',
  'phone.messageLabel': 'Mensaje',
  'phone.screenshotLabel': 'Captura',
  'phone.optional': 'Opcional',
  'phone.generate': 'Generar respuesta',
  'phone.screenshotCaption': 'Aura identifica el último mensaje y crea respuestas coherentes.',
  'phone.msgReceived': 'Estaba pensando en ti hoy',
  'phone.msgReply': '¿En serio? ¿Y qué pensabas?',
  'phone.msgFollowUp': 'Que me gustaría conocerte mejor',
};

const fr: LandingDict = {
  'nav.features': 'Fonctions',
  'nav.howItWorks': 'Comment ça marche',
  'nav.examples': 'Exemples',
  'nav.faq': 'FAQ',
  'nav.login': 'Connexion',
  'nav.createAccount': 'Créer un compte',
  'nav.brandTag': 'Réponses par IA',
  'hero.badge': 'Réponses par IA',
  'hero.title1': 'Séduis n\'importe qui',
  'hero.title2': 'avec le bon message.',
  'hero.subtitle': 'Aura comprend le contexte, le ton et ce que tu veux vraiment dire — et le transforme en une réponse naturelle, confiante et à ta façon.',
  'hero.ctaTry': 'Essayer gratuitement',
  'hero.ctaHowItWorks': 'Voir comment ça marche',
  'stats.contexts': 'Contextes',
  'stats.tones': 'Tons',
  'stats.styles': 'Styles de réponse',
  'stats.languages': 'Langues',
  'how.title': 'Comment ça marche',
  'how.subtitle': 'Du message à la bonne réponse.',
  'how.step1Title': 'Choisis le contexte',
  'how.step1Desc': 'Aura comprend ce que tu veux faire dans la conversation.',
  'how.step2Title': 'Définis le ton',
  'how.step2Desc': 'Choisis comment tu veux sonner.',
  'how.step3Title': 'Envoie le message ou la capture',
  'how.step3Desc': 'Aura analyse le contenu de la conversation.',
  'how.step4Title': 'Reçois des réponses prêtes',
  'how.step4Desc': 'Choisis celle qui convient et copie-la.',
  'contexts.title': 'Tu choisis l\'intention',
  'contexts.subtitle': 'Choisis un contexte prédéfini ou décris le tien. Aura s\'adapte.',
  'tones.title': 'Adapte le ton',
  'tones.subtitle': 'Ce n\'est pas seulement ce que tu dis. C\'est comment tu le dis. Et tu peux créer ton propre ton.',
  'screenshot.title': 'Tu n\'as pas besoin d\'expliquer toute la conversation.',
  'screenshot.desc': 'Envoie une capture. Aura analyse le contexte de la conversation, identifie le message pertinent et t\'aide à répondre de façon cohérente.',
  'screenshot.step1': 'Capture',
  'screenshot.step2': 'Analyse',
  'screenshot.step3': 'Contexte',
  'screenshot.step4': 'Réponse',
  'screenshot.caption': 'Aura identifie le dernier message et crée des réponses cohérentes avec la conversation.',
  'examples.title': 'Une vraie conversation',
  'examples.subtitle': 'Vois Aura en action.',
  'examples.conversationLabel': 'Conversation',
  'examples.msg1': 'Alors, quand vas-tu me surprendre ? 😏',
  'examples.msg2': 'Ça dépend… es-tu vraiment prêt à être surpris ?',
  'examples.msg3': 'Maintenant tu m\'as rendu curieux 😂',
  'examples.respIdeal': 'J\'ai une idée. Mais d\'abord dis-moi : tu préfères le jour ou la nuit ?',
  'examples.respSedutora': 'Fais attention à ce que tu demandes. Je peux te surprendre à tout moment.',
  'examples.respInformal': 'tu verras. mais j\'ai déjà quelque chose en tête 😉',
  'examples.respRomantica': 'Quand tu t\'y attends le moins. Et ça vaudra la peine d\'attendre.',
  'examples.respProvocadora': 'Bientôt. La question n\'est pas quand, mais si tu es prêt.',
  'examples.respPicante': 'C\'est ma surprise. Tout ce que je te dis, c\'est que tu n\'oublieras pas.',
  'features.title': 'Ce qui rend Aura différente',
  'features.subtitle': 'Plus que générer du texte.',
  'features.contextTitle': 'Contexte',
  'features.contextDesc': 'La réponse prend en compte ce qui se passe vraiment.',
  'features.toneTitle': 'Ton',
  'features.toneDesc': 'Tu décides comment tu veux sonner.',
  'features.screenshotTitle': 'Capture',
  'features.screenshotDesc': 'Aura peut analyser une conversation visuelle.',
  'features.customTitle': 'Personnalisation',
  'features.customDesc': 'Décris ton propre contexte et ton. Aura interprète et s\'adapte.',
  'features.multiTitle': 'Plusieurs réponses',
  'features.multiDesc': 'Plusieurs options au choix.',
  'features.privacyTitle': 'Confidentialité',
  'features.privacyDesc': 'Ton historique reste sur ton appareil.',
  'value.title1': 'Tu sais ce que tu veux dire.',
  'value.title2': 'Aura t\'aide à le dire mieux.',
  'value.desc': 'Choisis le contexte. Définis le ton. Envoie le message. Aura transforme ce que tu as en tête en réponses naturelles.',
  'faq.title': 'Questions fréquentes',
  'faq.q1': 'Aura est-elle gratuite ?',
  'faq.a1': 'Tu peux essayer Aura gratuitement. Crée un compte pour commencer.',
  'faq.q2': 'Quelles langues sont prises en charge ?',
  'faq.a2': 'Portugais, Anglais, Espagnol, Français et Allemand.',
  'faq.q3': 'Dois-je installer quelque chose ?',
  'faq.a3': 'Non. Aura fonctionne directement dans ton navigateur, sur téléphone ou ordinateur.',
  'faq.q4': 'Aura stocke-t-elle mes conversations ?',
  'faq.a4': 'Ton historique de génération est stocké localement sur ton appareil. Nous ne partageons pas tes messages.',
  'cta.title': 'Une meilleure conversation commence par la bonne réponse.',
  'cta.desc': 'Essaie Aura maintenant. Sans installation. Sans complication.',
  'cta.button': 'Essayer gratuitement',
  'footer.tagline': 'Tu sais ce que tu veux dire. Aura t\'aide à le dire mieux.',
  'footer.product': 'Produit',
  'footer.company': 'Entreprise',
  'footer.about': 'À propos',
  'footer.contact': 'Contact',
  'footer.account': 'Compte',
  'footer.login': 'Connexion',
  'footer.createAccount': 'Créer un compte',
  'footer.privacy': 'Confidentialité',
  'footer.terms': 'Conditions',
  'footer.builtBy': 'Créé par Uriel Traquino',
  'footer.rights': '© 2026 Aura AI. Tous droits réservés.',
  'phone.toneLabel': 'Ton de réponse',
  'phone.responsesLabel': 'Réponses générées',
  'phone.contextLabel': 'Contexte',
  'phone.messageLabel': 'Message',
  'phone.screenshotLabel': 'Capture',
  'phone.optional': 'Optionnel',
  'phone.generate': 'Générer la réponse',
  'phone.screenshotCaption': 'Aura identifie le dernier message et crée des réponses cohérentes.',
  'phone.msgReceived': 'Je pensais à toi aujourd\'hui',
  'phone.msgReply': 'Vraiment ? Et à quoi ?',
  'phone.msgFollowUp': 'Que j\'aimerais mieux te connaître',
};

const de: LandingDict = {
  'nav.features': 'Funktionen',
  'nav.howItWorks': 'So funktioniert\'s',
  'nav.examples': 'Beispiele',
  'nav.faq': 'FAQ',
  'nav.login': 'Anmelden',
  'nav.createAccount': 'Konto erstellen',
  'nav.brandTag': 'KI-Antworten',
  'hero.badge': 'KI-Antworten',
  'hero.title1': 'Gewinne jeden für dich',
  'hero.title2': 'mit der richtigen Nachricht.',
  'hero.subtitle': 'Aura versteht den Kontext, den Ton und was du wirklich sagen willst — und verwandelt es in eine natürliche, selbstbewusste Antwort auf deine Art.',
  'hero.ctaTry': 'Kostenlos testen',
  'hero.ctaHowItWorks': 'So funktioniert\'s',
  'stats.contexts': 'Kontexte',
  'stats.tones': 'Tons',
  'stats.styles': 'Antwortstile',
  'stats.languages': 'Sprachen',
  'how.title': 'So funktioniert\'s',
  'how.subtitle': 'Vom Nachricht zur richtigen Antwort.',
  'how.step1Title': 'Wähle den Kontext',
  'how.step1Desc': 'Aura versteht, was du in der Unterhaltung erreichen willst.',
  'how.step2Title': 'Lege den Ton fest',
  'how.step2Desc': 'Wähle, wie du klingen willst.',
  'how.step3Title': 'Sende Nachricht oder Screenshot',
  'how.step3Desc': 'Aura analysiert den Inhalt der Unterhaltung.',
  'how.step4Title': 'Erhalte fertige Antworten',
  'how.step4Desc': 'Wähle die passende aus und kopiere sie.',
  'contexts.title': 'Du wählst die Intention',
  'contexts.subtitle': 'Wähle einen vordefinierten Kontext oder beschreibe deinen eigenen. Aura passt sich an.',
  'tones.title': 'Passe den Ton an',
  'tones.subtitle': 'Nicht nur was du sagst zählt. Sondern wie. Und du kannst deinen eigenen Ton erstellen.',
  'screenshot.title': 'Du musst nicht die ganze Unterhaltung erklären.',
  'screenshot.desc': 'Sende einen Screenshot. Aura analysiert den Kontext der Unterhaltung, identifiziert die relevante Nachricht und hilft dir, kohärent zu antworten.',
  'screenshot.step1': 'Screenshot',
  'screenshot.step2': 'Analyse',
  'screenshot.step3': 'Kontext',
  'screenshot.step4': 'Antwort',
  'screenshot.caption': 'Aura identifiziert die letzte Nachricht und erstellt kohärente Antworten.',
  'examples.title': 'Eine echte Unterhaltung',
  'examples.subtitle': 'Sieh Aura in Aktion.',
  'examples.conversationLabel': 'Unterhaltung',
  'examples.msg1': 'Also, wann wirst du mich überraschen? 😏',
  'examples.msg2': 'Kommt drauf an… bist du wirklich bereit überrascht zu werden?',
  'examples.msg3': 'Jetzt hast du mich neugierig gemacht 😂',
  'examples.respIdeal': 'Ich habe eine Idee. Aber sag mir zuerst: Tag oder Nacht?',
  'examples.respSedutora': 'Pass auf, was du wünschst. Ich kann dich jederzeit überraschen.',
  'examples.respInformal': 'wirst schon sehen. aber ich hab schon was im Kopf 😉',
  'examples.respRomantica': 'Wenn du es am wenigsten erwartest. Und es wird sich lohnen zu warten.',
  'examples.respProvocadora': 'Bald. Die Frage ist nicht wann, sondern ob du bereit bist.',
  'examples.respPicante': 'Meine Überraschung. Das einzige was ich sage: du wirst es nicht vergessen.',
  'features.title': 'Was Aura anders macht',
  'features.subtitle': 'Mehr als Text generieren.',
  'features.contextTitle': 'Kontext',
  'features.contextDesc': 'Die Antwort berücksichtigt, was wirklich passiert.',
  'features.toneTitle': 'Ton',
  'features.toneDesc': 'Du entscheidest, wie du klingen willst.',
  'features.screenshotTitle': 'Screenshot',
  'features.screenshotDesc': 'Aura kann eine visuelle Unterhaltung analysieren.',
  'features.customTitle': 'Anpassung',
  'features.customDesc': 'Beschreibe deinen eigenen Kontext und Ton. Aura interpretiert und passt sich an.',
  'features.multiTitle': 'Mehrere Antworten',
  'features.multiDesc': 'Mehrere Optionen zur Auswahl.',
  'features.privacyTitle': 'Datenschutz',
  'features.privacyDesc': 'Dein Verlauf bleibt auf deinem Gerät.',
  'value.title1': 'Du weißt, was du sagen willst.',
  'value.title2': 'Aura hilft dir, es besser zu sagen.',
  'value.desc': 'Wähle den Kontext. Lege den Ton fest. Sende die Nachricht. Aura macht aus deinen Gedanken natürliche Antworten.',
  'faq.title': 'Häufige Fragen',
  'faq.q1': 'Ist Aura kostenlos?',
  'faq.a1': 'Du kannst Aura kostenlos testen. Erstelle ein Konto, um loszulegen.',
  'faq.q2': 'Welche Sprachen werden unterstützt?',
  'faq.a2': 'Portugiesisch, Englisch, Spanisch, Französisch und Deutsch.',
  'faq.q3': 'Muss ich etwas installieren?',
  'faq.a3': 'Nein. Aura funktioniert direkt im Browser, am Handy oder Computer.',
  'faq.q4': 'Speichert Aura meine Unterhaltungen?',
  'faq.a4': 'Dein Generierungsverlauf wird lokal auf deinem Gerät gespeichert. Wir teilen deine Nachrichten nicht.',
  'cta.title': 'Eine bessere Unterhaltung beginnt mit der richtigen Antwort.',
  'cta.desc': 'Probiere Aura jetzt. Keine Installation. Keine Komplikation.',
  'cta.button': 'Kostenlos testen',
  'footer.tagline': 'Du weißt, was du sagen willst. Aura hilft dir, es besser zu sagen.',
  'footer.product': 'Produkt',
  'footer.company': 'Unternehmen',
  'footer.about': 'Über uns',
  'footer.contact': 'Kontakt',
  'footer.account': 'Konto',
  'footer.login': 'Anmelden',
  'footer.createAccount': 'Konto erstellen',
  'footer.privacy': 'Datenschutz',
  'footer.terms': 'AGB',
  'footer.builtBy': 'Erstellt von Uriel Traquino',
  'footer.rights': '© 2026 Aura AI. Alle Rechte vorbehalten.',
  'phone.toneLabel': 'Antwortton',
  'phone.responsesLabel': 'Generierte Antworten',
  'phone.contextLabel': 'Kontext',
  'phone.messageLabel': 'Nachricht',
  'phone.screenshotLabel': 'Screenshot',
  'phone.optional': 'Optional',
  'phone.generate': 'Antwort generieren',
  'phone.screenshotCaption': 'Aura identifiziert die letzte Nachricht und erstellt kohärente Antworten.',
  'phone.msgReceived': 'Ich habe heute an dich gedacht',
  'phone.msgReply': 'Wirklich? Und an was?',
  'phone.msgFollowUp': 'Dass ich dich besser kennenlernen möchte',
};

const DICTS: Record<Language, LandingDict> = { pt, en, es, fr, de };

export function translateLanding(lang: Language, key: LandingKey): string {
  return DICTS[lang][key] ?? DICTS.pt[key] ?? key;
}

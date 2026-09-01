import type { CantadaCategory } from './cantadas';

export type CantadaEntry = {
  id: number;
  category: CantadaCategory;
  text: string;
};

export const CANTADAS_PREMIUM_PT: CantadaEntry[] = [
  // ── Divertidas ──
  { id: 500, category: 'Divertidas', text: 'O meu Tinder disse-me para parar de deslizar depois de te encontrar. Disse-lhe que ia pensar.' },
  { id: 501, category: 'Divertidas', text: 'Acabei de dizer ao meu grupo que encontrei alguém interessante. Estão em choque. Eu também.' },
  { id: 502, category: 'Divertidas', text: 'Tens aquele tipo de energia que faz um domingo à noite parecer sexta. Como é que fazes isso?' },
  { id: 503, category: 'Divertidas', text: 'Estava a tentar ser produtivo hoje, mas tu apareces-te e agora estou a tentar ser interessante.' },
  { id: 504, category: 'Divertidas', text: 'A minha mãe disse para arranjar alguém com futuro. Tu tens futuro, certo? Ou pelo menos um plano?' },
  { id: 505, category: 'Divertidas', text: 'Se fosses uma série na Netflix, eu viajava todos os episódios e queixava-me que acabou demasiado cedo.' },
  { id: 506, category: 'Divertidas', text: 'Descobri que tens o mesmo nome que a minha ex. A diferença é que tu dás-me vontade de continuar a conversa.' },
  { id: 507, category: 'Divertidas', text: 'Não costumo mandar mensagens a estranhos, mas tu não pareces estranha. Pareces o início de qualquer coisa boa.' },
  { id: 508, category: 'Divertidas', text: 'Aviso: conversar comigo pode causar risos inesperados, planos improvisados e vontade de repetir.' },
  { id: 509, category: 'Divertidas', text: 'O meu algoritmo de "pessoas interessantes" acabou de te colocar em primeiro lugar. Não consigo mudar isso.' },

  // ── Fofas ──
  { id: 510, category: 'Fofas', text: 'Há qualquer coisa na tua forma de escrever que me faz querer saber como soas ao vivo.' },
  { id: 511, category: 'Fofas', text: 'Não sou de mandar o primeiro "olá", mas contigo senti que se eu não mandasse, estava a perder tempo.' },
  { id: 512, category: 'Fofas', text: 'A tua foto de perfil fez-me parar a meio do scroll. E eu nem gosto de parar.' },
  { id: 513, category: 'Fofas', text: 'Tens aquele sorriso que faz as pessoas esquecerem o que iam dizer. Acabou de me acontecer.' },
  { id: 514, category: 'Fofas', text: 'Há pessoas que entram numa sala e mudam o ambiente. Tu entraste no meu feed e mudaste o meu humor.' },
  { id: 515, category: 'Fofas', text: 'Acho que o teu sorriso devia ter um aviso: "pode causar borboletas no estômago e vontade de mandar mensagem".' },
  { id: 516, category: 'Fofas', text: 'Não sei o que te faz diferente, mas há qualquer coisa em ti que me faz querer descobrir tudo.' },
  { id: 517, category: 'Fofas', text: 'A tua energia é tipo um café numa manhã fria — simplesmente acerta no sítio certo.' },
  { id: 518, category: 'Fofas', text: 'Tens aquele tipo de presença que faz as pessoas sentirem que podem ser elas mesmas. Eu sinto isso.' },
  { id: 519, category: 'Fofas', text: 'Acho que o mundo precisa de mais pessoas como tu. E eu preciso de te conhecer melhor.' },

  // ── Confiantes ──
  { id: 520, category: 'Confiantes', text: 'Não ando à procura de qualquer pessoa. Ando à procura de alguém que valha a pena. Tu aparentas valer.' },
  { id: 521, category: 'Confiantes', text: 'Não costumo mandar mensagem primeiro, mas para ti abri uma exceção. Não faço isso por qualquer um.' },
  { id: 522, category: 'Confiantes', text: 'Acho que nos vamos dar bem. E raramente me engano sobre isso.' },
  { id: 523, category: 'Confiantes', text: 'Não sou o tipo que perde tempo com rodeios. Achei-te interessante e quis dizer-to. Simples.' },
  { id: 524, category: 'Confiantes', text: 'Tens tudo para ser o tipo de pessoa com quem eu gosto de passar tempo. E eu sou seletivo.' },
  { id: 525, category: 'Confiantes', text: 'Não ando aqui por acaso. Ando aqui porque vi qualquer coisa em ti que me fez querer começar uma conversa.' },
  { id: 526, category: 'Confiantes', text: 'Acho que a melhor conversa que tive hoje ainda está para vir. E és tu que a vais ter comigo.' },
  { id: 527, category: 'Confiantes', text: 'Não preciso de muitos motivos para te mandar mensagem. Bastou-me um: achei-te diferente.' },
  { id: 528, category: 'Confiantes', text: 'Não sou o tipo de gajo que diz "talvez". Eu digo "sim" e depois descubro se valeu a pena.' },
  { id: 529, category: 'Confiantes', text: 'Acho que mereces alguém que não tenha medo de te dizer o que pensa. Eu não tenho esse medo.' },

  // ── Criativas ──
  { id: 530, category: 'Criativas', text: 'Se a vida fosse um filme, tu serias a cena que eu pausava para mostrar a alguém e dizer "viu isto?".' },
  { id: 531, category: 'Criativas', text: 'Se fosses uma playlist, serias aquela que eu ouço a repetir e que nunca fica velha.' },
  { id: 532, category: 'Criativas', text: 'Não sou escritor, mas acho que tu inspiras um capítulo que eu não sabia que existia.' },
  { id: 533, category: 'Criativas', text: 'Se fosses uma estação do ano, serias aquele início de outono que faz tudo parecer mais bonito.' },
  { id: 534, category: 'Criativas', text: 'Tens aquele tipo de energia que transforma um terça-feira à tarde em qualquer coisa que valha a pena lembrar.' },
  { id: 535, category: 'Criativas', text: 'Se fosses um lugar, serias aquele que eu não planeava visitar, mas que se tornou o meu favorito.' },
  { id: 536, category: 'Criativas', text: 'Não sou artista, mas acho que tu és o tipo de coisa que faz as pessoas quererem criar qualquer coisa.' },
  { id: 537, category: 'Criativas', text: 'Se fosses uma palavra, serias "inesquecível". E eu não sou de me esquecer fácil.' },
  { id: 538, category: 'Criativas', text: 'Tens aquele tipo de presença que faz as pessoas quererem reinventar-se. Incluindo-me.' },
  { id: 539, category: 'Criativas', text: 'Se fosses um momento, serias aquele que eu guardava no telemóvel e mostrava a toda a gente.' },

  // ── Inteligentes ──
  { id: 540, category: 'Inteligentes', text: 'A inteligência é atraente, mas tu conseguiste juntar-lhe o sorriso. Isso é trapaça e eu gosto de trapaças.' },
  { id: 541, category: 'Inteligentes', text: 'Não sei se reparaste, mas pessoas que fazem pensar são raras. E tu não passas despercebida.' },
  { id: 542, category: 'Inteligentes', text: 'Acho que uma boa conversa contigo vale mais que mil mensagens vazias. Comecemos por uma.' },
  { id: 543, category: 'Inteligentes', text: 'Tens aquele tipo de inteligência que não se mede por testes, mas pela forma como fazes as pessoas pensar.' },
  { id: 544, category: 'Inteligentes', text: 'Não sou de me impressionar fácil, mas a tua forma de pensar tem qualquer coisa que me faz querer ouvir mais.' },
  { id: 545, category: 'Inteligentes', text: 'Acho que o melhor de te conhecer não é o que dizes, mas o que me faz pensar depois.' },
  { id: 546, category: 'Inteligentes', text: 'Tens aquele tipo de mente que faz as pessoas quererem ser mais inteligentes só para te acompanhar.' },
  { id: 547, category: 'Inteligentes', text: 'Não sei o que te faz diferente, mas acho que é isso que me faz querer descobrir tudo.' },
  { id: 548, category: 'Inteligentes', text: 'Acho que pessoas como tu são raras. E eu gosto de coisas raras.' },
  { id: 549, category: 'Inteligentes', text: 'Tens aquele tipo de inteligência que não se vê, se sente. E eu senti.' },

  // ── Elogios ──
  { id: 550, category: 'Elogios', text: 'O teu sorriso é daquelas coisas que não se esquece. E eu não me esqueci.' },
  { id: 551, category: 'Elogios', text: 'Não sei se já te disseram hoje, mas estás incrível. E eu não sou de dizer isto a toda a gente.' },
  { id: 552, category: 'Elogios', text: 'Tens aquele tipo de beleza que não precisa de filtro. É natural e eu gosto de coisas naturais.' },
  { id: 553, category: 'Elogios', text: 'Acho que o teu sorriso devia ser património mundial. É um tesouro que merece ser protegido.' },
  { id: 554, category: 'Elogios', text: 'Não sou de elogiar por elogiar, mas tu mereces. E muito mais do que eu consigo dizer.' },
  { id: 555, category: 'Elogios', text: 'Tens aquele tipo de presença que ilumina qualquer lugar. Incluindo o meu feed.' },
  { id: 556, category: 'Elogios', text: 'Acho que o teu estilo é único. E eu gosto de coisas únicas.' },
  { id: 557, category: 'Elogios', text: 'Não sei se reparaste, mas tens aquele algo que não se explica. E eu quero descobrir o que é.' },
  { id: 558, category: 'Elogios', text: 'Tens aquele tipo de beleza que faz as pessoas parar e olhar. Eu parei.' },
  { id: 559, category: 'Elogios', text: 'Acho que o teu olhar diz mais que mil palavras. E eu quero ouvir todas.' },

  // ── Elogios 2.0 ──
  { id: 560, category: 'Elogios 2.0', text: 'O teu feed é uma galeria de arte e eu sinto-me sortudo por ter entrada livre.' },
  { id: 561, category: 'Elogios 2.0', text: 'Não sei se és ciente do impacto que tens, mas é real. E grande.' },
  { id: 562, category: 'Elogios 2.0', text: 'Tens aquele tipo de vibe que faz as pessoas quererem fazer parte do teu mundo.' },
  { id: 563, category: 'Elogios 2.0', text: 'Acho que o teu estilo é o tipo de coisa que se estuda em curso de moda.' },
  { id: 564, category: 'Elogios 2.0', text: 'Não sou de ficar a olhar stories, mas os teus eu vejo todos. E duas vezes.' },
  { id: 565, category: 'Elogios 2.0', text: 'Tens aquele tipo de presença digital que faz as pessoas quererem conhecer a versão real.' },
  { id: 566, category: 'Elogios 2.0', text: 'Acho que o teu perfil é o tipo de lugar onde se fica mais tempo do que se planeia.' },
  { id: 567, category: 'Elogios 2.0', text: 'Não sei se reparaste, mas tu és o tipo de pessoa que faz as pessoas quererem ser melhores versões de si mesmas.' },
  { id: 568, category: 'Elogios 2.0', text: 'Tens aquele tipo de energia que não cabe numa foto. Tem que ser ao vivo.' },
  { id: 569, category: 'Elogios 2.0', text: 'Acho que o teu sorriso é o tipo de coisa que deveria ter partilha social. Vai virar.' },

  // ── Românticas ──
  { id: 570, category: 'Românticas', text: 'Não sei se acreditas em destino, mas acho que hoje ele trabalhou a nosso favor.' },
  { id: 571, category: 'Românticas', text: 'A tua voz tem aquele tipo de calma que faz as pessoas sentir que tudo está bem. Mesmo quando não está.' },
  { id: 572, category: 'Românticas', text: 'Tens aquele tipo de presença que faz as pessoas sentir que estão no lugar certo. Eu sinto isso.' },
  { id: 573, category: 'Românticas', text: 'Acho que o teu sorriso é o tipo de coisa que faz as pessoas acreditar em bons dias.' },
  { id: 574, category: 'Românticas', text: 'Não sou de me apaixonar fácil, mas acho que tu és uma boa razão para começar.' },
  { id: 575, category: 'Românticas', text: 'Tens aquele tipo de doçura que faz as pessoas sentir que vale a pena. Tudo.' },
  { id: 576, category: 'Românticas', text: 'Acho que o teu olhar é o tipo de coisa que faz as pessoas quererem ficar. Eu quero.' },
  { id: 577, category: 'Românticas', text: 'Não sei se reparaste, mas há qualquer coisa em ti que me faz sentir bem. E eu não sinto isso com facilidade.' },
  { id: 578, category: 'Românticas', text: 'Tens aquele tipo de presença que faz as pessoas quererem ficar mais tempo. Eu quero.' },
  { id: 579, category: 'Românticas', text: 'Acho que o teu sorriso é o tipo de coisa que faz as pessoas quererem ser a razão dele. Eu quero ser.' },

  // ── Sedutoras ──
  { id: 580, category: 'Sedutoras', text: 'Não sei o que estás a pensar agora, mas aposto que é tão interessante como tu.' },
  { id: 581, category: 'Sedutoras', text: 'Acho que o perigo de te conhecer é que eu não vou querer parar. E eu raramente paro.' },
  { id: 582, category: 'Sedutoras', text: 'Tens aquele tipo de presença que faz as pessoas quererem saber mais. Muito mais.' },
  { id: 583, category: 'Sedutoras', text: 'Acho que o teu sorriso é o tipo de coisa que faz as pessoas perderem o fôlego. Eu perdi.' },
  { id: 584, category: 'Sedutoras', text: 'Não sou de me perder em pensamentos, mas tu andas nos meus. E eu não me importo.' },
  { id: 585, category: 'Sedutoras', text: 'Tens aquele tipo de magnetismo que não se explica, se sente. E eu sinto.' },
  { id: 586, category: 'Sedutoras', text: 'Acho que o teu olhar é o tipo de coisa que faz as pessoas quererem ser vistas por ti. Eu quero.' },
  { id: 587, category: 'Sedutoras', text: 'Não sei se reparaste, mas tu és o tipo de pessoa que faz as pessoas quererem arriscar tudo. Eu estou a arriscar.' },
  { id: 588, category: 'Sedutoras', text: 'Tens aquele tipo de presença que faz as pessoas sentir que estão a viver algo único. Eu sinto.' },
  { id: 589, category: 'Sedutoras', text: 'Acho que o teu sorriso é o tipo de coisa que faz as pessoas quererem ser a razão dele. Eu quero ser.' },

  // ── Provocadoras ──
  { id: 590, category: 'Provocadoras', text: 'Acho que tu gostas de desafios. E eu gosto de te desafiar. Vemos quem ganha.' },
  { id: 591, category: 'Provocadoras', text: 'Não sei se consegues lidar comigo. Mas podes tentar. Eu gosto de tentativas.' },
  { id: 592, category: 'Provocadoras', text: 'Tens aquele tipo de energia que me faz querer te provocar só para ver como reages.' },
  { id: 593, category: 'Provocadoras', text: 'Acho que tu és o tipo de pessoa que gosta de estar no controlo. Eu também. Vamos ver.' },
  { id: 594, category: 'Provocadoras', text: 'Não sou de me intimidar fácil, mas tu tens qualquer coisa que me faz querer jogar.' },
  { id: 595, category: 'Provocadoras', text: 'Tens aquele tipo de confiança que me faz querer testar os limites. Os teus e os meus.' },
  { id: 596, category: 'Provocadoras', text: 'Acho que a nossa conversa vai ser interessante. Principalmente quando discordarmos.' },
  { id: 597, category: 'Provocadoras', text: 'Não sei se reparaste, mas eu gosto de te provocar. E tu gostas de ser provocada. Admite.' },
  { id: 598, category: 'Provocadoras', text: 'Tens aquele tipo de presença que me faz querer te desafiar só para te ver aceitar.' },
  { id: 599, category: 'Provocadoras', text: 'Acho que tu e eu vamos ter conversas interessantes. Principalmente as que não devíamos ter.' },

  // ── Tentação ──
  { id: 600, category: 'Tentação', text: 'Há qualquer coisa em ti que me faz querer parar de pensar e começar a sentir. E eu não sou de parar de pensar.' },
  { id: 601, category: 'Tentação', text: 'Acho que o problema de te conhecer é que eu não vou querer parar. E eu raramente paro.' },
  { id: 602, category: 'Tentação', text: 'Tens aquele tipo de presença que faz as pessoas quererem arriscar tudo. Eu estou a pensar.' },
  { id: 603, category: 'Tentação', text: 'Acho que tu és o tipo de pessoa que faz as pessoas esquecerem porque é que tinham regras. Eu esqueci.' },
  { id: 604, category: 'Tentação', text: 'Não sou de me perder em pensamentos, mas tu andas nos meus. E eu não me importo nada.' },
  { id: 605, category: 'Tentação', text: 'Tens aquele tipo de magnetismo que faz as pessoas quererem saber como é ao vivo. Eu quero saber.' },
  { id: 606, category: 'Tentação', text: 'Acho que o perigo de te conhecer não é te conhecer. É não querer parar de te conhecer.' },
  { id: 607, category: 'Tentação', text: 'Não sei se reparaste, mas há qualquer coisa em ti que me faz querer arriscar. E eu não sou de arriscar.' },
  { id: 608, category: 'Tentação', text: 'Tens aquele tipo de presença que faz as pessoas quererem sentir. E eu quero sentir.' },
  { id: 609, category: 'Tentação', text: 'Acho que tu és o tipo de pessoa que faz as pessoas quererem viver o momento. Eu quero viver.' },
];

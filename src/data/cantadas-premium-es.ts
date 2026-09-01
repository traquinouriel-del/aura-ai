import type { CantadaCategory } from './cantadas';

export type CantadaEntry = {
  id: number;
  category: CantadaCategory;
  text: string;
};

export const CANTADAS_PREMIUM_ES: CantadaEntry[] = [
  // ── Divertidas ──
  { id: 500, category: 'Divertidas', text: 'Mi Tinder me dijo que dejara de deslizar después de encontrarte. Le dije que lo pensaría.' },
  { id: 501, category: 'Divertidas', text: 'Acabo de decirle a mi grupo que encontré a alguien interesante. Están en shock. Yo también.' },
  { id: 502, category: 'Divertidas', text: 'Tienes esa energía que hace que un domingo por la noche parezca viernes. ¿Cómo lo haces?' },
  { id: 503, category: 'Divertidas', text: 'Estaba intentando ser productivo hoy, pero apareciste y ahora estoy intentando ser interesante.' },
  { id: 504, category: 'Divertidas', text: 'Mi mamá me dijo que buscara a alguien con futuro. Tienes futuro, ¿no? O al menos un plan.' },
  { id: 505, category: 'Divertidas', text: 'Si fueras una serie de Netflix, vería todos los episodios y me quejaría de que terminó muy pronto.' },
  { id: 506, category: 'Divertidas', text: 'Resulta que tienes el mismo nombre que mi ex. La diferencia es que me das ganas de seguir hablando.' },
  { id: 507, category: 'Divertidas', text: 'No suelo escribir a desconocidos, pero no pareces una desconocida. Pareces el inicio de algo bueno.' },
  { id: 508, category: 'Divertidas', text: 'Aviso: hablar conmigo puede causar risas inesperadas, planes improvisados y ganas de repetir.' },
  { id: 509, category: 'Divertidas', text: 'Mi algoritmo de "personas interesantes" te acaba de poner en primer lugar. No puedo cambiarlo.' },

  // ── Fofas ──
  { id: 510, category: 'Fofas', text: 'Hay algo en tu forma de escribir que me hace querer saber cómo suenas en persona.' },
  { id: 511, category: 'Fofas', text: 'No suelo mandar el primer "hola", pero contigo sentí que si no lo hacía, estaba perdiendo el tiempo.' },
  { id: 512, category: 'Fofas', text: 'Tu foto de perfil me hizo parar a mitad del scroll. Y no me gusta parar.' },
  { id: 513, category: 'Fofas', text: 'Tienes esa sonrisa que hace que la gente olvide lo que iba a decir. Me acaba de pasar.' },
  { id: 514, category: 'Fofas', text: 'Hay personas que entran en una habitación y cambian el ambiente. Tú entraste en mi feed y cambiaste mi humor.' },
  { id: 515, category: 'Fofas', text: 'Creo que tu sonrisa debería tener una advertencia: "puede causar mariposas y ganas de responder".' },
  { id: 516, category: 'Fofas', text: 'No sé qué te hace diferente, pero hay algo en ti que me hace querer descubrirlo todo.' },
  { id: 517, category: 'Fofas', text: 'Tu energía es como un café en una mañana fría — simplemente acierta en el lugar correcto.' },
  { id: 518, category: 'Fofas', text: 'Tienes esa presencia que hace que la gente sienta que puede ser ella misma. Yo lo siento.' },
  { id: 519, category: 'Fofas', text: 'Creo que el mundo necesita más personas como tú. Y yo necesito conocerte mejor.' },

  // ── Confiantes ──
  { id: 520, category: 'Confiantes', text: 'No busco a cualquiera. Busco a alguien que valga la pena. Tú pareces valerla.' },
  { id: 521, category: 'Confiantes', text: 'No suelo escribir primero, pero por ti hice una excepción. No lo hago por cualquiera.' },
  { id: 522, category: 'Confiantes', text: 'Creo que nos vamos a llevar bien. Y rara vez me equivoco en eso.' },
  { id: 523, category: 'Confiantes', text: 'No soy de perder el tiempo con rodeos. Te encontré interesante y quise decírtelo. Simple.' },
  { id: 524, category: 'Confiantes', text: 'Tienes todo para ser el tipo de persona con la que me gusta pasar el tiempo. Y soy selectivo.' },
  { id: 525, category: 'Confiantes', text: 'No estoy aquí por casualidad. Estoy porque vi algo en ti que me hizo querer empezar una conversación.' },
  { id: 526, category: 'Confiantes', text: 'Creo que la mejor conversación que he tenido hoy está por venir. Y la vas a tener conmigo.' },
  { id: 527, category: 'Confiantes', text: 'No necesito muchas razones para escribirte. Una bastó: te encontré diferente.' },
  { id: 528, category: 'Confiantes', text: 'No soy de decir "quizás". Digo "sí" y luego descubro si valió la pena.' },
  { id: 529, category: 'Confiantes', text: 'Creo que mereces a alguien que no tenga miedo de decirte lo que piensa. Yo no tengo ese miedo.' },

  // ── Criativas ──
  { id: 530, category: 'Criativas', text: 'Si la vida fuera una película, serías la escena que pausaría para mostrar a alguien y decir "¿viste esto?".' },
  { id: 531, category: 'Criativas', text: 'Si fueras una playlist, serías la que escucho en repetición y nunca envejece.' },
  { id: 532, category: 'Criativas', text: 'No soy escritor, pero creo que inspiras un capítulo que no sabía que existía.' },
  { id: 533, category: 'Criativas', text: 'Si fueras una estación, serías ese inicio de otoño que hace todo más bonito.' },
  { id: 534, category: 'Criativas', text: 'Tienes esa energía que convierte un martes por la tarde en algo que vale la pena recordar.' },
  { id: 535, category: 'Criativas', text: 'Si fueras un lugar, serías ese que no planeaba visitar pero se convirtió en mi favorito.' },
  { id: 536, category: 'Criativas', text: 'No soy artista, pero creo que eres el tipo de cosa que hace que la gente quiera crear.' },
  { id: 537, category: 'Criativas', text: 'Si fueras una palabra, serías "inolvidable". Y yo no olvido fácil.' },
  { id: 538, category: 'Criativas', text: 'Tienes esa presencia que hace que la gente quiera reinventarse. Incluyéndome.' },
  { id: 539, category: 'Criativas', text: 'Si fueras un momento, serías ese que guardaba en el móvil y mostraría a todos.' },

  // ── Inteligentes ──
  { id: 540, category: 'Inteligentes', text: 'La inteligencia es atractiva, pero tú conseguiste sumarle la sonrisa. Eso es trampa y me gustan las trampas.' },
  { id: 541, category: 'Inteligentes', text: 'No sé si lo notaste, pero las personas que hacen pensar son raras. Y tú no pasas desapercibida.' },
  { id: 542, category: 'Inteligentes', text: 'Creo que una buena conversación contigo vale más que mil mensajes vacíos. Empecemos con una.' },
  { id: 543, category: 'Inteligentes', text: 'Tienes esa inteligencia que no se mide por tests, sino por cómo haces pensar a la gente.' },
  { id: 544, category: 'Inteligentes', text: 'No me impresiono fácil, pero tu forma de pensar tiene algo que me hace querer escuchar más.' },
  { id: 545, category: 'Inteligentes', text: 'Creo que lo mejor de conocerte no es lo que dices, sino lo que me hace pensar después.' },
  { id: 546, category: 'Inteligentes', text: 'Tienes esa mente que hace que la gente quiera ser más inteligente solo para seguirte el ritmo.' },
  { id: 547, category: 'Inteligentes', text: 'No sé qué te hace diferente, pero creo que eso es lo que me hace querer descubrirlo todo.' },
  { id: 548, category: 'Inteligentes', text: 'Creo que personas como tú son raras. Y me gustan las cosas raras.' },
  { id: 549, category: 'Inteligentes', text: 'Tienes esa inteligencia que no se ve, se siente. Y yo la sentí.' },

  // ── Elogios ──
  { id: 550, category: 'Elogios', text: 'Tu sonrisa es una de esas cosas que no se olvidan. Y yo no la olvidé.' },
  { id: 551, category: 'Elogios', text: 'No sé si alguien te lo dijo hoy, pero estás increíble. Y no se lo digo a todos.' },
  { id: 552, category: 'Elogios', text: 'Tienes esa belleza que no necesita filtro. Es natural y me gustan las cosas naturales.' },
  { id: 553, category: 'Elogios', text: 'Creo que tu sonrisa debería ser patrimonio mundial. Es un tesoro que merece ser protegido.' },
  { id: 554, category: 'Elogios', text: 'No elogio por elogiar, pero tú lo mereces. Y mucho más de lo que puedo decir.' },
  { id: 555, category: 'Elogios', text: 'Tienes esa presencia que ilumina cualquier lugar. Incluyendo mi feed.' },
  { id: 556, category: 'Elogios', text: 'Creo que tu estilo es único. Y me gustan las cosas únicas.' },
  { id: 557, category: 'Elogios', text: 'No sé si lo notaste, pero tienes ese algo que no se explica. Y quiero descubrir qué es.' },
  { id: 558, category: 'Elogios', text: 'Tienes esa belleza que hace que la gente pare y mire. Yo paré.' },
  { id: 559, category: 'Elogios', text: 'Creo que tu mirada dice más que mil palabras. Y quiero escucharlas todas.' },

  // ── Elogios 2.0 ──
  { id: 560, category: 'Elogios 2.0', text: 'Tu feed es una galería de arte y me siento afortunado de tener entrada gratis.' },
  { id: 561, category: 'Elogios 2.0', text: 'No sé si eres consciente del impacto que tienes, pero es real. Y grande.' },
  { id: 562, category: 'Elogios 2.0', text: 'Tienes esa vibra que hace que la gente quiera ser parte de tu mundo.' },
  { id: 563, category: 'Elogios 2.0', text: 'Creo que tu estilo es el tipo de cosa que se estudia en la escuela de moda.' },
  { id: 564, category: 'Elogios 2.0', text: 'No suelo ver stories, pero las tuyas las veo todas. Y dos veces.' },
  { id: 565, category: 'Elogios 2.0', text: 'Tienes esa presencia digital que hace que la gente quiera conocer la versión real.' },
  { id: 566, category: 'Elogios 2.0', text: 'Creo que tu perfil es el tipo de lugar donde te quedas más tiempo del que planeabas.' },
  { id: 567, category: 'Elogios 2.0', text: 'No sé si lo notaste, pero eres el tipo de persona que hace que la gente quiera ser mejor.' },
  { id: 568, category: 'Elogios 2.0', text: 'Tienes esa energía que no cabe en una foto. Tiene que ser en vivo.' },
  { id: 569, category: 'Elogios 2.0', text: 'Creo que tu sonrisa es el tipo de cosa que debería hacerse viral. Lo hará.' },

  // ── Românticas ──
  { id: 570, category: 'Românticas', text: 'No sé si crees en el destino, pero creo que hoy trabajó a nuestro favor.' },
  { id: 571, category: 'Românticas', text: 'Tu voz tiene esa calma que hace que la gente sienta que todo está bien. Incluso cuando no lo está.' },
  { id: 572, category: 'Românticas', text: 'Tienes esa presencia que hace que la gente sienta que está en el lugar correcto. Yo lo siento.' },
  { id: 573, category: 'Românticas', text: 'Creo que tu sonrisa es el tipo de cosa que hace que la gente crea en los buenos días.' },
  { id: 574, category: 'Românticas', text: 'No me enamoro fácil, pero creo que eres una buena razón para empezar.' },
  { id: 575, category: 'Românticas', text: 'Tienes esa dulzura que hace que la gente sienta que vale la pena. Todo.' },
  { id: 576, category: 'Românticas', text: 'Creo que tu mirada es el tipo de cosa que hace que la gente quiera quedarse. Yo quiero.' },
  { id: 577, category: 'Românticas', text: 'No sé si lo notaste, pero hay algo en ti que me hace sentir bien. Y no lo siento fácil.' },
  { id: 578, category: 'Românticas', text: 'Tienes esa presencia que hace que la gente quiera quedarse más tiempo. Yo quiero.' },
  { id: 579, category: 'Românticas', text: 'Creo que tu sonrisa es el tipo de cosa que hace que la gente quiera ser la razón de ella. Yo quiero serlo.' },

  // ── Sedutoras ──
  { id: 580, category: 'Sedutoras', text: 'No sé qué estás pensando ahora, pero apuesto a que es tan interesante como tú.' },
  { id: 581, category: 'Sedutoras', text: 'Creo que el peligro de conocerte es que no voy a querer parar. Y rara vez paro.' },
  { id: 582, category: 'Sedutoras', text: 'Tienes esa presencia que hace que la gente quiera saber más. Mucho más.' },
  { id: 583, category: 'Sedutoras', text: 'Creo que tu sonrisa es el tipo de cosa que hace que la gente pierda el aliento. Yo lo perdí.' },
  { id: 584, category: 'Sedutoras', text: 'No me pierdo en pensamientos, pero tú estás en los míos. Y no me importa.' },
  { id: 585, category: 'Sedutoras', text: 'Tienes ese magnetismo que no se explica, se siente. Y yo lo siento.' },
  { id: 586, category: 'Sedutoras', text: 'Creo que tu mirada es el tipo de cosa que hace que la gente quiera ser vista por ti. Yo quiero.' },
  { id: 587, category: 'Sedutoras', text: 'No sé si lo notaste, pero eres el tipo de persona que hace que la gente quiera arriesgarlo todo. Yo lo estoy arriesgando.' },
  { id: 588, category: 'Sedutoras', text: 'Tienes esa presencia que hace que la gente sienta que está viviendo algo único. Yo lo siento.' },
  { id: 589, category: 'Sedutoras', text: 'Creo que tu sonrisa es el tipo de cosa que hace que la gente quiera ser la razón de ella. Yo quiero serlo.' },

  // ── Provocadoras ──
  { id: 590, category: 'Provocadoras', text: 'Creo que te gustan los desafíos. Y a mí me gusta desafiarte. Veamos quién gana.' },
  { id: 591, category: 'Provocadoras', text: 'No sé si puedes conmigo. Pero puedes intentarlo. Me gustan los intentos.' },
  { id: 592, category: 'Provocadoras', text: 'Tienes esa energía que me hace querer provocarte solo para ver cómo reaccionas.' },
  { id: 593, category: 'Provocadoras', text: 'Creo que eres el tipo de persona que gusta de tener el control. Yo también. Veamos.' },
  { id: 594, category: 'Provocadoras', text: 'No me intimido fácil, pero tienes algo que me hace querer jugar.' },
  { id: 595, category: 'Provocadoras', text: 'Tienes esa confianza que me hace querer probar los límites. Los tuyos y los míos.' },
  { id: 596, category: 'Provocadoras', text: 'Creo que nuestra conversación va a ser interesante. Especialmente cuando no estemos de acuerdo.' },
  { id: 597, category: 'Provocadoras', text: 'No sé si lo notaste, pero me gusta provocarte. Y te gusta que te provoquen. Admítelo.' },
  { id: 598, category: 'Provocadoras', text: 'Tienes esa presencia que me hace querer desafiarte solo para verte aceptar.' },
  { id: 599, category: 'Provocadoras', text: 'Creo que tú y yo vamos a tener conversaciones interesantes. Especialmente las que no deberíamos tener.' },

  // ── Tentação ──
  { id: 600, category: 'Tentação', text: 'Hay algo en ti que me hace querer dejar de pensar y empezar a sentir. Y no dejo de pensar.' },
  { id: 601, category: 'Tentação', text: 'Creo que el problema de conocerte es que no voy a querer parar. Y rara vez paro.' },
  { id: 602, category: 'Tentação', text: 'Tienes esa presencia que hace que la gente quiera arriesgarlo todo. Lo estoy pensando.' },
  { id: 603, category: 'Tentação', text: 'Creo que eres el tipo de persona que hace que la gente olvide por qué tenía reglas. Yo las olvidé.' },
  { id: 604, category: 'Tentação', text: 'No me pierdo en pensamientos, pero tú estás en los míos. Y no me importa nada.' },
  { id: 605, category: 'Tentação', text: 'Tienes ese magnetismo que hace que la gente quiera saber cómo es en vivo. Yo quiero saber.' },
  { id: 606, category: 'Tentação', text: 'Creo que el peligro de conocerte no es conocerte. Es no querer dejar de conocerte.' },
  { id: 607, category: 'Tentação', text: 'No sé si lo notaste, pero hay algo en ti que me hace querer arriesgarme. Y no soy de arriesgar.' },
  { id: 608, category: 'Tentação', text: 'Tienes esa presencia que hace que la gente quiera sentir. Y yo quiero sentir.' },
  { id: 609, category: 'Tentação', text: 'Creo que eres el tipo de persona que hace que la gente quiera vivir el momento. Yo quiero vivir.' },
];

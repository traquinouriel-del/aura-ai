import type { CantadaCategory } from './cantadas';

export type CantadaEntry = {
  id: number;
  category: CantadaCategory;
  text: string;
};

export const CANTADAS_PREMIUM_EN: CantadaEntry[] = [
  // ── Divertidas ──
  { id: 500, category: 'Divertidas', text: 'My Tinder told me to stop swiping after I found you. I told it I\'d think about it.' },
  { id: 501, category: 'Divertidas', text: 'I just told my group chat I found someone interesting. They\'re in shock. So am I.' },
  { id: 502, category: 'Divertidas', text: 'You have that kind of energy that makes a Sunday night feel like Friday. How do you do that?' },
  { id: 503, category: 'Divertidas', text: 'I was trying to be productive today, but then you showed up and now I\'m trying to be interesting.' },
  { id: 504, category: 'Divertidas', text: 'My mom told me to find someone with a future. You have a future, right? Or at least a plan?' },
  { id: 505, category: 'Divertidas', text: 'If you were a Netflix series, I\'d binge every episode and complain it ended too soon.' },
  { id: 506, category: 'Divertidas', text: 'Turns out you have the same name as my ex. The difference is you make me want to keep talking.' },
  { id: 507, category: 'Divertidas', text: 'I don\'t usually text strangers, but you don\'t feel like a stranger. You feel like the start of something good.' },
  { id: 508, category: 'Divertidas', text: 'Warning: talking to me may cause unexpected laughter, improvised plans, and the urge to do it again.' },
  { id: 509, category: 'Divertidas', text: 'My "interesting people" algorithm just ranked you first. I can\'t change it.' },

  // ── Fofas ──
  { id: 510, category: 'Fofas', text: 'There\'s something about the way you write that makes me want to know how you sound in person.' },
  { id: 511, category: 'Fofas', text: 'I don\'t usually send the first "hey", but with you I felt like if I didn\'t, I\'d be wasting time.' },
  { id: 512, category: 'Fofas', text: 'Your profile picture made me stop mid-scroll. And I don\'t even like stopping.' },
  { id: 513, category: 'Fofas', text: 'You have that kind of smile that makes people forget what they were going to say. Just happened to me.' },
  { id: 514, category: 'Fofas', text: 'Some people walk into a room and change the vibe. You walked into my feed and changed my mood.' },
  { id: 515, category: 'Fofas', text: 'I think your smile should come with a warning: "may cause butterflies and the urge to text back".' },
  { id: 516, category: 'Fofas', text: 'I don\'t know what makes you different, but there\'s something about you that makes me want to find out everything.' },
  { id: 517, category: 'Fofas', text: 'Your energy is like a coffee on a cold morning — it just hits the right spot.' },
  { id: 518, category: 'Fofas', text: 'You have that kind of presence that makes people feel like they can be themselves. I feel that.' },
  { id: 519, category: 'Fofas', text: 'I think the world needs more people like you. And I need to get to know you better.' },

  // ── Confiantes ──
  { id: 520, category: 'Confiantes', text: 'I\'m not looking for just anyone. I\'m looking for someone worth it. You seem worth it.' },
  { id: 521, category: 'Confiantes', text: 'I don\'t usually text first, but for you I made an exception. I don\'t do that for just anyone.' },
  { id: 522, category: 'Confiantes', text: 'I think we\'re going to get along. And I\'m rarely wrong about that.' },
  { id: 523, category: 'Confiantes', text: 'I\'m not the type to waste time with roundabouts. I found you interesting and wanted to tell you. Simple.' },
  { id: 524, category: 'Confiantes', text: 'You have everything to be the kind of person I like spending time with. And I\'m picky.' },
  { id: 525, category: 'Confiantes', text: 'I\'m not here by chance. I\'m here because I saw something in you that made me want to start a conversation.' },
  { id: 526, category: 'Confiantes', text: 'I think the best conversation I\'ve had today is still ahead. And you\'re going to have it with me.' },
  { id: 527, category: 'Confiantes', text: 'I don\'t need many reasons to text you. One was enough: I found you different.' },
  { id: 528, category: 'Confiantes', text: 'I\'m not the type to say "maybe". I say "yes" and then find out if it was worth it.' },
  { id: 529, category: 'Confiantes', text: 'I think you deserve someone who isn\'t afraid to tell you what they think. I\'m not afraid.' },

  // ── Criativas ──
  { id: 530, category: 'Criativas', text: 'If life were a movie, you\'d be the scene I\'d pause to show someone and say "see this?".' },
  { id: 531, category: 'Criativas', text: 'If you were a playlist, you\'d be the one I play on repeat and never gets old.' },
  { id: 532, category: 'Criativas', text: 'I\'m not a writer, but I think you inspire a chapter I didn\'t know existed.' },
  { id: 533, category: 'Criativas', text: 'If you were a season, you\'d be that early fall that makes everything look more beautiful.' },
  { id: 534, category: 'Criativas', text: 'You have that kind of energy that turns a Tuesday afternoon into something worth remembering.' },
  { id: 535, category: 'Criativas', text: 'If you were a place, you\'d be the one I didn\'t plan to visit but became my favorite.' },
  { id: 536, category: 'Criativas', text: 'I\'m not an artist, but I think you\'re the kind of thing that makes people want to create.' },
  { id: 537, category: 'Criativas', text: 'If you were a word, you\'d be "unforgettable". And I don\'t forget easily.' },
  { id: 538, category: 'Criativas', text: 'You have that kind of presence that makes people want to reinvent themselves. Including me.' },
  { id: 539, category: 'Criativas', text: 'If you were a moment, you\'d be the one I\'d save on my phone and show everyone.' },

  // ── Inteligentes ──
  { id: 540, category: 'Inteligentes', text: 'Intelligence is attractive, but you managed to pair it with a smile. That\'s cheating, and I like cheats.' },
  { id: 541, category: 'Inteligentes', text: 'I don\'t know if you noticed, but people who make you think are rare. And you don\'t go unnoticed.' },
  { id: 542, category: 'Inteligentes', text: 'I think one good conversation with you is worth more than a thousand empty messages. Let\'s start with one.' },
  { id: 543, category: 'Inteligentes', text: 'You have that kind of intelligence that isn\'t measured by tests, but by how you make people think.' },
  { id: 544, category: 'Inteligentes', text: 'I\'m not easily impressed, but your way of thinking has something that makes me want to hear more.' },
  { id: 545, category: 'Inteligentes', text: 'I think the best thing about meeting you isn\'t what you say, but what you make me think after.' },
  { id: 546, category: 'Inteligentes', text: 'You have that kind of mind that makes people want to be smarter just to keep up with you.' },
  { id: 547, category: 'Inteligentes', text: 'I don\'t know what makes you different, but I think that\'s what makes me want to find out everything.' },
  { id: 548, category: 'Inteligentes', text: 'I think people like you are rare. And I like rare things.' },
  { id: 549, category: 'Inteligentes', text: 'You have that kind of intelligence that isn\'t seen, it\'s felt. And I felt it.' },

  // ── Elogios ──
  { id: 550, category: 'Elogios', text: 'Your smile is one of those things you don\'t forget. And I didn\'t.' },
  { id: 551, category: 'Elogios', text: 'I don\'t know if anyone told you today, but you look amazing. And I don\'t say that to everyone.' },
  { id: 552, category: 'Elogios', text: 'You have that kind of beauty that doesn\'t need a filter. It\'s natural, and I like natural things.' },
  { id: 553, category: 'Elogios', text: 'I think your smile should be a world heritage site. It\'s a treasure worth protecting.' },
  { id: 554, category: 'Elogios', text: 'I don\'t compliment for the sake of it, but you deserve it. And much more than I can say.' },
  { id: 555, category: 'Elogios', text: 'You have that kind of presence that lights up any place. Including my feed.' },
  { id: 556, category: 'Elogios', text: 'I think your style is unique. And I like unique things.' },
  { id: 557, category: 'Elogios', text: 'I don\'t know if you noticed, but you have that something that can\'t be explained. And I want to find out what it is.' },
  { id: 558, category: 'Elogios', text: 'You have that kind of beauty that makes people stop and look. I stopped.' },
  { id: 559, category: 'Elogios', text: 'I think your eyes say more than a thousand words. And I want to hear all of them.' },

  // ── Elogios 2.0 ──
  { id: 560, category: 'Elogios 2.0', text: 'Your feed is an art gallery and I feel lucky to have free entry.' },
  { id: 561, category: 'Elogios 2.0', text: 'I don\'t know if you\'re aware of the impact you have, but it\'s real. And it\'s big.' },
  { id: 562, category: 'Elogios 2.0', text: 'You have that kind of vibe that makes people want to be part of your world.' },
  { id: 563, category: 'Elogios 2.0', text: 'I think your style is the kind of thing they study in fashion school.' },
  { id: 564, category: 'Elogios 2.0', text: 'I don\'t usually watch stories, but yours I watch all of them. And twice.' },
  { id: 565, category: 'Elogios 2.0', text: 'You have that kind of digital presence that makes people want to meet the real version.' },
  { id: 566, category: 'Elogios 2.0', text: 'I think your profile is the kind of place where you stay longer than you planned.' },
  { id: 567, category: 'Elogios 2.0', text: 'I don\'t know if you noticed, but you\'re the kind of person who makes people want to be better versions of themselves.' },
  { id: 568, category: 'Elogios 2.0', text: 'You have that kind of energy that doesn\'t fit in a photo. It has to be live.' },
  { id: 569, category: 'Elogios 2.0', text: 'I think your smile is the kind of thing that should go viral. It will.' },

  // ── Românticas ──
  { id: 570, category: 'Românticas', text: 'I don\'t know if you believe in destiny, but I think today it worked in our favor.' },
  { id: 571, category: 'Românticas', text: 'Your voice has that kind of calm that makes people feel like everything is okay. Even when it\'s not.' },
  { id: 572, category: 'Românticas', text: 'You have that kind of presence that makes people feel like they\'re in the right place. I feel that.' },
  { id: 573, category: 'Românticas', text: 'I think your smile is the kind of thing that makes people believe in good days.' },
  { id: 574, category: 'Românticas', text: 'I don\'t fall in love easily, but I think you\'re a good reason to start.' },
  { id: 575, category: 'Românticas', text: 'You have that kind of sweetness that makes people feel it\'s worth it. Everything.' },
  { id: 576, category: 'Românticas', text: 'I think your eyes are the kind of thing that makes people want to stay. I want to.' },
  { id: 577, category: 'Românticas', text: 'I don\'t know if you noticed, but there\'s something about you that makes me feel good. And I don\'t feel that easily.' },
  { id: 578, category: 'Românticas', text: 'You have that kind of presence that makes people want to stay longer. I want to.' },
  { id: 579, category: 'Românticas', text: 'I think your smile is the kind of thing that makes people want to be the reason for it. I want to be.' },

  // ── Sedutoras ──
  { id: 580, category: 'Sedutoras', text: 'I don\'t know what you\'re thinking right now, but I bet it\'s as interesting as you.' },
  { id: 581, category: 'Sedutoras', text: 'I think the danger of meeting you is that I won\'t want to stop. And I rarely stop.' },
  { id: 582, category: 'Sedutoras', text: 'You have that kind of presence that makes people want to know more. Much more.' },
  { id: 583, category: 'Sedutoras', text: 'I think your smile is the kind of thing that makes people lose their breath. I did.' },
  { id: 584, category: 'Sedutoras', text: 'I don\'t get lost in thoughts, but you\'re in mine. And I don\'t mind.' },
  { id: 585, category: 'Sedutoras', text: 'You have that kind of magnetism that can\'t be explained, it\'s felt. And I feel it.' },
  { id: 586, category: 'Sedutoras', text: 'I think your eyes are the kind of thing that makes people want to be seen by you. I want to.' },
  { id: 587, category: 'Sedutoras', text: 'I don\'t know if you noticed, but you\'re the kind of person who makes people want to risk everything. I\'m risking it.' },
  { id: 588, category: 'Sedutoras', text: 'You have that kind of presence that makes people feel like they\'re living something unique. I feel it.' },
  { id: 589, category: 'Sedutoras', text: 'I think your smile is the kind of thing that makes people want to be the reason for it. I want to be.' },

  // ── Provocadoras ──
  { id: 590, category: 'Provocadoras', text: 'I think you like challenges. And I like challenging you. Let\'s see who wins.' },
  { id: 591, category: 'Provocadoras', text: 'I don\'t know if you can handle me. But you can try. I like attempts.' },
  { id: 592, category: 'Provocadoras', text: 'You have that kind of energy that makes me want to provoke you just to see how you react.' },
  { id: 593, category: 'Provocadoras', text: 'I think you\'re the kind of person who likes to be in control. Me too. Let\'s see.' },
  { id: 594, category: 'Provocadoras', text: 'I don\'t get intimidated easily, but you have something that makes me want to play.' },
  { id: 595, category: 'Provocadoras', text: 'You have that kind of confidence that makes me want to test the limits. Yours and mine.' },
  { id: 596, category: 'Provocadoras', text: 'I think our conversation is going to be interesting. Especially when we disagree.' },
  { id: 597, category: 'Provocadoras', text: 'I don\'t know if you noticed, but I like provoking you. And you like being provoked. Admit it.' },
  { id: 598, category: 'Provocadoras', text: 'You have that kind of presence that makes me want to challenge you just to see you accept.' },
  { id: 599, category: 'Provocadoras', text: 'I think you and I are going to have interesting conversations. Especially the ones we shouldn\'t have.' },

  // ── Tentação ──
  { id: 600, category: 'Tentação', text: 'There\'s something about you that makes me want to stop thinking and start feeling. And I don\'t stop thinking.' },
  { id: 601, category: 'Tentação', text: 'I think the problem with meeting you is that I won\'t want to stop. And I rarely stop.' },
  { id: 602, category: 'Tentação', text: 'You have that kind of presence that makes people want to risk everything. I\'m thinking about it.' },
  { id: 603, category: 'Tentação', text: 'I think you\'re the kind of person who makes people forget why they had rules. I forgot.' },
  { id: 604, category: 'Tentação', text: 'I don\'t get lost in thoughts, but you\'re in mine. And I don\'t mind at all.' },
  { id: 605, category: 'Tentação', text: 'You have that kind of magnetism that makes people want to know what it\'s like in person. I want to know.' },
  { id: 606, category: 'Tentação', text: 'I think the danger of meeting you isn\'t meeting you. It\'s not wanting to stop meeting you.' },
  { id: 607, category: 'Tentação', text: 'I don\'t know if you noticed, but there\'s something about you that makes me want to take risks. And I don\'t take risks.' },
  { id: 608, category: 'Tentação', text: 'You have that kind of presence that makes people want to feel. And I want to feel.' },
  { id: 609, category: 'Tentação', text: 'I think you\'re the kind of person who makes people want to live the moment. I want to live.' },
];

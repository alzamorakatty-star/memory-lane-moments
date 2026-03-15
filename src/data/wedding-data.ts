export const translations = {
  es: {
    title: "Ha pasado…",
    subtitle: "Gracias por acompañarnos",
    counterLabel: "desde el 7 de febrero de 2026",
    thanksMessage: [
      "Hace un mes pasamos un día inolvidable junto a ustedes.",
      "Los recuerdos quedaron en nuestras memorias, en nuestros cuerpos y, por supuesto, en las fotografías y videos que logramos capturar.",
      "Gracias por darla toda: por su puntualidad, por su atenta compañía y por sus pintas espectaculares; por sus lágrimas durante la ceremonia; por brindar con nosotros y comer sabroso; por su felicidad y sus carcajadas; por meterse su cule pea', por sus pasos de baile y sus gritos; por despeinarse y descalzarse; por no dejarla caer; por brincar por el ramo; y por ser capitanes y capitanas de la noche.",
      "Gracias también por todos sus regalos, gestos y aportes tan significativos. Cada uno de ellos nos acompañará en la vida que estamos construyendo juntos. Pensaremos en ustedes mientras preparemos batidos deliciosos o tomemos un café espectacular; mientras veamos nuestra foto favorita en ese portarretrato; mientras usemos cada objeto que escogieron para nuestro hogar o disfrutemos de lo que hicieron posible con tanto cariño.",
      "Sentimos en cada detalle el amor, la generosidad y el deseo de vernos felices. Y eso lo llevaremos en nuestros recuerdos, pero sobre todo en nuestros corazones.",
      "Disfruten estos recuerdos tanto como nosotros. Recuerden esa noche con cariño, y ojalá en unos años tengamos la maravillosa oportunidad de compartir otra noche…",
    ],
    days: "días",
    hours: "horas",
    minutes: "minutos",
    galleryTitle: "Nuestros recuerdos",
    likes: "Me gusta",
    comments: "Comentarios",
    download: "Descargar",
    namePlaceholder: "Tu nombre",
    messagePlaceholder: "Escribe un comentario bonito",
    send: "Enviar comentario",
    providersButton: "✨ El equipo que hizo posible nuestra noche",
    providersIntro:
      "Les dejamos una lista del equipazo que nos acompañó, personas maravillosas que, desde su talento y dedicación, hicieron posible que viviéramos este día mejor de lo que lo planeamos.",
    close: "Cerrar",
    noComments: "Aún no hay comentarios en esta foto.",
    withLove: "Con cariño,",
    signatures: "Katty & Christian.",
    footerSignature: "Katty & Christian.",
  },
  en: {
    title: "It has been…",
    subtitle: "Thank you for being with us",
    counterLabel: "since February 7, 2026",
    thanksMessage: [
      "A month ago, we shared an unforgettable day with all of you.",
      "The memories stayed in our minds, in our bodies, and of course, in the photographs and videos we were able to capture.",
      "Thank you for giving it your all: for your punctuality, your loving company, and your spectacular outfits; for your tears during the ceremony; for toasting with us and enjoying delicious food; for your happiness and laughter; for bringing all your energy, your dance moves and your cheers; for getting messy and taking your shoes off; for keeping the party alive; for jumping for the bouquet; and for being the captains of the night.",
      "Thank you as well for every gift, gesture, and meaningful contribution. Each one of them will stay with us in the life we are building together. We will think of you while making delicious smoothies or enjoying an amazing cup of coffee; while looking at our favorite photo in that frame; while using every object you chose for our home or enjoying what you made possible with so much love.",
      "We felt in every detail the love, generosity, and desire to see us happy. And we will carry that in our memories, but above all in our hearts.",
      "Enjoy these memories as much as we do. Remember that night with love, and hopefully in a few years we will have the wonderful chance to share another night together…",
    ],
    days: "days",
    hours: "hours",
    minutes: "minutes",
    galleryTitle: "Our memories",
    likes: "Like",
    comments: "Comments",
    download: "Download",
    namePlaceholder: "Your name",
    messagePlaceholder: "Write a lovely comment",
    send: "Send comment",
    providersButton: "✨ The team that made our night possible",
    providersIntro:
      "We want to share the wonderful team that accompanied us and made this day even better than we imagined.",
    close: "Close",
    noComments: "There are no comments on this photo yet.",
    withLove: "With love,",
    signatures: "Katty & Christian.",
    footerSignature: "Katty & Christian.",
  },
} as const;

export type Language = "es" | "en";
export type Translations = {
  title: string;
  subtitle: string;
  counterLabel: string;
  thanksMessage: readonly string[];
  days: string;
  hours: string;
  minutes: string;
  galleryTitle: string;
  likes: string;
  comments: string;
  download: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  send: string;
  providersButton: string;
  providersIntro: string;
  close: string;
  noComments: string;
  withLove: string;
  signatures: string;
  footerSignature: string;
};

export const providers = [
  { category: "📋 Planeación y coordinación", name: "Laura Maiguel Events", url: "https://www.instagram.com/lauramaiguelevents?igsh=MWlybms3eHczcHpjaA==" },
  { category: "📍 Lugar", name: "Casa Santacoa", url: "https://www.instagram.com/casa_santacoa?igsh=MXNvam9jazd0aXNtdw==" },
  { category: "🌿 Decoración", name: "Célebrer Events", url: "https://www.instagram.com/celebrer.events?igsh=MWs5NHJ0bnUzNHNjMg==" },
  { category: "🕊️ Ceremonia", name: "Magic Flow Yoga", url: "https://www.instagram.com/magicflowyoga?igsh=MXZtbDBjZXYyNW5nMA==" },
  { category: "📷 Fotografía y video", name: "Periscopio", url: "https://www.instagram.com/periscopioco?igsh=MWw2MDQyb3J4aGx4OA==" },
  { category: "🎶 Música", name: "Nolan Orquesta", url: "https://www.instagram.com/nolanorquesta?igsh=cjBtbDFkeTkzazR0" },
  { category: "💄 Estilismo de los novios", name: "Cepeda – Makeup Artist", url: "https://www.instagram.com/cepeda_la_artistamakeup?igsh=MWt3aTJ3a2VpdXNlNw==" },
  { category: "💄 Estilismo de los novios", name: "Charo Nails", url: "https://www.instagram.com/charonails?igsh=enEwdjR4ajlub2Rn" },
  { category: "💄 Estilismo de los novios", name: "Good Look Colombia", url: "https://www.instagram.com/goodlookcolombia?igsh=YWlyZzY4cDVzbGxq" },
  { category: "🍽️ Comida", name: "Cóctel, plato fuerte y fritos – Varú Bistro Catering", url: "https://www.instagram.com/varubistrocatering?igsh=MXVsMmozdHN1aGlieg==" },
  { category: "🍰 Postres", name: "Carol Homemade", url: "https://www.instagram.com/carolhomemade?igsh=MjFyMGJ0cmIzOWdn" },
  { category: "🕯️ Aromas y detalles en los baños", name: "Difusores, cremas y jabones líquidos – Baumbé", url: "https://www.instagram.com/baum_be?igsh=eHd4dnh0Z3A0bDF1" },
];

export type Photo = {
  id: number;
  url: string;
  download_url?: string;
  alt?: string;
};

export type CommentItem = {
  id: number;
  photo_id: number;
  name: string;
  message: string;
  created_at: string;
};

// Demo photos using picsum for placeholder
export const photos: Photo[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/seed/wedding${i + 1}/800/600`,
  download_url: `https://picsum.photos/seed/wedding${i + 1}/1600/1200`,
  alt: `Photo ${i + 1}`,
}));

export const API_BASE = "http://localhost:8000";

export const WEDDING_DATE = new Date("2026-02-07T00:00:00");

export function getElapsedTime(fromDate: Date) {
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - fromDate.getTime());
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

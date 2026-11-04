export interface CampaignAsset {
  id: string;
  format: 'square' | 'macro' | 'wide' | 'vertical';
  title: string;
  aspectRatio: string;
  dimensions: string;
  imageSrc: string;
  description: string;
  compositionNotes: string;
}

export const CAMPAIGN_ASSETS: CampaignAsset[] = [
  {
    id: 'primary-square',
    format: 'square',
    title: 'Primary Campaign Artwork (Square 1080×1080)',
    aspectRatio: '1:1',
    dimensions: '1080 × 1080 px',
    imageSrc: '/src/assets/images/future_city_child_1793814246689.jpg',
    description: 'Hero master visual featuring a 10-year-old Egyptian boy placing the translucent keystone block onto an intricate miniature futuristic smart city.',
    compositionNotes: 'Child positioned right of center; extensive charcoal negative space in upper-left reserved for Arabic typography; uncluttered lower margin.',
  },
  {
    id: 'macro-square',
    format: 'macro',
    title: 'Macro Keystone Detail (Square 1080×1080)',
    aspectRatio: '1:1',
    dimensions: '1080 × 1080 px',
    imageSrc: '/src/assets/images/city_block_macro_1793814248749.jpg',
    description: 'Macro focus on the child’s hands placing the luminous pinnacle module where wooden blocks transition into smart towers.',
    compositionNotes: 'Hyper-focused depth of field, dramatic edge lighting, tactile material metamorphism.',
  },
  {
    id: 'wide-landscape',
    format: 'wide',
    title: 'Digital Billboard & Web Hero (Landscape 16:9)',
    aspectRatio: '16:9',
    dimensions: '1920 × 1080 px',
    imageSrc: '/src/assets/images/future_city_wide_1793814250149.jpg',
    description: 'Panoramic composition showing the full scope of the miniature metropolis with sprawling table reflections and vast left negative space.',
    compositionNotes: 'Ideal for widescreen display, digital outdoor LED displays, and website heroes.',
  },
  {
    id: 'editorial-vertical',
    format: 'vertical',
    title: 'Editorial Poster & Story (Vertical 3:4)',
    aspectRatio: '3:4',
    dimensions: '1080 × 1440 px',
    imageSrc: '/src/assets/images/future_city_vertical_1793814250799.jpg',
    description: 'Vertical editorial framing highlighting the verticality of the futuristic city towers and the child’s attentive gaze from above.',
    compositionNotes: 'Perfect for vertical print posters, museum banners, and high-impact social stories.',
  },
];

export const CAMPAIGN_COLORS = [
  {
    name: 'Sophisticated Charcoal',
    hex: '#242A38',
    role: 'Primary Studio Background & Canvas (60%)',
    description: 'Muted, non-distracting dark tone providing deep contrast and cinematic atmosphere without harsh pitch-black clipping.',
  },
  {
    name: 'Controlled Technology Blue',
    hex: '#1D75BC',
    role: 'Directional Key & Atmospheric Lighting (30%)',
    description: 'Precision cool cyan-blue key light accentuating futuristic architectural facets and creating technological authority.',
  },
  {
    name: 'Human Curiosity Orange',
    hex: '#F7941D',
    role: 'Subtle Edge & Rim Highlights (10%)',
    description: 'Warm specular highlight along the child’s hand, facial contours, and table edge, symbolizing human creativity and warmth.',
  },
  {
    name: 'Metropolis Architectural Silver',
    hex: '#E2E8F0',
    role: 'Micro-Structure Reflectance',
    description: 'High-clarity specular surface on miniature skyscraper facades, sky-bridges, and smart building envelopes.',
  },
  {
    name: 'Authentic Bronze Skin Tone',
    hex: '#C48B5D',
    role: 'Subject Realism & Warmth',
    description: 'Authentic olive-bronze Egyptian child skin tone rendered with realistic subsurface scattering and zero artificial waxiness.',
  },
];

export const CAMPAIGN_COPY = {
  arabic: {
    headline: 'المستقبل قيد البناء',
    tagline: 'نصنع مهندسي ومبتكري الغد في البرمجة والذكاء الاصطناعي',
    ageRange: 'للأطفال والناشئين من سن ٨ إلى ١٦ سنة',
    features: [
      'أساسيات لغة بايثون وتفكير الخوارزميات',
      'بناء وتدريب نماذج الذكاء الاصطناعي التوليدي',
      'هندسة المدن الذكية وتطبيقات إنترنت الأشياء',
      'تطبيق عملي: مشاريع واقعية من اليوم الأول',
    ],
    cta: 'احجز تقييم مستوى طفلك المجاني الآن',
    footerInfo: 'دورات معتمدة دولياً · بإشراف نخبة من مهندسي البرمجيات · القاهرة والإسكندرية وعبر الإنترنت',
  },
  english: {
    headline: 'THE FUTURE IS UNDER CONSTRUCTION',
    tagline: 'Empowering Young Minds to Architect Tomorrow with Code & Artificial Intelligence',
    ageRange: 'For Innovators Aged 8–16',
    features: [
      'Python & Algorithmic Problem Solving',
      'Generative AI & Machine Learning Foundations',
      'Smart Cities, Robotics & Connected Systems',
      'Real-world portfolio projects built by students',
    ],
    cta: 'Reserve Your Child’s Spot for the Upcoming Cohort',
    footerInfo: 'Internationally Accredited Curriculum · Cairo, Alexandria & Global Live Online',
  },
};

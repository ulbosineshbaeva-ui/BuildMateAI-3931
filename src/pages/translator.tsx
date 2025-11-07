import { useState } from 'react';
import { Search, Languages, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TranslationResult {
  term: string;
  uz: { word: string; simple: string; technical: string };
  ru: { word: string; simple: string; technical: string };
  en: { word: string; simple: string; technical: string };
}

const constructionTerms: TranslationResult[] = [
  {
    term: 'foundation',
    uz: {
      word: 'Poydevor / Asos',
      simple: 'Binoning yer ostidagi qismi, barcha og\'irlikni ko\'tarib turadi',
      technical: 'Binoning yuk ko\'taruvchi konstruksiyasining quyi qismi, yerga bosimni taqsimlaydi. Tayanch, yostiqli va qoziqli turlarga bo\'linadi.'
    },
    ru: {
      word: 'Фундамент',
      simple: 'Подземная часть здания, которая держит весь вес',
      technical: 'Нижняя несущая часть здания, передающая нагрузку на грунт. Бывает ленточный, плитный и свайный.'
    },
    en: {
      word: 'Foundation',
      simple: 'Underground part of building that holds all weight',
      technical: 'Lower load-bearing structure transferring loads to soil. Types: strip, raft, and pile foundations.'
    }
  },
  {
    term: 'rebar',
    uz: {
      word: 'Armatura / O\'t',
      simple: 'Beton ichiga qo\'yiladigan temir novda, betonni mustahkamlaydi',
      technical: 'Beton konstruksiyalarni kuchaytirishda ishlatiladigan po\'lat sterjenlar. GOST 5781-82 bo\'yicha A-I, A-II, A-III sinflariga bo\'linadi.'
    },
    ru: {
      word: 'Арматура',
      simple: 'Металлические прутья, которые кладут в бетон для прочности',
      technical: 'Стальные стержни для армирования бетонных конструкций. Классы A-I, A-II, A-III по ГОСТ 5781-82.'
    },
    en: {
      word: 'Rebar / Reinforcement',
      simple: 'Metal rods placed in concrete for strength',
      technical: 'Steel bars for reinforcing concrete structures. Classes A-I, A-II, A-III per GOST 5781-82.'
    }
  },
  {
    term: 'concrete',
    uz: {
      word: 'Beton',
      simple: 'Tsement, qum va shag\'aldan tayyorlanadigan qurilish materiali',
      technical: 'Bog\'lovchi, to\'ldiruvchi va suv aralashmasidan tayyorlanadigan sun\'iy tosh material. Mustahkamlik sinfiga ko\'ra M100-M500 gacha bo\'ladi.'
    },
    ru: {
      word: 'Бетон',
      simple: 'Строительный материал из цемента, песка и щебня',
      technical: 'Искусственный каменный материал из вяжущего, заполнителей и воды. По прочности классы от М100 до М500.'
    },
    en: {
      word: 'Concrete',
      simple: 'Construction material made from cement, sand and gravel',
      technical: 'Artificial stone material from binder, aggregates and water. Strength grades M100-M500.'
    }
  },
  {
    term: 'brick',
    uz: {
      word: 'G\'isht',
      simple: 'Loydan yoqilgan yoki tsementdan yasalgan qurilish bloki',
      technical: 'Sopol, silikali yoki giperpreselangan turlari mavjud. Standart o\'lchami 250×120×65 mm. M75-M300 markali.'
    },
    ru: {
      word: 'Кирпич',
      simple: 'Строительный блок из обожженной глины или цемента',
      technical: 'Керамический, силикатный или гиперпрессованный. Стандартный размер 250×120×65 мм. Марки М75-М300.'
    },
    en: {
      word: 'Brick',
      simple: 'Building block made from fired clay or cement',
      technical: 'Ceramic, silicate or hyper-pressed types. Standard size 250×120×65 mm. Grades M75-M300.'
    }
  },
  {
    term: 'mortar',
    uz: {
      word: 'Eritma / G\'olovka',
      simple: 'G\'isht yoki blok o\'rtasiga suriladigan tsement-qum aralashmasi',
      technical: 'Qurilish elementlarini bog\'lash va sirt ishlarida ishlatiladigan plastik aralashma. Markasi M50-M200.'
    },
    ru: {
      word: 'Раствор',
      simple: 'Смесь цемента и песка для кладки кирпича',
      technical: 'Пластичная смесь для связывания строительных элементов и отделочных работ. Марки М50-М200.'
    },
    en: {
      word: 'Mortar',
      simple: 'Cement-sand mix for laying bricks',
      technical: 'Plastic mixture for bonding construction elements and finishing work. Grades M50-M200.'
    }
  },
  {
    term: 'plaster',
    uz: {
      word: 'Suvat / Gips',
      simple: 'Devorni tekislash uchun surtiladi gan qatlam',
      technical: 'Tsement, ohak yoki gips asosida tayyorlanadigan tekislash qoplami. Qalinligi 10-30 mm.'
    },
    ru: {
      word: 'Штукатурка',
      simple: 'Слой для выравнивания стен',
      technical: 'Выравнивающее покрытие на основе цемента, извести или гипса. Толщина 10-30 мм.'
    },
    en: {
      word: 'Plaster',
      simple: 'Layer for leveling walls',
      technical: 'Leveling coating based on cement, lime or gypsum. Thickness 10-30 mm.'
    }
  },
  {
    term: 'beam',
    uz: {
      word: 'Balka / Rigel',
      simple: 'Gorizontal yuk ko\'taruvchi to\'sin',
      technical: 'Gorizontal yuk ko\'taruvchi konstruksiya elementi. Temir-beton, metall yoki yog\'och bo\'lishi mumkin.'
    },
    ru: {
      word: 'Балка',
      simple: 'Горизонтальная несущая перекладина',
      technical: 'Горизонтальный несущий конструктивный элемент. Может быть железобетонным, металлическим или деревянным.'
    },
    en: {
      word: 'Beam',
      simple: 'Horizontal load-bearing bar',
      technical: 'Horizontal load-bearing structural element. Can be reinforced concrete, steel or wooden.'
    }
  },
  {
    term: 'column',
    uz: {
      word: 'Ustun / Kolonka',
      simple: 'Vertikal yuk ko\'taruvchi element',
      technical: 'Vertikal siqilgan yuk ko\'taruvchi element. Ko\'ndalang kesimi doira, kvadrat yoki to\'rtburchak bo\'ladi.'
    },
    ru: {
      word: 'Колонна',
      simple: 'Вертикальный несущий элемент',
      technical: 'Вертикальный сжатый несущий элемент. Сечение круглое, квадратное или прямоугольное.'
    },
    en: {
      word: 'Column',
      simple: 'Vertical load-bearing element',
      technical: 'Vertical compressed load-bearing element. Cross-section circular, square or rectangular.'
    }
  },
  {
    term: 'slab',
    uz: {
      word: 'Plita / Yopma',
      simple: 'Gorizontal beton plita, pol yoki ship qiladi',
      technical: 'Gorizontal yuk ko\'taruvchi plitali konstruksiya. Monolitik, prefabrikat yoki kombinatsiyali bo\'ladi.'
    },
    ru: {
      word: 'Плита перекрытия',
      simple: 'Горизонтальная бетонная плита для пола или потолка',
      technical: 'Горизонтальная несущая плитная конструкция. Монолитная, сборная или комбинированная.'
    },
    en: {
      word: 'Slab',
      simple: 'Horizontal concrete plate for floor or ceiling',
      technical: 'Horizontal load-bearing slab structure. Monolithic, precast or combined.'
    }
  },
  {
    term: 'insulation',
    uz: {
      word: 'Issiqlik izolyatsiya / Yigilon',
      simple: 'Binoni sovuqdan saqlash uchun material',
      technical: 'Issiqlik o\'tkazuvchanligini kamaytiradigan material. Penoplast, mineral yun, penopoliuretan turlari.'
    },
    ru: {
      word: 'Теплоизоляция',
      simple: 'Материал для защиты здания от холода',
      technical: 'Материал, снижающий теплопроводность. Пенопласт, минвата, пенополиуретан.'
    },
    en: {
      word: 'Insulation',
      simple: 'Material to protect building from cold',
      technical: 'Material reducing thermal conductivity. Foam, mineral wool, polyurethane foam types.'
    }
  },
  {
    term: 'waterproofing',
    uz: {
      word: 'Gidroizolyatsiya',
      simple: 'Suvdan himoya qiladigan qatlam',
      technical: 'Suvni o\'tkazmaydigan himoya qoplami. Bitumli, polimerli yoki mineral turlari.'
    },
    ru: {
      word: 'Гидроизоляция',
      simple: 'Защитный слой от воды',
      technical: 'Водонепроницаемое защитное покрытие. Битумное, полимерное или минеральное.'
    },
    en: {
      word: 'Waterproofing',
      simple: 'Protective layer from water',
      technical: 'Waterproof protective coating. Bitumen, polymer or mineral types.'
    }
  },
  {
    term: 'roofing',
    uz: {
      word: 'Tom qoplami',
      simple: 'Binoning eng ustki qoplamasi',
      technical: 'Yomg\'ir va qordan himoya qiladigan tom qoplami. Proflist, metall cherep, ruyobi turlari.'
    },
    ru: {
      word: 'Кровля',
      simple: 'Верхнее покрытие здания',
      technical: 'Покрытие крыши от дождя и снега. Профлист, металлочерепица, рубероид.'
    },
    en: {
      word: 'Roofing',
      simple: 'Top covering of building',
      technical: 'Roof covering from rain and snow. Profile sheet, metal tiles, roofing felt.'
    }
  }
];

export default function Translator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTechnical, setShowTechnical] = useState(false);
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');

  const translations = {
    uz: {
      title: 'Qurilish Terminlari Tarjimon',
      subtitle: 'Qurilish terminlarini Uzbek, Rus, Ingliz tillarida toping',
      search: 'Qidirish...',
      simple: 'Oddiy',
      technical: 'Texnik',
      noResults: 'Natija topilmadi'
    },
    ru: {
      title: 'Переводчик строительных терминов',
      subtitle: 'Найдите строительные термины на Узбекском, Русском, Английском',
      search: 'Поиск...',
      simple: 'Простое',
      technical: 'Техническое',
      noResults: 'Результатов не найдено'
    },
    en: {
      title: 'Construction Terminology Translator',
      subtitle: 'Find construction terms in Uzbek, Russian, English',
      search: 'Search...',
      simple: 'Simple',
      technical: 'Technical',
      noResults: 'No results found'
    }
  };

  const t = translations[language];

  const filteredTerms = constructionTerms.filter(term => 
    term.uz.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.ru.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.en.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-2xl">
              <Languages className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">{t.title}</h1>
          <p className="text-xl text-slate-600 mb-6">{t.subtitle}</p>
          
          <div className="flex justify-center gap-2 mb-8">
            <Button 
              variant={language === 'uz' ? 'default' : 'outline'}
              onClick={() => setLanguage('uz')}
              className="rounded-full"
            >
              O'zbek
            </Button>
            <Button 
              variant={language === 'ru' ? 'default' : 'outline'}
              onClick={() => setLanguage('ru')}
              className="rounded-full"
            >
              Русский
            </Button>
            <Button 
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              className="rounded-full"
            >
              English
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg rounded-2xl shadow-lg border-slate-200"
            />
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={!showTechnical ? 'default' : 'outline'}
              onClick={() => setShowTechnical(false)}
              className="rounded-full"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t.simple}
            </Button>
            <Button
              variant={showTechnical ? 'default' : 'outline'}
              onClick={() => setShowTechnical(true)}
              className="rounded-full"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t.technical}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredTerms.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 text-lg">{t.noResults}</p>
            </div>
          ) : (
            filteredTerms.map((term, idx) => (
              <Card key={idx} className="shadow-lg border-slate-200 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
                  <CardTitle className="text-lg font-bold text-blue-900">
                    {term.uz.word}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-semibold text-slate-500 mb-1">O'ZBEK</p>
                      <p className="font-semibold text-slate-900 mb-1">{term.uz.word}</p>
                      <p className="text-sm text-slate-600">
                        {showTechnical ? term.uz.technical : term.uz.simple}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-semibold text-slate-500 mb-1">РУССКИЙ</p>
                      <p className="font-semibold text-slate-900 mb-1">{term.ru.word}</p>
                      <p className="text-sm text-slate-600">
                        {showTechnical ? term.ru.technical : term.ru.simple}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-semibold text-slate-500 mb-1">ENGLISH</p>
                      <p className="font-semibold text-slate-900 mb-1">{term.en.word}</p>
                      <p className="text-sm text-slate-600">
                        {showTechnical ? term.en.technical : term.en.simple}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

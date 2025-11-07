import { useState } from 'react';
import { Shield, AlertTriangle, HardHat, Zap, Flame, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SafetyCategory {
  title: { uz: string; ru: string; en: string };
  icon: string;
  image: string;
  rules: {
    uz: string[];
    ru: string[];
    en: string[];
  };
}

const safetyCategories: SafetyCategory[] = [
  {
    title: {
      uz: 'Balandlikda ishlash xavfsizligi',
      ru: 'Безопасность при работе на высоте',
      en: 'Height work safety'
    },
    icon: 'height',
    image: '/height-safety-bwP8r.png',
    rules: {
      uz: [
        'Xavfsizlik kamarini har doim taqing',
        'Narvon va iskatka mustahkamligini tekshiring',
        'Og\'ir narsalarni balandga ko\'tarmasdan avval yordamchi toping',
        'Shamolda 10 m/s dan yuqori bo\'lsa ishlamang',
        'Qo\'shimcha to\'siqlar va belgilar qo\'ying',
        '2 metrdan baland joyda himoya panjarasi bo\'lishi shart',
        'Asbob va materiallarni mahkamlang, pastga tushmasligi uchun'
      ],
      ru: [
        'Всегда надевайте страховочный пояс',
        'Проверяйте прочность лестниц и лесов',
        'Перед подъёмом тяжестей найдите помощника',
        'При ветре свыше 10 м/с работу прекратить',
        'Установите дополнительные ограждения и знаки',
        'На высоте от 2 метров обязательны защитные перила',
        'Закрепляйте инструменты и материалы от падения'
      ],
      en: [
        'Always wear a safety harness',
        'Check ladder and scaffold stability',
        'Find a helper before lifting heavy items high',
        'Do not work in winds over 10 m/s',
        'Place additional barriers and signs',
        'Protective railings required above 2 meters',
        'Secure tools and materials to prevent falls'
      ]
    }
  },
  {
    title: {
      uz: 'Beton ishlarida xavfsizlik',
      ru: 'Безопасность при бетонных работах',
      en: 'Concrete work safety'
    },
    icon: 'concrete',
    image: '/concrete-safety-NWEMd.png',
    rules: {
      uz: [
        'Ishchi qo\'lqoplari va etik kiyish majburiy',
        'Tsement changidan himoya uchun niqob taqing',
        'Sement teriga teksa, darhol suv bilan yuving',
        'Beton aralashtirgichdan uzoqroqda turing',
        'Qolip va armatura bilan ishlashda ehtiyot bo\'ling',
        'Og\'ir betonni ko\'tarish uchun texnika yoki jamoa yordam',
        'Beton quyish paytida qolip mustahkamligini nazorat qiling'
      ],
      ru: [
        'Обязательно носить рабочие перчатки и сапоги',
        'Надевайте маску для защиты от цементной пыли',
        'При попадании цемента на кожу немедленно смыть водой',
        'Держитесь подальше от бетономешалки',
        'Будьте осторожны с опалубкой и арматурой',
        'Для подъёма тяжёлого бетона используйте технику или команду',
        'Контролируйте прочность опалубки при заливке бетона'
      ],
      en: [
        'Mandatory to wear work gloves and boots',
        'Wear mask for protection from cement dust',
        'If cement touches skin, wash immediately with water',
        'Stay away from concrete mixer',
        'Be careful with formwork and rebar',
        'Use machinery or team help for lifting heavy concrete',
        'Monitor formwork stability during concrete pouring'
      ]
    }
  },
  {
    title: {
      uz: 'Elektr xavfsizligi',
      ru: 'Электрическая безопасность',
      en: 'Electrical safety'
    },
    icon: 'electrical',
    image: '/electrical-safety-32nXK.png',
    rules: {
      uz: [
        'Elektr ish oldidan avval quvvatni o\'chiring',
        'Faqat izolyatsiyali asboblar ishlatilsin',
        'Nam sharoitda elektr ishlarini taqiqlang',
        'Elektr simlarini shikastlanishdan saqlang',
        'Faqat malakali mutaxassis elektr ishlarini bajarishi mumkin',
        'Ulanish joylarini qattiq izolyatsiyalang',
        'Yerga ulash tizimini majburiy o\'rnatish kerak'
      ],
      ru: [
        'Перед электроработами выключите питание',
        'Используйте только изолированные инструменты',
        'Запрещены электроработы во влажных условиях',
        'Защищайте электрические провода от повреждений',
        'Электроработы выполняются только квалифицированным специалистом',
        'Тщательно изолируйте места соединений',
        'Обязательна установка системы заземления'
      ],
      en: [
        'Turn off power before electrical work',
        'Use only insulated tools',
        'Electrical work prohibited in wet conditions',
        'Protect electrical wires from damage',
        'Only qualified specialists may perform electrical work',
        'Thoroughly insulate connection points',
        'Grounding system installation mandatory'
      ]
    }
  },
  {
    title: {
      uz: 'Shaxsiy himoya vositalari',
      ru: 'Средства индивидуальной защиты',
      en: 'Personal protective equipment'
    },
    icon: 'ppe',
    image: '/ppe-equipment-b6GbM.png',
    rules: {
      uz: [
        'Qurilish dubulg\'asi (kaska) majburiy',
        'Xavfsizlik ko\'zoynaklari taqing',
        'Ishchi qo\'lqoplari va etik',
        'Changdan himoya niqobi',
        'Balandlikda xavfsizlik kamari',
        'Shovqinli joylarda quloq tiqinlari',
        'Yoritilgan ko\'ylam ishchi kiyimi'
      ],
      ru: [
        'Строительная каска обязательна',
        'Надевайте защитные очки',
        'Рабочие перчатки и сапоги',
        'Маска от пыли',
        'Страховочный пояс на высоте',
        'Беруши в шумных местах',
        'Светоотражающая рабочая одежда'
      ],
      en: [
        'Construction hard hat mandatory',
        'Wear safety goggles',
        'Work gloves and boots',
        'Dust protection mask',
        'Safety harness at height',
        'Ear plugs in noisy areas',
        'Reflective work clothing'
      ]
    }
  },
  {
    title: {
      uz: 'Texnika bilan ishlash xavfsizligi',
      ru: 'Безопасность при работе с техникой',
      en: 'Machinery operation safety'
    },
    icon: 'machinery',
    image: '/machinery-safety-tsZtQ.png',
    rules: {
      uz: [
        'Faqat guvohnomali operator texnika boshqarishi mumkin',
        'Ishga kirishdan oldin texnikani tekshirish',
        'Texnika yonida turuvchilarni ogohlantiring',
        'Harakat yo\'lini tozalang',
        'Og\'ir yuklarni qo\'yishda xavfsizlik masofasi',
        'Parkovka tormozida, dvigateli o\'chiq',
        'Texnik xizmat ko\'rsatishni o\'z vaqtida bajaring'
      ],
      ru: [
        'Технику управляет только оператор с правами',
        'Проверка техники перед началом работы',
        'Предупредите людей, стоящих рядом с техникой',
        'Очистите маршрут движения',
        'Безопасная дистанция при опускании тяжёлых грузов',
        'Стоянка на тормозе, двигатель выключен',
        'Выполняйте техобслуживание своевременно'
      ],
      en: [
        'Only licensed operator may control machinery',
        'Check machinery before starting work',
        'Warn people standing near machinery',
        'Clear the route of movement',
        'Safe distance when lowering heavy loads',
        'Park on brake, engine off',
        'Perform maintenance on time'
      ]
    }
  },
  {
    title: {
      uz: 'Yong\'in xavfsizligi',
      ru: 'Пожарная безопасность',
      en: 'Fire safety'
    },
    icon: 'fire',
    image: '/fire-safety-ePbUJ.png',
    rules: {
      uz: [
        'Yong\'inga qarshi vositalar har doim tayyorlikda bo\'lsin',
        'Chekish faqat maxsus joylarda',
        'Payvandlash ishlarida yong\'in nazorati',
        'Yoqilg\'i va bo\'yoqlarni xavfsiz saqlash',
        'Evakuatsiya yo\'llarini bo\'sh qoldiring',
        'Favqulodda chiqish belgilari yaxshi ko\'rinadi',
        'Ishchilar yong\'inga qarshi mashg\'ulotdan o\'tishi kerak'
      ],
      ru: [
        'Противопожарные средства всегда в готовности',
        'Курение только в специальных местах',
        'Контроль огня при сварочных работах',
        'Безопасное хранение топлива и красок',
        'Оставьте свободными эвакуационные пути',
        'Знаки аварийного выхода хорошо видны',
        'Рабочие должны пройти противопожарный инструктаж'
      ],
      en: [
        'Fire-fighting equipment always ready',
        'Smoking only in designated areas',
        'Fire control during welding work',
        'Safe storage of fuel and paints',
        'Keep evacuation routes clear',
        'Emergency exit signs clearly visible',
        'Workers must undergo fire safety training'
      ]
    }
  }
];

export default function Safety() {
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');

  const translations = {
    uz: {
      title: 'Qurilishda Xavfsizlik Qoidalari',
      subtitle: 'Professional xavfsizlik ko\'rsatmalari',
      rules: 'Qoidalar'
    },
    ru: {
      title: 'Правила безопасности в строительстве',
      subtitle: 'Профессиональные инструкции по безопасности',
      rules: 'Правила'
    },
    en: {
      title: 'Construction Safety Guidelines',
      subtitle: 'Professional safety instructions',
      rules: 'Rules'
    }
  };

  const t = translations[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'height':
        return <AlertTriangle className="w-8 h-8" />;
      case 'concrete':
        return <HardHat className="w-8 h-8" />;
      case 'electrical':
        return <Zap className="w-8 h-8" />;
      case 'ppe':
        return <Shield className="w-8 h-8" />;
      case 'machinery':
        return <Truck className="w-8 h-8" />;
      case 'fire':
        return <Flame className="w-8 h-8" />;
      default:
        return <Shield className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-100 rounded-2xl">
              <Shield className="w-16 h-16 text-orange-600" />
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

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {safetyCategories.map((category, idx) => (
            <Card key={idx} className="shadow-xl border-slate-200 hover:shadow-2xl transition-shadow">
              <CardHeader className="bg-gradient-to-br from-orange-50 to-white">
                <div className="flex items-center gap-3 text-orange-600 mb-4">
                  {getIcon(category.icon)}
                  <CardTitle className="text-2xl text-slate-900">
                    {category.title[language]}
                  </CardTitle>
                </div>
                <div className="mt-4">
                  <img 
                    src={category.image} 
                    alt={category.title[language]}
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                  />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  {t.rules}
                </h3>
                <ul className="space-y-3">
                  {category.rules[language].map((rule, ruleIdx) => (
                    <li key={ruleIdx} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {ruleIdx + 1}
                      </span>
                      <span className="text-slate-700 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="shadow-xl border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl text-red-900 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8" />
                {language === 'uz' ? 'Muhim eslatma' : language === 'ru' ? 'Важное напоминание' : 'Important reminder'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-red-800 leading-relaxed">
                {language === 'uz' 
                  ? 'Xavfsizlik qoidalariga rioya qilish - bu faqat qonun talabi emas, balki sizning hayotingiz va sog\'ligingizni saqlashdir. Har bir ishni boshlashdan oldin xavfsizlik tadbirlarini tekshiring!'
                  : language === 'ru'
                  ? 'Соблюдение правил безопасности - это не просто требование закона, это сохранение вашей жизни и здоровья. Перед началом любой работы проверьте меры безопасности!'
                  : 'Following safety rules is not just a legal requirement, it is preserving your life and health. Check safety measures before starting any work!'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

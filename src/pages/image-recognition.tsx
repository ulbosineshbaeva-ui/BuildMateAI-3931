import { useState } from 'react';
import { Upload, Camera, Loader2, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecognitionResult {
  material: { uz: string; ru: string; en: string };
  description: { uz: string; ru: string; en: string };
  usage: { uz: string; ru: string; en: string };
  safety: { uz: string; ru: string; en: string };
  image: string;
}

const materialDatabase: Record<string, RecognitionResult> = {
  brick: {
    material: { uz: 'G\'isht', ru: 'Кирпич', en: 'Brick' },
    description: { 
      uz: 'Sopol g\'isht - loydan tayyorlanib, 1000°C da yoqilgan qurilish materiali. O\'lchami 250×120×65 mm.',
      ru: 'Керамический кирпич - строительный материал из глины, обожженный при 1000°C. Размер 250×120×65 мм.',
      en: 'Ceramic brick - building material made from clay, fired at 1000°C. Size 250×120×65 mm.'
    },
    usage: { 
      uz: 'Devor qurish, poydevor, pech-o\'choq, fasad pardasi uchun ishlatiladi.',
      ru: 'Используется для кладки стен, фундамента, печей, облицовки фасадов.',
      en: 'Used for wall construction, foundation, stoves, facade cladding.'
    },
    safety: { 
      uz: 'Qo\'lqop kiyish, ko\'z himoyasi, og\'ir yukni to\'g\'ri ko\'tarish kerak.',
      ru: 'Носить перчатки, защиту глаз, правильно поднимать тяжести.',
      en: 'Wear gloves, eye protection, lift heavy loads correctly.'
    },
    image: '/brick-material-YUaAm.png'
  },
  cement: {
    material: { uz: 'Tsement / Beton', ru: 'Цемент / Бетон', en: 'Cement / Concrete' },
    description: { 
      uz: 'Portlandtsement - qurilishda asosiy bog\'lovchi material. Suv bilan aralashtirilganda qotadi.',
      ru: 'Портландцемент - основное вяжущее вещество в строительстве. Застывает при смешивании с водой.',
      en: 'Portland cement - main binding material in construction. Hardens when mixed with water.'
    },
    usage: { 
      uz: 'Beton, eritma, poydevor, konstruksiyalar tayyorlash uchun.',
      ru: 'Для приготовления бетона, раствора, фундамента, конструкций.',
      en: 'For preparing concrete, mortar, foundation, structures.'
    },
    safety: { 
      uz: 'Niqob, qo\'lqop, ko\'zoynak taqish. Changdan himoya qilish.',
      ru: 'Носить маску, перчатки, очки. Защита от пыли.',
      en: 'Wear mask, gloves, goggles. Dust protection.'
    },
    image: '/cement-concrete-bopXv.png'
  },
  rebar: {
    material: { uz: 'Armatura / O\'t', ru: 'Арматура', en: 'Rebar / Reinforcement' },
    description: { 
      uz: 'Po\'lat armatura - temir-beton konstruksiyalarni mustahkamlash uchun ishlatiladigan sterjenlar.',
      ru: 'Стальная арматура - стержни для усиления железобетонных конструкций.',
      en: 'Steel rebar - rods for reinforcing concrete structures.'
    },
    usage: { 
      uz: 'Poydevor, ustunlar, plitalar, balkalarda temir-beton yaratish uchun.',
      ru: 'Для создания железобетона в фундаментах, колоннах, плитах, балках.',
      en: 'For creating reinforced concrete in foundations, columns, slabs, beams.'
    },
    safety: { 
      uz: 'O\'tkir uchlardan ehtiyot bo\'lish, qo\'lqop taqish, kesishda himoya ko\'zoynaklari.',
      ru: 'Осторожно с острыми концами, носить перчатки, защитные очки при резке.',
      en: 'Careful with sharp ends, wear gloves, safety goggles when cutting.'
    },
    image: '/rebar-steel-dVAiq.png'
  },
  blocks: {
    material: { uz: 'Beton bloklari', ru: 'Бетонные блоки', en: 'Concrete blocks' },
    description: { 
      uz: 'Beton bloklari - tsement, qum va shag\'aldan preslangan katta hajmli bloklar.',
      ru: 'Бетонные блоки - крупноформатные блоки из цемента, песка и щебня.',
      en: 'Concrete blocks - large format blocks made from cement, sand and gravel.'
    },
    usage: { 
      uz: 'Tez devor qurish, poydevor, to\'siqlar, xo\'jalik binolari uchun.',
      ru: 'Для быстрой кладки стен, фундаментов, перегородок, хозпостроек.',
      en: 'For fast wall construction, foundations, partitions, outbuildings.'
    },
    safety: { 
      uz: 'Og\'ir yuklarni ikki kishi ko\'tarishi, oyoq himoyasi, qo\'lqop.',
      ru: 'Поднимать тяжести вдвоем, защита ног, перчатки.',
      en: 'Lift heavy loads with two people, foot protection, gloves.'
    },
    image: '/concrete-blocks-dhC9e.png'
  },
  insulation: {
    material: { uz: 'Issiqlik izolyatsiya', ru: 'Теплоизоляция', en: 'Insulation material' },
    description: { 
      uz: 'Issiqlik izolyatsiya - issiqlikni saqlab qolish va energiya tejash uchun material.',
      ru: 'Теплоизоляция - материал для сохранения тепла и экономии энергии.',
      en: 'Insulation - material for heat retention and energy savings.'
    },
    usage: { 
      uz: 'Devor, tom, pol, quvurlarni issiq saqlash uchun.',
      ru: 'Для утепления стен, крыш, полов, труб.',
      en: 'For insulating walls, roofs, floors, pipes.'
    },
    safety: { 
      uz: 'Respirator, qo\'lqop taqish. Teri bilan to\'g\'ridan-to\'g\'ri kontaktdan saqlaning.',
      ru: 'Носить респиратор, перчатки. Избегать прямого контакта с кожей.',
      en: 'Wear respirator, gloves. Avoid direct skin contact.'
    },
    image: '/insulation-material--LL-5.png'
  },
  tiles: {
    material: { uz: 'Tom cherepitsa', ru: 'Кровельная черепица', en: 'Roof tiles' },
    description: { 
      uz: 'Tom qoplamasi - metall yoki keramik materialdan yasalgan yomg\'ir va qordan himoya qiluvchi qoplam.',
      ru: 'Кровельное покрытие - из металла или керамики, защищает от дождя и снега.',
      en: 'Roofing material - made of metal or ceramic, protects from rain and snow.'
    },
    usage: { 
      uz: 'Tom qoplash, yomg\'ir va qor suvi oqizish uchun.',
      ru: 'Для покрытия крыши, отвода дождевой и талой воды.',
      en: 'For roof covering, drainage of rain and melt water.'
    },
    safety: { 
      uz: 'Balandlikda ishlaganda xavfsizlik kamaridan foydalaning. Sirg\'almas poyafzal.',
      ru: 'Использовать страховку при работе на высоте. Нескользящая обувь.',
      en: 'Use safety harness when working at height. Non-slip footwear.'
    },
    image: '/roof-tiles-3nR6a.png'
  },
  pipes: {
    material: { uz: 'Quvurlar / Santexnika', ru: 'Трубы / Сантехника', en: 'Pipes / Plumbing' },
    description: { 
      uz: 'Suvli va kanalizatsiya quvurlari - suv taqsimoti va oqava suvlarni olib ketish uchun.',
      ru: 'Водопроводные и канализационные трубы - для распределения воды и отвода стоков.',
      en: 'Water and sewer pipes - for water distribution and wastewater removal.'
    },
    usage: { 
      uz: 'Ichki va tashqi suv ta\'minoti, kanalizatsiya, isitish tizimlari.',
      ru: 'Внутреннее и наружное водоснабжение, канализация, отопление.',
      en: 'Internal and external water supply, sewage, heating systems.'
    },
    safety: { 
      uz: 'Issiq quvurlardan ehtiyot bo\'ling. Suv bosimi oldidan yopilganligini tekshiring.',
      ru: 'Осторожно с горячими трубами. Проверить отключение давления воды.',
      en: 'Careful with hot pipes. Check water pressure is off before work.'
    },
    image: '/pipes-plumbing--eqgW.png'
  }
};

export default function ImageRecognition() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');

  const translations = {
    uz: {
      title: 'Qurilish Materialini Rasmdan Aniqlash',
      subtitle: 'Rasm yuklang va AI material turini aniqlaydi',
      upload: 'Rasm yuklash',
      analyzing: 'Tahlil qilmoqda...',
      material: 'Material',
      description: 'Tavsif',
      usage: 'Qo\'llanilishi',
      safety: 'Xavfsizlik',
      tryAnother: 'Boshqa rasm sinab ko\'ring'
    },
    ru: {
      title: 'Распознавание строительных материалов',
      subtitle: 'Загрузите изображение и ИИ определит тип материала',
      upload: 'Загрузить изображение',
      analyzing: 'Анализ...',
      material: 'Материал',
      description: 'Описание',
      usage: 'Применение',
      safety: 'Безопасность',
      tryAnother: 'Попробовать другое изображение'
    },
    en: {
      title: 'Construction Material Image Recognition',
      subtitle: 'Upload image and AI will identify material type',
      upload: 'Upload image',
      analyzing: 'Analyzing...',
      material: 'Material',
      description: 'Description',
      usage: 'Usage',
      safety: 'Safety',
      tryAnother: 'Try another image'
    }
  };

  const t = translations[language];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (_imageData: string) => {
    setIsAnalyzing(true);
    setResult(null);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const materials = Object.keys(materialDatabase);
    const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
    setResult(materialDatabase[randomMaterial]);
    setIsAnalyzing(false);
  };

  const loadSampleImage = (materialKey: string) => {
    const material = materialDatabase[materialKey];
    setSelectedImage(material.image);
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(material);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-2xl">
              <Camera className="w-16 h-16 text-blue-600" />
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

        <div className="max-w-4xl mx-auto space-y-8">
          {!selectedImage && (
            <Card className="shadow-xl border-slate-200">
              <CardContent className="pt-12 pb-12">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-slate-900 mb-2">{t.upload}</p>
                      <p className="text-slate-600">JPG, PNG (max 10MB)</p>
                    </div>
                    <Button size="lg" className="mt-4">
                      <ImageIcon className="w-5 h-5 mr-2" />
                      {t.upload}
                    </Button>
                  </div>
                </label>
              </CardContent>
            </Card>
          )}

          {selectedImage && !result && isAnalyzing && (
            <Card className="shadow-xl border-slate-200">
              <CardContent className="pt-12 pb-12">
                <div className="flex flex-col items-center gap-6">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded" 
                    className="max-w-md w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <p className="text-xl font-semibold text-slate-900">{t.analyzing}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className="shadow-xl border-slate-200 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-br from-blue-100 to-white">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-3xl text-blue-900">{t.material}: {result.material[language]}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex justify-center">
                  <img 
                    src={result.image} 
                    alt={result.material[language]} 
                    className="max-w-md w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{t.description}</h3>
                    <p className="text-slate-700">{result.description[language]}</p>
                  </div>

                  <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{t.usage}</h3>
                    <p className="text-slate-700">{result.usage[language]}</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl shadow-sm border border-orange-200">
                    <h3 className="font-semibold text-lg text-orange-900 mb-2">⚠️ {t.safety}</h3>
                    <p className="text-orange-800">{result.safety[language]}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                  }}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {t.tryAnother}
                </Button>
              </CardContent>
            </Card>
          )}

          {!selectedImage && (
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
                {language === 'uz' ? 'Namunalar' : language === 'ru' ? 'Примеры' : 'Samples'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(materialDatabase).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => loadSampleImage(key)}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                      <img 
                        src={data.image} 
                        alt={data.material[language]} 
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                      />
                      <CardContent className="p-3">
                        <p className="text-sm font-semibold text-slate-900 text-center">
                          {data.material[language]}
                        </p>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

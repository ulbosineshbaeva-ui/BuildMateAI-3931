import { MessageCircle, Send, Building2, Sparkles, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function About() {
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');

  const translations = {
    uz: {
      title: 'Biz haqimizda',
      subtitle: 'Qurilish sohasini AI bilan yaxshilash',
      mission: 'Missiyamiz',
      missionText: 'BuildMate AI qurilish muhandisligini soddalashtirish va zamonaviy sun\'iy intellekt texnologiyalari orqali yanada samarali qilish maqsadida yaratildi. Biz murakkab hisob-kitoblarni osonlashtirish, professional maslahatlar berish va qurilish jarayonini tezlashtirish uchun xizmat qilamiz.',
      vision: 'Viziamiz',
      visionText: 'Qurilish sohasida AI texnologiyalarini qo\'llash orqali O\'zbekistonda va dunyo bo\'ylab muhandislar, quruvchilar va loyihachilar uchun eng yaxshi yechimlarni taqdim etish.',
      features: 'Xususiyatlar',
      feature1: 'Material hisoblash',
      feature1Desc: 'Aniq va tez hisob-kitoblar',
      feature2: 'Xarajat smeta',
      feature2Desc: 'To\'liq qurilish smeta yaratish',
      feature3: 'Rasmni aniqlash',
      feature3Desc: 'Materiallarni avtomatik aniqlash',
      feature4: 'Xavfsizlik',
      feature4Desc: 'Professional xavfsizlik qoidalari',
      developer: 'Dasturchi',
      contact: 'Aloqa',
      telegram: 'Telegram kanal',
      support: 'Yordam boti',
      year: '2025 yil'
    },
    ru: {
      title: 'О нас',
      subtitle: 'Улучшение строительства с помощью ИИ',
      mission: 'Наша миссия',
      missionText: 'BuildMate AI создан для упрощения строительной инженерии и повышения ее эффективности с помощью современных технологий искусственного интеллекта. Мы упрощаем сложные расчёты, предоставляем профессиональные консультации и ускоряем строительные процессы.',
      vision: 'Наше видение',
      visionText: 'Предоставить лучшие решения для инженеров, строителей и проектировщиков в Узбекистане и по всему миру, применяя технологии ИИ в строительстве.',
      features: 'Возможности',
      feature1: 'Расчёт материалов',
      feature1Desc: 'Точные и быстрые расчёты',
      feature2: 'Смета затрат',
      feature2Desc: 'Создание полной строительной сметы',
      feature3: 'Распознавание изображений',
      feature3Desc: 'Автоматическое определение материалов',
      feature4: 'Безопасность',
      feature4Desc: 'Профессиональные правила безопасности',
      developer: 'Разработчик',
      contact: 'Контакты',
      telegram: 'Telegram канал',
      support: 'Бот поддержки',
      year: '2025 год'
    },
    en: {
      title: 'About Us',
      subtitle: 'Improving construction with AI',
      mission: 'Our Mission',
      missionText: 'BuildMate AI is created to simplify construction engineering and make it more efficient through modern artificial intelligence technologies. We simplify complex calculations, provide professional advice and accelerate construction processes.',
      vision: 'Our Vision',
      visionText: 'To provide the best solutions for engineers, builders and designers in Uzbekistan and worldwide by applying AI technologies in construction.',
      features: 'Features',
      feature1: 'Material calculation',
      feature1Desc: 'Accurate and fast calculations',
      feature2: 'Cost estimation',
      feature2Desc: 'Create complete construction estimates',
      feature3: 'Image recognition',
      feature3Desc: 'Automatic material detection',
      feature4: 'Safety',
      feature4Desc: 'Professional safety guidelines',
      developer: 'Developer',
      contact: 'Contact',
      telegram: 'Telegram channel',
      support: 'Support bot',
      year: 'Year 2025'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-2xl">
              <Building2 className="w-16 h-16 text-blue-600" />
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

        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="shadow-xl border-slate-200">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-blue-600" />
                <CardTitle className="text-3xl">{t.mission}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.missionText}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-slate-200">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-600" />
                <CardTitle className="text-3xl">{t.vision}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.visionText}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-slate-200">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="text-3xl">{t.features}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{t.feature1}</h3>
                    <p className="text-slate-600">{t.feature1Desc}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{t.feature2}</h3>
                    <p className="text-slate-600">{t.feature2Desc}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{t.feature3}</h3>
                    <p className="text-slate-600">{t.feature3Desc}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{t.feature4}</h3>
                    <p className="text-slate-600">{t.feature4Desc}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-slate-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <CardTitle className="text-3xl">{t.developer}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <h2 className="text-4xl font-bold text-blue-900 mb-2">Azamat Kulenov</h2>
                <p className="text-lg text-slate-600">{t.developer}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{t.contact}</h3>
                
                <a 
                  href="https://t.me/azamat_khulenov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Send className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{t.telegram}</p>
                        <p className="text-blue-600">@azamat_khulenov</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href="http://t.me/azamatkhulenov_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{t.support}</p>
                        <p className="text-blue-600">@azamatkhulenov_bot</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>

              <div className="text-center pt-6 border-t border-slate-200">
                <p className="text-slate-600">
                  © {t.year} BuildMate AI
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

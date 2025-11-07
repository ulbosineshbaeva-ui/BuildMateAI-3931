import { useState } from 'react';
import { Calculator, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CalculationType = 
  | 'brick' 
  | 'concrete' 
  | 'foundation' 
  | 'rebar' 
  | 'cement-sand' 
  | 'tile' 
  | 'plaster' 
  | 'roof';

interface CalculationResult {
  materials: { name: string; amount: number; unit: string }[];
  formula: string;
  explanation: string;
}

export default function Home() {
  const [calculationType, setCalculationType] = useState<CalculationType>('brick');
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');

  const translations = {
    uz: {
      title: 'Qurilish Materiallarini Hisoblash',
      subtitle: 'AI yordamida aniq hisob-kitoblar',
      selectType: 'Hisoblash turini tanlang',
      calculate: 'Hisoblash',
      download: 'PDF yuklash',
      save: 'Saqlash',
      results: 'Natijalar',
      formula: 'Formula',
      explanation: 'Tushuntirish',
      types: {
        brick: 'G\'isht sarfi',
        concrete: 'Beton hajmi',
        foundation: 'Poydevor hajmi',
        rebar: 'Armatura (o\'t)',
        'cement-sand': 'Tsement-qum nisbati',
        tile: 'Kafel/Pol maydoni',
        plaster: 'Devor suvatish',
        roof: 'Tom materiali'
      }
    },
    ru: {
      title: 'Расчёт строительных материалов',
      subtitle: 'Точные расчёты с помощью ИИ',
      selectType: 'Выберите тип расчёта',
      calculate: 'Рассчитать',
      download: 'Скачать PDF',
      save: 'Сохранить',
      results: 'Результаты',
      formula: 'Формула',
      explanation: 'Объяснение',
      types: {
        brick: 'Расход кирпича',
        concrete: 'Объём бетона',
        foundation: 'Объём фундамента',
        rebar: 'Арматура',
        'cement-sand': 'Соотношение цемента и песка',
        tile: 'Площадь плитки/пола',
        plaster: 'Штукатурка стен',
        roof: 'Кровельный материал'
      }
    },
    en: {
      title: 'Construction Material Calculator',
      subtitle: 'Accurate calculations with AI',
      selectType: 'Select calculation type',
      calculate: 'Calculate',
      download: 'Download PDF',
      save: 'Save',
      results: 'Results',
      formula: 'Formula',
      explanation: 'Explanation',
      types: {
        brick: 'Brick consumption',
        concrete: 'Concrete volume',
        foundation: 'Foundation volume',
        rebar: 'Rebar (armature)',
        'cement-sand': 'Cement-sand ratio',
        tile: 'Tile/Floor area',
        plaster: 'Wall plaster',
        roof: 'Roof material'
      }
    }
  };

  const t = translations[language];

  const calculateMaterials = () => {
    let materials: { name: string; amount: number; unit: string }[] = [];
    let formula = '';
    let explanation = '';

    switch (calculationType) {
      case 'brick':
        const wallLength = inputs.length || 0;
        const wallHeight = inputs.height || 0;
        const wallThickness = inputs.thickness || 0.25;
        const brickVolume = 0.00195;
        const mortarThickness = 0.01;
        
        const wallArea = wallLength * wallHeight;
        const wallVolume = wallArea * wallThickness;
        const brickCount = Math.ceil(wallVolume / (brickVolume + mortarThickness * 0.3));
        const mortarVolume = wallVolume * 0.25;
        
        materials = [
          { name: language === 'uz' ? 'G\'isht' : language === 'ru' ? 'Кирпич' : 'Brick', amount: brickCount, unit: language === 'uz' ? 'dona' : language === 'ru' ? 'шт' : 'pcs' },
          { name: language === 'uz' ? 'Eritma' : language === 'ru' ? 'Раствор' : 'Mortar', amount: parseFloat(mortarVolume.toFixed(2)), unit: language === 'uz' ? 'm³' : language === 'ru' ? 'м³' : 'm³' }
        ];
        
        formula = `V = L × H × T; N = V / (Vb + m)`;
        explanation = language === 'uz' 
          ? `Devor hajmi = ${wallLength}m × ${wallHeight}m × ${wallThickness}m. G'isht o'lchami va eritma qalinligini hisobga olgan holda.`
          : language === 'ru'
          ? `Объём стены = ${wallLength}м × ${wallHeight}м × ${wallThickness}м. С учётом размера кирпича и толщины раствора.`
          : `Wall volume = ${wallLength}m × ${wallHeight}m × ${wallThickness}m. Accounting for brick size and mortar thickness.`;
        break;

      case 'concrete':
        const concreteLength = inputs.length || 0;
        const concreteWidth = inputs.width || 0;
        const concreteHeight = inputs.height || 0;
        
        const concreteVolume = concreteLength * concreteWidth * concreteHeight;
        const cementBags = Math.ceil(concreteVolume * 7);
        const sand = concreteVolume * 0.42;
        const gravel = concreteVolume * 0.84;
        
        materials = [
          { name: language === 'uz' ? 'Beton hajmi' : language === 'ru' ? 'Объём бетона' : 'Concrete volume', amount: parseFloat(concreteVolume.toFixed(2)), unit: 'm³' },
          { name: language === 'uz' ? 'Tsement' : language === 'ru' ? 'Цемент' : 'Cement', amount: cementBags, unit: language === 'uz' ? 'qop (50kg)' : language === 'ru' ? 'мешков (50кг)' : 'bags (50kg)' },
          { name: language === 'uz' ? 'Qum' : language === 'ru' ? 'Песок' : 'Sand', amount: parseFloat(sand.toFixed(2)), unit: 'm³' },
          { name: language === 'uz' ? 'Shag\'al' : language === 'ru' ? 'Щебень' : 'Gravel', amount: parseFloat(gravel.toFixed(2)), unit: 'm³' }
        ];
        
        formula = `V = L × W × H; Cement = V × 7 bags; Sand = V × 0.42; Gravel = V × 0.84`;
        explanation = language === 'uz'
          ? `M300 beton uchun standart nisbat: 1 qism tsement, 2 qism qum, 4 qism shag'al.`
          : language === 'ru'
          ? `Стандартное соотношение для бетона М300: 1 часть цемента, 2 части песка, 4 части щебня.`
          : `Standard ratio for M300 concrete: 1 part cement, 2 parts sand, 4 parts gravel.`;
        break;

      case 'foundation':
        const foundLength = inputs.length || 0;
        const foundWidth = inputs.width || 0;
        const foundDepth = inputs.depth || 0;
        
        const foundVolume = foundLength * foundWidth * foundDepth;
        const foundCement = Math.ceil(foundVolume * 7);
        
        materials = [
          { name: language === 'uz' ? 'Poydevor hajmi' : language === 'ru' ? 'Объём фундамента' : 'Foundation volume', amount: parseFloat(foundVolume.toFixed(2)), unit: 'm³' },
          { name: language === 'uz' ? 'Tsement' : language === 'ru' ? 'Цемент' : 'Cement', amount: foundCement, unit: language === 'uz' ? 'qop' : language === 'ru' ? 'мешков' : 'bags' }
        ];
        
        formula = `V = L × W × D`;
        explanation = language === 'uz'
          ? `Poydevor chuqurligi yer muzlash chuqurligidan (1.5-2m) kam bo'lmasligi kerak.`
          : language === 'ru'
          ? `Глубина фундамента должна быть не менее глубины промерзания грунта (1.5-2м).`
          : `Foundation depth should be at least the frost depth (1.5-2m).`;
        break;

      case 'rebar':
        const rebarLength = inputs.length || 0;
        const rebarWidth = inputs.width || 0;
        const spacing = inputs.spacing || 0.2;
        
        const longitudinalBars = Math.ceil(rebarWidth / spacing);
        const transverseBars = Math.ceil(rebarLength / spacing);
        const totalLength = (longitudinalBars * rebarLength) + (transverseBars * rebarWidth);
        const weight = totalLength * 0.617;
        
        materials = [
          { name: language === 'uz' ? 'Armatura uzunligi' : language === 'ru' ? 'Длина арматуры' : 'Rebar length', amount: parseFloat(totalLength.toFixed(2)), unit: 'm' },
          { name: language === 'uz' ? 'Og\'irligi (d=10mm)' : language === 'ru' ? 'Вес (d=10мм)' : 'Weight (d=10mm)', amount: parseFloat(weight.toFixed(2)), unit: 'kg' }
        ];
        
        formula = `N = (L/s + W/s); L_total = N × dimensions`;
        explanation = language === 'uz'
          ? `Armatura orasidagi masofa odatda 15-20 sm. Ø10mm armatura 1m = 0.617 kg.`
          : language === 'ru'
          ? `Расстояние между арматурой обычно 15-20 см. Ø10мм арматура 1м = 0.617 кг.`
          : `Rebar spacing typically 15-20 cm. Ø10mm rebar 1m = 0.617 kg.`;
        break;

      case 'cement-sand':
        const cementAmount = inputs.cement || 1;
        const ratio = inputs.ratio || 3;
        
        const sandAmount = cementAmount * ratio;
        
        materials = [
          { name: language === 'uz' ? 'Tsement' : language === 'ru' ? 'Цемент' : 'Cement', amount: cementAmount, unit: language === 'uz' ? 'qism' : language === 'ru' ? 'часть' : 'part' },
          { name: language === 'uz' ? 'Qum' : language === 'ru' ? 'Песок' : 'Sand', amount: sandAmount, unit: language === 'uz' ? 'qism' : language === 'ru' ? 'часть' : 'part' }
        ];
        
        formula = `Sand = Cement × Ratio`;
        explanation = language === 'uz'
          ? `Suvatish uchun 1:3, chizish uchun 1:2, qoplash uchun 1:4 nisbati ishlatiladi.`
          : language === 'ru'
          ? `Для штукатурки 1:3, для кладки 1:2, для стяжки 1:4.`
          : `For plastering 1:3, for masonry 1:2, for screed 1:4.`;
        break;

      case 'tile':
        const tileLength = inputs.length || 0;
        const tileWidth = inputs.width || 0;
        const tileSize = inputs.tileSize || 0.6;
        
        const area = tileLength * tileWidth;
        const tileArea = tileSize * tileSize;
        const tileCount = Math.ceil(area / tileArea * 1.1);
        
        materials = [
          { name: language === 'uz' ? 'Maydon' : language === 'ru' ? 'Площадь' : 'Area', amount: parseFloat(area.toFixed(2)), unit: 'm²' },
          { name: language === 'uz' ? 'Kafel' : language === 'ru' ? 'Плитка' : 'Tiles', amount: tileCount, unit: language === 'uz' ? 'dona' : language === 'ru' ? 'шт' : 'pcs' },
          { name: language === 'uz' ? 'Yelim' : language === 'ru' ? 'Клей' : 'Adhesive', amount: Math.ceil(area * 5), unit: 'kg' }
        ];
        
        formula = `A = L × W; N = A / (t² × 1.1)`;
        explanation = language === 'uz'
          ? `10% zaxira qo'shildi. Kafel o'lchami ${tileSize}m × ${tileSize}m.`
          : language === 'ru'
          ? `Добавлен запас 10%. Размер плитки ${tileSize}м × ${tileSize}м.`
          : `10% allowance added. Tile size ${tileSize}m × ${tileSize}m.`;
        break;

      case 'plaster':
        const plasterArea = (inputs.length || 0) * (inputs.height || 0);
        const thickness = inputs.thickness || 0.02;
        
        const plasterVolume = plasterArea * thickness;
        const plasterCement = Math.ceil(plasterVolume * 1300 / 50);
        const plasterSand = plasterVolume * 1.4;
        
        materials = [
          { name: language === 'uz' ? 'Suvat hajmi' : language === 'ru' ? 'Объём штукатурки' : 'Plaster volume', amount: parseFloat(plasterVolume.toFixed(2)), unit: 'm³' },
          { name: language === 'uz' ? 'Tsement' : language === 'ru' ? 'Цемент' : 'Cement', amount: plasterCement, unit: language === 'uz' ? 'qop' : language === 'ru' ? 'мешков' : 'bags' },
          { name: language === 'uz' ? 'Qum' : language === 'ru' ? 'Песок' : 'Sand', amount: parseFloat(plasterSand.toFixed(2)), unit: 'm³' }
        ];
        
        formula = `V = A × t; Cement = V × ρ; Sand = V × 1.4`;
        explanation = language === 'uz'
          ? `Standart suvat qalinligi 15-25 mm. Tsement-qum nisbati 1:3.`
          : language === 'ru'
          ? `Стандартная толщина штукатурки 15-25 мм. Соотношение цемент-песок 1:3.`
          : `Standard plaster thickness 15-25 mm. Cement-sand ratio 1:3.`;
        break;

      case 'roof':
        const roofLength = inputs.length || 0;
        const roofWidth = inputs.width || 0;
        const roofPitch = inputs.pitch || 30;
        
        const roofArea = roofLength * roofWidth / Math.cos(roofPitch * Math.PI / 180);
        const sheetArea = 1.05 * 2.0;
        const sheetCount = Math.ceil(roofArea / sheetArea * 1.15);
        
        materials = [
          { name: language === 'uz' ? 'Tom maydoni' : language === 'ru' ? 'Площадь крыши' : 'Roof area', amount: parseFloat(roofArea.toFixed(2)), unit: 'm²' },
          { name: language === 'uz' ? 'Proflist' : language === 'ru' ? 'Профлист' : 'Roofing sheets', amount: sheetCount, unit: language === 'uz' ? 'dona' : language === 'ru' ? 'шт' : 'pcs' },
          { name: language === 'uz' ? 'Vint' : language === 'ru' ? 'Саморезы' : 'Screws', amount: sheetCount * 30, unit: language === 'uz' ? 'dona' : language === 'ru' ? 'шт' : 'pcs' }
        ];
        
        formula = `A = L × W / cos(α); N = A / A_sheet × 1.15`;
        explanation = language === 'uz'
          ? `Tom qiyaligi ${roofPitch}°. 15% qo'shimcha material va 10cm qoplama hisobga olingan.`
          : language === 'ru'
          ? `Уклон крыши ${roofPitch}°. Учтено 15% запаса и 10см нахлёст.`
          : `Roof pitch ${roofPitch}°. Includes 15% allowance and 10cm overlap.`;
        break;
    }

    setResult({ materials, formula, explanation });
  };

  const getInputFields = () => {
    switch (calculationType) {
      case 'brick':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Devor uzunligi (m)' : language === 'ru' ? 'Длина стены (м)' : 'Wall length (m)'}</Label>
              <Input type="number" value={inputs.length || ''} onChange={(e) => setInputs({ ...inputs, length: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Devor balandligi (m)' : language === 'ru' ? 'Высота стены (м)' : 'Wall height (m)'}</Label>
              <Input type="number" value={inputs.height || ''} onChange={(e) => setInputs({ ...inputs, height: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Devor qalinligi (m)' : language === 'ru' ? 'Толщина стены (м)' : 'Wall thickness (m)'}</Label>
              <Input type="number" value={inputs.thickness || 0.25} onChange={(e) => setInputs({ ...inputs, thickness: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'concrete':
      case 'foundation':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Uzunlik (m)' : language === 'ru' ? 'Длина (м)' : 'Length (m)'}</Label>
              <Input type="number" value={inputs.length || ''} onChange={(e) => setInputs({ ...inputs, length: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Kenglik (m)' : language === 'ru' ? 'Ширина (м)' : 'Width (m)'}</Label>
              <Input type="number" value={inputs.width || ''} onChange={(e) => setInputs({ ...inputs, width: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{calculationType === 'foundation' ? (language === 'uz' ? 'Chuqurlik (m)' : language === 'ru' ? 'Глубина (м)' : 'Depth (m)') : (language === 'uz' ? 'Balandlik (m)' : language === 'ru' ? 'Высота (м)' : 'Height (m)')}</Label>
              <Input type="number" value={calculationType === 'foundation' ? (inputs.depth || '') : (inputs.height || '')} onChange={(e) => setInputs({ ...inputs, [calculationType === 'foundation' ? 'depth' : 'height']: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'rebar':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Uzunlik (m)' : language === 'ru' ? 'Длина (м)' : 'Length (m)'}</Label>
              <Input type="number" value={inputs.length || ''} onChange={(e) => setInputs({ ...inputs, length: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Kenglik (m)' : language === 'ru' ? 'Ширина (м)' : 'Width (m)'}</Label>
              <Input type="number" value={inputs.width || ''} onChange={(e) => setInputs({ ...inputs, width: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Oraliq (m)' : language === 'ru' ? 'Шаг (м)' : 'Spacing (m)'}</Label>
              <Input type="number" value={inputs.spacing || 0.2} onChange={(e) => setInputs({ ...inputs, spacing: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'cement-sand':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Tsement miqdori' : language === 'ru' ? 'Количество цемента' : 'Cement amount'}</Label>
              <Input type="number" value={inputs.cement || 1} onChange={(e) => setInputs({ ...inputs, cement: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Nisbat (1:X)' : language === 'ru' ? 'Соотношение (1:X)' : 'Ratio (1:X)'}</Label>
              <Input type="number" value={inputs.ratio || 3} onChange={(e) => setInputs({ ...inputs, ratio: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'tile':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Xona uzunligi (m)' : language === 'ru' ? 'Длина комнаты (м)' : 'Room length (m)'}</Label>
              <Input type="number" value={inputs.length || ''} onChange={(e) => setInputs({ ...inputs, length: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Xona kengligi (m)' : language === 'ru' ? 'Ширина комнаты (м)' : 'Room width (m)'}</Label>
              <Input type="number" value={inputs.width || ''} onChange={(e) => setInputs({ ...inputs, width: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Kafel o\'lchami (m)' : language === 'ru' ? 'Размер плитки (м)' : 'Tile size (m)'}</Label>
              <Input type="number" value={inputs.tileSize || 0.6} onChange={(e) => setInputs({ ...inputs, tileSize: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'plaster':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Devor uzunligi (m)' : language === 'ru' ? 'Длина стены (м)' : 'Wall length (m)'}</Label>
              <Input type="number" value={inputs.length || ''} onChange={(e) => setInputs({ ...inputs, length: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Devor balandligi (m)' : language === 'ru' ? 'Высота стены (м)' : 'Wall height (m)'}</Label>
              <Input type="number" value={inputs.height || ''} onChange={(e) => setInputs({ ...inputs, height: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Suvat qalinligi (m)' : language === 'ru' ? 'Толщина штукатурки (м)' : 'Plaster thickness (m)'}</Label>
              <Input type="number" value={inputs.thickness || 0.02} onChange={(e) => setInputs({ ...inputs, thickness: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      case 'roof':
        return (
          <>
            <div>
              <Label>{language === 'uz' ? 'Tom uzunligi (m)' : language === 'ru' ? 'Длина крыши (м)' : 'Roof length (m)'}</Label>
              <Input type="number" value={inputs.length || ''} onChange={(e) => setInputs({ ...inputs, length: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Tom kengligi (m)' : language === 'ru' ? 'Ширина крыши (м)' : 'Roof width (m)'}</Label>
              <Input type="number" value={inputs.width || ''} onChange={(e) => setInputs({ ...inputs, width: parseFloat(e.target.value) })} />
            </div>
            <div>
              <Label>{language === 'uz' ? 'Tom qiyaligi (°)' : language === 'ru' ? 'Уклон крыши (°)' : 'Roof pitch (°)'}</Label>
              <Input type="number" value={inputs.pitch || 30} onChange={(e) => setInputs({ ...inputs, pitch: parseFloat(e.target.value) })} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img 
            src="/hero-construction-RrJ87.png" 
            alt="Construction" 
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg object-cover"
          />
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            {t.title}
          </h1>
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="shadow-xl border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
                {t.selectType}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-2 block">{t.selectType}</Label>
                <Select value={calculationType} onValueChange={(value) => {
                  setCalculationType(value as CalculationType);
                  setInputs({});
                  setResult(null);
                }}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(t.types).map((key) => (
                      <SelectItem key={key} value={key}>
                        {t.types[key as CalculationType]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-4">
                {getInputFields()}
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={calculateMaterials} 
                  className="flex-1 h-12 text-base"
                  size="lg"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {t.calculate}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="shadow-xl border-slate-200 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">{t.results}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {result.materials.map((material, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                      <span className="font-semibold text-slate-700">{material.name}</span>
                      <span className="text-lg font-bold text-blue-600">
                        {material.amount} {material.unit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                  <h4 className="font-semibold text-slate-700 mb-2">{t.formula}</h4>
                  <code className="text-sm text-blue-900 font-mono bg-blue-50 px-3 py-2 rounded block">
                    {result.formula}
                  </code>
                </div>

                <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                  <h4 className="font-semibold text-slate-700 mb-2">{t.explanation}</h4>
                  <p className="text-slate-600 leading-relaxed">{result.explanation}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 h-11">
                    <Download className="w-4 h-4 mr-2" />
                    {t.download}
                  </Button>
                  <Button variant="outline" className="flex-1 h-11">
                    <Save className="w-4 h-4 mr-2" />
                    {t.save}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

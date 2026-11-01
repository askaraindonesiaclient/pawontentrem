import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Ambil piring',
    desc: 'Piring dan sendok bersih tersedia di awal meja saji. Silakan mulai perjalanan rasa Anda.',
  },
  {
    num: '02',
    title: 'Pilih sajian',
    desc: 'Pilih nasi, lauk pauk, sayur berkuah hangat, dan sambal sesuai selera serta porsi Anda.',
  },
  {
    num: '03',
    title: 'Ke kasir',
    desc: 'Bawa piring Anda ke meja kasir untuk penghitungan bersahaja sebelum menikmati hidangan.',
  },
];

export function CaraPrasmanan() {
  return (
    <section className="py-16 md:py-24 bg-rice border-t border-b border-line">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Tata Cara Menikmati
          </span>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold text-ink mt-1">
            Cara Menikmati Prasmanan
          </h2>
          <p className="text-muted text-sm md:text-base mt-2">
            Makan sepuas hati dengan kebebasan memilih porsi dan lauk kesukaan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-card bg-paper border border-line shadow-xs hover:border-leaf/50 transition-colors relative"
            >
              <div className="font-editorial text-4xl font-bold text-turmeric/80 mb-4">
                {step.num}
              </div>
              <h3 className="font-editorial text-xl font-bold text-ink mb-2">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


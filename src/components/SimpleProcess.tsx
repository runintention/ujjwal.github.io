import React from 'react';

interface SimpleProcessProps {
  onOpenBooking?: () => void;
}

export const SimpleProcess: React.FC<SimpleProcessProps> = () => {
  const steps = [
    {
      num: '01',
      title: 'Audit',
      desc: 'We analyze assets to identify hidden bottlenecks. Plugging leaks ensures every marketing dollar is optimized for ROI.',
      delay: '0ms'
    },
    {
      num: '02',
      title: 'Strategize',
      desc: 'We build a custom 90 day roadmap tailored to your goals. This blueprint serves as our tactical guide to outmaneuvering.',
      delay: '100ms'
    },
    {
      num: '03',
      title: 'Execute',
      desc: 'We deploy high performance assets and targeted campaigns. Our focus is aggressive testing and real time tweaks.',
      delay: '200ms'
    },
    {
      num: '04',
      title: 'Scale',
      desc: 'We double down on highest ROI opportunities to dominate. We manage growth while protecting your absolute bottom line.',
      delay: '300ms'
    }
  ];

  return (
    <section id="process" className="pt-10 pb-10 lg:py-16 px-6 md:px-16 lg:px-16 bg-transparent anchor-section">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="text-center mb-12 lg:mb-20 reveal">
          <h2 className="text-3xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tighter uppercase heading-serif">
            Our Methodology
          </h2>
          <p className="text-slate-900 font-extrabold text-sm lg:text-base uppercase tracking-tighter">
            The Blueprint for Authority.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="reflection-container method-card group p-6 sm:p-8 glass-light reveal"
              style={step.delay !== '0ms' ? { transitionDelay: step.delay } : undefined}
            >
              <div className="mb-4 step-num method-number">{step.num}</div>
              <h4 className="font-extrabold text-base sm:text-lg mb-2 uppercase text-slate-900 heading-serif">
                {step.title}
              </h4>
              <p className="text-[10px] sm:text-sm text-emerald-700 leading-relaxed font-bold">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

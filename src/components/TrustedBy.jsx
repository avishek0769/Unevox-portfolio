import React from 'react';

const logos = [
  { file: '/client_logos/ripley_group.png', name: 'Ripley Group' },
  { file: '/client_logos/dpdl.png', name: 'Double Pass Development League' },
  { file: '/client_logos/upgrad_logo.avif', name: 'upGrad Kolkata' },
  { file: '/client_logos/Banaras_FC.png', name: 'FC Banaras Baghpat' },
  { file: '/client_logos/Calcutta_Football_League.svg', name: 'Calcutta Football League' },
  { file: '/client_logos/north_24_parganas_logo.png', name: 'North 24 Parganas Football Team' },
  { file: '/client_logos/behala_ss_sporting_club-logo.png', name: 'Behala SS Sporting Club' },
  { file: '/client_logos/behala_cup.jpeg', name: 'Behala Cup' },
  { file: '/client_logos/rainbow_house-logo.png', name: 'Rainbow House Banquet' },
  { file: '/client_logos/maharaja_caterer-Photoroom.png', name: 'Maharaja Caterer' },
  { file: '/client_logos/behala_nutan_dal-logo.png', name: 'Behala Nutan Dal' },
  { file: '/client_logos/behala_classical_festival.png', name: 'Behala Theatre Festival' },
  { file: '/client_logos/Suruchi_Sangha-logo.png', name: 'Suruchi Sangha' },
  { file: '/client_logos/behala_classical_festival-logo.png', name: 'Behala Classical Festival' },
  { file: '/client_logos/behala_bachonik_utsav.png', name: 'Behala Bachonik Utsav' },
];

export default function TrustedBy() {
  const [activeLogo, setActiveLogo] = React.useState(null);

  return (
    <section className="py-20 bg-white border-y border-[#e2dbd3]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#072541]">
            Trusted by Elite Brands & Teams
          </h2>
          <p className="mt-3 text-[#4a5568] text-base max-w-xl mx-auto">
            From national football tournaments to local cultural icons — our clients represent the best of Indian sport and heritage.
          </p>
        </div>

        {/* Logo grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {logos.map((logo) => {
            const isActive = activeLogo === logo.name;
            return (
              <div
                key={logo.name}
                title={logo.name}
                onTouchStart={() => setActiveLogo(logo.name)}
                onTouchEnd={() => setActiveLogo(null)}
                onTouchCancel={() => setActiveLogo(null)}
                className={`w-[calc(50%-12px)] sm:w-[calc(33.33%-16px)] md:w-[calc(25%-18px)] lg:w-[calc(16.66%-20px)] flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border bg-[#f8f5f2] transition-all duration-250 group ${
                  isActive
                    ? 'border-[#e95f0c] shadow-md'
                    : 'border-[#e2dbd3] hover:border-[#e95f0c] hover:shadow-md'
                }`}
              >
                <img
                  src={logo.file}
                  alt={logo.name}
                  className={`h-14 w-full object-contain transition-all duration-300 ${
                    isActive
                      ? 'grayscale-0'
                      : 'grayscale group-hover:grayscale-0'
                  }`}
                  loading="lazy"
                />
                <span className={`text-center text-sm font-semibold transition-colors leading-tight line-clamp-2 ${
                  isActive
                    ? 'text-[#e95f0c]'
                    : 'text-[#4a5568] group-hover:text-[#e95f0c]'
                }`}>
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

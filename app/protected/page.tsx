"use client"; // Mark this file as a Client Component

import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="homepage-container bg-gray-100 dark:bg-[#0b0a0b] min-h-screen">
      {/* Hero Section */}
      <header
        className="hero-section bg-cover bg-center h-80 flex items-center justify-center text-white rounded-lg"
        style={{ backgroundImage: 'url("/images/financial.webp")' }}
      >
        <div className="text-center p-5 bg-[#0b0a0b] bg-opacity-60 dark:bg-[#0b0a0b] dark:bg-opacity-80 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Vítejte na iNVESTRACK KHK</h1>
          <p className="text-xl mb-6">Objevte společnosti, které využili investiční nabídky!</p>
          <Link
            href="/protected/Map"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full"
          >
            Objevte společnosti
          </Link>
        </div>
      </header>

      {/* Information Section */}
      <section className="info-section py-16 bg-white dark:bg-[#0b0a0b]">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-white">Co děláme?</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
          Objevte potenciál investičních pobídek s naší aplikací! iNVESTACK KHK využívá otevřená data od CzechInvest, aby vám poskytla všechny potřebné informace o daňových úlevách a dotacích, které mohou podpořit vaše podnikání. Nechte stát investovat do vašeho úspěchu a rozvíjejte svůj byznys v technologických centrech, výrobních závodech či strategických službách.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
          iNVESTRACK KHK vám ukáže, jak investiční pobídky mohou změnit váš podnikatelský život. Podpora podnikatelů a firem nejenže přináší finanční růst, ale také kultivuje a inovuje celý region. Naše aplikace nabízí přehled podmínek jejich získání, schvalovaných Ministerstvem průmyslu a obchodu. Připojte se k těm, kteří už využili investiční pobídky k rozvoji svého podnikání a pracovních míst.
          </p>
        </div>
      </section>

      <section className="info-section py-16 bg-white dark:bg-[#0b0a0b]">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-white">Kroky k získání investiční pobídky</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
          - Zjistit, zda se nacházím v určité oblasti investorů <br />
          - Kontaktovat sprostředkovatele (CzechInvest) <br />
          - Vyplnit žádost <br />
          - Doložit potřebné doklady <br />
          Sprostředkovatel předá žádost ministerstvu průmyslu a obchodu. Žádost putuje k vládě ke schválení.
          </p>
          <h2 className="text-2xl font-semibold mb-8 dark:text-white">Podle čeho se investiční pobídky posuzují?</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Stát zohledňuje přínos projektu pro region → v žádosti musí být předpokládaný odvod do veřejných rozpočtů či přínos na trh práce. <br />
            Dále musí být definováno jakým způsobem chtějí zakomponovat výzkum a vývoj nebo spolupráci s místními institucemi a školami. Ve zkratce musí být přínos k rozvoji lokální infrastruktury.
          </p>
        </div>
      </section>

      <section className="info-section py-16 bg-white dark:bg-[#0b0a0b]">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-white">Zákon</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
          Podle jakého zákona se investiční pobídky řídí?
          Investiční pobídky se řídí zákonem č. 72/2000 Sb., o investičních pobídkách, ve znění zákona č. 426/2023 Sb.
          </p>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section
  className="cta-section relative py-16 bg-gray-100 dark:bg-[#0b0a0b] text-center rounded-xl"
  style={{ 
    backgroundImage: 'url("/images/banner.png")',
    backgroundSize: 'cover', // Ensures the image covers the section
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    }}
>
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>

  {/* Section Content */}
  <div className="relative z-10">
    <h2 className="text-3xl font-semibold mb-6 dark:text-white">Objevte všech 84 záznamů!!</h2>
    <Link
      href="/protected/Map"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full"
    >
      Obejvte společnosti
    </Link>
  </div>
</section>


      {/* Footer */}
      <footer className="footer bg-gray-800 dark:bg-[#0b0a0b] text-white py-6 text-center">
        <p>&copy; 2024 Hackathon - Tři hírous. Všechna práva vyhrazena.</p>
      </footer>
    </div>
  );
}
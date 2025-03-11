import Image from "next/image";
import styles from "./page.module.css";

import background from '../../public/backgrounds/ivan-bandura-Vu701soYzHg-unsplash-low.jpg';

export default function Home() {
  return (
    <div className={styles.page} style={{ backgroundImage: `url(${background.src})`}}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/logos/agricolabrivio-logo-full-white.svg"
          alt="Azienda Agricola Brivio"
          width={241}
          height={46}
          priority
          />
      </header>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
        <dl>
          <div>
            <dt>Indirizzo</dt>
            <dd>Via Montello 71, 23873 Missaglia - Lecco</dd>
          </div>
          <div>
            <dt>P.IVA</dt>
            <dd>01925710137</dd>
          </div>
          <div>
            <dt>SDI</dt>
            <dd>5W4A8J1</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>info@agricolabrivio.com</dd>
          </div>
          <div>
            <dt>PEC</dt>
            <dd>briviosocietaagricola@pec.coldiretti.it</dd>
          </div>
          <div>
            <Image
              className={styles.logoCredits}
              src="/logos/agricolabrivio-logo-mark-green.svg"
              alt="Azienda Agricola Brivio"
              width={32}
              height={32}
            />
          </div>
        </dl>
      </footer>
    </div>
  );
}

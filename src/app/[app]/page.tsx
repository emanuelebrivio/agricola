import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/logos/agricolabrivio-logo-mark-white.svg"
          alt="Azienda Agricola Brivio"
          width={32}
          height={32}
          priority
          />
      </header>
      <main className={styles.main}>
        <h2>Presto in arrivo</h2>
        <p>Prossimamente sarà disponibile la login per accedere al quaderno di campagna e agli altri tool aziendali.</p>
      </main>
    </div>
  );
}

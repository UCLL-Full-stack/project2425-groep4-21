import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Drone360</title>
                <meta
                    name="description"
                    content="Drone360 - Platform voor drone-piloten en makelaars"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span className={styles.logoTitle}>
                    <Image
                        src="/images/drone360.jpg"
                        alt="Drone360 Logo"
                        className={styles.logo}
                        width={50}
                        height={50}
                    />
                    <h1 className={styles.title}>Welkom bij Drone360!</h1>
                </span>

                <div className={styles.description}>
                    <p>
                        Met <strong>Drone360</strong> kunnen makelaars eenvoudig drone-piloten
                        vinden en inhuren voor het maken van luchtfoto's en video's van hun
                        vastgoed. Hierdoor krijgen zij de mogelijkheid om hun panden op een unieke
                        en aantrekkelijke manier te presenteren.
                    </p>
                    <p>
                        De drone-piloten kunnen de beelden rechtstreeks op het platform uploaden en
                        koppelen aan het betreffende pand, zodat de makelaars deze direct kunnen
                        gebruiken.
                    </p>
                </div>
            </main>
        </>
    );
};

export default Home;

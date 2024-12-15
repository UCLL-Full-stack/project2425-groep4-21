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

                {/* Gebruikersoverzicht (Hardcoded) */}
                <section className={styles.userTable}>
                    <h2 className={styles.subtitle}>Gebruikersoverzicht</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>bjorn123</td>
                                <td>admin123</td>
                                <td>admin</td>
                            </tr>
                            <tr>
                                <td>anna_pilot</td>
                                <td>pilot123</td>
                                <td>pilot</td>
                            </tr>
                            <tr>
                                <td>john_realtor</td>
                                <td>realtor123</td>
                                <td>realtor</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
};

export default Home;

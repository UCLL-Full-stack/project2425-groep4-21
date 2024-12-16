import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

const Home: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta name="description" content={t('description')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span className={styles.logoTitle}>
                    <h1 className={styles.title}>{t('welcomeMessage')}</h1>
                </span>

                <div className={styles.description}>
                    <p>{t('intro1')}</p>
                    <p>{t('intro2')}</p>
                </div>

                {/* Gebruikersoverzicht (nu vertaalbaar) */}
                <section className={styles.userTable}>
                    <h2 className={styles.subtitle}>{t('userOverview')}</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>{t('username')}</th>
                                <th>{t('password')}</th>
                                <th>{t('role')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>bjorn123</td>
                                <td>admin123</td>
                                <td>{t('adminUser')}</td>
                            </tr>
                            <tr>
                                <td>anna_pilot</td>
                                <td>pilot123</td>
                                <td>{t('pilotUser')}</td>
                            </tr>
                            <tr>
                                <td>john_realtor</td>
                                <td>realtor123</td>
                                <td>{t('realtorUser')}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
};

export default Home;

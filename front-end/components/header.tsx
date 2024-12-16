import Link from 'next/link';
import styles from '@styles/header.module.css';
import { useEffect, useState } from 'react';
import Language from './language/Language';
import { useTranslation } from 'next-i18next';

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const Header: React.FC = () => {
    const { t } = useTranslation('common');
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <header className={`${styles.header} flex items-center justify-between px-4 py-2`}>
            <div className="flex items-center">
                <a className={styles.title}>{t('Drone360')}</a>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>
                    {t('home')}
                </Link>
                {loggedInUser ? (
                    <>
                        {loggedInUser.role === 'admin' && (
                            <Link href="/beoordeling" className={styles.link}>
                                {t('reviews')}
                            </Link>
                        )}
                        {loggedInUser.role === 'admin' && (
                            <Link href="/media" className={styles.link}>
                                {t('media')}
                            </Link>
                        )}
                        <Link href="/opdracht" className={styles.link}>
                            {t('tasks')}
                        </Link>
                        <Link href="/pand" className={styles.link}>
                            {t('property')}
                        </Link>
                        <Link href="/user" className={styles.link}>
                            {t('user')}
                        </Link>
                        <a
                            onClick={handleLogout}
                            className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
                        >
                            {t('logout')}
                        </a>
                        <Link
                            href="/profile"
                            className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
                        >
                            {t('welcomeUser', { username: loggedInUser.username })}
                        </Link>
                    </>
                ) : (
                    <Link
                        href="/login"
                        className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
                    >
                        {t('login')}
                    </Link>
                )}
                <Language />
            </nav>
        </header>
    );
};

export default Header;

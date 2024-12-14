import Link from 'next/link';
import styles from '@styles/header.module.css';
import { useEffect, useState } from 'react';

type LoggedInUser = {
    token: string;
    username: string;
    role: string;
};

const Header: React.FC = () => {
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
                <a className={styles.title}>Drone360 App</a>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>
                    Home
                </Link>
                {loggedInUser ? (
                    <>
                        {loggedInUser.role === 'admin' && (
                            <Link href="/beoordeling" className={styles.link}>
                                Beoordelingen
                            </Link>
                        )}
                        {loggedInUser.role === 'admin' && (
                            <Link href="/media" className={styles.link}>
                                Media
                            </Link>
                        )}
                        <Link href="/opdracht" className={styles.link}>
                            Opdracht
                        </Link>
                        <Link href="/pand" className={styles.link}>
                            Pand
                        </Link>
                        <Link href="/user" className={styles.link}>
                            User
                        </Link>
                        <a
                            onClick={handleLogout}
                            className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
                        >
                            Logout
                        </a>
                        <Link
                            href="/profile"
                            className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
                        >
                            Welcome, {loggedInUser.username}!
                        </Link>
                    </>
                ) : (
                    <Link
                        href="/login"
                        className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer"
                    >
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;

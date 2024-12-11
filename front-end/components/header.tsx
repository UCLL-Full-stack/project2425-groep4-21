import Link from 'next/link';
import styles from '@styles/header.module.css';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        setLoggedInUser(user);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <header className={styles.header}>
            <a className={styles.title}>Drone360 App</a>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>
                    Home
                </Link>
                {loggedInUser ? (
                    <>
                        <Link href="/beoordeling" className={styles.link}>
                            Beoordeling
                        </Link>
                        <Link href="/media" className={styles.link}>
                            Media
                        </Link>
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
                        <div className="px-4 text-blue text-xl hover:bg-gray-600 rounded-lg cursor-pointer">
                            Welcome, {loggedInUser}!
                        </div>
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

import Link from 'next/link';
import styles from '@styles/header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <a className={styles.title}>Drone360 App</a>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>
                    Home
                </Link>
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
            </nav>
        </header>
    );
};

export default Header;

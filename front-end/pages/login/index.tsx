import Head from 'next/head';
import Header from '@components/header';
import UserLoginForm from '@components/user/UserLoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {GetServerSideProps} from "next";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});
export default Login;

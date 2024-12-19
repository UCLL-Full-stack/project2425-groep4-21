import Head from 'next/head';
import Header from '@components/header';
import UserRegisterForm from '@components/user/UserRegisterForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {GetServerSideProps} from "next";

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Register</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserRegisterForm />
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale ?? 'en';
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Register;

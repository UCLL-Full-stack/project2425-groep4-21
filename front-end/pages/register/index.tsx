import Head from "next/head";
import Header from "@components/header";
import UserRegisterForm from "@components/user/UserRegisterForm";

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

export default Register;

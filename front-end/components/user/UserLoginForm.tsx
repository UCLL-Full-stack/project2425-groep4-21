import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setNameError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        if (!name.trim()) {
            setNameError("Name is required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        setStatusMessages([
            {
                message: "Login successful. Redirecting to homepage...",
                type: "success",
            },
        ]);

        sessionStorage.setItem("loggedInUser", name);

        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages.length > 0 && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    Username:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {nameError && <p className="text-red-800 mt-1">{nameError}</p>}
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Login
                </button>
            </form>

            <p className="mt-3 text-sm text-gray-600">Name: {name}</p>
        </>
    );
};

export default UserLoginForm;

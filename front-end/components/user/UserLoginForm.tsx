import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userService from "@services/userService";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;
        if (!username.trim()) {
            setUsernameError("Username is required.");
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError("Password is required.");
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { username, password };
        const response = await userService.loginUser(user);

        if (response.status === 200) {
            const user = await response.json();
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    token: user.token,
                    username: user.username,
                    role: user.role,
                })
            );
            setStatusMessages([
                {
                    message: "Login successful. Redirecting to homepage...",
                    type: "success",
                },
            ]);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            let errorMessage = "Wrong password or username";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (error) {
                console.error("Error parsing JSON response:", error);
            }

            setStatusMessages([
                {
                    message: errorMessage,
                    type: "error",
                },
            ]);
        }
    };

    return (
            <div className="max-w-md mx-auto bg-blue-100/50 rounded-3xl p-8">
                <div className="bg-white rounded-2xl shadow-lg p-10">
                    <h3 className="text-2xl font-semibold text-center mb-6 text-blue-600">Login</h3>
                    {statusMessages.length > 0 && (
                        <div className="mb-4">
                            <ul className="list-none space-y-2">
                                {statusMessages.map(({ message, type }, index) => (
                                    <li
                                        key={index}
                                        className={classNames(
                                            "text-sm p-2 rounded-md",
                                            type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                        )}
                                    >
                                        {message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="usernameInput" className="block text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                id="usernameInput"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                        </div>
                        <div>
                            <label htmlFor="passwordInput" className="block text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="passwordInput"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Nog geen account?{" "}
                            <a href="/register" className="text-blue-600 hover:underline">
                                Registeer hier
                            </a>
                        </p>
                    </div>
                </div>
            </div>
    );

};

export default UserLoginForm;

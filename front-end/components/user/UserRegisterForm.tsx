import { useState } from "react";
import { useRouter } from "next/router";
import userService from "@services/userService";

const UserRegisterForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        voornaam: "",
        naam: "",
        gebruikersnaam: "",
        rol: "",
        emailadres: "",
        portfolio: "",
        niveau: "",
        bevoegdheden: "",
        password: ""
    });
    const [errors, setErrors] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null);

        try {
            const response = await userService.registerUser(formData);
            if (response.status === 201) {
                router.push("/login");
            } else {
                const errorData = await response.json();
                setErrors(errorData.message || "Registration failed");
            }
        } catch (error) {
            setErrors("An error occurred during registration");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-blue-100/50 rounded-3xl p-8">
            <div className="bg-white rounded-2xl shadow-lg p-10">
                <h3 className="text-2xl font-semibold text-center mb-6 text-blue-600">Register</h3>
                {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label htmlFor={key} className="block text-gray-700 mb-2">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                id={key}
                                name={key}
                                type={key === "password" ? "password" : "text"}
                                value={formData[key as keyof typeof formData]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserRegisterForm;

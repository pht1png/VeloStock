"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "@/lib/actions/auth.actions";

const SignIn = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (data: SignInFormData) => {
		try {
			console.log("SignInForm Data:", data);
			const result = await signInWithEmail(data);
			if (result.success) {
				toast.success("Signed in successfully!");
				router.push("/");
			} else {
				toast.error(result.error, {
					description: "Incorrect email or password.",
				});
			}
		} catch (e) {
			console.error(e);
			toast.error("Sign in failed", {
				description: e instanceof Error ? e.message : "Failed to sign in.",
			});
		}
	};

	return (
		<>
			<h1 className="form-title">Welcome back</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<InputField
					name="email"
					label="Email"
					placeholder="contact@jsmastery.com"
					register={register}
					error={errors.email}
					validation={{
						required: "Email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Please enter a valid email address",
						},
					}}
				/>

				<InputField
					name="password"
					label="Password"
					placeholder="Enter your password"
					type="password"
					register={register}
					error={errors.password}
					validation={{ required: "Password is required" }}
				/>

				<Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
					{isSubmitting ? "Signing In" : "Sign In"}
				</Button>

				<FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
			</form>
		</>
	);
};
export default SignIn;

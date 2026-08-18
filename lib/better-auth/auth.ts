import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

export const getAuth = async () => {
	const mongoose = await connectToDatabase();
	const db = mongoose.connection.db;

	if (!db) throw new Error("MongoDB connection is not found");

	const authInstance = betterAuth({
		database: mongodbAdapter(db as any),
		secret: process.env.BETTER_AUTH_SECRET,
		baseUrl: process.env.BETTER_AUTH_URL,
		emailAndPassword: {
			enabled: true,
			disableSignUp: false,
			requireEmailVerification: false,
			minPasswordLength: 8,
			maxPasswordLength: 128,
			autoSignIn: true,
		},
		plugins: [nextCookies()],
	});
	return authInstance;
};

export const auth = await getAuth();

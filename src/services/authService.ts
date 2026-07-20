import { supaBase } from "../lib/supabase";

export interface SignUpDetails {
    name: string;
    email: string;
    password: string;
    countryOfOrigin?: string;
    phoneNumber?: string;
}

export async function signUpUser(details: SignUpDetails) {
    const { data, error } = await supaBase.auth.signUp({
        email: details.email,
        password: details.password,
        options: {
            data: {
                name: details.name
            }
        }
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function signInUser(
    email: string,
    password: string
) {
    const { data, error } =
        await supaBase.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function signOutUser() {
    const { error } = await supaBase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function getCurrentUser() {
    const {
        data: { user },
        error
    } = await supaBase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return user;
}
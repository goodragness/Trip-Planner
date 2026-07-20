// The Supabase client is a JavaScript object that communicates
// with my Supabase project over the internet.
// It sends requests (such as creating users, saving trips, or fetching data)
// and receives responses back from the project.

import {createClient} from "@supabase/supabase-js";
const supabaseUrl = process.env.VITE_SUPABASE_URL

//setting up the supabase client key:
const supabaseKey  = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

//checking if any of the above value is numb or missing
//if any of the given value is numb or empty, we won't be able to connect with the
//supabase database and use the database.

if(!supabaseKey || !supabaseUrl){
    throw new Error("Supabase environment variables are missing");
}
export const supaBase = createClient(
    supabaseUrl,
    supabaseKey
);


const SUPABASE_URL = 'https://yxozyvtjmgeaxoodiilz.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b3p5dnRqbWdlYXhvb2RpaWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTk2MjAsImV4cCI6MTk3OTg3NTYyMH0.kaNSwsdS0lbM9dP-VHXYLpxUrW1QS5QnV7StDn46ybo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export async function createPost(post) {
    return await client.from('reddit').insert(post).single();
}

export async function getPosts(title) {
    let query = client.from('reddit').select('*').limit(200);

    if (title) {
        query = query.ilike('name', `%${title}%`);
    }

    return await query;
}
export async function getPost(id) {
    return await client
        .from('posts')
        .select('*, comments(*)')
        .eq('id', id)
        .order('created_at', { foreignTable: 'comment', ascending: false })
        .single();
}
/* Data functions */
export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',

        upsert: true,
    });

    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

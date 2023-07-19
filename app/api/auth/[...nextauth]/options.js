import Google from "next-auth/providers/google"
import clientPromise from "@/lib/mongodb";

export const options = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Add other providers if needed
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Fetch the user from the database based on the account information
            const client = await clientPromise;
            const db = client.db("LibraLink");
            const student = db.collection('Student');
            const librarian = db.collection('Librarians');

            const librarianUser = await librarian.findOne({ email: user.email });
            if (librarianUser) {
                user.role = "librarian";
                return true;
            }

            const studentUser = await student.findOne({ email: user.email });
            if (!studentUser) {
                return false;
            }
            user.role = "student";
            return true;
        },
        async session({session, token}) {
            // Attach additional session data, including the user's role
            session.user.role = token.role;
            return session;
        },
        async jwt({token, user}) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
    // Optional: You can add custom pages or settings as needed
};

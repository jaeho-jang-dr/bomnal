
import { addDoc, collection, getDocs, query, where, writeBatch, doc } from "firebase/firestore";
import { firestore } from "./config";

const products = [
    {
        name: "Pro Knee Stabilizer",
        price: 45.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVO6EaCRNTKsY6p4T8VCCdOv-OAdUchFm0oN9tBP_eZbdg7sdQALz8Tn9H_fb0YgPDA45LhqPlTa8GKYZzV45M19tVll1YOXBPsiBaMXtav8nWHuRHeQq1oU4akjZXmXeBjo2_qYq-kzMHlFNo9jyWI0pgiS3p42VD_sqXNkz9_zgB-jhO0Q_7gelhV9gJdrcXQAlf4fyl13Rh8rrZn3jGmCDbUmLxyw17xHlXOOM_CNZ6e6boIPGoUO_6njs_ffECSNLeQWERy7U",
        description: "Maximum support for arthritis",
        tag: "Best Seller",
    },
    {
        name: "Wrist Relief Band",
        price: 24.5,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGYhSP52FTYIfLeSJ9579KXeGAZv4gwgGAfLW2W36RUsOoNI7dcOaZD-yvUWbkei1M1RXQFmUU09yEkWdnihfkW23_hwjdUKzUNv08zZ-I-RfsBIBYvOhj93s3voQnqZbAULFOyUHKvrrYk2XSNxM1c_NvHCEvPXPuSXhX5zXir6FhbbdtMa_kNSvKEYVoj0W5eppSZ9qTXeP6sN3BXXVq4LWxkvPwLm2L32W4aIF9vAXtwrfRL-Z8gG8gon-xuYoJif8fM4BQ1Y",
        description: "Soft compression fabric",
    },
    {
        name: "Lumbar Ease Belt",
        price: 59.99,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJzUOUZRoJ2dUs84r26vDySkdAvvrguEGwcP-ihdZPTSe0jcnOJAj2wl-xZXhc4eVy_Uoe0ss9tvOB3iL09EoRX8L0yl5Tn0jNUE2yYeAlaVEeHD9b0BcPzC73eYsg5kixozI2uX294tHmNbkZA9gO71AqQTkDDmQ-OB3NOxGk6rq06OoogmCnl0UqQb92jRY6IaFf3hXX7Ov1FmpEbmyWn7qN60eFM5tGL2SVBR4I14HrUNwJEIZJMiAlHA3OYOQPmWBluOldjtw",
        description: "Adjustable fit for lower back",
    },
    {
        name: "Daily Compression Socks",
        price: 18.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Jh2Fuj9nCOYNhWdP127GnI0wlvSaSybEGK28NGG4SbcbZns03dMDDN40rkWjmDs6b4xmnAWajylsQHUzTC1aE-wypUh5wXuKOHM1n61LUx-1xk5DWmt8lYozIOBkIfOIojL-xRzo_y9sG9u8SvkCpGoHn3IJUL58zyDbLneXvNKxprWUgvU7lRgwEUaG062Took_rcQnmpqTn550iQMz1dpEHTO8MwqJYBtzObifASa2IhogNIFAmx9cjg8W70sCXVSoG_ofKa8",
        description: "Improves circulation",
    },
];

export const seedProducts = async () => {
    try {
        const batch = writeBatch(firestore);
        const productsRef = collection(firestore, "products");

        // Check if products exist to avoid duplicates (optional, but good practice)
        const snapshot = await getDocs(productsRef);
        if (!snapshot.empty) {
            console.log("Products collection is not empty. Skipping seed.");
            return "Already seeded";
        }

        for (const product of products) {
            const docRef = doc(productsRef); // Create new doc ref with auto ID
            batch.set(docRef, product);
        }

        await batch.commit();
        console.log("Products seeded successfully");
        return "Success";
    } catch (error) {
        console.error("Error seeding products:", error);
        return "Error";
    }
};

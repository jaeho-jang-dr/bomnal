import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy
} from "firebase/firestore";
import { firestore } from "./config";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";
const CARTS_COLLECTION = "carts";
const CATEGORIES_COLLECTION = "categories";

// Get user's cart
export const getCart = async (userId: string) => {
  if (!userId) return null;
  try {
    const cartRef = doc(firestore, CARTS_COLLECTION, userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    return null;
  }
};

// Set user's cart
export const setCart = async (userId: string, items: any[]) => {
  try {
    const cartRef = doc(firestore, CARTS_COLLECTION, userId);
    // Firestore does not support undefined values. JSON stringify/parse removes them.
    const sanitizedItems = JSON.parse(JSON.stringify(items));
    await setDoc(cartRef, { items: sanitizedItems });
    return true;
  } catch (error) {
    console.error("Error setting cart:", error);
    return false;
  }
};

// Add a new product
export const addProduct = async (productData: any) => {
  try {
    const docRef = await addDoc(
      collection(firestore, PRODUCTS_COLLECTION),
      productData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    return null;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, PRODUCTS_COLLECTION)
    );
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error getting products: ", error);
    return [];
  }
};

// Update a product
export const updateProduct = async (productId: string, productData: any) => {
  try {
    const productRef = doc(firestore, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, productData);
    return true;
  } catch (error) {
    console.error("Error updating product: ", error);
    return false;
  }
};

// Delete a product
export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(firestore, PRODUCTS_COLLECTION, productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Error deleting product: ", error);
    return false;
  }
};

// Update an order's status
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const orderRef = doc(firestore, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });
    return true;
  } catch (error) {
    console.error("Error updating order status: ", error);
    return false;
  }
};

// Get orders for a user (or all if guest/admin simulation)
export const getOrders = async () => {
  try {
    const q = query(
      collection(firestore, ORDERS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Add a new order
export const addOrder = async (orderData: any) => {
  try {
    const docRef = await addDoc(
      collection(firestore, ORDERS_COLLECTION),
      {
        ...orderData,
        createdAt: new Date(),
        status: 'pending' // pending, paid, shipped, delivered, cancelled
      }
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding order: ", error);
    return null;
  }
};
// --- Category Management ---

// Get all categories
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, CATEGORIES_COLLECTION));
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error("Error getting categories: ", error);
    return [];
  }
};

// Set (Create/Update) a category
export const setCategory = async (categoryData: any) => {
  try {
    // If id is present in data, use it as doc ID. Otherwise auto-gen (though we prefer slugs)
    const categoryRef = doc(firestore, CATEGORIES_COLLECTION, categoryData.id);
    // Remove id from data to avoid duplication, or just keep it. 
    // Firestore setDoc overwrites.
    await setDoc(categoryRef, categoryData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error setting category: ", error);
    return false;
  }
};

// Delete a category
export const deleteCategory = async (categoryId: string) => {
  try {
    const categoryRef = doc(firestore, CATEGORIES_COLLECTION, categoryId);
    await deleteDoc(categoryRef);
    return true;
  } catch (error) {
    console.error("Error deleting category: ", error);
    return false;
  }
};

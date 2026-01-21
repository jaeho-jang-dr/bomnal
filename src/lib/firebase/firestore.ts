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
  where,
  orderBy,
  DocumentData
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
export const setCart = async (userId: string, items: DocumentData[]) => {
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
export const addProduct = async (productData: DocumentData) => {
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

// Update product
export const updateProduct = async (
  id: string,
  updatedData: Partial<Omit<DocumentData, "id">> // Changed Product to DocumentData
) => {
  try {
    const productRef = doc(firestore, "products", id);
    await updateDoc(productRef, updatedData);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(firestore, "products", id));
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// --- Order Functions ---

// Create Order
export const createOrder = async (orderData: DocumentData) => { // Changed any to DocumentData
  try {
    const ordersCollection = collection(firestore, "orders");
    const docRef = await addDoc(ordersCollection, orderData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order: ", error);
    throw error;
  }
};

// Get Orders (User specific or All)
export const getOrders = async (userId?: string) => {
  try {
    const ordersCollection = collection(firestore, ORDERS_COLLECTION);
    let q;

    if (userId) {
      q = query(
        ordersCollection,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        ordersCollection,
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting orders: ", error);
    return [];
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

// Add a new order
export const addOrder = async (orderData: DocumentData) => {
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
export const setCategory = async (categoryData: DocumentData) => {
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

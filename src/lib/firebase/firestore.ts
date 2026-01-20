import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./config";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";
const CARTS_COLLECTION = "carts";

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
    await setDoc(cartRef, { items });
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

// Get all orders
export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, ORDERS_COLLECTION));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
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

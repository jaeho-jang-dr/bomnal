// src/lib/firebase/__tests__/auth.test.ts
import {
  getUserDocument,
  getAllUsers,
  updateUserRole,
  registerWithEmail,
} from '../auth';

// Mock dependencies
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('../config', () => ({
  auth: { currentUser: { email: 'admin@example.com' } },
  firestore: {},
}));

// Import mocks to setup return values
import {
  getDoc,
  setDoc,
  collection,
  getDocs,
  doc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

describe('Firebase Auth Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserDocument', () => {
    it('should return a user document if it exists', async () => {
      const mockUid = '123';
      const mockData = { email: 'test@example.com', role: 'user' };

      // Setup mock behavior
      (doc as jest.Mock).mockReturnValue({}); // Mock doc ref
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockData,
      });

      const result = await getUserDocument(mockUid);

      expect(doc).toHaveBeenCalledWith(expect.anything(), `users/${mockUid}`);
      expect(getDoc).toHaveBeenCalled();
      expect(result).toEqual({ uid: mockUid, ...mockData });
    });

    it('should return null if the user document does not exist', async () => {
      const mockUid = '456';

      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });

      const result = await getUserDocument(mockUid);

      expect(result).toBeNull();
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of all users', async () => {
      const mockUsers = [
        { id: '1', data: () => ({ email: 'u1@test.com', role: 'user' }) },
        { id: '2', data: () => ({ email: 'u2@test.com', role: 'admin' }) },
      ];

      (collection as jest.Mock).mockReturnValue({});
      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockUsers,
      });

      const result = await getAllUsers();

      expect(collection).toHaveBeenCalledWith(expect.anything(), 'users');
      expect(getDocs).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ uid: '1', email: 'u1@test.com', role: 'user' });
    });
  });

  describe('updateUserRole', () => {
    it("should update a user's role", async () => {
      const mockUid = '123';
      const newRole = 'admin';

      (doc as jest.Mock).mockReturnValue({});
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      await updateUserRole(mockUid, newRole);

      expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', mockUid);
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        { role: newRole, email: 'admin@example.com' },
        { merge: true }
      );
    });
  });

  describe('registerWithEmail', () => {
    it('should create a new user and a user document', async () => {
      const email = 'new@example.com';
      const password = 'password123';
      const mockUser = { uid: 'newUser123', email };

      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });
      (doc as jest.Mock).mockReturnValue({});
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const result = await registerWithEmail(email, password);

      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        { email, role: 'user' }
      );
      expect(result.user).toEqual(mockUser);
    });
  });
});

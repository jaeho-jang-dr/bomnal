// src/lib/firebase/__tests__/auth.test.ts
import {
  getUserDocument,
  getAllUsers,
  updateUserRole,
  registerWithEmail,
} from '../auth';
import { firestore } from '../config';

jest.mock('../config');

describe('Firebase Auth Functions', () => {
  beforeEach(() => {
    firestore.autoFlush();
  });

  describe('getUserDocument', () => {
    it('should return a user document if it exists', async () => {
      const userData = { email: 'test@example.com', role: 'user' };
      firestore.collection('users').doc('123').set(userData);

      const userDoc = await getUserDocument('123');

      expect(userDoc).toEqual({ uid: '123', ...userData });
    });

    it('should return null if the user document does not exist', async () => {
      const userDoc = await getUserDocument('456');
      expect(userDoc).toBeNull();
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of all users', async () => {
      const users = [
        { uid: '1', email: 'user1@example.com', role: 'user' },
        { uid: '2', email: 'user2@example.com', role: 'admin' },
      ];
      users.forEach(user => firestore.collection('users').doc(user.uid).set({ email: user.email, role: user.role }));

      const userList = await getAllUsers();
      expect(userList).toHaveLength(2);
      expect(userList).toEqual(expect.arrayContaining(users));
    });
  });

  describe('updateUserRole', () => {
    it("should update a user's role", async () => {
      const userData = { email: 'test@example.com', role: 'user' };
      firestore.collection('users').doc('123').set(userData);

      await updateUserRole('123', 'admin');

      const userDoc = await firestore.collection('users').doc('123').get();
      expect(userDoc.data().role).toBe('admin');
    });
  });

  describe('registerWithEmail', () => {
    it('should create a new user and a user document', async () => {
      // This is a simplified test as firebase-mock doesn't fully support auth emulation
      const email = 'newuser@example.com';
      const password = 'password';
      
      // We can't truly test the auth creation, so we'll focus on the firestore part
      // We'll manually set a user to simulate registration
      const mockUser = { uid: 'newUser123', email };
      jest.spyOn(require('firebase/auth'), 'createUserWithEmailAndPassword').mockResolvedValue({ user: mockUser });

      await registerWithEmail(email, password);

      const userDoc = await firestore.collection('users').doc(mockUser.uid).get();
      expect(userDoc.exists).toBe(true);
      expect(userDoc.data()).toEqual({ email, role: 'user' });
    });
  });
});

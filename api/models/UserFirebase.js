const { db, auth } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class User {
  static collection = db.collection('users');

  static async create(userData) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password_hash, 10);
    
    const user = {
      id,
      email: userData.email,
      password_hash: hashedPassword,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role || 'staff',
      specialty: userData.specialty || null,
      license_number: userData.license_number || null,
      is_active: userData.is_active !== undefined ? userData.is_active : true,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    await this.collection.doc(id).set(user);
    
    // Create Firebase Auth user
    try {
      await auth.createUser({
        uid: id,
        email: user.email,
        password: userData.password_hash
      });
    } catch (error) {
      console.error('Error creating Firebase Auth user:', error);
    }
    
    return user;
  }

  static async findById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async findByEmail(email) {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  static async findAll() {
    const snapshot = await this.collection.get();
    const users = [];
    
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return users;
  }

  static async update(id, updateData) {
    let user = { ...updateData, updated_at: new Date() };
    
    // Hash password if it's being updated
    if (updateData.password_hash) {
      user.password_hash = await bcrypt.hash(updateData.password_hash, 10);
    }
    
    await this.collection.doc(id).update(user);
    
    // Update Firebase Auth user if email or password changed
    try {
      const authUpdate = {};
      if (updateData.email) authUpdate.email = updateData.email;
      if (updateData.password_hash) authUpdate.password = updateData.password_hash;
      
      if (Object.keys(authUpdate).length > 0) {
        await auth.updateUser(id, authUpdate);
      }
    } catch (error) {
      console.error('Error updating Firebase Auth user:', error);
    }
    
    return this.findById(id);
  }

  static async delete(id) {
    await this.collection.doc(id).delete();
    
    // Delete Firebase Auth user
    try {
      await auth.deleteUser(id);
    } catch (error) {
      console.error('Error deleting Firebase Auth user:', error);
    }
    
    return true;
  }

  static async matchPassword(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}

module.exports = User;

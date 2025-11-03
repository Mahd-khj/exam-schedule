import type { Request, Response } from 'express';
import User from '../models/User';

interface UserBody {
  name: string;
  email: string;
  password: string;
  role: string;
  student_id?: number;
  teacher_id?: number;
}

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'student_id', 'teacher_id'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

// Get single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'role', 'student_id', 'teacher_id'],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, student_id, teacher_id } = req.body as UserBody;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      student_id: student_id || null,
      teacher_id: teacher_id || null,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const [updated] = await User.update(req.body, { where: { id } });

    if (updated === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const deleted = await User.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

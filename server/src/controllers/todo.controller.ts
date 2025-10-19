import { Request, Response } from 'express';

// Temporary in-memory storage for testing
let tasks: any[] = [];

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required.',
      });
    }

    const newTodo = {
      id: new Date().toISOString(),
      title,
      description,
      status: 'To Do',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTodo);

    return res.status(201).json({
      success: true,
      message: 'Todo created successfully.',
      todo: newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      todos: tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const updateTodos = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Update endpoint working',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Delete endpoint working',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
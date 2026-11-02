import { Request, Response } from "express";
import { Task } from "../types/task";

const datatask: Task[] = [
  { id: 1, title: "Tugas 1", description: "Deskripsi 1", status: "pending" },
  { id: 2, title: "Tugas 2", description: "Deskripsi 2", status: "completed" },
  { id: 3, title: "Tugas 3", description: "Deskripsi 3", status: "pending" },
];

const statusValid = (status: any) => status === "pending" || status === "completed";

export class TaskController {
  // GET semua task
  getTasks = async (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Get Data Task Berhasil",
      data: {
        tasks: datatask,
      },
    });
  };

  // GET task berdasarkan id
  getTaskById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = datatask.find((task) => task.id === id);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Get Detail Task Berhasil",
      data: {
        task,
      },
    });
  };

  // CREATE task
  createTask = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: false,
        message: "Title dan description wajib diisi",
      });
    }

    if (!statusValid(status)) {
      return res.status(400).json({
        status: false,
        message: "Status harus pending atau completed",
      });
    }

    const newid =
      datatask.length > 0 ? Math.max(...datatask.map((task) => task.id)) + 1 : 1;

    const newTask: Task = {
      id: newid,
      title: title,
      description: description,
      status: status,
    };

    datatask.push(newTask);

    return res.status(201).json({
      status: true,
      message: "Create Task Berhasil",
      data: {
        task: newTask,
      },
    });
  };

  // UPDATE task
  updateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;

    const task = datatask.find((task) => task.id === id);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task tidak ditemukan",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        status: false,
        message: "Title dan description wajib diisi",
      });
    }

    if (!statusValid(status)) {
      return res.status(400).json({
        status: false,
        message: "Status harus pending atau completed",
      });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    return res.status(200).json({
      status: true,
      message: "Update Task Berhasil",
      data: {
        task,
      },
    });
  };

  // DELETE task
  deleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = datatask.findIndex((task) => task.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: false,
        message: "Task tidak ditemukan",
      });
    }

    const deletedTask = datatask.splice(index, 1)[0];

    return res.status(200).json({
      status: true,
      message: "Delete Task Berhasil",
      data: {
        task: deletedTask,
      },
    });
  };
}

export default new TaskController();
import Task from './task.model.js';

export const taskPost = async (req, res) => {
    const { nameTask, descripcion, fechaInicio, fechaCierre, nameCreator, lastNameCreator} = req.body;

    const nuevaTarea = new Task({
        nameTask,
        descripcion,
        fechaInicio,
        fechaCierre,
        nameCreator,
        lastNameCreator
    });

    await nuevaTarea.save();

    res.status(200).json({
        tarea: nuevaTarea,
    });
};

export const tasksGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, tasks] = await Promise.all([
        Task.countDocuments(query),
        Task.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        tasks
    });
};

export const taskUpdate = async (req, res) => {
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    const task = await Task.findOne({ _id: id });

    if (!task.estado) {
        return res.status(400).json({
            msg: "This TASK don't exists because was deleted",
        });
    }

    const taskActualizada = await Task.findByIdAndUpdate(task._id, resto, { new: true });

    res.status(200).json({
        msg: 'This TASK was UPDATED:',
        taskActualizada
    });
};

export const taskDelete = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id });

    if (!task.estado) {
        return res.status(400).json({
            msg: "This TASK don't exists because was deleted",
        });
    }

    const taskEliminada = await Task.findByIdAndUpdate(task._id, { estado: false });

    res.status(200).json({
        msg: 'This TASK was DELETED:',
        taskEliminada,
    });
}


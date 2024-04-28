import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    nameTask: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaCierre: {
        type: Date,
        required: true,
    },
    incompleta: {
        type: Boolean,
        default: true,
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

TaskSchema.methods.toJSON = function(){
    const { __v, _id, ...task} = this.toObject();
    task.uid = _id;
    return task;
}

export default mongoose.model('Task', TaskSchema)

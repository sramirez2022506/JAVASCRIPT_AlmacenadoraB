import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {
    taskPost,
    tasksGet,
    taskUpdate,
    taskDelete,
} from './task.controller.js'

const router = Router();

router.post(
    "/",
    [
        check('nameTask', 'The name of the task is required').not().isEmpty(),
        check('descripcion', 'The descripcion of the task is required').not().isEmpty(),
        check('fechaInicio', 'The dateStart of the task is required').not().isEmpty(),
        check('fechaCierre', 'The dateEnd of the task is required').not().isEmpty(),
        check('nameCreator', 'The name of the creator is required').not().isEmpty(),
        check('lastNameCreator', 'The last name of the creator is required').not().isEmpty(),
        validarCampos
    ], taskPost
);

router.get("/", tasksGet);


//hacer chequeo de id
router.put(
    "/:id",
    [
        validarCampos
    ], taskUpdate
);

//hacer chequeo de id
router.delete(
    "/:id",
    [
        validarCampos
    ], taskDelete
);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeEmail } from "../helpers/db-validators.js";

const router = Router()

router.post('/login', 
    [
        check('email', 'This is not a valid email').isEmail(),
        check('password','The password is requered').not().isEmpty(),
        check('password','El password debe de ser mayor a 6 caracteres').isLength({min:6,}),
        validarCampos
    ], login)

router.post('/register', 
    [
        check('name','The name is requered').not().isEmpty(),
        check('lastName','The last name is requered').not().isEmpty(),
        check('email', 'This is not a valid email').isEmail(),
        check('email').custom(existeEmail),
        check('password','The password is requered').not().isEmpty(),
        check('password','El password debe de ser mayor a 6 caracteres').isLength({min:6,}),
        validarCampos
    ], register)

export default router;
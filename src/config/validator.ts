import { body, param, ValidationChain } from "express-validator"


export class UserValidator {
   static validateUser(crudMethod: string) {
        const now: string = new Date().toISOString()
        switch (crudMethod) {
            case "create":
                return [
                    body("nome").exists().trim().isLength({ min: 3 }),
                    body("dataNasc").exists().isISO8601().toDate().isBefore(now),
                    body("email").exists().isEmail(),
                    body("senha").exists().isStrongPassword({ minLength: 8 })
                ]

            case "update":
                return [
                    body("nome").exists().trim().isLength({ min: 3 }),
                    body("dataNasc").exists().isISO8601().toDate().isBefore(now),
                    body("email").exists().isEmail(),
                    body("senha").exists().isStrongPassword({ minLength: 8 })
                ]
            default:
                return [
                ]
        }

    }
}

export class PedidoValidator {
   static validatePedido(crudMethod: string) {
        const now: string = new Date().toISOString()
        switch (crudMethod) {
            case "create":
                return [
                    body("usuarioId").exists().isNumeric(),
                    body("dataPedido").exists().isISO8601().toDate().isBefore(now),
                    body("status").exists(),
                    body("valor").exists().isNumeric()
                ]

            case "update":
                return [
                    body("status").exists()
                ]
            default:
                return [

                ]
        }
    }
}
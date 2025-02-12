import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

export class ResultValidator {
  static validateResult(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  }
}

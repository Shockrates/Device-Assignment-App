import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import Logging from "../library/Logging";
import { IAuthor } from "../models/Author";
import { IBook } from "../models/Book";
import { IEmployee } from "../models/Employee";
import { IDeviceType } from "../models/DeviceType";
import { IDevice } from "../models/Device";


export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next()
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    }
}

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    },
    employee: {
        create: Joi.object<IEmployee>({
            name: Joi.string().required(),
            email: Joi.string().required()
        }),
        update: Joi.object<IEmployee>({
            name: Joi.string().required(),
            email: Joi.string().required()
        })
    },
    deviceType: {
        create: Joi.object<IDeviceType>({
            name: Joi.string().required()
        }),
        update: Joi.object<IDeviceType>({
            name: Joi.string().required()
        })
    },
    device: {
        create: Joi.object<IDevice>({
            employee: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            deviceType: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            serialNumber: Joi.string().required(),
            description: Joi.string().required(),
            datePurchased: Joi.date().required(),
            status: Joi.number().required()

        }),
        update: Joi.object<IDevice>({
            employee: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            deviceType: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            serialNumber: Joi.string().required(),
            description: Joi.string().required(),
            datePurchased: Joi.date().required(),
            status: Joi.number().required()
        })
    },
}
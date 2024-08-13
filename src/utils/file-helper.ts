import { diskStorage } from "multer";
import * as fs from "fs";
import { Request } from "express";

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'only image files allowed';
    return callback(null , false);
  }
  callback(null, true);
};

export const fileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx)$/)) {
    req.fileValidationError = 'Only PDF, and Word files are allowed';
    return callback(null, false);
  }
  callback(null, true);
};

export const prepareDirectory = (req: Request & { user: { id: string } }, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
  const userId = req.user.id;
  const uploadPath = `./storage/${userId}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  cb(null, uploadPath);
};

export const prepareDirectoryWithoutJWT = (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
  const uploadPath = `./storage/unregistered`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  cb(null, uploadPath);
};

export const imageUploadOptions = {
  storage: diskStorage({
    destination: prepareDirectory,
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: imageFileFilter,
};

export const fileUploadOptions = {
  storage: diskStorage({
    destination: prepareDirectory,
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: fileFilter,
};

export const fileUploadOptionsWithoutJWT = {
  storage: diskStorage({
    destination: prepareDirectoryWithoutJWT,
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: fileFilter,
};


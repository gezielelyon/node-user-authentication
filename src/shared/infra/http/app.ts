import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { AppError } from 'src/shared/error/AppError';
import { Routes } from './routes/index.routes';

const App = express();

App.use(cors());
App.use(express.json());
App.use(Routes);
App.use(errors());

App.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.code).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.log(err); // Temporary

  return response.status(500).json({
    statue: 'Error',
    message: 'Internal Server Error',
  });
});

export { App };

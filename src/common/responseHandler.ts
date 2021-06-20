import express from 'express';
import HttpError from '../middleware/httpErrors';
import { User } from '../entities/user.entity';
import { ITask } from '../resources/tasks/task.types';
import { IBoard } from '../resources/boards/board.types';

type dataType =
  | Partial<User>
  | User
  | ITask
  | IBoard
  | (Partial<User> | ITask | IBoard)[];

interface IHandler {
  successful: (data: dataType) => void;
  created: (data: dataType) => void;
  deleted: (message?: string) => void;
  updated: (data: dataType) => void;
  httpError: (error: HttpError) => void;
  internalServerError: (message?: string) => void;
}
/**
 * @module responseHandler
 *
 * @param res express Response
 * @returns function
 */
export const responseHandler = (res: express.Response): IHandler =>
  // ...
  ({
    /**
     * @function successful()
     * Send response with status 200 and data in json
     * @param data
     * @returns void
     */
    successful: (data) => res.json(data),
    /**
     * @function created()
     * When req for create is successful send response with status 201 and data in json
     * @param data
     * @returns void
     */
    created: (data) => res.status(201).json(data),
    /**
     * @function deleted()
     * When req for delete is successful send response with status 204 and data in json
     * @param message Optional parameter, by default - Deleted
     * @returns void
     */
    deleted: () => res.status(204).json({ message: 'Deleted' }),
    /**
     * @function updated()
     * When req for update is successful send response with status 200 and data in json
     * @param data
     * @returns void
     */
    updated: (data) => res.json(data),
    /**
     * @function httpError()
     * Handling httpError
     * @param err
     * @param err.statusCode
     * @param err.message
     * @param err.toJSON return object with error statusCode and message
     * @returns void
     */
    httpError: (err) => res.status(err.statusCode).json(err.toJSON()),
    /**
     * @function internalServerError()
     * When internal Server Error send response with status 500 and data in json
     * @param message Optional parameter, by default - InternalServerError
     * @returns void
     */
    internalServerError: (message = 'InternalServerError') =>
      res.status(500).json({ message }),
  });

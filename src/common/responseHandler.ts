import express from 'express';

type dataType = Record<string, unknown> | Record<string, unknown>[];

interface IHandler {
  successful: (data: dataType) => void;
  created: (data: dataType) => void;
  badRequest: (message?: string) => void;
  deleted: (message?: string) => void;
  updated: (data: dataType) => void;
  forbidden: (message?: string) => void;
  notFound: (message?: string) => void;
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
     * @function badRequest()
     * When req is not valid send response with status 400 and data in json
     * @param message Optional parameter, by default - BadRequest
     * @returns void
     */
    badRequest: (message = 'BadRequest') => res.status(400).json({ message }),
    /**
     * @function updated()
     * When req for update is successful send response with status 200 and data in json
     * @param data
     * @returns void
     */
    updated: (data) => res.json(data),
    /**
     * @function forbidden()
     * When req is forbidden send response with status 401 and data in json
     * @param message Optional parameter, by default - Forbidden
     * @returns void
     */
    forbidden: (message = 'Forbidden') => res.status(401).json({ message }),
    /**
     * @function notFound()
     * When page of data not found send response with status 404 and data in json
     * @param message Optional parameter, by default - NotFound
     * @returns void
     */
    notFound: (message = 'NotFound') => res.status(404).json({ message }),
    /**
     * @function internalServerError()
     * When internal Server Error send response with status 500 and data in json
     * @param message Optional parameter, by default - InternalServerError
     * @returns void
     */
    internalServerError: (message = 'InternalServerError') =>
      res.status(500).json({ message }),
  });

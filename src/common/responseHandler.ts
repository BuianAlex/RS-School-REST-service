import express from 'express';

type dataType = Record<string, unknown> | Record<string, unknown>[];

interface IHandler {
  successful: (data: dataType) => void;
  created: (data: dataType) => void;
  badRequest: () => void;
  deleted: () => void;
  updated: (data: dataType) => void;
  forbidden: () => void;
  notFound: () => void;
  internalServerError: () => void;
}

export const responseHandler = (res: express.Response): IHandler =>
  // ...
  ({
    successful: (data) => res.json(data),
    created: (data) => res.status(201).json(data),
    deleted: () => res.status(204).json({ message: 'Deleted' }),
    badRequest: () => res.status(400).json({ message: 'BadRequest' }),
    updated: (data) => res.json(data),
    forbidden: () => res.status(401).json({ message: 'Forbidden' }),
    notFound: () => res.status(404).json({ message: 'NotFound' }),
    internalServerError: () =>
      res.status(500).json({ message: 'InternalServerError' }),
  });

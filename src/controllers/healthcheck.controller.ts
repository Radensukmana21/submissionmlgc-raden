import { Request, Response } from "express";

export const healthcheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "The API is up and running!",
  });
};
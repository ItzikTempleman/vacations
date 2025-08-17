import { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";

function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
    console.log(err);
    response.status(err.status || StatusCode.InternalServerError).send(err.message);
}

export default catchAll;

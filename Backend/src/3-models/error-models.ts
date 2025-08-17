import StatusCode from "./status-code";

class ClientError {
    public constructor(public status: number, public message: string) { }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        super(404, `id ${id} not found`);
    }
}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(404, `Route ${route} not found`);
    }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message);
    }
}

export class AuthorizationError extends ClientError {
    public constructor(message:string) {
        super(StatusCode.Unauthorized, message);
    };
}

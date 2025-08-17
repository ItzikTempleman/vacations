import express, { Express } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import cors from "cors";
import routeNotFound from "./6-middleware/route-not-found";
import catchAll from "./6-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import { userController } from "./5-controllers/user-controller";
import { vacationController } from "./5-controllers/vacation-controller";

const server = express();

server.use(cors());
server.use(express.json());

server.use(fileUpload());
server.use(express.urlencoded({ extended: true }));
const location = path.join(__dirname, "1-assets", "images");
fileSaver.config(location);

server.use("/api", userController.router);
server.use("/api", vacationController.router);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));
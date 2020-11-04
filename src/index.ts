import * as express from "express";
import * as mustacheExpress from "mustache-express";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";
import * as helmet from "helmet";
import {getCreateIssueRoute, postCreateIssueRoute} from "./routes/createIssue";
import welcomeRoute from "./routes/welcome";
import { getGlobalConfigs } from "./globalConfigs";

let app = express();

app.use(helmet());
app.set("views", `${__dirname}/views`);
app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/${getGlobalConfigs().urlKey}`, getCreateIssueRoute);
app.post(`/${getGlobalConfigs().urlKey}`, postCreateIssueRoute);
app.get("/", welcomeRoute);

app.listen(3000, function () {
    console.log("Server started");
});
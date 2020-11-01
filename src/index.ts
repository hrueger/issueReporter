import * as express from "express";
import * as mustacheExpress from "mustache-express";
import * as bodyParser from "body-parser";
import createIssueRoute from "./routes/createIssue";
import welcomeRoute from "./routes/welcome";
import { getGlobalConfigs } from "./globalConfigs";

let app = express();

app.set("views", `${__dirname}/views`);

app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/${getGlobalConfigs().urlKey}`, createIssueRoute);
app.use("/", welcomeRoute);

app.listen(3000, function () {
    console.log("Server started");
});
import { Octokit } from "@octokit/rest";
import { getGlobalConfigs } from "../globalConfigs";
const octokit = new Octokit({
    auth: getGlobalConfigs().token,
    log: {
        debug: () => console.debug,
        info: () => console.info,
        warn: console.warn,
        error: console.error
    },
    
});

function getCreateIssueRoute(request, response) {
    response.render('createIssue',
        {
            ...getGlobalConfigs()
        }
    );
}

async function postCreateIssueRoute(request, response) {
    const globals = getGlobalConfigs();
    if (!(request.body.title && request.body.description && typeof request.body.title == "string" && typeof request.body.description == "string")) {
        response.render('createIssue',
            {
                ...globals,
                title: request.body.title,
                description: request.body.description,
                missingFields: true,
            }
        );
    } else if (!(typeof request.body.secret == "string" && request.body.secret == globals.spamSecret)) {
        response.render('createIssue',
            {
                ...globals,
                title: request.body.title,
                description: request.body.description,
                secretIncorrect: true,
            }
        );
    } else if (!(request.body.title.length > 15 && request.body.description.length > 50)) {
        response.render('createIssue',
            {
                ...globals,
                title: request.body.title,
                description: request.body.description,
                tooShort: true,
            }
        );
    } else {
        // Submit issue
        if (globals.repository) {
            try {

                await octokit.issues.create({
                    owner: globals.repository.split("/")[0],
                    repo: globals.repository.split("/")[1],
                    title: request.body.title,
                    body: request.body.description,
                });
                response.render('createIssue',
                    {
                        ...getGlobalConfigs(),
                        issueCreatedSuccessfully: true,
                    }
                );
            } catch {
                error();
            }
        } else {
            error();
        }
    }


    function error() {
        response.render('createIssue',
            {
                ...getGlobalConfigs(),
                title: request.body.title,
                description: request.body.description,
                unknownError: true,
            }
        );
    }
}

export {
    getCreateIssueRoute,
    postCreateIssueRoute,
};
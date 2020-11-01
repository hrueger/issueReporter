import { getGlobalConfigs } from "../globalConfigs";

function getCreateIssueRoute(request, response) {
    response.render('createIssue',
        {
            ...getGlobalConfigs()
        }
    );
}

function postCreateIssueRoute(request, response) {
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
        response.render('createIssue',
            {
                ...getGlobalConfigs(),
                issueCreatedSuccessfully: true,
            }
        );
    }

}

export {
    getCreateIssueRoute,
    postCreateIssueRoute,
};
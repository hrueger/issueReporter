import { getGlobalConfigs } from "../globalConfigs";

function getCreateIssueRoute(request, response) {
    response.render('createIssue',
        {
            ...getGlobalConfigs()
        }
    );
}

function postCreateIssueRoute(request, response) {
    if (!(request.body.title && request.body.description)) {
        response.render('createIssue',
            {
                ...getGlobalConfigs(),
                title: request.body.title,
                description: request.body.description,
                missingFields: true,
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
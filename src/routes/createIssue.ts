import { getGlobalConfigs } from "../globalConfigs";

function createIssue(request, response) {
    response.render('createIssue',
        {
            ...getGlobalConfigs()
        }
    );
}

export default createIssue;
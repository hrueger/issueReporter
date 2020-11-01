import { getGlobalConfigs } from "../globalConfigs";

function welcome(request, response) {
    response.render('welcome',
        {
            ...getGlobalConfigs()
        }
    );
}

export default welcome;
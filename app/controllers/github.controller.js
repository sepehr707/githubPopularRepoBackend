const axios = require('axios');
const utils = require('../utils/github.utils');

/**
 * Get request
 * Response is the most rated projects on github created from the {date}.
 * Language: The repository language. It is optional.
 * Page: A number to view top repositories with the length of page. Maximum is 100 and default is 30.
 * @param req
 * @param res
 */
exports.getGithubRepositories = (date, language, page) => {
    const url = utils.getGithubTopRepoUrl(date, language, page);
    return axios.get(url)
        .then(response => {
            return {
                status: 200,
                response: response.data.items.map(utils.mapGithubRepoData)
            }
        })
        .catch(error => {
            return {
                status: error.response.status,
                response: error.response.statusText
            }
        })
}
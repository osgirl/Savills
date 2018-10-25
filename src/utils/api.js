export default class {
    static async request(action, headers = {}) {

        let method = action.method || 'GET';
        let request = {
            method: method,
            headers: Object.assign({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, headers)
        };
        if (action.token) {
            request.headers['Authorization'] = "Bearer " + action.token;
        }
        if ((method == "POST" || method == "DELETE" || method == "PUT") && action.body) {
            request['body'] = JSON.stringify(action.body);
        }
        let response = await fetch(action.api, request);
        return await response.json();
    }
}
export default class {
  static async request(action, headers = {}) {
    console.log('asdkajsdasjdkasdjlasdas', action);
    let method = action.method || 'GET';
    let request = {
      method: method,
      headers: Object.assign(
        {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        headers
      )
    };
    if (action.token) {
      request.headers['Authorization'] = 'Bearer ' + action.token;
    }
    let url = action.api;
    if (action.payload) {
      if (method === 'GET') {
        url += '?' + querystring.stringify(action.payload);
      } else {
        request['body'] = JSON.stringify(action.payload);
      }
    }
    let response = await fetch(url, request);
    let json = await response.json();
    return json;
  }
}

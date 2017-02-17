class Authentication {
  constructor(props) {
    super(props);
    this.auth_token = '';
  }

  hello() {
    console.log('hello');
  }

  authenticateLogin(username, password) {
    console.log('authenticateLogin', username, password);
    return fetch('http://staging.pearl.dental/api/v1/users/sign_in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
export default new Authentication();

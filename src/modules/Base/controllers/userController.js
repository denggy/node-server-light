const userService = require('../services/userService');

exports.getUserList = async ({request, response}) => {
  const result = await userService.getUserList(request.query);
  response.body = {
    result
  };
}

exports.getUserById = async ({request, response}) => {
  const {id} = request.query;
  const result = await userService.get(id);
  response.body = {
    result
  };
}

exports.addUser = async ({request, response, throw: throws}) => {
  const user = request.body;
  if (!user) {
    throws(400, 'this request need param')
  }
  const result = await userService.addUser(user);
  response.body = {
    result
  };
}

exports.delUserById = async ({request, response}) => {
  const {id} = request.query;
  const result = await userService.delete(id);
  response.body = {
    result
  };
}

exports.updateUser = async ({request, response, throw: throws}) => {
  const user = request.body;
  if (!user) {
    throws(400, 'this request need param')
  }
  const result = await userService.update(user);
  response.body = {
    result
  };
}

exports.login = async ({request, response, session, throw: throws})=>{
  const inputs = request.body;
  if (!inputs) {
    throws(400, 'This request need param')
  } else if (!inputs.username || !inputs.password) {
    throws(400, 'The username or password not be null')
  } else if (!inputs.captcha) {
    throws(400, 'The captcha not be null')
  } else if (inputs.captcha !== session.captcha) {
    throws(400, 'Captcha error')
  } else {
    const result = await userService.login(inputs);
    response.body = {
      result
    };
  }
}
// Fake User

module.exports = function () {
  return {
    name: {
      first: 'Unit',
      last: 'Test'
    },
    email: new Date().getTime() + '@test.test',
    password: 'secret'
  }
}

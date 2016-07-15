/* global describe it */

// User Tests
var expect = require('chai').expect
var Unbill = require('../')('test')
var FakeUser = require('./util/fake-user')

describe('User Tests', function () {
  it('should create a user', function () {
    return Unbill
      .createUser(FakeUser())
      .then(function (response) {
        expect(response.data.userId).to.be.a('string')
      })
  })
})

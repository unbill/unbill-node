/* global describe it */

// Auth Tests
var expect = require('chai').expect
var Unbill = require('../')('test')

// Test Fields
var testUserId = '578901a4462893a20a3392f6'
var testCompanyId = '552d9d065b0f3fd70f63f254'

describe('Auth Tests', function () {
  this.timeout(10000)

  it('should authenticate a bill', function () {
    return Unbill
      .auth(testAuth())
      .then(expectBill)
  })

  it('should return a question based MFA response', function () {
    var auth = testAuth()
    auth.mfaTest = 'questions'
    return Unbill
      .auth(auth)
      .then(function (response) {
        expectMfa(response, 'questions')
      })
  })

  it('should return a code based MFA response', function () {
    var auth = testAuth()
    auth.mfaTest = 'list'
    return Unbill
      .auth(auth)
      .then(function (response) {
        expectMfa(response, 'list')
      })
  })

  it('should return an mfa response and answer appropriately', function () {
    var auth = testAuth()
    auth.mfaTest = 'questions'
    return Unbill
      .auth(auth)
      .then(answerMfa)
      .then(expectBill)
  })
})

function testAuth () {
  return {
    userId: testUserId,
    companyId: testCompanyId,
    form: {
      username: 'unbillUsername',
      password: 'unbillPassword'
    }
  }
}

function answerMfa (response) {
  return Unbill
    .authStep({
      token: response.data.token,
      mfa: ['Secret Answer']
    })
}

function expectMfa (response, type) {
  expect(response.status).to.equal(201)
  expect(response.data).to.have.property('token')
  expect(response.data.type).to.equal(type)
  expect(response.data).to.have.property('mfa')
}

function expectBill (response) {
  expect(response.status).to.equal(200)
  expect(response.data.bill).to.be.a('object')
  expect(response.data.bill.balance).to.be.a('number')
  expect(response.data.bill.dueDate).to.be.a('string')
}

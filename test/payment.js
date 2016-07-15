/* global describe it */

// Payment Tests
var expect = require('chai').expect
var Unbill = require('../')('test')
var FakeUser = require('./util/fake-user')
var FakePayment = require('./util/fake-payment')

// Test Fields
var testUserId = '578901a4462893a20a3392f6'
var testCompanyId = '552d9d065b0f3fd70f63f254'

describe('Payment Tests', function () {
  this.timeout(10000)

  it('should add a payment method to a user', function () {
    return createUser()
      .then(addPaymentMethod)
  })

  it('should get a payment method for user', function () {
    return createUser()
      .then(addPaymentMethod)
      .then(getPaymentMethod)
  })

  it('should retry a payment method for a user', function () {
    return createUser()
      .then(addPaymentMethod)
      .then(retryPaymentMethod)
  })

  it('should disable autopay', function () {
    return Unbill
      .updateAutopay({
        userId: testUserId,
        companyId: testCompanyId,
        autopay: 'disabled'
      })
      .then(function (response) {
        expect(response.status).to.equal(200)
      })
  })

  it('should schedule a payment', function () {
    return Unbill
      .makePayment({
        userId: testUserId,
        companyId: testCompanyId
      })
      .then(function (response) {
        expect(response.status).to.equal(200)
      })
  })
})

function createUser () {
  return Unbill.createUser(FakeUser())
}

function addPaymentMethod (response) {
  var userId = response.data.userId
  var paymentMethod = FakePayment()
  paymentMethod.userId = userId

  return Unbill
    .addPaymentMethod(paymentMethod)
    .then(function (response) {
      expect(response.status).to.equal(200)
      return userId
    })
}

function getPaymentMethod (userId) {
  return Unbill
    .getPaymentMethod({
      userId: userId
    })
    .then(function (response) {
      expect(response.data.bank).to.be.a('object')
      expect(response.data.bank.type).to.equal('checking')
      expect(response.data.status).to.equal('verified')
    })
}

function retryPaymentMethod (userId) {
  return Unbill
    .retryPaymentMethod({
      userId: userId
    })
    .then(function (response) {
      expect(response.data.bank).to.be.a('object')
      expect(response.data.bank.type).to.equal('checking')
      expect(response.data.status).to.equal('verified')
    })
}

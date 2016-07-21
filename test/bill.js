/* global describe it */

// Bill Tests
var expect = require('chai').expect
var Unbill = require('../')('test')

// Test Fields
var testUserId = '578901a4462893a20a3392f6'
var testCompanyId = '552d9d065b0f3fd70f63f254'

describe('Bill Tests', function () {
  this.timeout(10000)

  it('should get a bill detail', function () {
    return Unbill
      .getBillDetail({
        userId: testUserId,
        companyId: testCompanyId
      })
      .then(expectDetail)
  })

  it('should return a list of bills', function () {
    return Unbill
      .getBills({
        userId: testUserId
      })
      .then(function (response) {
        expect(response.data).to.be.a('array')
        expect(response.data).to.have.length(1)
        expect(response.data[0].bill).to.be.a('object')
        expect(response.data[0].company).to.be.a('object')
      })
  })

  it('should fix a bill hold', function () {
    return Unbill
      .fixBillHold({
        userId: testUserId,
        companyId: testCompanyId
      })
      .then(expectDetail)
  })

  it('should remove a bill', function () {
    return Unbill
      .removeBill(({
        userId: testUserId,
        companyId: testCompanyId
      })
      .then(function (response) {
        expect(response.status).to.equal(200)
      })
  })

})

function expectDetail (response) {
  expect(response.data.bill).to.be.a('object')
  expect(response.data.bill.status).to.equal('upcoming')
  expect(response.data.bill.settings).to.be.a('object')
  expect(response.data.bill.settings.autopay).to.equal(false)

  expect(response.data.company).to.be.a('object')
  expect(response.data.company.name).to.be.a('string')
  expect(response.data.company.logo).to.be.a('string')

  expect(response.data.payments).to.be.a('array')
}

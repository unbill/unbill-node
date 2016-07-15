/* global describe it */

// Company Tests
var expect = require('chai').expect
var Unbill = require('../')('test')

// Test Fields
var testCompanyId = '552d9d065b0f3fd70f63f254'

describe('Company Tests', function () {
  this.timeout(10000)

  it('should fail searching for companies', function () {
    return Unbill
      .searchCompanies()
      .catch(function (e) {
        expect(e.response.status).to.equal(400)
      })
  })

  it('should search companies by name', function () {
    return Unbill
      .searchCompanies({
        query: 'netflix'
      })
      .then(expectCompanies)
  })

  it('should search companies by category', function () {
    return Unbill
      .searchCompanies({
        category: 'electric'
      })
      .then(expectCompanies)
  })

  it('should get a company', function () {
    return Unbill
      .getCompany({
        companyId: testCompanyId
      })
      .then(function (response) {
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('logo')
        expect(response.data).to.have.property('auth')
      })
  })

  it('should get company categories', function () {
    return Unbill
      .getCompanyCategories()
      .then(function (response) {
        expect(response.data[0]).to.have.property('name')
        expect(response.data[0]).to.have.property('type')
        expect(response.data[0]).to.have.property('image')
      })
  })
})

function expectCompanies (response) {
  expect(response.status).to.equal(200)
  expect(response.data).to.have.length.of.at.least(1)
  expect(response.data[0]).to.have.property('name')
  expect(response.data[0]).to.have.property('logo')
  expect(response.data[0]).to.have.property('auth')
}

'use strict'

var assert = require('assert')
var axios = require('axios')

function UnbillClient (config) {
  config = config || {}

  assert(this instanceof UnbillClient, 'Client must be called with new')

  this.key = config.key || process.env.UNBILL_KEY
  assert(!!this.key, 'An API key must be provided')
}

UnbillClient.prototype.request = function (endpoint, body) {
  var host = this.key === 'test' ? 'http://localhost:3000/partner/v2' : 'https://unbill.co/partner/v2'
  var url = host + endpoint

  body = body || {}
  body.unbillKey = this.key

  console.log('Post to:', url)
  console.log('Body:', body)

  return axios.post(url, body)
}

// Auth Endpoints
UnbillClient.prototype.auth = function (body) {
  return this.request('/auth', body)
}

UnbillClient.prototype.authStep = function (body) {
  return this.request('/auth/step', body)
}

// Bill Endpoints
UnbillClient.prototype.getBillDetail = function (body) {
  return this.request('/bill/detail', body)
}

UnbillClient.prototype.getBills = function (body) {
  return this.request('/bill/overview', body)
}

UnbillClient.prototype.fixBillHold = function (body) {
  return this.request('/bill/fix-hold', body)
}

// Company Endpoints
UnbillClient.prototype.searchCompanies = function (body) {
  return this.request('/company/search', body)
}

UnbillClient.prototype.getCompany = function (body) {
  return this.request('/company/get', body)
}

UnbillClient.prototype.getCompanyCategories = function (body) {
  return this.request('/company/categories', body)
}

// Payment Endpoints
UnbillClient.prototype.addPaymentMethod = function (body) {
  return this.request('/payment/add', body)
}

UnbillClient.prototype.getPaymentMethod = function (body) {
  return this.request('/payment/get', body)
}

UnbillClient.prototype.retryPaymentMethod = function (body) {
  return this.request('/payment/retry', body)
}

UnbillClient.prototype.updateAutopay = function (body) {
  return this.request('/payment/autopay', body)
}

UnbillClient.prototype.makePayment = function (body) {
  return this.request('/payment/make', body)
}

// User Endpoints
UnbillClient.prototype.createUser = function (body) {
  return this.request('/user/create', body)
}

module.exports = UnbillClient

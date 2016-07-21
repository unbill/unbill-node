# unbill-node

A node.js client library for the [Unbill API](https://unbill.co/docs).

## Table of Contents

- [unbill-node](#unbill-node)
  * [Getting started](#getting-started)
  * [Examples](#examples)
  * [API](#api)
      + [Auth](#auth)
      + [Bill](#bill)
      + [Company](#company)
      + [Payment](#payment)
      + [User](#user)
  * [Support](#support)

## Getting started

```bash
$ npm install unbill
```

```js
var Unbill = require('unbill')(unbillKey)
```

## Examples

### Authenticate a user's bill credentials

```js
var Unbill = require('unbill')(unbillKey)))
}

Unbill.auth({
  userId: userId,
  companyId: companyId,
  form: {
    username: 'username',
    password: 'password'
  }
})
.then(function (response) {

  if (response.status === 200) {
    var billData = response.data
    return billData
  }
  else if (response.status === 201) {
    return Unbill.authStep({
      token: response.data.token,
      mfa: ['Secret Answer']
    })
    .then(function (response) {
      // Repeat until 200 status is returned
    })
  }

})
.catch(function (e) {
  var errMessage = e.response.data.message
))
```

## API

The module supports all Plaid API endpoints.  For complete information about the API, head over to the [docs](https://unbill.co/docs).

Every function requires a `payload` as specified by the [docs](https://unbill.co/docs) and returns a promise that can be used to access the response of the call.

### Auth

```js
// Auth
Unbill.auth(payload)
// Auth step
Unbill.authStep(payload)
```

### Bill
```js
// Bill details
Unbill.getBillDetails(payload)
// Bill list
Unbill.getBills(payload)
// Fix bill hold
Unbill.fixBillHold(payload)
// Remove bill
Unbill.removeBill(payload)
```

### Company
```js
// Get company
Unbill.getCompany(payload)
// Search companies
Unbill.searchCompanies(payload)
// Get company categories
Unbill.getCompanyCategories(payload)
```

### Payment
```js
// Add payment method
Unbill.addPaymentMethod(payload)
// Get payment method
Unbill.getPaymentMethod(payload)
// Retry payment method
Unbill.retryPaymentMethod(payload)
// Update autopay
Unbill.updateAutopay(payload)
// Make payment
Unbill.makePayment(payload)
```

### User

```js
// Create user
Unbill.createUser
```

## Support

We’ve tried to make this documentation user-friendly and example-filled, but please [drop us a line](mailto:hello@unbill.us) with any questions.

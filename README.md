# unbill-node

A node.js client library for the [Unbill API](https://unbill.co/docs)

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

Every function requires a `body` as specified by the [docs](https://unbill.co/docs).

Each function returns a promise that can be used to access the response of the call.

### Auth

```js
// Auth
Unbill.auth
// Auth step
Unbill.authStep
```

### Bill
```js
// Bill details
Unbill.getBillDetails
// Bill list
Unbill.getBills
// Fix bill hold
Unbill.fixBillHold
```

### Company
```js
// Get company
Unbill.getCompany
// Search companies
Unbill.searchCompanies
// Get company categories
Unbill.getCompanyCategories
```

### Payment
```js
// Add payment method
Unbill.addPaymentMethod
// Get payment method
Unbill.getPaymentMethod
// Retry payment method
Unbill.retryPaymentMethod
// Update autopay
Unbill.updateAutopay
// Make payment
Unbill.makePayment
```

### User

```js
// Create user
Unbill.createUser
```

## Support

We’ve tried to make this documentation user-friendly and example-filled, but please [drop us a line](mailto:hello@unbill.us) with any questions.


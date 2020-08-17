var express = require('express');

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

/* replace below string with secrate key of stipe */
const stripe = require('stripe')('sk_test_51HBGdaIikNnb5zwacSJloIxDgS3kUZ');

const route = express.Router();

route.post('/secret', async (req, res) => {
    console.log('req.body: ', req.body);
    const paymentDetails = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        description: paymentDetails.description,
        shipping: {
            name: paymentDetails.name,
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
        amount: Math.round(paymentDetails.amount),
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { integration_check: 'accept_a_payment' },
    });
    res.json({ client_secret: paymentIntent.client_secret });
});

module.exports = route;
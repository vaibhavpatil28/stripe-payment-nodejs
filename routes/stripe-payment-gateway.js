var express = require('express');

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

/* replace below string with secrate key of stipe */
const stripe = require('stripe')('sk_test_51HBGdaIikNnb5zwacSJloIxDgS3kUZ');

const route = express.Router();

route.get('/secret', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        description: 'Software development services',
        shipping: {
            name: 'Jenny Rosen',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
        amount: 1099,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: { integration_check: 'accept_a_payment' },
    });
    res.json({ client_secret: paymentIntent.client_secret });
});

module.exports = route;
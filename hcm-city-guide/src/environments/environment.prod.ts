export const environment = {
  production: true,
  
  // PayPal Configuration
  paypalClientId: process.env['PAYPAL_CLIENT_ID'],

  // Booking.com API Configuration (RapidAPI)
  bookingApiUrl: 'https://booking-com.p.rapidapi.com/v2',
  bookingApiKey: process.env['RAPIDAPI_KEY'],
  bookingApiHost: 'booking-com.p.rapidapi.com',

  // Agoda API Configuration (RapidAPI)
  agodaApiUrl: 'https://agoda-com-api.p.rapidapi.com/v2',
  agodaApiKey: process.env['RAPIDAPI_KEY'],
  agodaApiHost: 'agoda-com-api.p.rapidapi.com',

  // Mapbox Configuration
  mapboxToken: process.env['MAPBOX_TOKEN'],
  mapboxStyle: 'mapbox://styles/mapbox/streets-v11'
}; 
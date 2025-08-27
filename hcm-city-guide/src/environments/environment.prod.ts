export const environment = {
  production: true,
  paypal: {
    sandbox: false,
    sandboxClientId: 'Ab-tsOI3zdvzPwpt8PC-1qAKeCqB0FgV8hGZjPPUzm1XBiGOJhUaf9Ui-1CoL4JOGIZmaWDIeS7H-FdY',
    productionClientId: 'AcapPnIPHS2Hf8CzlCfNVZsdYEgT3HH8udULBKY1KbDIDxTduXYJLxrJhAEnv63Q1qjJq5vhtZyzYhLn'
  },

  // Booking.com Configuration
  bookingAffiliateId: 'YOUR_BOOKING_AFFILIATE_ID',
  bookingSearchUrl: 'https://www.booking.com/searchresults.html',
  bookingHotelUrl: 'https://www.booking.com/hotel',

  // Agoda Configuration
  agodaPartnerId: 'YOUR_AGODA_PARTNER_ID',
  agodaSearchUrl: 'https://www.agoda.com/partners/partnersearch',
  agodaHotelUrl: 'https://www.agoda.com/partners/booking',

  // Booking.com API Configuration (RapidAPI)
  bookingApiUrl: 'https://booking-com.p.rapidapi.com/v2',
  bookingApiKey: 'YOUR_RAPIDAPI_KEY',
  bookingApiHost: 'booking-com.p.rapidapi.com',

  // Agoda API Configuration (RapidAPI)
  agodaApiUrl: 'https://agoda-com-api.p.rapidapi.com/v2',
  agodaApiKey: 'YOUR_RAPIDAPI_KEY',
  agodaApiHost: 'agoda-com-api.p.rapidapi.com',

  // Mapbox Configuration
  mapboxToken: 'pk.eyJ1IjoidGFsaGFraHdqYTA2IiwiYSI6ImNsdTd60HptdTBhczgybGxsbWdmcjN6ZWwifQ.RBnwQKZHLwgUhnIh0LeP_g',
  mapboxStyle: 'mapbox://styles/mapbox/streets-v11'
};

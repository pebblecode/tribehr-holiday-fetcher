Pebblecode TribeHR Calendar Fetcher
-----------------------------------

This app integrates with the TribeHR API to fetch their calender API daily.

We use this to check who's on holiday that day, or sick.

Running
-------

1. Run `npm install`
2. Copy `config/default.json` to `config/config.json` if running locally, or set up the following environment vars
  * `API_URL`: The URL where the API it pushes to exists
  * `TRIBE_URL`: The URL to the Tribe instance
  * `TRIBE_USER`: The TribeHR user
  * `TRIBE_PASS`: The TribeHR user's API key
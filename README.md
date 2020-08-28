# NYUCourantInstituteWeather

This is an AWS Lambda function that runs each night to send you the following day's weather forecast so you can plan your day accordingly.

# Prerequisites

To use this function, you'll need a Dark Sky API key. Dark Sky is the service that we'll be using to get weather data - you can create a free account that provides up to 1000 API calls per day at https://darksky.net/dev.

# Installation

1. In your AWS account, open up a Cloud9 environment. Clone this repo within your ~/environment directory and run npm install to install the dependencies.

2. Go to the SNS dashboard and create a new topic - we'll call it NYUCourantInstituteWeatherTopic, for example.

3. Click Create subscription, choose SMS as the protocol, and enter your phone number in E.164 format.

4. If you'd like multiple people to subscribe to your weather alerts, repeat step 3 for each of them. Be sure to get their permission before doing so!

5. Create an IAM role for your function - for simplicity, we'll call it NYUCourantInstituteWeatherRole. Add this policy to your NYUCourantInstituteWeatherRole as well.

# Getting your Geographic Coordinates

The Dark Sky API requires geographical coordinates to function properly - so how do you determine these? The included helper.js script uses Google Maps to parse an arbitrarily formatted location into the latitude and longitude values you'll need. This means you can enter a city and state, a full street address, a ZIP code, or a variety of other types of address formats, and you'll get back a value that will work.

To get your coordinates, run the helper script with your location as an argument (example: node helper.js 'New York, NY'). Copy the output exactly as it appears, as a comma separated pair, and paste it into the COORDS environment variable.

# Testing

To test your function, click the Test button at the top of the console. You'll need to define a test event before you can run the function - since we're using scheduling to trigger our function, not an external source that provides input, you can leave the default object in the text editor.

Once you've created your test event, click Save to exit the modal, and click Test at the top of the page. Execution details will be provided, and you'll see whether the function succeeded or failed.

If there are errors, you'll see them at the top of the page in a red box. But if everything went well, you'll get a text message with tomorrow's weather!



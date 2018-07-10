# Guess that Hex!

_Guess that Hex_ is a multiplayer web-based game that I made just for fun. A color is presented, and the players try to guess the color's hex value.

The game is built using React and Firebase for real-time communication. It's hosted on S3.

![Gif of Guess that Hex](public/hex.gif?raw=true)

## Development

Run `yarn install`. Then start the app with `yarn start`.

## Deployment

First, make sure you have a `.env` file with keys: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, then run `yarn deploy`. This builds the project for production and uploads the build to S3.

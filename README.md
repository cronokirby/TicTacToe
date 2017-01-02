This is an example for a small electron application, implementing a "backend"
written in **Haskell**

This application is a simple Tic-Tac-Toe game. The UI is done in HTML / CSS / JS,
interfacing with a Haskell backend that takes care of all the game AI.

### Building
To build this app, you need to first use `stack build --copy-bins` in `/backend`,
transfering the compiled backend to static-resources. After that, running
`npm install && npm start` should take care of all the dependencies.

I've packaged the app successfully to win64, it *should* package successfully to other
platforms, but I haven't tested it thoroughly

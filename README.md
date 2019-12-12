# crumblepad

Let's get ready to crumble!

## explore the app

<https://crumblepad.web.app/home>

## docs to read

* [Build Your First Ionic React App](https://ionicframework.com/docs/react/your-first-app)
* [Components to use](https://ionicframework.com/docs/components)

## installation for developers

1. `npm install -g ionic@latest`
2. `git clone https://github.com/M-Frikken/crumblepad.git`
3. `cd crumblepad`
4. `npm i`
5. `git checkout development`
6. go to <https://firebase.google.com/> and register the app
7. create `.env` and insert your credentials with the following structure
    ```bash
    REACT_APP_API_KEY=xxx
    REACT_APP_AUTH_DOMAIN=xxx.firebaseapp.com
    REACT_APP_DATABASE_URL=https://xxx.firebaseio.com
    REACT_APP_PROJECT_ID=xxx
    REACT_APP_STORAGE_BUCKET=xxx.appspot.com
    REACT_APP_MESSAGING_SENDER_ID=xxx
    REACT_APP_ID=xxx
    REACT_APP_MEASUREMENT_ID=G-xxx
    ```
8. `npm run start`

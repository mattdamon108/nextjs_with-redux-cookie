# Next.js example of using auth token in localStorage with redux

## How to use

Git clone

```bash
git clone https://github.com/mattdamon108/nextjs_with-redux-cookie.git
```

Install it and run:

```bash
cd netxjs_with-redux-cookie

npm install
npm run dev
# or
yarn
yarn dev
```

## The idea behind the example

This example adds the part of using auth token in cookie based on the example of next.js with-redux(https://github.com/zeit/next.js/blob/canary/examples/with-redux/README.md).

In case of using a token for authentication, for example JWT, generally the recommended way to save this token for client side is to localStorage.

In terms of SSR, Nevertheless, the redux can not get a token as initialState from the localStorage which is the Client side API. Some of issues in Next.js github suggests using cookie to send a value to SSR server instead of localStorage. In this case, redux can set the store with a token along with cookie as initialState during server side rendering.

This example is to show how to get a token from cookie in request and hydrate it with redux.

`with-redux-store.js`

```javascript
static async getInitialProps(appContext) {
  // Get or Create the store with `undefined` as initialState
  // This allows you to set a custom default initialState
  const reduxStore = getOrCreateStore();

  // Provide the store to getInitialProps of pages
  appContext.ctx.reduxStore = reduxStore;

  let appProps = {};
  if (typeof App.getInitialProps === "function") {
    appProps = await App.getInitialProps(appContext);
  }

  // get a token in cookie
  const { token } = nextCookie(appContext.ctx);
  const isLoggedIn = token ? true : false;
  if (token) {
    reduxStore.dispatch(toggleLogged(isLoggedIn, token));
  }
}
```

## Reference

The example of Next.js with-redux
(https://github.com/zeit/next.js/blob/canary/examples/with-redux/README.md)

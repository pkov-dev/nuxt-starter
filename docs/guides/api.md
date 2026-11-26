# API

## Server

Routes of a business area live in its layer: `layers/<name>/server/api/`.
A route validates the body with `readValidatedBodyZod` and returns error codes, not texts.
Service and repository: [decisions/layers.md](../decisions/layers.md#structure-of-a-layer).
Errors: [decisions/validation-and-errors.md](../decisions/validation-and-errors.md).

## Client

- Components do not call the API directly. Calls go through a composable of the layer, e.g. `useProducts()`.
- The composable calls the endpoint, handles loading and error state and normalizes the response.
- Business logic stays out of components: in composables on the client, in services on the server.
- A third-party client (e.g. Better Auth) is used through its own composables; its errors are mapped to app codes.

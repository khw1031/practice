- client- or server-side Search
- paginated fetch

### client cache

searching "redux", "react", "redux". Total 3 requests. "redux" is duplicated.
client-side cache: store each result in client side.
When a request to the API is made, it checks if a result is already there and uses the cache if it is.
Otherwise, an API request is made to fetch the data.

To have a client cache for each result, you have to store multiple results rather than one result in your local component state.
The results object will be a map with the search term as key and the result as value.
Each result from the API will be saved by the search term (key).

### Error Handling

No application is complete without error handling. The error is just another state, which we store in the local state and display with conditional rendering in the component.

### fetch

polyfills, isomorphic-fetch


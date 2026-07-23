# Serializer class

`Serializer` encodes and decodes Protocol Buffer messages from a descriptor.

<!-- example: reference-koilib-serializer -->
```javascript
--8<-- "examples/javascript/references/koilib-api-tour/index.js:serializer"
```

[View complete file](https://github.com/koinos/koinos-docs/blob/master/examples/javascript/references/koilib-api-tour/index.js) ·
[Run example](https://stackblitz.com/fork/github/koinos/koinos-docs/tree/master/examples/javascript/references/koilib-api-tour)

This local round trip needs no network connection and checks that the decoded
message matches the input.

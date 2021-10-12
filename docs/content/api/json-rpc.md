# JSON-RPC

Koinos supports external APIs via JSON-RPC. Each [microservice](architecture/microservice.md) defines its own API calls. The JSON-RPC microservice acts as a translation layer between JSON-RPC and the internal message format. Koinos uses a dotted decimal system to route API requests to the correct microservice. Microserives can be called with their fully qualified namespace or by the microservice name.  For example, to call `get_head_info` in the Chain microservice you would call `"method":"koinos.rpc.chain.get_head_info"` or `"method":"chain.get_head_info"`.

## Descriptor Files

The JSON-RPC microservice works by reading Protobuf descriptor files to parse and route API calls. By default, the Koinos Proto descriptor file is provided to handle API calls for Koinos microservices. API calls for additional microservices can be handled by providing the JSON-RPC microservice with your own Protobuf descriptor file.

# Local-Storage Implementation
The browser’s localStorage API was used to ensure that user data survives page refreshing. Since localStorage only accepts strings, the transactions array could not be saved directly, so it was serialized using JSON.stringify before storage and restored using JSON.parse when loading. useEffect hook was used to handle saving and retrieving state automatically

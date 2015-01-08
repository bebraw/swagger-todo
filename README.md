[![build status](https://secure.travis-ci.org/bebraw/swagger-todo.png)](http://travis-ci.org/bebraw/swagger-todo)

# swagger-todo

Swagger TODO backend example.

## Usage

> NOTE! UI is broken at the moment as auth relies on jwt now. There is however a simple test case showing how to authenticate and access the UI, though.

1. `npm install`
2. `npm start`. If you want to restart server automatically during development, hit `node-dev bin/www` (expects [node-dev](https://www.npmjs.org/package/node-dev))
3. Surf to `http://localhost:3000/v1/docs/` for API navigator
4. Set field `api_key` to `apikey`
5. Hit `Explore`
6. Perform operations. You could start with a POST. Note that you have to format POST body within a JSON string. Ie. `{"name": "demo"}` would work.

In case you want to modify the configuration of the project, you can either set environment variables (first priority) or copy `config/config.template.js` as `config/config.js` and do needed adjustments there. If you want to mute `Failed to find value` warnings, set `MUTE_PARSE_ENV` to true.

## License

`swagger-todo` is available under MIT. See LICENSE for more details.

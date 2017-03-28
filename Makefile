install: install-deps install-flow-typed

console:
	npm run gulp console

init:
	npm run gulp init

start:
	DEBUG="application:*" npm run nodemon -- --watch src --ext '.js,.pug' --exec npm run gulp -- server

install-deps:
	yarn

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build

test:
	NODE_ENV=test npm test

check-types:
	npm run flow

lint:
	npm run eslint -- src test

publish:
	npm publish

.PHONY: test

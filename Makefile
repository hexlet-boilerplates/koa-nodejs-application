all: compose-setup

compose:
	docker-compose up

compose-install:
	docker-compose run web yarn

compose-setup: compose-build compose-install compose-db-setup
	npm run flow-typed install
	# npm run sequalizer db:create

compose-db-setup:
	npm run gulp init

compose-build:
	docker-compose build

compose-test:
	docker-compose run web make test

compose-bash:
	docker-compose run web bash

compose-console:
	docker-compose-npm run gulp console

compose-lint:
	docker-compose run web npm run eslint

start:
	DEBUG="application:*" npm run nodemon -- --watch src --ext '.js,.pug' --exec npm run gulp -- server

compose-check-types:
	docker-compose run web npm run flow

compose-dist-build:
	rm -rf dist
	docker-compose run web npm run build

compose-publish: compose-dist-build
	docker-compose run web npm publish

.PHONY: test

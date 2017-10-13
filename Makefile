all: compose-setup

prepare:
	touch .bash_history
	touch .env

compose:
	docker-compose up

compose-install:
	docker-compose run web yarn

compose-setup: prepare compose-build compose-install compose-db-setup
	npm run flow-typed install

compose-db-setup:
	docker-compose run web npm run sequelize db:migrate

compose-kill:
	docker-compose kill

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
	DEBUG="application:*" npm run nodemon -- --watch .  --ext '.js' --exec npm run gulp -- server

compose-check-types:
	docker-compose run web npm run flow

compose-dist-build:
	rm -rf dist
	docker-compose run web npm run build

compose-publish: compose-dist-build
	docker-compose run web npm publish

.PHONY: test

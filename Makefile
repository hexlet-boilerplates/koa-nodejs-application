all: compose-setup

prepare:
	touch .bash_history
	touch .env

compose:
	docker-compose up

compose-install:
	docker-compose run web npm install

compose-setup: prepare compose-build compose-install compose-db-setup
	npx flow-typed install

compose-db-setup:
	docker-compose run web npx sequelize db:migrate

compose-kill:
	docker-compose kill

compose-build:
	docker-compose build

compose-test:
	docker-compose run web make test

compose-bash:
	docker-compose run web bash

compose-console:
	docker-compose npx gulp console

compose-lint:
	docker-compose run web npx eslint .

start:
	DEBUG="application:*" npx nodemon --watch .  --ext '.js' --exec npx gulp server

compose-check-types:
	docker-compose run web npx flow

compose-dist-build:
	rm -rf dist
	docker-compose run web npx build

compose-publish: compose-dist-build
	docker-compose run web npm publish

.PHONY: test

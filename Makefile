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

compose-check-types:
	docker-compose run web npx flow

compose-dist-build:
	rm -rf dist
	docker-compose run web npx build

compose-publish: compose-dist-build
	docker-compose run web npm publish

start:
	npx gulp devServar

build:
	NODE_ENV=production npx gulp prodBuild

webpack-bundle:
	NODE_ENV=production npx webpack-cli

console:
	npx gulp serverConsole

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

migrate:
	npx sequelize db:migrate

migrate-undo:
	npx sequelize db:migrate:undo

test:
	npx jest

.PHONY: test

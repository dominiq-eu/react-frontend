# Makefile

DOCKER = docker
#RUN = $(DOCKER) run -it --network host -v "$(PWD):/app" -w /app  node:12-alpine3.9
RUN = $(DOCKER) run -it -p "1234:1234" -p "8008:8008" -v "$(PWD):/app" -w /app  node:12-alpine3.9


default: help


.PHONY: help
help:
	@echo "Usage: make [enter|dev|test|dist]"
	@echo "\t dev    Run file watcher and local server for development"
	@echo "\t enter  Enter dev environment"
	@echo "\t test   Run tests"
	@echo "\t clean  Clean dev dir"


.PHONY: enter
enter:
	@echo "Entering dev environment.."
	@$(RUN) /bin/sh


node_modules:
	@$(RUN) yarn install

.PHONY: dev
dev: node_modules
	@$(RUN) yarn start


.PHONY: clean
clean:
	$(RUN) rm -rf /app/dist /app/.cache /app/node_modules

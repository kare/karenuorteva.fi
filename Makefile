
default: serve

.PHONY: serve
serve:
	gulp serve

.PHONY: dist
dist:
	gulp build

.PHONY: lint
lint:
	gulp lint

.PHONY: lint-test
lint-test:
	gulp lint:test

.PHONY: test
test:
	gulp serve:test

.PHONY: clean
clean:
	gulp clean


default: serve

.PHONY: serve
serve:
	npm run dev

.PHONY: dist
dist: clean
	npm run build

.PHONY: clean
clean:
	npm run clean

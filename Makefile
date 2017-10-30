
default: serve

DISTDIR = "../kare.github.io"

.PHONY: serve
serve:
	npm run dev

.PHONY: dist
dist: clean
	npm run build

.PHONY: clean
clean:
	npm run clean

.PHONY: exists
exists:
	@if [ ! -d "$(DISTDIR)" ]; then \
		echo "$(DISTDIR) doesn't exist. exiting"; \
		exit 1; \
	fi

.PHONY: deploy
deploy: exists dist
	cd $(DISTDIR); if [ "`ls`" != "" ]; then git rm -rf *; fi
	cp -vr dist/* $(DISTDIR)
	cd $(DISTDIR); git add *
	cd $(DISTDIR); git commit -m 'Deploy version $(shell date +"%d.%m.%Y %H:%M:%S")'
	cd $(DISTDIR); git push

# Put all 'bin' dirs beneath node_modules into $PATH so that we're using
# the locally installed AssetGraph:
# Ugly 'subst' hack: Check the Make Manual section 8.1 - Function Call Syntax
NPM_BINS := $(subst bin node,bin:node,$(shell if test -d node_modules; then find node_modules/ -name bin -type d; fi))
ifneq ($(NPM_BINS),)
	PATH := ${NPM_BINS}:${PATH}
endif

deps := $(shell find public/ -type f -name "*.*")

public-min: public/index.html $(deps)
	buildProduction \
	    --root public \
	    --outroot public-min \
	    $<

PHONY: clean

clean:
	rm -rf public-min
deps := $(shell find public/ -type f -name "*.*")

public-min: public/index.html $(deps)
	node_modules/assetgraph-builder/bin/buildProduction \
	    --root public \
	    --outroot public-min \
	    $<

PHONY: clean

clean:
	rm -rf public-min

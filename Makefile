build:
	docker buildx build --platform linux/amd64,linux/arm/v7 -t aloussase/birl-bot:latest .

publish: build
	docker push aloussase/birl-bot:latest

.PHONY: build publish

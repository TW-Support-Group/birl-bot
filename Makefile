REMOTE_USER := aloussase
REMOTE_IP := jupiter
PROJECT := birl-bot
REMOTE_PATH := /home/$(REMOTE_USER)

build:
	bun build --compile --target=bun-linux-arm64 ./index.ts --outfile birl-bot
	scp birl-bot $(REMOTE_USER)@$(REMOTE_IP):$(REMOTE_PATH)/birl-bot
	scp birl-bot.service $(REMOTE_USER)@$(REMOTE_IP):$(REMOTE_PATH)/birl-bot.service

.PHONY: build

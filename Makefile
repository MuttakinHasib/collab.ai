# Makefile for Collab.ai Next.js Application - Latest Docker Compose

# Variables
DOCKER_COMPOSE = docker compose
SERVICE_NAME = web
DEV_SERVICE_NAME = web-dev
IMAGE_NAME = collab-ai-web
COMPOSE_FILE = compose.yml

# Colors for output
RED = \033[31m
GREEN = \033[32m
YELLOW = \033[33m
BLUE = \033[34m
RESET = \033[0m

.PHONY: help build build-dev up up-dev down clean logs logs-dev install lint test shell shell-dev restart restart-dev

# Default target
help: ## Show this help message
	@echo "$(BLUE)Collab.ai Development Commands$(RESET)"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "$(GREEN)%-20s$(RESET) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development commands
install: ## Install dependencies locally
	@echo "$(YELLOW)Installing dependencies...$(RESET)"
	bun install

dev: ## Start local development server
	@echo "$(YELLOW)Starting local development server...$(RESET)"
	bun run dev

build-local: ## Build the application locally
	@echo "$(YELLOW)Building application locally...$(RESET)"
	bun run build

start-local: ## Start the production build locally
	@echo "$(YELLOW)Starting production build locally...$(RESET)"
	bun run start

lint: ## Run linting
	@echo "$(YELLOW)Running linter...$(RESET)"
	bun run lint

# Docker development commands
build-dev: ## Build development Docker image
	@echo "$(YELLOW)Building development Docker image...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev build $(DEV_SERVICE_NAME)

up-dev: ## Start development environment with Docker
	@echo "$(YELLOW)Starting development environment...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev up -d $(DEV_SERVICE_NAME)

down-dev: ## Stop development environment
	@echo "$(YELLOW)Stopping development environment...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev down

logs-dev: ## Show development logs
	@echo "$(YELLOW)Showing development logs...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev logs -f $(DEV_SERVICE_NAME)

restart-dev: ## Restart development environment
	@echo "$(YELLOW)Restarting development environment...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev restart $(DEV_SERVICE_NAME)

shell-dev: ## Access development container shell
	@echo "$(YELLOW)Accessing development container...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev exec $(DEV_SERVICE_NAME) sh

watch-dev: ## Start development with file watching (Docker Compose v2.22+)
	@echo "$(YELLOW)Starting development with file watching...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev watch

# Docker production commands
build: ## Build production Docker image
	@echo "$(YELLOW)Building production Docker image...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod build $(SERVICE_NAME)

up: ## Start production environment with Docker
	@echo "$(YELLOW)Starting production environment...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod up -d $(SERVICE_NAME)

down: ## Stop production environment
	@echo "$(YELLOW)Stopping production environment...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod down

logs: ## Show production logs
	@echo "$(YELLOW)Showing production logs...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod logs -f $(SERVICE_NAME)

restart: ## Restart production environment
	@echo "$(YELLOW)Restarting production environment...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod restart $(SERVICE_NAME)

shell: ## Access production container shell
	@echo "$(YELLOW)Accessing production container...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod exec $(SERVICE_NAME) sh



# Cleanup commands
clean: ## Clean up Docker resources
	@echo "$(YELLOW)Cleaning up Docker resources...$(RESET)"
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
	docker system prune -f

clean-all: ## Clean up all Docker resources including images
	@echo "$(RED)Cleaning up all Docker resources...$(RESET)"
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
	docker system prune -af
	docker volume prune -f

# Health check
health: ## Check if services are running
	@echo "$(YELLOW)Checking service health...$(RESET)"
	$(DOCKER_COMPOSE) ps

health-dev: ## Check development service health
	@echo "$(YELLOW)Checking development service health...$(RESET)"
	$(DOCKER_COMPOSE) --profile dev ps
	@echo "$(YELLOW)Health check status:$(RESET)"
	$(DOCKER_COMPOSE) --profile dev exec $(DEV_SERVICE_NAME) curl -f http://localhost:3000/health || echo "$(RED)Health check failed$(RESET)"

health-prod: ## Check production service health
	@echo "$(YELLOW)Checking production service health...$(RESET)"
	$(DOCKER_COMPOSE) --profile prod ps
	@echo "$(YELLOW)Health check status:$(RESET)"
	$(DOCKER_COMPOSE) --profile prod exec $(SERVICE_NAME) curl -f http://localhost:3000/health || echo "$(RED)Health check failed$(RESET)"

# Quick development workflow
quick-dev: build-dev up-dev logs-dev ## Build and start development environment with logs

quick-prod: build up logs ## Build and start production environment with logs 
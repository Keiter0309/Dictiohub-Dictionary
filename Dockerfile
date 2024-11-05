# .github/workflows/ci-cd.yml
name: CI/CD Pipeline with Docker

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-push-docker:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push backend image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/my-backend-app:latest -f DA-BE/Dockerfile .
          docker push ${{ secrets.DOCKER_USERNAME }}/my-backend-app:latest

      - name: Build and push frontend image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/my-frontend-app:latest -f DA-FE/Dockerfile .
          docker push ${{ secrets.DOCKER_USERNAME }}/my-frontend-app:latest

  deploy:
    needs: build-and-push-docker
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        env:
          SSH_KEY: ${{ secrets.SSH_KEY }}
          SERVER_USER: ${{ secrets.SERVER_USER }}
          SERVER_HOST: ${{ secrets.SERVER_HOST }}
        run: |
          echo "$SSH_KEY" | tr -d '\r' | ssh-add - > /dev/null
          ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST '
            docker pull ${{ secrets.DOCKER_USERNAME }}/my-backend-app:latest
            docker pull ${{ secrets.DOCKER_USERNAME }}/my-frontend-app:latest
            docker-compose -f /path/to/your/docker-compose.yml up -d
          '

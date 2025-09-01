#!/bin/bash

FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend/spring-boot"

cleanup() {
  echo -e "\nStopping applications..."

  if [[ -n "$FRONTEND_PID" ]]; then
    kill "$FRONTEND_PID"
    echo "React frontend stopped."
  fi

  if [[ -n "$BACKEND_PID" ]]; then
    kill "$BACKEND_PID"
    echo "Spring Boot backend stopped."
  fi

  exit 0
}

trap cleanup SIGINT

echo "Starting React frontend..."
cd "$FRONTEND_DIR"
npm start &  
FRONTEND_PID=$!
cd - > /dev/null

echo "Starting Spring Boot backend..."
cd "$BACKEND_DIR"
./mvnw spring-boot:run & 
BACKEND_PID=$!
cd - > /dev/null

wait

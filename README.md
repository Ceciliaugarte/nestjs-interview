Check integration tests at: (https://github.com/crunchloop/interview-tests)

---

# 📝 ToDo List API

A simple RESTful API for managing task lists (`TodoLists`) and their tasks (`Todotasks`), built with **NestJS** and **Typescript**.

This API allows users to:

- Create, view, update, and delete **ToDo Lists**.
- Add, view, update, and delete **ToDo tasks** within lists.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📦 API Endpoints

### 🗂️ TodoLists

- `GET /api/todolists` – Get all lists
- `GET /api/todolists/:todoListId` – Get list by ID
- `POST /api/todolists` – Create new list
- `PUT /api/todolists/:todoListId` – Update list
- `DELETE /api/todolists/:todoListId` – Delete list

### ✅ Todotasks

- `GET /api/todotasks` – Get all tasks
- `GET /api/todotasks/:todotaskId` – Get task by ID
- `POST /api/todotasks` – Create new task
- `PUT /api/todotasks/:todotaskId` – Update task
- `DELETE /api/todotasks/:todotaskId` – Delete task

> ℹ️ When a `TodoList` is deleted, all its associated `Todotasks` are also removed automatically.

## Example Request Payloads

### Create a TodoList

```json
{
  "name": "Groceries"
}
```

### Update a TodoList

PUT /api/todolists/1

```json
{
  "name": "Weekend Groceries"
}
```

### Create a Todotask

```json
{
  "description": "Buy eggs",
  "todoListId": 1
}
```

### Update a Todotask

PUT /api/todotasks/2

```json
{
  "description": "Buy organic eggs",
  "completed": true
}
```

# 📝 ToDo List API

A simple RESTful API for managing item lists (`TodoLists`) and their items (`Todoitems`), built with **NestJS** and **Typescript**.

This API allows users to:

- Create, view, update, and delete **ToDo Lists**.
- Add, view, update, and delete **ToDo items** within lists.

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

## API Endpoints

### TodoLists

- `GET /api/todolists` – Get all lists
- `GET /api/todolists/:todoListId` – Get list by ID
- `POST /api/todolists` – Create new list
- `PUT /api/todolists/:todoListId` – Update list
- `DELETE /api/todolists/:todoListId` – Delete list

### Todoitems

- `GET /api/todoitems/list/:todoListId` – Get all items from a list (By list ID)
- `GET /api/todoitems/:todoitemId` – Get item by ID
- `POST /api/todoitems` – Create new item
- `PUT /api/todoitems/:todoitemId` – Update item
- `PUT /api/todoitems/:todoitemId/complete` – Complete an item
- `DELETE /api/todoitems/:todoitemId` – Delete item

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

### Create a Todoitem

```json
{
  "description": "Buy eggs",
  "todoListId": 1
}
```

### Update a Todoitem

PUT /api/todoitems/2

```json
{
  "description": "Buy organic eggs"
}
```

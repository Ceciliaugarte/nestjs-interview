# ToDo API

A simple RESTful API for managing item lists (`TodoLists`) and their items (`Todoitems`), built with **NestJS** and **Typescript**.

This API allows users to:

- Create, view, update, and delete **ToDo Lists**.
- Add, view, update, and delete **ToDo items** within lists.
- Interact with the API via natural language using **Model Context Protocol (MCP)**

## Installation

Clone the repository and install dependencies:

```bash
$ npm install
```

## Running the app

```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
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

### Example Requests:

#### Create a TodoList

```json
{
  "name": "Groceries"
}
```

#### Update a TodoList

PUT /api/todolists/1

```json
{
  "name": "Weekend Groceries"
}
```

#### Create a Todoitem

```json
{
  "description": "Buy eggs",
  "todoListId": 1
}
```

#### Update a Todoitem

PUT /api/todoitems/2

```json
{
  "description": "Buy organic eggs"
}
```

## MCP Integration:

This project integrates with Model Context Protocol (MCP), allowing interaction with the ToDo API via natural language.

### Run the MCP Server:

```bash
$ npm run start:mcp
```

### Available MCP Tools:

| Tool Name         | Description                  | Parameters                                              |
| ----------------- | ---------------------------- | ------------------------------------------------------- |
| create_list       | Creates a new todo list      | name: string                                            |
| get_all_lists     | Returns all todo lists       | (none)                                                  |
| get_list_by_id    | Returns a list by its ID     | listId: string                                          |
| update_list       | Updates a list by ID         | listId: string, name: string                            |
| delete_list       | Deletes a list by ID         | listId: string                                          |
| create_item       | Creates a new item in a list | todoListId: string, description: string                 |
| get_items_by_list | Gets all items for a list    | listId: string                                          |
| get_item_by_id    | Gets an item by ID           | itemId: string                                          |
| update_item       | Updates an item              | itemId: string, description: string, completed: boolean |
| complete_item     | Marks an item as completed   | itemId: string                                          |
| delete_item       | Deletes an item              | itemId: string                                          |

### Example prompt (Claude Desktop)

-> "Create a new todo list called 'Work Tasks' "

MCP Client will call the create_list tool with:

json

```
{
  "name": "Work Tasks"
}
```

-> "Add a new item 'Prepare presentation' to list with ID 2 "

MCP Client will call create_item with:

json

```
{
  "todoListId": "2",
  "description": "Prepare presentation"
}
```

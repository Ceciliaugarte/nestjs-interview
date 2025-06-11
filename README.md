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

## Running the API

```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev
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
- `PATCH /api/todoitems/:todoitemId/complete` – Complete an item
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## MCP Integration:

This project integrates with Model Context Protocol (MCP), allowing interaction with the ToDo API via natural language.

### Run the MCP Server:

Open a different terminal session and run:

```bash
$ npm run start:mcp
```

This command exposes the available tools (listed below) to MCP Clients.

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

If you are using Claude Desktop as a client, you need to configure it to connect to the MCP API server:

- Open Claude Desktop
- Go to Menu -> File -> Settings
- In the Developer section, click Add Config
- Open the claude_desktop_config file and paste the following:

```json
{
  "mcpServers": {
    "todo-api": {
      "command": "npm",
      "args": [
        "--silent",
        "--prefix",
        "/Users/yourUsername/yourPathToTheProject/nestjs-interview",
        "run",
        "start:mcp"
      ],
      "cwd": "/Users/yourUsername/yourPathToTheProject/nestjs-interview"
    }
  }
}
```

Replace /Users/yourUsername/yourPathToTheProject/nestjs-interview with the absolute path to the root directory of your project.

Once configured, reopen Claude Desktop and it will connect to your local MCP server, allowing you to interact with the API using natural language.

### Example prompt

→ "Create a new todo list called 'Work Tasks'"

MCP Client will call the create_list tool with:

```json
{
  "name": "Work Tasks"
}
```

→ "Add a new item 'Prepare presentation' to list 'Work Tasks'"

MCP Client will call create_item with:

```json
{
  "todoListId": "2",
  "description": "Prepare presentation"
}
```

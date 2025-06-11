import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

const server = new McpServer({
  name: 'todo-api',
  version: '1.0.0',
});

server.tool(
  'create_list',
  'Creates a new list',
  {
    name: z.string(),
  },
  async ({ name }) => {
    const response = await fetch(`${API_URL}/todolists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool('get_all_lists', 'Returns all the lists', {}, async () => {
  const response = await fetch(`${API_URL}/todolists`);
  const result = await response.json();
  return { content: [{ type: 'text', text: JSON.stringify(result) }] };
});

server.tool(
  'get_list_by_id',
  'Returns a specific list by its ID',
  {
    listId: z.string(),
  },
  async ({ listId }) => {
    const response = await fetch(`${API_URL}/todolists/${listId}`);
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'update_list',
  'Updates a list by its Id',
  {
    listId: z.string(),
    name: z.string(),
  },
  async ({ listId, name }) => {
    const response = await fetch(`${API_URL}/todolists/${listId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'delete_list',
  'Deletes a list by its Id',
  {
    listId: z.string(),
  },
  async ({ listId }) => {
    const response = await fetch(`${API_URL}/todolists/${listId}`, {
      method: 'DELETE',
    });
    return {
      content: [
        {
          type: 'text',
          text:
            response.status === 200
              ? 'List deleted'
              : 'Error deleting the list',
        },
      ],
    };
  },
);

server.tool(
  'create_item',
  'Creates a new todoItem',
  {
    todoListId: z.string(),
    description: z.string(),
  },
  async ({ todoListId, description }) => {
    const response = await fetch(`${API_URL}/todoitems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todoListId: Number(todoListId),
        description,
      }),
    });
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'get_items_by_list',
  'Returns all the items of a list',
  {
    listId: z.string(),
  },
  async ({ listId }) => {
    const response = await fetch(`${API_URL}/todoitems/list/${listId}`);
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'get_item_by_id',
  'Returns a specific item by its Id',
  {
    itemId: z.string(),
  },
  async ({ itemId }) => {
    const response = await fetch(`${API_URL}/todoitems/${itemId}`);
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'update_item',
  'Updates an item',
  {
    itemId: z.string(),
    description: z.string(),
    completed: z.boolean(),
  },
  async ({ itemId, description, completed }) => {
    const response = await fetch(`${API_URL}/todoitems/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        completed,
      }),
    });
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'complete_item',
  'Marks the item as completed',
  {
    itemId: z.string(),
  },
  async ({ itemId }) => {
    const response = await fetch(`${API_URL}/todoitems/${itemId}/complete`, {
      method: 'PATCH',
    });
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'delete_item',
  'Deletes an item',
  {
    itemId: z.string(),
  },
  async ({ itemId }) => {
    const response = await fetch(`${API_URL}/todoitems/${itemId}`, {
      method: 'DELETE',
    });
    return {
      content: [
        {
          type: 'text',
          text:
            response.status === 200
              ? 'Item deleted'
              : 'Error deleting this item',
        },
      ],
    };
  },
);

export { server };

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const API_URL = process.env.API_URL || 'http://localhost:3000';

const server = new McpServer({
  name: 'todo-app',
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
  'create_item',
  'Creates a new todoItem',
  {
    listId: z.string(),
    description: z.string(),
  },
  async ({ listId, description }) => {
    const response = await fetch(`${API_URL}/todoitems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listId, description }),
    });
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'get_items_by_list',
  'Returns all the items',
  {
    listId: z.string(),
  },
  async ({ listId }) => {
    const response = await fetch(`${API_URL}/todoitems`);
    const result = await response.json();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  },
);

server.tool(
  'update_item',
  'Updates an item',
  {
    itemId: z.string(),
  },
  async ({ itemId }) => {
    const response = await fetch(`${API_URL}/todoitems/${itemId}`, {
      method: 'PUT',
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
          text: response.status === 204 ? 'Deleted' : 'Error',
        },
      ],
    };
  },
);

export { server };

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server } from './mcp-todoserver';

async function main() {
  console.error('Starting MCP server...');
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP server connected');
}

main();

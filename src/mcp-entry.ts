import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server } from './mcp-todoserver';

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();

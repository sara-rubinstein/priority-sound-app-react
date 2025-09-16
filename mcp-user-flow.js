const { MCPClient } = require('@playwright/mcp');

(async () => {
  const client = new MCPClient();
  await client.connect();

  // User flow: Open app, search, select result, verify Now Playing
  await client.sendIntent('Go to http://localhost:3000');
  await client.sendIntent('Type "Adele" in the search box');
  await client.sendIntent('Click the Search button');
  await client.sendIntent('Click the first search result');
  await client.sendIntent('Verify the Now Playing section is visible');

  await client.disconnect();
})();

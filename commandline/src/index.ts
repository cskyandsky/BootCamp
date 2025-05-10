import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import { runCommand } from "./commond.js";


// Create server instance 
const server = new McpServer ({
  name: "commandline",
  version: "1.0.0"
});

interface ExecResponse {
  stdout: string;
  stderr: string;
}

server.tool(
  "run-command",
  "Executes a shell command",
  {
    cmd: z.string().describe("The command to execute in the shell"),
  },
  async ({cmd}) => {
    const response = await runCommand(cmd);
    return {
      content: [
        {
          type:"text",
          text: `stdout: \n${response.stdout}`,
        },
        {
          type: "text",
          text:`stderr: \n${response.stderr}`,
        },
      ],
    };
  }
);



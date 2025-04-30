
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

/**
 * 
 * @param cmd - The command to run in the shell
 * @returns A promise that resolves to an object with stdout and stderr properties
 */

export async function runCommand(
    cmd :  string
  ): Promise<{ stdout: string, stderr: string }> {
    try {
        const { stdout, stderr } = await execPromise(cmd);
        
        return { stdout: stdout.trim(), stderr: stderr.trim() }; // Remove extra whitespace
    } catch (error: unknown) {
        console.error (`Error excuting commond: ${cmd}`);
        console.error(error);
        let errorMessage = "Unknown error occurred";

        if (error instanceof Error) {
          errorMessage =error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }else if (error && typeof error ==='object' && 'message' in error) {
          errorMessage = (error as { message: string}).message;
        }
        return { stdout: "", stderr: errorMessage};
    }
}


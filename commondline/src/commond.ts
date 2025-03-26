
import { exec } from "child_process";
import { promisify } from "util";
import { string } from "zod";

const execPromise = promisify(exec);

export async function runCommand({ cmd }: { cmd: string; }): Promise<{ stdout:string, stderr: string }> {
    try {
        const { stdout, stderr } = await execPromise(cmd);
        
        return { stdout: stdout.trim(), stderr: stderr.trim()}; // Remove extra whitespace
    } catch (error) {
        console.error (`Error excuting commond: ${cmd}`);
        console.error(error);
        let errorMessage = "Unknown error occurred";
        if (error instanceof Error) {
          errorMessage =error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }else if (error && typeof error ==='object' && 'message' in error) {
          errorMessage = String(error.message)
        }
        return {stdout:"", stderr: error.message};
    }
}


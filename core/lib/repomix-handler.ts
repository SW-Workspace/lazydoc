import { runCli } from 'repomix';
import fs from 'fs';

export async function processRemoteRepoPublic(repoUrl: string) {
    try{
        const options = {
            remote: repoUrl,
            output: 'output.xml',
            compress: true
        };
        
        const result = await runCli(['.'], process.cwd(), options);
        
        const text = fs.readFileSync('output.xml', 'utf-8');
        
        return {"text": text, "result": result}
    } catch(error: any) {
        throw new Error(`There was a error getting repository: ${error.message}`)
    }
}
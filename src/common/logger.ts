import { Injectable } from '@nestjs/common';
import { appendFileSync, mkdirSync } from 'node:fs';
export abstract class Logger {
    abstract log(message: string): void;
}
@Injectable()
export class AppLogger extends Logger {
    log(message: string) { const line = `[${new Date().toISOString()}] ${message}`; console.log(line); if (process.env.LOG_TO_FILE === 'true') {
        mkdirSync('logs', { recursive: true });
        appendFileSync('logs/app.log', line + '\n');
    } }
}

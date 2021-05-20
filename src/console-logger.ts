// thaw-object-model/src/console-logger.ts

import { Observable, of } from 'rxjs';

import { getDateTimeUTCString } from 'thaw-common-utilities.ts';

import { ILogEntry, ILogger, loggerPriorityMinimumError } from 'thaw-types';

class ConsoleLogger implements ILogger {
	constructor(private priorityThreshold: number) {}

	public log(logEntry: ILogEntry): Observable<unknown> {
		if (logEntry.priority <= this.priorityThreshold) {
			const message = `${getDateTimeUTCString(logEntry.datetime)} : ${
				logEntry.message
			}`;

			if (logEntry.priority <= loggerPriorityMinimumError) {
				console.error(message);
			} else {
				console.log(message);
			}
		}

		return of(undefined);
	}
}

export function createConsoleLogger(priorityThreshold: number): ILogger {
	return new ConsoleLogger(priorityThreshold);
}

// thaw-object-model/src/log-message-dispatcher.ts

// Note: The words 'log' (noun) and 'logger' are not synonyms.
// A log is a document (i.e. a sequential collection of bits);
// a logger is a software component that writes to a log.

import { Subject } from 'rxjs';

import { ifDefinedThenElse } from 'thaw-common-utilities.ts';
import { ILogEntry, ILogger, ILogMessageDispatcher } from 'thaw-types';

class LogMessageDispatcher implements ILogMessageDispatcher {
	private readonly subject = new Subject<ILogEntry>();

	public addListener(logger: ILogger): void {
		this.subject.subscribe((logEntry: ILogEntry) =>
			logger
				.log({
					priority: logEntry.priority,
					datetime: ifDefinedThenElse(logEntry.datetime, new Date()),
					message: logEntry.message
				})
				.subscribe(
					(result: unknown) => {
						console.log(
							'LogMessageDispatcher: log() succeeded:',
							typeof result,
							result
						);
					},
					(error: unknown) => {
						console.error(
							'LogMessageDispatcher: log() error:',
							typeof error,
							error
						);
					}
				)
		);
	}

	public log(logEntry: ILogEntry): void {
		this.subject.next(logEntry);
	}

	// public flush(): Promise<void> {
	// public flush(): void {
	// 	for (const entry of this.bufferedLogEntries) {
	// 		this.subject.next(entry);
	// 	}

	// 	this.bufferedLogEntries = [];
	// }

	// public close(): void {
	// 	this.subject.close();
	// }
}

export function createLogMessageDispatcher(): ILogMessageDispatcher {
	return new LogMessageDispatcher();
}

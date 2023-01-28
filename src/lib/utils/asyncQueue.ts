type OnProcessTools = {
	lock: () => void;
	unlock: () => void;
};
type OnProcess = (arg: any, tools: OnProcessTools) => any;

class AsyncQueue {
	channelsCount: number;
	concurrency: number;
	waiting: any[];
	onProcess: OnProcess;
	onSuccess: (() => void) | null;
	onFailure: ((err: string, task: any) => void) | null;
	locked: boolean;

	constructor(concurrency: number) {
		this.channelsCount = 0;
		this.concurrency = concurrency;
		this.waiting = [];
		this.onProcess = () => null;
		this.onSuccess = null;
		this.onFailure = null;
		this.locked = false;
	}

	static channels(concurrency: number) {
		return new AsyncQueue(concurrency);
	}

	lock() {
		this.locked = true;
	}

	unlock() {
		this.locked = false;
	}

	add(task: any) {
		if (this.locked) {
			return;
		}
		const canOpenChannel = this.channelsCount < this.concurrency;
		if (canOpenChannel) {
			this.next(task);
			return;
		}
		this.waiting.push(task);
	}

	async next(task: any) {
		this.channelsCount++;
		try {
			await this.onProcess(task, {
				lock: this.lock.bind(this),
				unlock: this.unlock.bind(this)
			});
			if (this.onSuccess) {
				this.onSuccess();
			}
		} catch (err) {
			if (this.onFailure) {
				this.onFailure((err as Error).message, task);
			}
		}
		this.channelsCount--;
		if (this.waiting.length > 0) {
			this.next(this.waiting.shift());
		}
	}

	success(handler: () => void) {
		this.onSuccess = handler;
		return this;
	}

	failure(handler: (err: string, task: any) => void) {
		this.onFailure = handler;
		return this;
	}

	process(handler: OnProcess) {
		this.onProcess = handler;
		return this;
	}
}

export default AsyncQueue;

import { addMessage, resolveMessage, store } from '../state';
import { config } from '../utils';

import type { AckSendMessagePayload, NewMessagePayload } from './events';
import { type EventPayload, EventType } from './events';

function initWebsocket(endpoint: string, token: string) {
	const ws = new WebSocket(`${endpoint}?token=${token}`);

	ws.onmessage = (event) => {
		const data = JSON.parse(event.data) as EventPayload;
		console.log('Received message: ', data.type);
		if (data.type === EventType.SERVER_ACK_SEND_MESSAGE) {
			const payload = data as AckSendMessagePayload;
			payload.message.resolveId = payload.resolveId;
			store.dispatch(resolveMessage(payload.message));
		} else if (data.type === EventType.SERVER_SEND_MESSAGE) {
			const payload = data as NewMessagePayload;
			store.dispatch(
				addMessage({
					conversationId: payload.message.conversationId,
					message: payload.message,
				}),
			);
		}
	};

	ws.onopen = () => {
		console.log('Connected to websocket');
	};

	ws.onclose = (e) => {
		console.log('Socket is closed.', e.reason);
	};

	return ws;
}

export enum WS_TYPE {
	DEFAULT,
}

export const wsMap: Map<WS_TYPE, { connection: WebSocket; id: string }> =
	new Map();

export const initWebsocketWithProfile = (userId: string, jwt: string) => {
	if (wsMap.has(WS_TYPE.DEFAULT)) {
		wsMap.get(WS_TYPE.DEFAULT)?.connection.close();
		wsMap.delete(WS_TYPE.DEFAULT);
	}

	const ws = initWebsocket(config().PEAKEE_WS_URL, jwt);
	wsMap.set(WS_TYPE.DEFAULT, { connection: ws, id: userId });
};
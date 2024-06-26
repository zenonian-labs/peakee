import type { FC } from 'react';
import { memo, useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { AvoidSoftInputView } from 'react-native-avoid-softinput';
import { useDispatch } from 'react-redux';
import { getMessages } from '@peakee/api';
import { store, updateMessagesOfConversation } from '@peakee/state';
import type { OnSelectionFunction } from '@peakee/ui/components';

import Header from './Header';
import Input from './Input';
import MessageList from './MessageList';

type Props = {
	conversationId: string;
	style?: StyleProp<ViewStyle>;
	onPressBack?: () => void;
	onPressText?: (text: string) => void;
	onPressTranslateTool?: () => void;
	onChangeInputText?: (text: string) => void;
	onSelection?: OnSelectionFunction;
};

/**
 * Always make sure that the conversation state is available
 */
const _ConversationFeature: FC<Props> = ({
	conversationId,
	style,
	onPressBack,
	onPressText,
	onPressTranslateTool,
	onChangeInputText,
	onSelection,
}) => {
	const dispatch = useDispatch();

	const initMessages = async () => {
		const conversation =
			store().getState().chat.conversationsMap[conversationId];
		if (conversation.isNotInitialized || conversation.messages) return;
		const messages = await getMessages(conversation.id);
		dispatch(
			updateMessagesOfConversation({
				conversationId: conversation.id,
				messages,
			}),
		);
	};

	useEffect(() => {
		initMessages();
	}, []);

	return (
		<AvoidSoftInputView style={[styles.container, style]}>
			<Header conversationId={conversationId} onPressBack={onPressBack} />
			<MessageList
				conversationId={conversationId}
				onPressText={onPressText}
				onSelection={onSelection}
			/>
			<Input
				conversationId={conversationId}
				onChangeText={onChangeInputText}
				onPressTranslateTool={onPressTranslateTool}
			/>
		</AvoidSoftInputView>
	);
};

export const ConversationFeature = memo(_ConversationFeature);

export default ConversationFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

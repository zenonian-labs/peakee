import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

import { uiStore } from '../state';
import { type ModalConfig, hideModalAction } from '../state/modal';

const ModalContainer = (config: ModalConfig) => {
	const {
		id,
		index,
		props,
		Component,
		onDismiss,
		snapPoints,
		useBackdrop = true,
		backgroundStyle,
		...bottomSheetConfig
	} = config;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handleDismiss = () => {
		onDismiss?.();
		uiStore.dispatch(hideModalAction({ id }));
	};

	useEffect(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<BottomSheetModal
			index={index || 0}
			ref={bottomSheetModalRef}
			snapPoints={snapPoints || ['60%', '80%']}
			onDismiss={handleDismiss}
			handleIndicatorStyle={styles.handleIndicator}
			backdropComponent={useBackdrop ? CustomBackdrop : null}
			backgroundStyle={[styles.background, backgroundStyle]}
			{...bottomSheetConfig}
		>
			<Component {...props} />
		</BottomSheetModal>
	);
};

const CustomBackdrop: FC<BottomSheetBackdropProps> = (props) => {
	return (
		<BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} />
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	handleIndicator: {
		height: 0,
	},
	background: {
		shadowOffset: {
			width: 1,
			height: 1,
		},
		elevation: 8,
		shadowOpacity: 0.5,
		shadowColor: '#000000',
	},
});

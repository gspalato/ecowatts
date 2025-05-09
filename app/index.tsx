import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, AppState, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Logo from '@/components/Logo';
import { PageContainer } from '@/components/PageContainer';
import SafeView from '@/components/SafeView';
import { ThemedText } from '@/components/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';

import { supabase } from '../lib/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const highlightColor = useThemeColor({}, 'highlightColor');

	async function signInWithEmail() {
		if (email === '' || password === '') {
			Alert.alert('Por favor preencha todos os campos.');
		}

		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		setLoading(false);

		if (error) {
			Alert.alert(error.message);
			console.log(error)
		} else {
			router.replace('/(auth)/(tabs)/home');
		}
	}

	async function signUpWithEmail() {
		if (email === '' || password === '') {
			Alert.alert('Por favor preencha todos os campos.');
			return;
		}

		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!session)
			Alert.alert('Cheque seu e-mail para verificar sua conta!');

		setLoading(false);
	}

	return (
		<SafeView style={{ flex: 1 }}>
			<PageContainer>
				<View style={styles.container}>
					<Logo
						style={{
							fontSize: 50,
							lineHeight: 50,
							marginHorizontal: 'auto',
						}}
					/>
					<View
						style={[styles.verticallySpaced, styles.inputContainer]}
					>
						<Input
							onChangeText={(text: string) => setEmail(text)}
							value={email}
							placeholder='E-mail'
							autoCapitalize={'none'}
						/>
						<Input
							onChangeText={(text: string) => setPassword(text)}
							value={password}
							secureTextEntry={true}
							placeholder='Senha'
							autoCapitalize={'none'}
						/>
					</View>
					<View
						style={[
							styles.buttonsContainer,
							styles.verticallySpaced,
						]}
					>
						<Button
							text='Entrar'
							textType='small'
							disabled={loading}
							onPress={() => signInWithEmail()}
							type='primary'
							style={{ width: '100%' }}
						/>
						<Button
							text='Esqueceu a senha?'
							type='secondary'
							disabled={loading}
							onPress={() => signUpWithEmail()}
							style={{
								borderWidth: 0,
								width: 'auto',
								minWidth: 0,
							}}
							textProps={{ style: { color: highlightColor } }}
						/>
					</View>
				</View>
				<Button
					text='Não tem uma conta? Crie uma agora!'
					type='secondary'
					disabled={loading}
					onPress={() => signUpWithEmail()}
					style={{ borderWidth: 0 }}
					textProps={{ style: { color: highlightColor } }}
				/>
			</PageContainer>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		gap: 20,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	inputContainer: {
		gap: 10,
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 5,
	},
});

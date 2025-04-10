import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, AppState, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PageContainer } from '@/components/PageContainer';
import { Title } from '@/components/Title';

import { supabase } from '../lib/supabase';
import { ThemedText } from '@/components/ThemedText';

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

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		setLoading(false);

		if (error) {
			Alert.alert(error.message);
		} else {
			router.replace('/(stack)/home');
		}
	}

	async function signUpWithEmail() {
		if (email === '' || password === '') {
			Alert.alert('Please fill in all fields.');
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

		if (error)
			Alert.alert(error.message);
		if (!session)
			Alert.alert('Please check your inbox for email verification!');

		setLoading(false);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<PageContainer>
				<View style={styles.container}>
					<View style={[styles.verticallySpaced, styles.mt20]}>
						<ThemedText type="title" style={{ width: '100%', textAlign: 'center' }}>
							Ecowatts
						</ThemedText>
						<Text>
							Seja <Text>bem vindo</Text>
						</Text>
					</View>
					<View>
						<Text>
							Entrar
						</Text>
					</View>
					<View style={[styles.verticallySpaced, styles.mt20]}>
						<Input
							onChangeText={(text: string) => setEmail(text)}
							value={email}
							placeholder='E-mail'
							autoCapitalize={'none'}
						/>
					</View>
					<View style={styles.verticallySpaced}>
						<Input
							onChangeText={(text: string) => setPassword(text)}
							value={password}
							secureTextEntry={true}
							placeholder='Senha'
							autoCapitalize={'none'}
						/>
						<Text>Esqueceu a senha?</Text>
					</View>
					<View
						style={[
							styles.horizontalFlex,
							styles.verticallySpaced,
							styles.mt20,
						]}
					>
						<Button
							text='Entrar'
							disabled={loading}
							onPress={() => signInWithEmail()}
						/>
						<Text>Não tem conta? Crie uma<Text disabled={loading} onPress={() => signInWithEmail()} style={{  }}> conta agora.</Text></Text>
					</View>
				</View>
        <Button
					text='Não tem uma conta? Crie uma agora!'
					disabled={loading}
					onPress={() => signUpWithEmail()}
          style={{ borderWidth: 0 }}
				/>
			</PageContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: 'stretch',
	},
	mt20: {
		marginTop: 20,
	},
	horizontalFlex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
	},
});

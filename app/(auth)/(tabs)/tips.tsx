import { SafeAreaView, StyleSheet, View } from 'react-native';

import SafeView from '@/components/SafeView';
import { TabPageContainer } from '@/components/TabPageContainer';
import HeaderContainer from '@/components/HeaderContainer';
import { ThemedText } from '@/components/ThemedText';
import { FlatList } from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColor } from '@/hooks/useThemeColor';

const Page = () => {
	const borderColor = useThemeColor({}, 'borderColor');

	return (
		<TabPageContainer style={{ flex: 1 }}>
			<HeaderContainer>
				<ThemedText type='title'>Dicas</ThemedText>
			</HeaderContainer>
			<FlatList
				data={[
					{
						id: 1,
						title: 'Aparelhos em stand-by',
						icon: 'controller-paus',
						text: 'Muitos aparelhos, como televisores, computadores e videogames, continuam consumindo energia mesmo quando estão em stand-by. Esse consumo, embora pequeno por cada aparelho, pode se acumular ao longo do tempo e aumentar sua conta de energia.'
					},
					{
						id: 2,
						title: 'Lâmpadas de LED',
						icon: 'light-bulb',
						text: 'As lâmpadas LED consomem até 80% menos energia do que as lâmpadas incandescentes tradicionais e têm uma vida útil muito mais longa. Ao substituí-las, você pode reduzir significativamente o consumo de energia em sua casa.'
					},
					{
						id: 3,
						title: 'Sobrecarregamento de Eletrônicos',
						icon: 'flash',
						text: 'Não sobrecarregue uma única tomada ligando muitos aparelhos ao mesmo tempo. Isso pode causar um aumento no consumo de energia e, em casos extremos, até sobrecarregar o circuito elétrico, resultando em riscos de curto-circuito ou danos aos dispositivos.'
					},
					{
						id: 4,
						title: 'Ducha Elétrica',
						icon: 'water',
						text: 'As duchas elétricas estão entre os aparelhos que mais consomem energia em uma residência. Sempre que possível, reduza o tempo do banho e prefira usá-la no modo verão (morno), que consome menos eletricidade.'
					},
					{
						id: 5,
						title: 'Geladeira Bem Vedada',
						icon: 'drop',
						text: 'Verifique regularmente as borrachas de vedação da geladeira. Se estiverem danificadas, o aparelho consome mais energia para manter a temperatura, aumentando sua conta de luz sem necessidade.'
					},
					{
						id: 6,
						title: 'Desligue Luzes ao Sair',
						icon: 'light-up',
						text: 'Pode parecer óbvio, mas muitas pessoas esquecem luzes acesas ao sair de um cômodo. Tornar isso um hábito ajuda a reduzir bastante o consumo elétrico ao longo do mês.'
					},
					{
						id: 7,
						title: 'Uso Consciente do Ar-Condicionado',
						icon: 'air',
						text: 'Mantenha portas e janelas fechadas ao usar o ar-condicionado e limpe os filtros regularmente. Isso otimiza o funcionamento do aparelho, economiza energia e ainda melhora a qualidade do ar.'
					},
				]}
				contentContainerStyle={{
					paddingBottom: 20,
				}}
				renderItem={({ item }) => (
					<View
						style={{
							width: '100%',
							padding: 20,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 0,
						}}
					>
						<View
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 10,
								backgroundColor: '#ffff',
								borderRadius: 10,
								padding: 20,
								borderWidth: StyleSheet.hairlineWidth,
								borderColor,
								//shadowColor: 'rgba(0, 0, 0, 0.2)',
								//shadowOffset: { width: 0, height: 0 },
								//shadowOpacity: 0.47,
								//shadowRadius: 5,
								//elevation: 0,
							}}
						>
							<View
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<View
									style={{
										width: 40,
										height: 40,
										borderRadius: 5,
										backgroundColor: '#FF6B00',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Entypo name={item.icon as any} size={18} color='white'></Entypo>
								</View>
								<View>
									<ThemedText
										type='subtitle'
										style={{ fontSize: 16 }}
									>
										{item.title}
									</ThemedText>
								</View>
							</View>
							<View>
								<ThemedText type='small'>
									{item.text}
								</ThemedText>
							</View>
						</View>
					</View>
				)}
			/>
		</TabPageContainer>
	);
};

export default Page;

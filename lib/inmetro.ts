import { FetchResponse } from 'expo/build/winter/fetch/FetchResponse';
import { fetch } from 'expo/fetch';

const url =
	'https://pbe.inmetro.gov.br/integracao/api/itens/buscar?page=0&size=20&sort=marca,ASC';

export const applianceTypeMap = {
	air_conditioner: 166,
	electric_oven: 272,
	microwave: 208,
	washing_machine: 322,
	fridge: 293,
	television: 289,
	ceiling_fan: 323,
	standing_fan: 184,
} as const; // idPrograma

const propertyMap = {
	brand: 2000,
	model: 2001,
}; // atributos

export const searchInmetro = async (
	brand: string | undefined,
	model: string | undefined,
	applianceType: number
): Promise<FetchResponse> => {
	const payload = {
		atributos: {
			[propertyMap['brand']]: brand,
			[propertyMap['model']]: model,
		},
		idPrograma: applianceType,
	};

	const res = await fetch(url, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload),
		method: 'POST'
	});

	return res;
};
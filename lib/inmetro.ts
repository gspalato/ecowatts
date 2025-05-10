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

export const applianceTypeAttributeMap = {
	television: {
		brand: 2000,
		model: 2001,
		monthly_consumption_kwh: 333
	},
	air_conditioner: {
		annual_consumption_kwh: 471
	},
	microwave: {
		daily_standby_consumption_kwh: 216
	},
	washing_machine: {
		avg_consumption_per_washing_cycle: ['avg', 419, 421]
	},
	electric_oven: {
		hourly_consumption_in_use_kwh: 329
	},
	fridge: {
		monthly_consumption_kwh: 493
	},
	//ceiling_fan: {
	//	daily_standby_consumption_kwh: 216
	//},
	//standing_fan: {
	//	daily_standby_consumption_kwh: 216
	//},
}

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
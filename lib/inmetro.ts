import { FetchResponse } from 'expo/build/winter/fetch/FetchResponse';
import { fetch } from 'expo/fetch';
import { supabase } from './supabase';
import { Database } from '@/database.types';

const url =
	'https://pbe.inmetro.gov.br/integracao/api/itens/buscar?page=0&size=20&sort=marca,ASC';

type InmetroData = {
	atributos: {
		[key: string]: string;
	};
	idPrograma: number,
	nomeMarca: string,
	nomeModelo: string,
	numRegistroObjeto: string,
	status: string,
	codigoBarras: string,
	dataControleAlteracao: string,
	id: string
}

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
		brand: { code: 2000, name: 'Marca' },
		model: { code: 2001, name: 'Modelo' },
		monthly_consumption_kwh: { code: 333, name: 'Consumo médio mensal de energia (kWh)' },
	},
	air_conditioner: {
		annual_consumption_kwh: { code: 471, name: 'Consumo médio anual de energia (kWh)' },
	},
	microwave: {
		daily_standby_consumption_kwh: { code: 216, name: 'Consumo médio diário em standby (kWh)' },
	},
	washing_machine: {
		avg_consumption_per_washing_cycle: { name: 'Consumo médio por ciclo de lavagem (kWh)', codes: ['avg', 419, 421] }
	},
	electric_oven: {
		hourly_consumption_in_use_kwh: { code: 329, name: 'Consumo médio por hora em uso (kWh)' },
	},
	fridge: {
		monthly_consumption_kwh: { code: 493, name: 'Consumo médio mensal de energia (kWh)' },
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

export const convertToDatabaseSchema = (applianceData: InmetroData, manuallyFilledFields: { [key: string]: string }) => {
	// Get the manually filled fields and the appliance data and convert to a database object.
	// For that, we'll need to map the keys of the appliance data to the keys of the database object.

	const obj: { [key: string]: any } = {}

	const applianceTypeCode = applianceData['idPrograma'];
	const applianceType = Object.entries(applianceTypeMap).find(([key, value]) => value === applianceTypeCode)?.[0];

	const fields = Object.entries(applianceTypeAttributeMap[applianceType as keyof typeof applianceTypeAttributeMap] ?? {});
	fields.map(([key, value]) => {
		// Key is the database key and value is the inmetro code.

		const attribute = applianceData['atributos'][String(value.code)]
			|| manuallyFilledFields[String(value.code)];

		obj[key] = attribute;
	});

	return obj
}

export const calculateApplicanceConsumption = (
	appliance: Database['public']['Tables']['equipment']['Row'],
	time: 'hourly' | 'daily' | 'monthly' | 'annualy'
) => {
	let consumption = 0;

	if (appliance.monthly_consumption_kwh) {
		// If the appliance has a monthly consumption, we can calculate the consumption based on the time.
		switch (time) {
			case 'hourly':
				consumption += appliance.monthly_consumption_kwh / 30 / 24;
				break;
			case 'daily':
				consumption += appliance.monthly_consumption_kwh / 30;
				break;
			case 'monthly':
				consumption += appliance.monthly_consumption_kwh;
				break;
			case 'annualy':
				consumption += appliance.monthly_consumption_kwh * 12;
				break;
		}
	} else if (appliance.hourly_consumption_in_use_kwh) {
		// If the appliance has an hourly consumption, we can calculate the consumption based on the time.
		switch (time) {
			case 'hourly':
				consumption += appliance.hourly_consumption_in_use_kwh;
				break;
			case 'daily':
				consumption += appliance.hourly_consumption_in_use_kwh * 24;
				break;
			case 'monthly':
				consumption += appliance.hourly_consumption_in_use_kwh * 24 * 30;
				break;
			case 'annualy':
				consumption += appliance.hourly_consumption_in_use_kwh * 24 * 30 * 12;
				break;
		}
	} else if (appliance.daily_standby_consumption_kwh) {
		// If the appliance has a daily standby consumption, we can calculate the consumption based on the time.
		switch (time) {
			case 'hourly':
				consumption += appliance.daily_standby_consumption_kwh / 24;
				break;
			case 'daily':
				consumption += appliance.daily_standby_consumption_kwh;
				break;
			case 'monthly':
				consumption += appliance.daily_standby_consumption_kwh * 30;
				break;
			case 'annualy':
				consumption += appliance.daily_standby_consumption_kwh * 30 * 12;
				break;
		}
	} else if (appliance.power && appliance.daily_usage_hours) {
		// If the appliance has a power and daily usage hours, we can calculate the consumption based on the time.
		switch (time) {
			case 'hourly':
				consumption += (appliance.power / 1000) * appliance.daily_usage_hours / 24;
				break;
			case 'daily':
				consumption += (appliance.power / 1000) * appliance.daily_usage_hours;
				break;
			case 'monthly':
				consumption += (appliance.power / 1000) * appliance.daily_usage_hours * 30;
				break;
			case 'annualy':
				consumption += (appliance.power / 1000) * appliance.daily_usage_hours * 30 * 12;
				break;
		}
	}

	return consumption;
}

/**
 * Calculate the consumption of all appliances based on the time.
 * @param time - The time period to calculate the consumption for. Can be 'hourly', 'daily', 'monthly' or 'annualy'.
 * @returns The total consumption of all appliances in kWh.
*/
export const calculateTotalConsumption = async (time: 'hourly' | 'daily' | 'monthly' | 'annualy') => {
	let consumption = 0;

	// Get all appliances from the database and calculate the consumption based on the time.
	// For that, we'll need to get the consumption of each appliance and multiply by the time.

	const { data, error } = await supabase.from('equipment').select('*');
	if (error) {
		console.error('Error fetching appliances:', error);
		return;
	}

	data.map((entry: Database['public']['Tables']['equipment']['Row']) => consumption += calculateApplicanceConsumption(entry, time))

	return consumption;
}
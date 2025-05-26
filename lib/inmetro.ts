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
	const applianceBrandAlternative = applianceData['nomeMarca'] || '';
	const applianceModelAlternative = applianceData['nomeModelo'] || '';

	const applianceType = Object.entries(applianceTypeMap).find(([key, value]) => value === applianceTypeCode)?.[0];

	const fields = Object.entries(applianceTypeAttributeMap[applianceType as keyof typeof applianceTypeAttributeMap] ?? {});
	fields.map(([key, value]) => {
		// Key is the database key and value is the inmetro code.

		const attribute = applianceData['atributos'][String(value.code)]
			|| manuallyFilledFields[String(value.code)];

		obj[key] = attribute;

		// Manually fill brand and model if they are only present outside the "attributes" object.
		if (key === 'brand' && !obj[key]) {
			obj[key] = applianceBrandAlternative;
		} else if (key === 'model' && !obj[key]) {
			obj[key] = applianceModelAlternative;
		}
	});

	return obj
}

const roundToDecimal = (num: number, decimals: number = 4): number => {
	return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const formatWattHours = (wattHours: number): string => {
	const absWattHours = Math.abs(wattHours);

	if (absWattHours >= 1000000000) {
		// Gigawatt-hours
		return `${roundToDecimal(wattHours / 1000000000, 2)} GWh`;
	} else if (absWattHours >= 1000000) {
		// Megawatt-hours
		return `${roundToDecimal(wattHours / 1000000, 2)} MWh`;
	} else if (absWattHours >= 1000) {
		// Kilowatt-hours
		return `${roundToDecimal(wattHours / 1000, 2)} kWh`;
	} else if (absWattHours >= 1) {
		// Watt-hours
		return `${roundToDecimal(wattHours, 2)} Wh`;
	} else if (absWattHours >= 0.001) {
		// Milliwatt-hours
		return `${roundToDecimal(wattHours * 1000, 2)} mWh`;
	} else if (absWattHours >= 0.000001) {
		// Microwatt-hours
		return `${roundToDecimal(wattHours * 1000000, 2)} µWh`;
	} else {
		// Very small values, just show as watt-hours
		return `${roundToDecimal(wattHours, 6)} Wh`;
	}
};

/**
 * Calculate the consumption of an appliance based on the time period.
 * @param time - The time period to calculate the consumption for. Can be 'hourly', 'daily', 'monthly' or 'annualy'.
 * @returns The consumption of this appliances in watt-hours (Wh).
 */
export const calculateApplicanceConsumption = (
	appliance: Database['public']['Tables']['equipment']['Row'],
	time: 'hourly' | 'daily' | 'monthly' | 'annualy'
): number => {
	let consumptionWh = 0; // Working in watt-hours

	if (appliance.monthly_consumption_kwh) {
		// Convert kWh to Wh first
		const monthlyWh = appliance.monthly_consumption_kwh * 1000;
		switch (time) {
			case 'hourly':
				consumptionWh = monthlyWh / 30 / 24;
				break;
			case 'daily':
				consumptionWh = monthlyWh / 30;
				break;
			case 'monthly':
				consumptionWh = monthlyWh;
				break;
			case 'annualy':
				consumptionWh = monthlyWh * 12;
				break;
		}
	} else if (appliance.hourly_consumption_in_use_kwh) {
		// Convert kWh to Wh first
		const hourlyWh = appliance.hourly_consumption_in_use_kwh * 1000;
		switch (time) {
			case 'hourly':
				consumptionWh = hourlyWh;
				break;
			case 'daily':
				consumptionWh = hourlyWh * 24;
				break;
			case 'monthly':
				consumptionWh = hourlyWh * 24 * 30;
				break;
			case 'annualy':
				consumptionWh = hourlyWh * 24 * 30 * 12;
				break;
		}
	} else if (appliance.daily_standby_consumption_kwh) {
		// Convert kWh to Wh first
		const dailyWh = appliance.daily_standby_consumption_kwh * 1000;
		switch (time) {
			case 'hourly':
				consumptionWh = dailyWh / 24;
				break;
			case 'daily':
				consumptionWh = dailyWh;
				break;
			case 'monthly':
				consumptionWh = dailyWh * 30;
				break;
			case 'annualy':
				consumptionWh = dailyWh * 30 * 12;
				break;
		}
	} else if (appliance.power && appliance.daily_usage_hours) {
		// Power is already in watts, calculate watt-hours directly
		switch (time) {
			case 'hourly':
				consumptionWh = appliance.power * appliance.daily_usage_hours / 24;
				break;
			case 'daily':
				consumptionWh = appliance.power * appliance.daily_usage_hours;
				break;
			case 'monthly':
				consumptionWh = appliance.power * appliance.daily_usage_hours * 30;
				break;
			case 'annualy':
				consumptionWh = appliance.power * appliance.daily_usage_hours * 30 * 12;
				break;
		}
	}

	return consumptionWh
};

/**
 * Calculate the consumption of all appliances based on the time period.
 * @param time - The time period to calculate the consumption for. Can be 'hourly', 'daily', 'monthly' or 'annualy'.
 * @returns The total consumption of all appliances in watt-hours (Wh).
 */
export const calculateTotalConsumption = async (time: 'hourly' | 'daily' | 'monthly' | 'annualy'): Promise<number> => {
	// Get all appliances from the database and calculate the consumption based on the time.
	const { data, error } = await supabase.from('equipment').select('*');

	if (error) {
		console.error('Error fetching appliances:', error);
		return 0;
	}

	// Use reduce to sum up all appliance consumptions
	const totalConsumptionWh = data.reduce((total, appliance) => {
		return total + calculateApplicanceConsumption(appliance, time);
	}, 0);

	return totalConsumptionWh
};
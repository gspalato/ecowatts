import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { convertToDatabaseSchema } from './inmetro';
import { Database } from '@/database.types';
import { Alert } from 'react-native';

const supabaseUrl = 'https://pjwgbfknyrfsrwhckioj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqd2diZmtueXJmc3J3aGNraW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTcwMDcsImV4cCI6MjA1ODQzMzAwN30.KmbPhKJxBRQO3bstLNh5cW43R4JRgOooP86P3eYsk0k';

type ApplicationType = Database["public"]["Tables"]["equipment"]["Row"];

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

export const getAllEquipment = async (): Promise<Database["public"]["Tables"]["equipment"]["Row"][]> => {
	const { data, error } = await supabase.from('equipment').select('*');
	if (error) {
		console.error('Error fetching appliances:', error);
		return [];
	}

	return data;
}

export const pushEquipment = async (name: string, locationId: number | undefined, data: any, manuallyFilledFields: any, isManualInput: boolean) => {
	// If manualInput is true, data doesn't need to be converted.
	const obj = {
		name,
		location: locationId,
		...(isManualInput ? data : convertToDatabaseSchema(data, manuallyFilledFields)),
	}

	console.log('obj', obj);

	const { data: res, error } = await supabase.from('equipment').insert(obj);
	console.log('res', res);
	if (error) {
		console.log('error', error);
		Alert.alert('Erro', 'Erro ao adicionar o eletrodoméstico.');
		return;
	}

	Alert.alert('Sucesso!', 'Aparelho adicionado com sucesso!');
}

export const deleteEquipment = async (id: ApplicationType["id"]) => {
	const { data, error, status, statusText } = await supabase.from('equipment').delete().eq('id', id);

	if (error) {
		console.error('Error deleting appliance:', error);
		return false;
	}

	return true;
}
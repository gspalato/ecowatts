import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pjwgbfknyrfsrwhckioj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqd2diZmtueXJmc3J3aGNraW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTcwMDcsImV4cCI6MjA1ODQzMzAwN30.KmbPhKJxBRQO3bstLNh5cW43R4JRgOooP86P3eYsk0k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

export const getAllEquipment = async () => {
	const { data, error } = await supabase.from('equipment').select('*');
	if (error) {
		console.error('Error fetching appliances:', error);
		return [];
	}

	return data;
}
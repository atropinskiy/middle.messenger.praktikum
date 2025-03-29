export interface AuthModel {
	login: string;
	password: string;
	isFormValid?: boolean;
	errors?: { login: string; password: string };
}

declare global {
	export type Nullable<T> = T | null;
	export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];
	export type Events = Record<string, (_e: Event) => void>;
}
export {};

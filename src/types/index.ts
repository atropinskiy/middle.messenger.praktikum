export type PageName =
  | 'signin'
  | 'signup'
  | 'error404'
  | 'error500'
  | 'chat'
  | 'profile'
  | 'profile_edit'
  | 'password_change';

export interface AppState {
  currentPage: PageName;
}

export interface ButtonProps {
  id: string;
  className: string;
  text: string;
}

export interface ErrorProps {
  number: string;
  text: string;
}

export interface Chat {
  image: { image_path: string; width: number };
  name: string;
}

export interface ProfileProps {
  image: { image_path: string; width: number };
}

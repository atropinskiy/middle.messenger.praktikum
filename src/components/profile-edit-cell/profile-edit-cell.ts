import Block from '@core/block';
import { Input } from '@components/index';
import template from './profile-edit-cell.hbs?raw';

interface ProfilEditCellProps {
  label: string;
  input: Input;
}

export class ProfileEditCell extends Block {
  constructor(props: ProfilEditCellProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}



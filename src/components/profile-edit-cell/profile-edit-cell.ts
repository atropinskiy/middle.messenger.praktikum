import Block from '@core/block';
import { InputField } from '@components/index';
import template from './profile-edit-cell.hbs?raw';

interface ProfilEditCellProps {
  label: string;
  input: InputField;
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



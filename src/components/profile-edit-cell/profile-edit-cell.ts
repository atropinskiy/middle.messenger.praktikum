import Block from '@core/block';
import { InputField } from '@components/index';
import template from './profile-edit-cell.hbs?raw';

interface ProfilEditCellProps {
  label: string;
  input: InputField;
  error?: string
}

export class ProfileEditCell extends Block {
  constructor(props: ProfilEditCellProps) {
    super({
      ...props,
    });
  }

  componentDidUpdate(oldProps: ProfilEditCellProps, newProps: ProfilEditCellProps) {
    if (oldProps.error !== newProps.error) {
      this.childrens.input.setProps({ error: newProps.error });
    }
    return true;
  }



  render() {
    return this.compile(template, { ...this.props });
  }
}



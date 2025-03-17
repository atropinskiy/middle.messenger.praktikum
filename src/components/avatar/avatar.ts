import Block from '@core/block';
import template from './avatar.hbs?raw';
import Handlebars from 'handlebars';

Handlebars.registerPartial('Avatar', template);

interface AvatarProps {
  src: string;
  className?: string;
  width: number;
  label?: string;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      className: props.className || '',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Avatar;

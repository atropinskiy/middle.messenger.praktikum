import Block from '@core/block';
import template from './avatar.hbs?raw';
import Handlebars from 'handlebars';

Handlebars.registerPartial('Avatar', template);

interface AvatarProps {
  user_src?: string
  className?: string;
  width: number;
  label?: string;
  onClick?: (e: Event) => void
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    console.log('222', this.props)
    return this.compile(template, this.props);
  }
}


export default Avatar;


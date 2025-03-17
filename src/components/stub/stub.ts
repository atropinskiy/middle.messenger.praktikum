import Block from "@core/block";
import template from "./stub.hbs?raw"

interface StubProps {
  label: string
}

export class Stub extends Block {
  constructor(props: StubProps) {
    super({...props})
  }

  render() {
    return this.compile(template, { ...this.props });
  }

}

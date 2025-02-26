import Block from "./block";

export default function renderDOM(block: Block) {
  const root = document.querySelector("#app");

  if (!root) {
    throw new Error("Root element not found");
  }

  root.innerHTML = "";
  root.appendChild(block.getContent() as Node);
}

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Element with selector "${query}" not found`);
  }

  root.appendChild(block.getContent() as Node);
  block.dispatchComponentDidMount();

  return root;
}

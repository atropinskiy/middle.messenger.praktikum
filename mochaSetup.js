import {JSDOM} from 'jsdom'

const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
global.DocumentFragment = jsdom.window.DocumentFragment;
global.HTMLElement = jsdom.window.HTMLElement;
global.PopStateEvent = jsdom.window.PopStateEvent;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.ProgressEvent = jsdom.window.ProgressEvent;


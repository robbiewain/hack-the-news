import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import App from './main';
import Background from './utils/background';

const app = new App();
const containerElement = document.getElementById('app');

if (containerElement) {
  setPropertyDidChange(() => {
    app.scheduleRerender();
  });

  app.registerInitializer({
    initialize(registry) {
      registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
    }
  });

  app.renderComponent('HackTheNews', containerElement, null);

  app.boot();
} else {
  new Background();
}

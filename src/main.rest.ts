import 'reflect-metadata';
import {RestApplication} from './rest/rest.application.js';
import {Component} from './shared/types/component.enum.js';
import {createRestApplicationContainer} from './rest/index.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/offer.container.js';
import {Container} from 'inversify';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer(), createUserContainer(), createOfferContainer());

  const application = appContainer.get<RestApplication>(Component.RestApplication);


  await application.init();
}

bootstrap();

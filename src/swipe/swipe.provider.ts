import { Swipe } from './entities/swipe.entity';

export const swipesProviders = [
  {
    provide: 'SWIPES_REPOSITORY',
    useValue: Swipe,
  },
];

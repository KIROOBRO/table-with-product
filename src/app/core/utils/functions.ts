import { TrackByModel } from '@core/models';

export const trackByFnById = (idx: number, element: TrackByModel): number =>
  element.id;

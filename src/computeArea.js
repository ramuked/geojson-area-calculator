import area from '@turf/area';

export function computeGeoArea(geo) {
  if (!geo) throw new Error('Empty input');
  if (geo.type === 'FeatureCollection') {
    let sum = 0;
    for (const f of geo.features) sum += area(f);
    return sum;
  }
  if (geo.type === 'Feature') return area(geo);

  if (geo.type === 'Polygon' || geo.type === 'MultiPolygon') {
    return area({ type: 'Feature', geometry: geo });
  }

  throw new Error('Unsupported GeoJSON type ' + geo.type);
}

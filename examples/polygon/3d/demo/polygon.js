import { Scene, PolygonLayer } from '@antv/l7';
const scene = new Scene({
  id: 'map',
  pitch: 0,
  type: 'amap',
  style: 'dark',
  center: [ 114.050008, 22.529272 ],
  zoom: 14.1
});

window.mapScene = scene;
fetch(
  'https://gw.alipayobjects.com/os/basement_prod/972566c5-a2b9-4a7e-8da1-bae9d0eb0117.json'
)
  .then(res => res.json())
  .then(data => {
    const layer = new PolygonLayer({})
      .source(data)
      .shape('extrude')
      .size('h20', [ 100, 120, 160, 200, 260, 500 ])
      .color('h20', [
        '#816CAD',
        '#A67FB5',
        '#C997C7',
        '#DEB8D4',
        '#F5D4E6',
        '#FAE4F1',
        '#FFF3FC'
      ])
      .style({
        opacity: 1.0
      });
    scene.addLayer(layer);
  });

---
title: 快速上手
order: 0
redirect_from:
  - /zh/docs/tutorial
---

# 使用方法

L7 提供三种使用方式：CDN、Submodule。

## 通过 CDN 使用

首先在 `<head>` 中引入 L7 CDN 版本的 JS 和 CSS 文件：
```html
<head>
  <script src='https://gw.alipayobjects.com/os/antv/pkg/_antv.l7-2.0.0-beta.5/dist/l7.js'></script>
</head>
```

如果使用 Mapbox，还需要额外引入 Mapbox 的 JS 和 CSS 文件，这一步可以参考 [Mapbox 文档](https://docs.mapbox.com/mapbox-gl-js/overview/#quickstart)：
```html
<head>
  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.js'></script>
  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css' rel='stylesheet' />
  <!-- 上一步引入的 L7 JS 和 CSS -->
</head>
```
⚠️高德采用异步加载，因此不需要引入任何额外静态文件。

然后在 `<body>` 中定义一个容器并设置一个 `id`。通过全局 `L7` 这个命名空间可以获取场景 `L7.Scene` 和图层 `L7.PolygonLayer`：
⚠️需要获取高德或者 Mapbox 的使用 token 并传入 `L7.Scene` 的构造函数，获取方式如下：
* 高德地图开发者 Key [申请方法](https://lbs.amap.com/dev/key/)
* [Mapbox Access Tokens](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/#creating-and-managing-access-tokens)

## 通过 Submodule 使用

首先通过 `npm/yarn`
```bash

npm install --save @antv/l7@beta

yarn add  --save @antv/l7@beta

```

然后就可以使用其中包含的场景和各类图层：
```typescript
import { Scene, PolygonLayer } from '@antv/l7';

(async function() {
  // 获取数据
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
  );
  const data = await response.json();

  // 创建场景
  const scene = new Scene({
    center: [110.19382669582967, 50.258134],
    id: 'map',
    pitch: 0,
    style: 'dark',
    type: 'amap',
    zoom: 3,
    token: 'pg.xxx', // 高德或者 Mapbox 的 token
  });

  // 创建图层
  const layer = new PolygonLayer({});
  layer
    .source(data)
    .size('name', [0, 10000, 50000, 30000, 100000])
    .color('name', [
      '#2E8AE6',
      '#69D1AB',
      '#DAF291',
      '#FFD591',
      '#FF7A45',
      '#CF1D49',
    ])
    .shape('fill')
    .style({
      opacity: 0.8,
    });

  // 添加图层到场景中
  scene.addLayer(layer);

  // 渲染场景
  scene.render();
})();
```


L7 目前的文档都通过这种方式使用，可以参考项目中的 stories：
* [高德地图](https://github.com/antvis/L7/blob/next/stories/MapAdaptor/components/AMap.tsx)
* [Mapbox](https://github.com/antvis/L7/blob/next/stories/MapAdaptor/components/Mapbox.tsx)


## [WIP] React

React 组件待开发，目前可以暂时以 Submodule 方式使用：
```tsx
import { Scene, PolygonLayer} from '@antv/l7';
import * as React from 'react';

export default class AMap extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json',
    );
    const scene = new Scene({
      center: [110.19382669582967, 50.258134],
      id: 'map',
      pitch: 0,
      style: 'dark',
      type: 'amap',
      zoom: 3,
      token: 'pg.xxx', // 高德或者 Mapbox 的 token
    });
    const layer = new PolygonLayer({});

    layer
      .source(await response.json())
      .size('name', [0, 10000, 50000, 30000, 100000])
      .color('name', [
        '#2E8AE6',
        '#69D1AB',
        '#DAF291',
        '#FFD591',
        '#FF7A45',
        '#CF1D49',
      ])
      .shape('fill')
      .style({
        opacity: 0.8,
      });
    scene.addLayer(layer);
    scene.render();
    this.scene = scene;
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
}
```

⚠️组件 Unmount 时需要通过 `scene.destroy()` 手动销毁场景。


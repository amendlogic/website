/* src/lib/echarts-light.js */

// Wir importieren NUR den Core und die benötigten Charts
import * as echarts from 'echarts/core';

// Charts: Nur Line und Bar (füge weitere hinzu, falls nötig, z.B. PieChart)
import { LineChart, BarChart } from 'echarts/charts';

// Komponenten: Grid, Tooltip, Legende, Dataset
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  DataZoomComponent // Falls du Zoom nutzt
} from 'echarts/components';

// Renderer: Canvas ist performanter für viele Datenpunkte
import { CanvasRenderer } from 'echarts/renderers';

// Registrieren der Module
echarts.use([
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  DataZoomComponent,
  CanvasRenderer
]);

export default echarts;

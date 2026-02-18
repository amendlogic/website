/* src/lib/chart-data.js */
import fs from 'node:fs/promises';
import path from 'node:path';

const round2 = (n) => Math.round(n * 100) / 100;

export async function parseCsvData(filePath, initialCap) {
  if (!filePath) return null;

  try {
    // Pfad auflösen (relativ zum Project Root)
    const absolutePath = path.resolve(filePath);
    const fileContent = await fs.readFile(absolutePath, 'utf-8');
    const lines = fileContent.trim().split(/\r?\n/);

    if (lines.length <= 1) return null;

    const headers = lines[0].split(',').map(h => h.trim());
    
    // Indexe finden
    const idx = {
      date: headers.indexOf('Date/Time'),
      profit: headers.findIndex(h => h.includes('Cum. Profit') && !h.includes('%')),
      dd: headers.findIndex(h => h.includes('Drawdown') && h.includes('%')),
      price: headers.indexOf('Price'),
      contracts: headers.indexOf('Contracts')
    };

    if (idx.date < 0 || idx.profit < 0) return null;

    const equity = [];
    const drawdown = [];
    const bnh = [];

    let firstPrice = null;
    let initialContracts = 1;
    // Regex für CSV Split, ignoriert Kommas in Anführungszeichen
    const csvSplitRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

    for (let i = 1; i < lines.length; i++) {
      const rawRow = lines[i];
      if (!rawRow) continue;
      
      const row = rawRow.split(csvSplitRegex).map(r => r.replace(/"/g, '').trim());
      
      const timestamp = +new Date(row[idx.date]);
      if (isNaN(timestamp)) continue;

      const profit = parseFloat(row[idx.profit]);
      const price = idx.price !== -1 ? parseFloat(row[idx.price]) : NaN;
      const dd = idx.dd !== -1 ? parseFloat(row[idx.dd]) : NaN;

      if (!isNaN(profit)) equity.push([timestamp, round2(initialCap + profit)]);
      if (!isNaN(dd)) drawdown.push([timestamp, -Math.abs(dd)]);

      if (!isNaN(price)) {
        if (firstPrice === null) {
          firstPrice = price;
          const c = idx.contracts !== -1 ? parseFloat(row[idx.contracts]) : NaN;
          if (!isNaN(c)) initialContracts = c;
          bnh.push([timestamp, initialCap]);
        } else {
          const bnhProfit = (price - firstPrice) * initialContracts;
          bnh.push([timestamp, round2(initialCap + bnhProfit)]);
        }
      }
    }
    
    return { equity, drawdown, bnh };

  } catch (e) {
    console.error(`[Chart CSV Error] File: ${filePath}`, e.message);
    return null;
  }
}

export function getBaseChartOptions(parsedData) {
  if (!parsedData || parsedData.equity.length === 0) return null;
  
  return {
    animation: true, 
    progressive: 5000, 
    progressiveThreshold: 10000,
    hoverLayerThreshold: 3000,
    grid: { left: 0, right: 0, bottom: 0, containLabel: true },
    legend: { data: ['Portfolio Value', 'Buy & Hold', 'Drawdown %'], top: 0 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, confine: true },
    xAxis: { type: 'time', boundaryGap: false },
    yAxis: [
      { type: 'value', scale: true, splitLine: { show: true } },
      { type: 'value', max: 0, splitLine: { show: false } }
    ],
    series: [
      { name: 'Portfolio Value', type: 'line', sampling: 'lttb', smooth: true, showSymbol: false, areaStyle: { opacity: 0.1 }, itemStyle: { color: '#10B981' }, data: parsedData.equity },
      { name: 'Buy & Hold', type: 'line', sampling: 'lttb', smooth: true, showSymbol: false, lineStyle: { type: 'dashed' }, itemStyle: { color: '#94a3b8' }, data: parsedData.bnh },
      { name: 'Drawdown %', type: 'bar', yAxisIndex: 1, itemStyle: { color: '#EF4444', opacity: 0.6 }, data: parsedData.drawdown }
    ]
  };
}

/* src/lib/chart-data.js */
import fs from 'node:fs/promises';
import path from 'node:path';

const round2 = (n) => Math.round(n * 100) / 100;

// ─── CSV Parser ──────────────────────────────────────────────────────────────
export async function parseCsvData(filePath, initialCap) {
  if (!filePath) return null;
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent  = await fs.readFile(absolutePath, 'utf-8');
    const lines        = fileContent.trim().split(/\r?\n/);
    if (lines.length <= 1) return null;

    const headers = lines[0].split(',').map((h) => h.trim());

    const idx = {
      date:        headers.indexOf('Date/Time'),
      cumProfit:   headers.findIndex((h) => h === 'Cum. Profit'),
      tradeProfit: headers.findIndex((h) => h === 'Profit'),
      ddPct:       headers.findIndex((h) => h === 'Drawdown %'),
      dd:          headers.findIndex((h) => h === 'Drawdown'),
      price:       headers.indexOf('Price'),
      contracts:   headers.indexOf('Contracts'),
      signal:      headers.indexOf('Signal'),
      type:        headers.indexOf('Type'),
    };

    if (idx.date < 0 || idx.cumProfit < 0) return null;

    const equity  = [];
    const drawdown = [];
    const bnh     = [];
    const trades  = []; // ← neu: Einzeltrades

    let firstPrice        = null;
    let initialContracts  = 1;
    const csvSplitRegex   = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

    for (let i = 1; i < lines.length; i++) {
      const rawRow = lines[i];
      if (!rawRow) continue;

      const row = rawRow.split(csvSplitRegex).map((r) => r.replace(/"/g, '').trim());

      const timestamp = +new Date(row[idx.date]);
      if (isNaN(timestamp)) continue;

      const cumProfit   = parseFloat(row[idx.cumProfit]);
      const tradeProfit = idx.tradeProfit !== -1 ? parseFloat(row[idx.tradeProfit]) : NaN;
      const price       = idx.price !== -1       ? parseFloat(row[idx.price])       : NaN;
      const ddPct       = idx.ddPct !== -1        ? parseFloat(row[idx.ddPct])       : NaN;
      const ddAbs       = idx.dd !== -1           ? parseFloat(row[idx.dd])          : NaN;
      const signal      = idx.signal !== -1       ? row[idx.signal]                  : '';
      const type        = idx.type !== -1         ? row[idx.type]                    : '';

      // Equity-Kurve
      if (!isNaN(cumProfit)) equity.push([timestamp, round2(initialCap + cumProfit)]);

      // Drawdown-Balken (in %)
      if (!isNaN(ddPct)) drawdown.push([timestamp, -Math.abs(ddPct)]);

      // Buy & Hold
      if (!isNaN(price)) {
        if (firstPrice === null) {
          firstPrice = price;
          const c = idx.contracts !== -1 ? parseFloat(row[idx.contracts]) : NaN;
          if (!isNaN(c)) initialContracts = c;
          bnh.push([timestamp, initialCap]);
        } else {
          bnh.push([timestamp, round2(initialCap + (price - firstPrice) * initialContracts)]);
        }
      }

      // Einzeltrade sammeln
      if (!isNaN(tradeProfit)) {
        trades.push({
          timestamp,
          profit:   tradeProfit,
          drawdown: isNaN(ddAbs) ? 0 : ddAbs,
          signal,
          type,
        });
      }
    }

    return { equity, drawdown, bnh, trades };
  } catch (e) {
    console.error(`[Chart CSV Error] File: ${filePath}`, e.message);
    return null;
  }
}

// ─── Trade-Statistiken ───────────────────────────────────────────────────────
export function calculateTradeStats(trades) {
  if (!trades?.length) return null;

  const profits  = trades.map((t) => t.profit);
  const winners  = profits.filter((p) => p > 0);
  const losers   = profits.filter((p) => p < 0);

  const grossProfit = winners.reduce((s, p) => s + p, 0);
  const grossLoss   = Math.abs(losers.reduce((s, p) => s + p, 0));
  const avgWin      = winners.length ? grossProfit / winners.length : 0;
  const avgLoss     = losers.length  ? grossLoss   / losers.length  : 0;
  const winRate     = profits.length ? winners.length / profits.length : 0;

  // Maximale Serien
  let maxCW = 0, maxCL = 0, curW = 0, curL = 0;
  for (const p of profits) {
    if (p > 0) { curW++; curL = 0; maxCW = Math.max(maxCW, curW); }
    else        { curL++; curW = 0; maxCL = Math.max(maxCL, curL); }
  }

  return {
    totalTrades:     trades.length,
    winningTrades:   winners.length,
    losingTrades:    losers.length,
    winRate,
    profitFactor:    grossLoss > 0 ? round2(grossProfit / grossLoss) : Infinity,
    netProfit:       round2(profits.reduce((s, p) => s + p, 0)),
    avgWin:          round2(avgWin),
    avgLoss:         round2(avgLoss),
    bestTrade:       Math.max(...profits),
    worstTrade:      Math.min(...profits),
    maxDrawdown:     Math.max(...trades.map((t) => Math.abs(t.drawdown ?? 0))),
    maxConsecWins:   maxCW,
    maxConsecLosses: maxCL,
    expectancy:      round2(winRate * avgWin - (1 - winRate) * avgLoss),
  };
}

// ─── Chart-Optionen (unverändert) ────────────────────────────────────────────
export function getBaseChartOptions(parsedData) {
  if (!parsedData || parsedData.equity.length === 0) return null;

  return {
    animation: true,
    progressive: 5000,
    progressiveThreshold: 10000,
    hoverLayerThreshold: 3000,
    grid: { left: 0, right: 0, bottom: 0, top: 8, containLabel: true },
    legend: { data: ['Portfolio Value', 'Buy & Hold', 'Drawdown %'], top: 0 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, confine: true },
    xAxis: { type: 'time', boundaryGap: false },
    yAxis: [
      { type: 'value', scale: true, splitLine: { show: true } },
      { type: 'value', max: 0, splitLine: { show: false } },
    ],
    series: [
      { name: 'Portfolio Value', type: 'line', sampling: 'lttb', smooth: true, showSymbol: false, areaStyle: { opacity: 0.1 }, itemStyle: { color: '#10B981' }, data: parsedData.equity },
      { name: 'Buy & Hold',      type: 'line', sampling: 'lttb', smooth: true, showSymbol: false, lineStyle: { type: 'dashed' }, itemStyle: { color: '#94a3b8' }, data: parsedData.bnh },
      { name: 'Drawdown %',      type: 'bar',  yAxisIndex: 1, itemStyle: { color: '#EF4444', opacity: 0.6 }, data: parsedData.drawdown },
    ],
  };
}

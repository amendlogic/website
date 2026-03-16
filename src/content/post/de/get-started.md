---
publishDate: 2026-03-16T00:00:00Z
author: AmendLogic
title: Erste Schritte – AmendLogic in TradingView einrichten
excerpt: Von der Freischaltung des Invite-Only Scripts bis zum ersten aktiven Webhook-Alert — diese Anleitung führt dich vollständig durch die Einrichtung. Du lernst, wie du Symbol und Zeitrahmen auswählst, die Strategie-Parameter auf dein Setup anpasst und Alerts so konfigurierst, dass Signale automatisch an deine Exchange weitergeleitet werden.
image: https://images.unsplash.com/photo-1516996087931-5ae405802f9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
category: Documentation
tags:
  - TradingView
  - Webhook
  - Alert
metadata:
  canonical: https://astrowind.vercel.app/get-started
---

# AmendLogic – Erste Schritte
 
> **Voraussetzungen**
> - Aktives AmendLogic-Abonnement (via Whop)
> - TradingView-Account mit **Essential-Plan oder höher**
> - Exchange-Account mit Webhook-Unterstützung (z. B. Bitget)
 
---
 
## 1. Invite-Only Script freischalten
 
Nachdem dein Abonnement aktiviert wurde, erhält dein TradingView-Account automatisch Zugriff auf das AmendLogic-Script. TradingView benachrichtigt dich per E-Mail, sobald die Freischaltung erfolgt ist.
 
Um das Script zu finden:
 
1. Öffne [TradingView](https://www.tradingview.com) und navigiere zu einem beliebigen Chart.
2. Klicke oben in der Toolbar auf **Indicators** (Indikatoren-Icon).
3. Wechsle zum Tab **Invite-Only Scripts**.
4. Suche nach **AmendLogic** und klicke auf den Eintrag, um ihn auf den Chart zu laden.
 
![Invite-Only Scripts Tab in TradingView](/images/docs/01-invite-only-scripts.png)
*Abbildung 1 – Invite-Only Scripts im Indikator-Menü*
 
> Falls das Script nicht erscheint, ist die Freischaltung möglicherweise noch nicht abgeschlossen. Warte einige Minuten und lade die Seite neu.
 
---
 
## 2. Symbol und Zeitrahmen auswählen
 
AmendLogic ist für **Bitcoin (BTCUSDT / BTCUSDT.P)** auf Perpetual-Futures-Märkten optimiert. Für andere Assets können die Bot Settings entsprechend angepasst werden.
 
**Empfohlenes Setup:**
 
| Parameter | Empfehlung |
|-----------|------------|
| Symbol    | `BTCUSDT.P` (Bitget Perpetual) oder `BTCUSDT` |
| Zeitrahmen | 15m, 1h oder 4h |
| Chart-Typ  | Candles (Kerzen) |
 
1. Gib das Symbol oben links in die Suchleiste ein.
2. Wähle den gewünschten Zeitrahmen über die Toolbar aus.
 
![Symbol und Timeframe Auswahl](/images/docs/02-symbol-timeframe.png)
*Abbildung 2 – Symbol- und Zeitrahmenauswahl in TradingView*
 
---
 
## 3. Strategie-Einstellungen konfigurieren
 
Klicke auf das **Zahnrad-Icon** neben dem Strategienamen im Chart, um die Einstellungen zu öffnen.
 
![Strategie Einstellungen öffnen](/images/docs/03-settings-open.png)
*Abbildung 3 – Einstellungen über das Zahnrad-Icon öffnen*
 
---
 
### 3.1 Time Period
 
Definiert das aktive Handelsfenster. Signale außerhalb dieses Zeitraums werden ignoriert.
 
- **Start Time / End Time** – Uhrzeit in UTC angeben
- Nützlich, um Nachrichtenereignisse oder Phasen geringer Liquidität auszuschließen
 
![Time Period Einstellungen](/images/docs/04-time-period.png)
*Abbildung 4 – Time Period Konfiguration*
 
---
 
### 3.2 Strategy Settings
 
Steuert Handelsrichtung und Positionsgröße.
 
| Einstellung | Beschreibung |
|-------------|--------------|
| **Direction** | `Long Only`, `Short Only` oder `Both` |
| **Risk Factor** | Skaliert die Kapitalmenge pro Trade. Höhere Werte = höhere Renditen **und** höherer Drawdown |
 
> Empfehlung für den Einstieg: Risk Factor zwischen **1 und 2** bis du mit dem Verhalten der Strategie vertraut bist.
 
![Strategy Settings](/images/docs/05-strategy-settings.png)
*Abbildung 5 – Strategy Settings*
 
---
 
### 3.3 Bot Settings
 
Feinjustierung für spezifische Timeframes und Assets. Diese Parameter passen das Verhalten der Strategie an die Marktstruktur und Volatilität des gewählten Assets an — ohne die Kernlogik zu verändern.
 
Ändere diese Werte nur, wenn du mit einem anderen Asset oder Timeframe als dem Standard-Setup arbeitest.
 
![Bot Settings](/images/docs/06-bot-settings.png)
*Abbildung 6 – Bot Settings*
 
---
 
### 3.4 EMA Filter Settings
 
Eingehende Signale werden gegen einen gleitenden Durchschnitt (EMA) gefiltert. Trades gegen den übergeordneten Trend werden unterdrückt.
 
| Einstellung | Beschreibung |
|-------------|--------------|
| **EMA Length** | Länge des Trendfilters |
| **EMA Source** | Kursquelle (Standard: Close) |
 
![EMA Filter Settings](/images/docs/07-ema-filter.png)
*Abbildung 7 – EMA Filter*
 
---
 
### 3.5 RSI Trendfilter
 
Der RSI unterdrückt Signale in überkauften oder überverkauften Zonen. Das Ergebnis sind selektivere Einstiege mit weniger Fehlsignalen in trendlosen Märkten.
 
| Einstellung | Beschreibung |
|-------------|--------------|
| **RSI Length** | Berechnungsperiode |
| **Overbought / Oversold** | Schwellenwerte für die Filterung |
 
![RSI Trendfilter](/images/docs/08-rsi-filter.png)
*Abbildung 8 – RSI Trendfilter*
 
---
 
### 3.6 Take Profit
 
Bis zu fünf gestaffelte Take-Profit-Ziele. Jedes Ziel schließt einen definierten Anteil der Position, wenn ein bestimmtes Kursziel erreicht wird.
 
| Einstellung | Beschreibung |
|-------------|--------------|
| **TP1–TP5 Level** | Kursziel in % vom Einstieg |
| **TP1–TP5 Quantity** | Anteil der Position in % der Gesamtgröße |
 
> Die Summe aller TP-Quantities sollte 100 % ergeben, damit die Position vollständig geschlossen wird.
 
> **Backtesting-Hinweis:** TradingViews Engine modelliert die Ausführung innerhalb einer Kerze anhand von OHLC-Daten, nicht Tick-Daten. Take-Profits, die innerhalb einer Kerze getriggert werden, können im Backtest leicht bessere Fills zeigen als in der realen Ausführung — eine bekannte Einschränkung des Plattform-Backtestings.
 
![Take Profit Einstellungen](/images/docs/09-take-profit.png)
*Abbildung 9 – Take Profit Konfiguration*
 
---
 
### 3.7 Performance Table
 
Zeigt das monatliche PnL direkt im Chart an. Aktiviere oder deaktiviere die Tabelle nach Bedarf.
 
![Performance Table](/images/docs/10-performance-table.png)
*Abbildung 10 – Monatliche Performance-Tabelle im Chart*
 
---
 
## 4. Alerts und Webhook einrichten (Bitget)
 
Alerts ermöglichen die automatische Ausführung von Trades über einen Bot oder eine Exchange-API. Für konsistente Ausführung ist der **TradingView Essential-Plan oder höher** erforderlich — der kostenlose Plan begrenzt die Anzahl aktiver Alerts.
 
---
 
### 4.1 Webhook-URL in Bitget generieren
 
1. Melde dich in deinem **Bitget**-Account an.
2. Navigiere zu **API-Verwaltung** → **Neuen API-Key erstellen**.
3. Aktiviere die Berechtigungen **Spot Trading** und / oder **Futures Trading**.
4. Kopiere den generierten **API Key** und **Secret Key** — diese werden nur einmal angezeigt.
 
Alternativ kannst du einen Drittanbieter-Bot (z. B. **WunderTrading**, **3Commas** oder **Alertatron**) verwenden, der TradingView-Webhooks entgegennimmt und Orders an Bitget weiterleitet. Diese Dienste stellen dir eine fertige Webhook-URL zur Verfügung.
 
![Bitget API Key erstellen](/images/docs/11-bitget-api.png)
*Abbildung 11 – API Key in Bitget generieren*
 
---
 
### 4.2 Alert in TradingView anlegen
 
1. Klicke in der Toolbar auf das **Alert-Icon** (Wecker) oder drücke `Alt + A`.
2. Wähle als Condition die **AmendLogic-Strategie** aus.
3. Stelle sicher, dass **Order fills** als Trigger ausgewählt ist.
 
![Alert erstellen – Condition](/images/docs/12-alert-condition.png)
*Abbildung 12 – Alert Condition auswählen*
 
---
 
### 4.3 Webhook-URL eintragen
 
1. Scrolle im Alert-Dialog nach unten zum Abschnitt **Notifications**.
2. Aktiviere den Schalter **Webhook URL**.
3. Füge die Webhook-URL deines Bots oder deiner Exchange ein.
 
![Webhook URL eintragen](/images/docs/13-webhook-url.png)
*Abbildung 13 – Webhook URL im Alert-Dialog*
 
---
 
### 4.4 Alert-Message konfigurieren
 
Die Alert-Message enthält die JSON-Payload, die an deinen Bot gesendet wird. Das genaue Format hängt von deinem Bot-Anbieter ab. Ein typisches Beispiel:
 
```json
{
  "action": "{{strategy.order.action}}",
  "symbol": "{{ticker}}",
  "price": "{{strategy.order.price}}",
  "contracts": "{{strategy.position_size}}"
}
```
 
Prüfe die Dokumentation deines Bot-Anbieters für das korrekte Payload-Format.
 
![Alert Message](/images/docs/14-alert-message.png)
*Abbildung 14 – Alert Message mit JSON-Payload*
 
---
 
### 4.5 Alert aktivieren
 
1. Klicke auf **Create** — der Alert ist jetzt aktiv.
2. Aktive Alerts sind im **Alerts-Panel** (rechte Seitenleiste) sichtbar.
3. Teste den Alert, indem du die Strategie auf historischen Daten prüfst oder einen Testtrade mit minimalem Kapital ausführst.
 
> **Tipp:** Setze anfangs eine kleine Positionsgröße und prüfe, ob Signale korrekt übertragen werden, bevor du mit echtem Kapital handelst.
 
---
 
## 5. Häufige Fragen
 
**Das Script erscheint nicht unter Invite-Only Scripts.**
Die Freischaltung kann bis zu 10 Minuten dauern. Prüfe, ob der TradingView-Account mit dem Account verknüpft ist, den du bei Whop angegeben hast.
 
**Alerts werden nicht ausgelöst.**
Prüfe, ob dein TradingView-Plan aktive Alerts unterstützt. Der kostenlose Plan ist für konsistente Ausführung nicht ausreichend. Außerdem muss der Browser-Tab nicht offen sein — Alerts laufen serverseitig auf TradingView.
 
**Die Webhook-Anfragen kommen nicht bei Bitget an.**
Prüfe ob die Webhook-URL korrekt ist und der Bot-Dienst läuft. Viele Dienste bieten ein Webhook-Log zur Fehlerdiagnose an.
 
---
 
*Letzte Aktualisierung: März 2025 · AmendLogic*

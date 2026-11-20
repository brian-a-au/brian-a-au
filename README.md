# Hi, I'm Brian Au 👋

**Principal Product Manager at Adobe** | Analytics & Data Engineering Leader

## About Me

For over a decade, I've led Data Analytics, Data Engineering, and Data Science initiatives. I'm passionate about turning complex data systems into clear, actionable insights — and building tools that help others do the same.

## Projects

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ecosystem-dark.svg">
  <img src="assets/ecosystem-light.svg" width="100%" alt="How my tools fit together. The Adobe Analytics API feeds aa-health-duckdb, which checks whether data is still flowing, and aa_auto_sdr, which documents a report suite. The Customer Journey Analytics API feeds cja_auto_sdr, which documents a data view, and cja-audit-log-monitor, which shows who changed what. The two SDR tools write JSON snapshots that sdr-grader turns into a report card and sdr-visualizer turns into a catalog to browse. Claude Code skills run any of these tools from a plain request.">
</picture>

### [CJA Auto SDR](https://github.com/brian-a-au/cja_auto_sdr)
[![PyPI](https://img.shields.io/pypi/v/cja-auto-sdr?label=PyPI)](https://pypi.org/project/cja-auto-sdr/) [![Downloads](https://img.shields.io/pypi/dm/cja-auto-sdr?label=downloads)](https://pypistats.org/packages/cja-auto-sdr)

A Python CLI tool that automates Solution Design Reference (SDR) documentation from Adobe Customer Journey Analytics. Connects to the CJA API to extract Data View configurations, validate data quality, and generate professionally formatted docs (Excel, CSV, JSON, HTML, Markdown). Features batch processing, snapshot management, and org-wide governance analysis. Counterpart project to `aa_auto_sdr`.

### [AA Auto SDR](https://github.com/brian-a-au/aa_auto_sdr)
[![PyPI](https://img.shields.io/pypi/v/aa-auto-sdr?label=PyPI)](https://pypi.org/project/aa-auto-sdr/) [![Downloads](https://img.shields.io/pypi/dm/aa-auto-sdr?label=downloads)](https://pypistats.org/packages/aa-auto-sdr)

A Python CLI tool that automates Solution Design Reference (SDR) documentation from Adobe Analytics. Connects to the Adobe Analytics 2.0 API (read-only) to extract dimensions, metrics, segments, calculated metrics, virtual report suites, and classification datasets, and renders SDRs in five formats (Excel, CSV, JSON, HTML, Markdown). Features batch RSID processing, snapshot persistence with structured diffs (including a PR-comment renderer for GitHub), and named multi-org profiles. Counterpart project to `cja_auto_sdr`.

### [SDR Grader](https://github.com/brian-a-au/sdr-grader)
[![PyPI](https://img.shields.io/pypi/v/sdr-grader?label=PyPI)](https://pypi.org/project/sdr-grader/) [![Downloads](https://img.shields.io/pypi/dm/sdr-grader?label=downloads)](https://pypistats.org/packages/sdr-grader)

A Python CLI tool that grades Adobe Analytics (AA) and Customer Journey Analytics (CJA) implementations for governance and quality. Reads the JSON snapshots produced by `cja_auto_sdr` and `aa_auto_sdr` and scores them against a versioned YAML rubric, making no Adobe API calls of its own. Features strict and pragmatic scoring packs, a self-contained HTML report card, CI integration for automated grade gates, and trend reports across snapshot history. Companion project to `cja_auto_sdr` and `aa_auto_sdr`.

### [SDR Visualizer](https://github.com/brian-a-au/sdr-visualizer)
[![PyPI](https://img.shields.io/pypi/v/sdr-visualizer?label=PyPI)](https://pypi.org/project/sdr-visualizer/) [![Downloads](https://img.shields.io/pypi/dm/sdr-visualizer?label=downloads)](https://pypistats.org/packages/sdr-visualizer)

A Python CLI tool that turns Adobe Analytics (AA) and Customer Journey Analytics (CJA) snapshots into a browsable visual catalog. Reads the same JSON snapshots produced by `cja_auto_sdr` and `aa_auto_sdr` and renders them as a single self-contained HTML file that needs no server or internet connection to view. Features a searchable component catalog, an interactive reference graph, and anatomy diagrams for segments and calculated metrics, plus snapshot comparison and trend views. Companion project to `cja_auto_sdr` and `aa_auto_sdr`.

### [AA Health DuckDB](https://github.com/brian-a-au/aa-health-duckdb)
[![PyPI](https://img.shields.io/pypi/v/aa-health-duckdb?label=PyPI)](https://pypi.org/project/aa-health-duckdb/) [![Downloads](https://img.shields.io/pypi/dm/aa-health-duckdb?label=downloads)](https://pypistats.org/packages/aa-health-duckdb)

A Python CLI tool that checks the health of Adobe Analytics report suites. It is an unofficial, open source alternative to Adobe's Excel workbook "Analytics Health Dashboard". It reads data from the Adobe Analytics 2.0 API and never changes anything in Adobe. It keeps every run in a local DuckDB file and writes one HTML report that you can open offline. Besides Adobe's own anomaly flags, it alerts you when a value drops or spikes far from its average for that weekday, or when a value falls to zero. The report also shows a calendar of alerts by day for the last 13 weeks. It lists components that decline slowly over time, and it keeps the history of earlier runs. It uses the same credential profiles as `aa_auto_sdr`.

### [CJA Audit Log Monitor](https://github.com/brian-a-au/cja-audit-log-monitor)
[![PyPI](https://img.shields.io/pypi/v/cja-audit-log-monitor?label=PyPI)](https://pypi.org/project/cja-audit-log-monitor/) [![Downloads](https://img.shields.io/pypi/dm/cja-audit-log-monitor?label=downloads)](https://pypistats.org/packages/cja-audit-log-monitor)

A Python terminal app (TUI) and CLI for monitoring Adobe Customer Journey Analytics (CJA) audit logs. It is for admins who want to know who is changing, deleting, exporting or sharing components in their CJA org, and who want to catch risky activity early. You can browse and filter the logs by user, action, component and description text, watch new events arrive in a live monitor, and see charts of activity by hour and by day. Alert rules flag bulk deletes, bulk exports and bulk shares. Separate anomaly checks flag unusual activity between midnight and 5am. You can send alerts to Slack or to a webhook, and you can export filtered logs as JSON, CSV or TSV. The CLI works in scripts and scheduled jobs, and most commands can print JSON. It is an unofficial, open source tool, and you can install it from PyPI with `uv` or `pipx`.

### [Claude Code Skills for Adobe](https://github.com/brian-a-au/bau-claude-skills)
A collection of Claude Code skills for Adobe Analytics (AA) and Customer Journey Analytics (CJA). With them, you can ask Claude for a task in plain words, and Claude runs the right commands for the tools above. The concept skills explain AA and CJA basics, e.g., eVars, props, data views and identity stitching. The setup skills walk you through OAuth Server-to-Server API access and help you fix 401 and 403 errors. The SDR skills generate, grade, visualize and compare SDRs, and an `sdr-workflow` skill runs the full flow for audits, migrations, drift monitoring and CI checks. Two monitoring skills cover report suite health checks with AA Health DuckDB, and searches, alert rules and anomaly scans with CJA Audit Log Monitor. You can install the collection as a Claude Code plugin with versioned updates, or copy the skill folders you want.

## Community

- 🔍 [Experience League Community Activity](https://experienceleaguecommunities.adobe.com/search/activity/topics?userid=355505)

## Certifications

- 🏅 Adobe Certified Master — Adobe Analytics Architect
- 🏅 Adobe Certified Expert — Customer Journey Analytics Developer
- 🏅 Adobe Certified Expert — Adobe Analytics Developer
- 🏅 Adobe Certified Expert — Adobe Analytics Business Practitioner
- 🏅 Adobe Certified Professional — Customer Journey Analytics Business Practitioner
- 🏅 Adobe Subject Matter Expert — Customer Journey Analytics Business Practitioner Professional

## Connect

[![X](https://img.shields.io/badge/X-@brianau-000000?logo=x&logoColor=white)](https://x.com/brianau)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-brianau-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brianau/)
[![Instagram](https://img.shields.io/badge/Instagram-brianau-E4405F?logo=instagram&logoColor=white)](https://www.instagram.com/brianau/?hl=en)

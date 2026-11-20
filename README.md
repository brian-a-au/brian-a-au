# Hi, I'm Brian Au 👋

**Principal Product Manager at Adobe** | Analytics & Data Engineering Leader

## About Me

For over a decade, I've led data analytics, data engineering and data science work. I also build free, open source tools for people who work with Adobe Analytics (AA) and Customer Journey Analytics (CJA). With them, you can document, grade and monitor an implementation without doing that work by hand in spreadsheets. The tools only read from Adobe and never change anything there. They are my personal projects, not official Adobe products.

## Projects

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ecosystem-dark.svg">
  <img src="assets/ecosystem-light.svg" width="100%" alt="How my tools fit together. The Adobe Analytics API feeds aa-health-duckdb, which checks whether data is still flowing, and aa_auto_sdr, which documents a report suite. The Customer Journey Analytics API feeds cja_auto_sdr, which documents a data view, and cja-audit-log-monitor, which shows who changed what. The two SDR tools write JSON snapshots that sdr-grader turns into a report card and sdr-visualizer turns into a catalog to browse. Claude Code skills run any of these tools from a plain request.">
</picture>

| You want to... | Use |
|---|---|
| Document a Customer Journey Analytics (CJA) data view | [CJA Auto SDR](https://github.com/brian-a-au/cja_auto_sdr) |
| Document an Adobe Analytics (AA) report suite | [AA Auto SDR](https://github.com/brian-a-au/aa_auto_sdr) |
| Grade an implementation, or fail a CI check when the grade drops | [SDR Grader](https://github.com/brian-a-au/sdr-grader) |
| Browse an implementation, or see what changed between two snapshots | [SDR Visualizer](https://github.com/brian-a-au/sdr-visualizer) |
| Find out if report suite data stopped, dropped or spiked | [AA Health DuckDB](https://github.com/brian-a-au/aa-health-duckdb) |
| Find out who deleted, exported or shared something in Customer Journey Analytics (CJA) | [CJA Audit Log Monitor](https://github.com/brian-a-au/cja-audit-log-monitor) |
| Do any of these by asking Claude in plain words | [Claude Code Skills for Adobe](https://github.com/brian-a-au/bau-claude-skills) |

### Document

#### [CJA Auto SDR](https://github.com/brian-a-au/cja_auto_sdr)
[![PyPI](https://img.shields.io/pypi/v/cja-auto-sdr?label=PyPI)](https://pypi.org/project/cja-auto-sdr/) [![Downloads](https://img.shields.io/pypi/dm/cja-auto-sdr?label=downloads)](https://pypistats.org/packages/cja-auto-sdr)

Documents your CJA data views as a Solution Design Reference (SDR) in Excel, CSV, JSON, HTML or Markdown. Use it to keep a current record of every dimension and metric, to compare snapshots over time, or to review governance across your whole org.

#### [AA Auto SDR](https://github.com/brian-a-au/aa_auto_sdr)
[![PyPI](https://img.shields.io/pypi/v/aa-auto-sdr?label=PyPI)](https://pypi.org/project/aa-auto-sdr/) [![Downloads](https://img.shields.io/pypi/dm/aa-auto-sdr?label=downloads)](https://pypistats.org/packages/aa-auto-sdr)

Documents your Adobe Analytics report suites as an SDR, including eVars, props, events, segments, calculated metrics and classifications. Use it to audit an implementation, to track changes between snapshots, or to post a diff as a comment on a GitHub pull request.

### Assess

#### [SDR Grader](https://github.com/brian-a-au/sdr-grader)
[![PyPI](https://img.shields.io/pypi/v/sdr-grader?label=PyPI)](https://pypi.org/project/sdr-grader/) [![Downloads](https://img.shields.io/pypi/dm/sdr-grader?label=downloads)](https://pypistats.org/packages/sdr-grader)

Grades an AA or CJA implementation against a rubric and writes an HTML report card. Use it to find governance problems, or to fail a CI check when the grade drops. It reads the snapshots from the two SDR tools and makes no calls to Adobe.

#### [SDR Visualizer](https://github.com/brian-a-au/sdr-visualizer)
[![PyPI](https://img.shields.io/pypi/v/sdr-visualizer?label=PyPI)](https://pypi.org/project/sdr-visualizer/) [![Downloads](https://img.shields.io/pypi/dm/sdr-visualizer?label=downloads)](https://pypistats.org/packages/sdr-visualizer)

Turns an SDR snapshot into one HTML file that you can search and browse offline, with a graph of which components refer to which. Use it to explore an implementation, or to compare two snapshots and see what changed.

### Monitor

#### [AA Health DuckDB](https://github.com/brian-a-au/aa-health-duckdb)
[![PyPI](https://img.shields.io/pypi/v/aa-health-duckdb?label=PyPI)](https://pypi.org/project/aa-health-duckdb/) [![Downloads](https://img.shields.io/pypi/dm/aa-health-duckdb?label=downloads)](https://pypistats.org/packages/aa-health-duckdb)

Checks whether your Adobe Analytics data is still flowing. It flags drops, spikes and values that fall to zero for every custom event, eVar and prop, keeps every run in a DuckDB file, and writes an HTML report you can open offline. It is an open source alternative to Adobe's "Analytics Health Dashboard" Excel workbook.

#### [CJA Audit Log Monitor](https://github.com/brian-a-au/cja-audit-log-monitor)
[![PyPI](https://img.shields.io/pypi/v/cja-audit-log-monitor?label=PyPI)](https://pypi.org/project/cja-audit-log-monitor/) [![Downloads](https://img.shields.io/pypi/dm/cja-audit-log-monitor?label=downloads)](https://pypistats.org/packages/cja-audit-log-monitor)

Shows who created, changed, deleted, exported or shared components in your CJA org. You can search and export the audit logs, watch new events live in a terminal app, and send alerts to Slack or a webhook when someone deletes, exports or shares many components at once.

### Automate

#### [Claude Code Skills for Adobe](https://github.com/brian-a-au/bau-claude-skills)
Claude Code skills for AA and CJA. You ask Claude for a task in plain words, e.g., "document report suite X and grade it", and Claude runs the right tools above. The collection also explains AA and CJA concepts and walks you through API setup. You can install it as a Claude Code plugin.

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

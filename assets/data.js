/* ============================================================
   data.js  ·  shared bootcamp data (modules, classes, resources)
   ============================================================ */

const BOOTCAMP_DATA = {
  title: "HDNB Data Analytics Career Bootcamp",
  start: "June 27, 2026",
  classes: 19,
  instructors: 5,
  duration: "~3 months",
  platform: "Google Meet",

  modules: [
    {
      id: "M1",
      title: "Data Analytics Foundations",
      color: "#1a5276",
      weeks: "Week 1",
      classes: [
        { num: "Class 1",  topic: "What is data analytics?", detail: "Types of analytics · Descriptive, Diagnostic, Predictive, Prescriptive" },
        { num: "Class 2",  topic: "Tools overview & career roadmap", detail: "Data Analyst vs Data Scientist · Bangladesh market landscape" },
      ]
    },
    {
      id: "M2",
      title: "Excel for Data Analytics",
      color: "#117a65",
      weeks: "Weeks 2–3",
      classes: [
        { num: "Class 3",  topic: "Data formatting, cleaning & validation", detail: "Data types, removing duplicates, conditional formatting" },
        { num: "Class 4",  topic: "VLOOKUP, XLOOKUP, IF, COUNTIFS, SUMIFS", detail: "Core lookup & logical functions for analysts" },
        { num: "Class 5",  topic: "Pivot tables, Power Query & dashboards", detail: "Pivot charts, Power Query basics, building an Excel dashboard" },
      ]
    },
    {
      id: "M3",
      title: "SQL for Data Querying",
      color: "#784212",
      weeks: "Weeks 4–5",
      classes: [
        { num: "Class 6",  topic: "SELECT, FROM, WHERE, GROUP BY, ORDER BY", detail: "Basics of writing queries on real tables" },
        { num: "Class 7",  topic: "JOINs & aggregate functions", detail: "INNER, LEFT, RIGHT joins · COUNT, SUM, AVG, MAX, MIN" },
        { num: "Class 8",  topic: "Subqueries, CTEs & SQL project", detail: "Advanced querying · HR dataset project" },
      ]
    },
    {
      id: "M4",
      title: "Statistics for Data Analytics",
      color: "#4a235a",
      weeks: "Week 6",
      classes: [
        { num: "Class 9",  topic: "Descriptive statistics", detail: "Mean, median, mode, std deviation, distributions" },
        { num: "Class 10", topic: "Hypothesis testing & correlation", detail: "p-values, t-tests, correlation vs causation · Applied in Excel/Python" },
      ]
    },
    {
      id: "M5",
      title: "Power BI — Dashboards & Reporting",
      color: "#c0392b",
      weeks: "Weeks 7–8",
      classes: [
        { num: "Class 11", topic: "Power BI interface & data import", detail: "Connecting to Excel, CSV, databases · data modelling" },
        { num: "Class 12", topic: "DAX basics", detail: "CALCULATE, SUMX, FILTER · calculated columns & measures" },
        { num: "Class 13", topic: "Interactive dashboards & project", detail: "Slicers, drill-throughs, publishing to cloud · Power BI project" },
      ]
    },
    {
      id: "M6",
      title: "Python for Data Analytics",
      color: "#154360",
      weeks: "Weeks 9–10",
      classes: [
        { num: "Class 14", topic: "Python basics", detail: "Variables, loops, functions, data types" },
        { num: "Class 15", topic: "Pandas & NumPy", detail: "DataFrames, filtering, groupby, NumPy arrays" },
        { num: "Class 16", topic: "Matplotlib, Seaborn & EDA", detail: "Charts, heatmaps, exploratory data analysis on real dataset" },
      ]
    },
    {
      id: "M7",
      title: "Capstone Project + Career Prep",
      color: "#1a5276",
      weeks: "Weeks 11–12",
      classes: [
        { num: "Class 17", topic: "End-to-end analytics project", detail: "HR / attrition dataset · full pipeline from raw data to insight" },
        { num: "Class 18", topic: "Data storytelling & portfolio", detail: "Presenting insights · building a GitHub portfolio" },
        { num: "Class 19", topic: "CV, LinkedIn & mock interviews", detail: "Optimising your profile · final term assessment" },
      ]
    },
  ],

  resources: [
    { module: "M1", badge: "badge-m1", title: "2026 FREE Data Analyst Bootcamp (24 hrs)", channel: "Luke Barousse", url: "https://www.youtube.com/watch?v=cnjhHZNJEDk", covers: "Full roadmap overview, tools preview, what analysts actually do" },
    { module: "M2", badge: "badge-m2", title: "Excel for Data Analytics — Full Course for Beginners", channel: "Alex The Analyst", url: "https://www.youtube.com/watch?v=pCJ15nGFgVg", covers: "Pivot tables, XLOOKUP, data cleaning, dashboards" },
    { module: "M2", badge: "badge-m2", title: "Excel Data Analysis Full Course (7+ hours)", channel: "Kevin Stratvert", url: "https://www.youtube.com/watch?v=qrbf9DtR3_c", covers: "Advanced formulas, data analysis toolpak, charts" },
    { module: "M3", badge: "badge-m3", title: "SQL Full Course — 30 Hours Zero to Hero", channel: "Data with Baraa", url: "https://www.youtube.com/watch?v=SSKVgrwhzus", covers: "SELECT to CTEs — all M3 content, hand-drawn visuals" },
    { module: "M3", badge: "badge-m3", title: "SQL Tutorials for Data Analysts (playlist)", channel: "Alex The Analyst", url: "https://www.youtube.com/playlist?list=PLUaB-1hjhk8Hyd5NiPQ9CND82vNodlFF5", covers: "JOINs, GROUP BY, real analyst use cases" },
    { module: "M4", badge: "badge-m4", title: "StatQuest: Statistics Fundamentals playlist", channel: "StatQuest / Josh Starmer", url: "https://www.youtube.com/@statquest", covers: "Mean, median, std dev, hypothesis testing, p-values" },
    { module: "M4", badge: "badge-m4", title: "CrashCourse Statistics playlist", channel: "CrashCourse", url: "https://www.youtube.com/c/CrashCourse", covers: "All core stat concepts in approachable short videos" },
    { module: "M5", badge: "badge-m5", title: "Power BI Getting Started playlist", channel: "Guy in a Cube", url: "https://www.youtube.com/guyinacube", covers: "Interface, data import, visuals, DAX basics" },
    { module: "M5", badge: "badge-m5", title: "Power BI End-to-End Project", channel: "Codebasics", url: "https://codebasics.io/courses/power-bi-data-analysis-with-end-to-end-project", covers: "Full project: data model → DAX → dashboard → cloud publish" },
    { module: "M6", badge: "badge-m6", title: "Data Analysis with Python — Full Course", channel: "freeCodeCamp / Jovian", url: "https://www.youtube.com/watch?v=r-uOLxNrNk8", covers: "Python basics → Pandas → NumPy → Matplotlib → Seaborn" },
    { module: "M6", badge: "badge-m6", title: "Complete Data Analysis — Pandas & Matplotlib with Project", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=FHUuI_mddZU", covers: "Real-world data cleaning, EDA, visualisation" },
    { module: "M7", badge: "badge-m7", title: "Data Analyst Bootcamp 35+ Hours — Portfolio & Career", channel: "Luke Barousse", url: "https://www.youtube.com/watch?v=MOzEvNYvbik", covers: "Capstone project, portfolio building, resume, LinkedIn" },
  ],

  prepTips: [
    { module: "M2", color: "#1098ad", label: "Before M2 (Excel)", tip: "Install Excel or Google Sheets. Practice SUM, IF, VLOOKUP. Your HR work already gives you a head start here." },
    { module: "M3", color: "#2f9e44", label: "Before M3 (SQL)", tip: "Install MySQL or PostgreSQL (free). Watch the first 3–4 videos of Data with Baraa's SQL course — just SELECT is enough." },
    { module: "M4", color: "#e67700", label: "Before M4 (Stats)", tip: "Watch 5–6 StatQuest videos on descriptive stats. Your HR metrics background means correlation and averages will click fast." },
    { module: "M5", color: "#c2255c", label: "Before M5 (Power BI)", tip: "Download Power BI Desktop (free). Connect to an Excel file and build one chart before class. It moves quickly." },
    { module: "M6", color: "#6741d9", label: "Before M6 (Python)", tip: "Install Python via Anaconda. Open Jupyter Notebook. Run print('hello') — that's all you need before class." },
    { module: "M7", color: "#2c7a7b", label: "For M7 (Capstone)", tip: "Plan to use an HR dataset — attrition, headcount, performance. PMUK-type data will make your portfolio stand out to employers." },
  ]
};

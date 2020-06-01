<h1 align="center">Checker for company government inspections (🇺🇦UA)</h1>

<img src="https://github.com/ValeryP/fop-check/blob/dev/img/fop-check-empty-state.gif" width="100%">

Every year the Ukrainian government selects thousands of private companies to inspect their 
documents and business activity. They are unexpected for the business and could lead to high fines. 
The website allows the business owners to check the date and the topic of the inspection to prepare 
for the inspection in advance and proceed smoothly.

- 🏗 [Architecture](#-architecture)
- 🚀 [Quick start](#-quick-start)
- 🔗 [Data source](#-data-source)
- ✉️ [Feedback](https://t.me/p_val)

### 🏗 Architecture

- `notebook` - data cleaning and preparation (merging [~20 data sources](https://inspections.gov.ua/regulators-plans/index?planning_period_id=4&page=1) into single DB)
- the cleaned data merged into single `db.csv` stored into [AWS S3](https://aws.amazon.com/s3) bucket
- `src` - React JS app with async downloading and parsing `db.csv` using [`papaparse`](https://www.papaparse.com/)
- [Material UI](https://material-ui.com/) is the visual framework used for web app development
- Database of "Subscribe for updates" feature implemented by [Firestore](https://firebase.google.com/docs/firestore) using [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk)

## 🚀 Quick start

1. **Clone the project**

```shell script
git clone https://github.com/ValeryP/fop-check.git
```

2. **Run the local website**

```shell script
cd fop-check
yarn install
yarn start
```

3. **Open the source code and start editing**

Your site is now running at `http://localhost:3000`

## 🔗 Data source

<img src="https://github.com/ValeryP/fop-check/blob/dev/img/data%20source.jpeg"
     alt="" style="float: left;" />

[Державна фіскальна служба України](https://inspections.gov.ua/regulators-plans/index?planning_period_id=4&page=1)


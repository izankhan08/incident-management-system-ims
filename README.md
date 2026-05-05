# incident-management-system-ims
Event-driven Incident Management System using Node.js, Redis (BullMQ), and MongoDB with debouncing logic and async worker processing.
# 🚀 Incident Management System (IMS)

## 📌 Overview

This project is a scalable **Incident Management System** built using an **event-driven architecture**.
It processes system signals asynchronously using **Redis + BullMQ** and manages incidents efficiently.

---

## 🧠 Architecture

Client → Express API → BullMQ Queue → Worker → MongoDB

---

## ⚙️ Features

* Signal ingestion API
* Queue-based async processing
* Retry with exponential backoff
* Debouncing logic (10 sec window)
* WorkItem (Incident) creation
* Incident lifecycle management
* RCA-based incident closure

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Redis
* BullMQ
* Docker

---

## 📡 API Endpoints

### POST /api/signals

```json
{
  "component_id": "CACHE_CLUSTER_01",
  "severity": "P2",
  "message": "Latency spike detected"
}
```

### GET /api/signals

### GET /api/workitems

### PATCH /api/workitems/:id/close

```json
{
  "rca": "Cache overload due to traffic spike"
}
```

---

## 🔄 Workflow

1. Signal received
2. Added to queue
3. Worker processes signal
4. Debounce logic prevents duplicates
5. Incident created or reused
6. Data stored in MongoDB

---

## 💼 Author

Mohammad Izan Khan

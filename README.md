# RequestHandler
# 🚀 Request Handler with HAProxy, Prometheus, and Grafana

## 📌 Project Overview
This project is a **Load-Balanced Request Handler** using **HAProxy**, managing multiple **Node.js Express servers** while monitoring metrics with **Prometheus** and visualizing them in **Grafana**.

## 🔧 Features
- **Load Balancing**: Distributes traffic across 4 Node.js servers.
- **Server Management API**: Start, stop, and restart servers via an admin panel.
- **Metrics & Monitoring**: Prometheus scrapes server metrics, and Grafana visualizes them.
- **REST API**: The admin panel communicates with the servers via API endpoints.


## 🔥 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/request-handler.git
cd request-handler
```

### 2️⃣ Install Dependencies
For admin API & servers:
```bash
cd admin-api && npm install
cd ../servers && npm install
```

### 3️⃣ Start Node.js Servers
Run each server manually (or use the admin API):
```bash
node servers/server.js 5001 &
node servers/server.js 5002 &
node servers/server.js 5003 &
node servers/server.js 5004 &
```
Or start via the **admin API**:
```bash
cd admin-api
node admin-api.js
curl -X POST http://localhost:4000/start/5001  # Start server 1
```

### 4️⃣ Start HAProxy (Load Balancer)
```bash
sudo systemctl restart haproxy
```

### 5️⃣ Start Prometheus & Grafana
```bash
prometheus --config.file=monitoring/prometheus.yml &
grafana-server &
```

## 📊 Monitoring Setup
- **Prometheus UI**: http://localhost:9090
- **Grafana UI**: http://localhost:3000 (Default login: `admin` / `admin`)

## 🛠 Configuration
- **Modify `haproxy.cfg`** to adjust load balancing rules.
- **Edit `prometheus.yml`** to add/remove monitored targets.
- **Create custom Grafana dashboards** for better visualization.

## 💡 Future Improvements
- Add authentication for the admin panel.
- Implement WebSocket-based real-time server status updates.
- Automate deployment with Docker & Kubernetes.

## 🤝 Contributing
Feel free to **fork**, submit **issues**, or create **pull requests** to improve the project!



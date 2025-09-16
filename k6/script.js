import http from "k6/http";
import { check, sleep } from "k6";

const API_BASE_URL = "http://localhost:4000/api";

export const options = {
  scenarios: {
    main_load: {
      executor: "ramping-vus", 
      startVUs: 0,
      stages: [
       
        { duration: "10s", target: 300 },
      
        { duration: "60s", target: 300 },
       
        { duration: "5s", target: 0 },
      ],
      gracefulRampDown: "10s",
    },
  },
  thresholds: {
    "http_req_duration{url:http://localhost:4000/api/drills}": ["p(95)<150"],
    http_req_failed: ["rate<0.01"],
  },
};

let drillIds = [];
export function setup() {
  const res = http.get(`${API_BASE_URL}/drills`);
  if (res.status === 200) {
    const drills = res.json();
    if (Array.isArray(drills)) {
      drillIds = drills.map((d) => d._id);
    }
  }
  return { ids: drillIds };
}
export default function (data) {
  if (!data.ids || data.ids.length === 0) {
    return;
  }

  const drillsRes = http.get(`${API_BASE_URL}/drills`);
  check(drillsRes, { "GET /api/drills | status 200": (r) => r.status === 200 });

  const randomId = data.ids[Math.floor(Math.random() * data.ids.length)];
  const drillDetailRes = http.get(`${API_BASE_URL}/drills/${randomId}`);
  check(drillDetailRes, {
    "GET /api/drills/:id | status 200": (r) => r.status === 200,
  });

 
  sleep(Math.random() * 2 + 1); 
}

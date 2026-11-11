
import SpeedTest from "@cloudflare/speedtest";

const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");

let tester;

function startTest() {
  startBtn.disabled = true;
  statusText.textContent = "Testing your internet...";

  const fields = ["speed", "download", "upload", "ping", "jitter"];

  document.getElementById("speed").textContent = "0.00";

  ["download", "upload", "ping", "jitter"].forEach(id => {
    document.getElementById(id).textContent = "Testing...";
  });

  try {
    tester = new SpeedTest();

    tester.onResultsChange = () => {
      const r = tester.results;

      const down = r.getDownloadBandwidth();
      const up = r.getUploadBandwidth();
      const ping = r.getUnloadedLatency();
      const jitter = r.getUnloadedJitter();

      if (down != null) {
        const value = (down / 1e6).toFixed(2);
        document.getElementById("speed").textContent = value;
        document.getElementById("download").textContent =
          value + " Mbps";
      }

      if (up != null) {
        document.getElementById("upload").textContent =
          (up / 1e6).toFixed(2) + " Mbps";
      }

      if (ping != null) {
        document.getElementById("ping").textContent =
          ping.toFixed(2) + " ms";
      }

      if (jitter != null) {
        document.getElementById("jitter").textContent =
          jitter.toFixed(2) + " ms";
      }
    };

    tester.onFinish = () => {
      statusText.textContent = "Speed test completed!";
      startBtn.disabled = false;
    };

    tester.onError = (error) => {
      console.error("Speed test error:", error);
    };

  } catch (error) {
    console.error(error);
    statusText.textContent = "Unable to start test.";
    startBtn.disabled = false;
  }
}

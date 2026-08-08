import { Wrench } from "lucide-react";

/**
 * MaintenancePage
 * Full-screen takeover shown when VITE_MAINTENANCE="true".
 * See bottom of this file for activation instructions.
 */
function MaintenancePage() {
  return (
    <div className="maintenance">
      <style>{`
        .maintenance {
          min-height: 100dvh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          padding: clamp(20px, 6vw, 48px);
          box-sizing: border-box;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        }

        .maintenance__card {
          width: 100%;
          max-width: 480px;
          text-align: center;
        }

        .maintenance__mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: 900;
          font-size: clamp(28px, 8vw, 40px);
          letter-spacing: 1px;
          background: #d7000f;
          color: #ffffff;
          padding: clamp(6px, 2vw, 10px) clamp(18px, 5vw, 26px);
          margin: 0 auto clamp(28px, 6vw, 40px);
        }

        .maintenance__bar {
          width: 64px;
          height: 4px;
          background: #f0f0f0;
          margin: 0 auto clamp(24px, 5vw, 32px);
          overflow: hidden;
          border-radius: 2px;
        }

        .maintenance__bar-fill {
          width: 40%;
          height: 100%;
          background: #d7000f;
          animation: sweep 1.6s ease-in-out infinite;
        }

        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        .maintenance__icon {
          color: #d7000f;
          margin-bottom: clamp(14px, 3vw, 18px);
        }

        .maintenance__title {
          font-size: clamp(20px, 4.5vw, 26px);
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 clamp(10px, 2.5vw, 14px);
          line-height: 1.3;
        }

        .maintenance__subtitle {
          font-size: clamp(14px, 3.2vw, 16px);
          color: #5a5a5a;
          line-height: 1.6;
          margin: 0;
          max-width: 380px;
          margin-inline: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .maintenance__bar-fill {
            animation: none;
            transform: translateX(0%);
            width: 100%;
          }
        }
      `}</style>

      <div className="maintenance__card">
        <div className="maintenance__mark">BYC</div>

        <Wrench size={28} className="maintenance__icon" strokeWidth={2} />

        <h1 className="maintenance__title">We're making some updates</h1>
        <p className="maintenance__subtitle">
          Our store is offline for a short while as we work on improvements.
          We'll be back shortly — thanks for your patience.
        </p>

        <div className="maintenance__bar" style={{ marginTop: 28 }}>
          <div className="maintenance__bar-fill" />
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;

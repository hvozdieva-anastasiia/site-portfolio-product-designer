import type { CaseArtKind } from '../../../content/types';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import './CaseArt.css';

// Greyed skeleton UIs with one coloured detail, faded into the panel,
// in the same spirit as the product illustrations on the reference site.

function Onboarding() {
  return (
    <>
      <div className="art-phones">
        <div className="phone">
          <Skeleton w="35%" h={8} />
          <Skeleton w="80%" />
          <Skeleton w="60%" />
          <div className="phone-img" />
          <Skeleton h={24} tone="ink" />
        </div>
        <div className="phone phone--lead">
          <div className="steps">
            <i className="on" />
            <i className="on" />
            <i />
          </div>
          <Skeleton w="70%" h={8} />
          <Skeleton w="90%" />
          <div className="phone-field" />
          <div className="phone-field" />
          <Skeleton h={24} tone="blue" />
        </div>
        <div className="phone">
          <div className="phone-check" />
          <Skeleton w="55%" h={8} />
          <Skeleton w="75%" />
          <Skeleton h={24} tone="wash" />
        </div>
      </div>
      <div className="art-badge art-badge--top">
        <Glyph tone="tomato" /> Step 2 · 38% drop-off
      </div>
      <div className="art-badge art-badge--bottom">
        <Glyph tone="green" /> After redesign · 14%
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <div className="app">
        <div className="app-bar">
          <i />
          <i />
          <i />
          <Skeleton w={90} h={6} />
        </div>
        <div className="app-body">
          <div className="app-side">
            <Skeleton w="70%" h={8} tone="ink" />
            <Skeleton w="85%" />
            <Skeleton w="60%" />
            <Skeleton w="75%" />
          </div>
          <div className="app-main">
            <div className="kpis">
              {[0, 1, 2].map((item) => (
                <div className="kpi" key={item}>
                  <Skeleton w="50%" h={5} />
                  <Skeleton
                    w="70%"
                    h={14}
                    tone={item === 1 ? 'blue' : undefined}
                  />
                </div>
              ))}
            </div>
            <div className="chart">
              <svg
                viewBox="0 0 320 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 30H320M0 60H320M0 90H320"
                  className="chart-grid"
                  fill="none"
                />
                <path
                  d="M0 88 40 80 80 84 120 70 160 74 200 58 240 62 280 44 320 40"
                  className="chart-ctrl"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0 96 40 84 80 70 120 58 160 52 200 36 240 30 280 20 320 14"
                  className="chart-var"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle
                  cx="200"
                  cy="36"
                  r="5"
                  className="chart-dot"

                  strokeWidth="2"
                />
              </svg>
              <span className="chart-tag">
                <Glyph tone="blue" /> Weekly active teams
              </span>
            </div>
            <div className="cohort">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} style={{ opacity: 0.12 + ((i * 7) % 10) / 14 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Booking() {
  const days = Array.from({ length: 28 }, (_, i) => i);
  return (
    <>
      <div className="app app--booking">
        <div className="app-bar">
          <i />
          <i />
          <i />
          <Skeleton w={70} h={6} />
        </div>
        <div className="booking">
          <div className="calendar">
            <Skeleton w="40%" h={8} />
            <div className="days">
              {days.map((day) => (
                <i
                  key={day}
                  className={
                    day === 16
                      ? 'day day--on'
                      : day % 5 === 2
                        ? 'day day--free'
                        : 'day'
                  }
                />
              ))}
            </div>
          </div>
          <div className="slots">
            <Skeleton w="50%" h={8} />
            <span className="slot" />
            <span className="slot slot--on" />
            <span className="slot" />
            <Skeleton h={24} tone="ink" />
          </div>
        </div>
      </div>
      <div className="art-phone-float">
        <div className="phone phone--lead">
          <span className="phone-check" />
          <Skeleton w="60%" h={8} />
          <Skeleton w="80%" />
          <Skeleton h={22} tone="green" />
        </div>
      </div>
      <div className="art-badge art-badge--top">
        <Glyph tone="green" /> Booking confirmed
      </div>
    </>
  );
}

export function CaseArt({ kind }: { kind: CaseArtKind }) {
  return (
    <div className={`art art--${kind}`} aria-hidden="true">
      <div className="art-glow" />
      <div className="art-scene">
        {kind === 'onboarding' && <Onboarding />}
        {kind === 'dashboard' && <Dashboard />}
        {kind === 'booking' && <Booking />}
      </div>
    </div>
  );
}

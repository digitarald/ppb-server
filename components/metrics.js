import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { meta } from '../lib/metrics';
import Metric from '../components/metric';
import reducers from '../lib/reducers';

const Metrics = ({ profiles, highlight, onMouseEnter }) => {
  const groups = [...meta].reduce((groups, [metric, metricMeta]) => {
    const bits = metric.split('-');
    if (bits.length > 1) {
      const group = bits[0];
      if (!groups.has(group)) {
        groups.set(group, new Map([[metric, metricMeta]]));
      } else {
        groups.get(group).set(metric, metricMeta);
      }
    }
    return groups;
  }, new Map());

  const $content = [...groups].map(([group, groupMetrics]) => {
    const $metrics = [...groupMetrics].map(([metric, metricMeta]) => {
      const $metric = (
        <Metric
          key={`metric-${metric}`}
          id={metric}
          meta={metricMeta}
          profiles={profiles}
          highlight={highlight}
          onMouseEnter={onMouseEnter}
        />
      );
      return $metric;
    });
    return (
      <section className="group" key={group}>
        <h2>{group}</h2>
        <div className="metrics">{$metrics}</div>
        <style jsx>{`
          section {
          }
          h2 {
            text-transform: capitalize;
            color: #555;
            margin: 0.75rem 0.75rem 0.25rem;
            font-weight: 300;
            font-size: 1.2rem;
          }
          .metrics {
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </section>
    );
  });
  return <div>{$content}</div>;
};

export default Metrics;
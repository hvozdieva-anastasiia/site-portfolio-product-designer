import type { Case, CaseStudy } from '../../content/types';
import { CaseFlow } from '../../components/blocks/CaseFlow/CaseFlow';
import { CaseHero } from '../../components/blocks/CaseHero/CaseHero';
import { CaseHypotheses } from '../../components/blocks/CaseHypotheses/CaseHypotheses';
import { CaseImpact } from '../../components/blocks/CaseImpact/CaseImpact';
import { CaseLearnings } from '../../components/blocks/CaseLearnings/CaseLearnings';
import { CaseNext } from '../../components/blocks/CaseNext/CaseNext';
import { CaseOverview } from '../../components/blocks/CaseOverview/CaseOverview';
import { CaseProblem } from '../../components/blocks/CaseProblem/CaseProblem';
import { CaseResearch } from '../../components/blocks/CaseResearch/CaseResearch';
import { CaseRole } from '../../components/blocks/CaseRole/CaseRole';
import { CaseSolution } from '../../components/blocks/CaseSolution/CaseSolution';
import './CaseStudyPage.css';

type CaseStudyPageProps = { study: CaseStudy; item: Case };

/**
 * A full product case, in the order a hiring team reads it: the problem and
 * its evidence, research, hypotheses ranked with ICE, the solution directions
 * with their screens, the new flow, and the impact.
 */
export function CaseStudyPage({ study, item }: CaseStudyPageProps) {
  const backTo = '/#cases';
  // Section numbers follow what the case has: a case without research of its
  // own goes from the problem straight to the hypotheses.
  let n = 1;
  const num = (label: string) => `${String(n++).padStart(2, '0')} — ${label}`;
  return (
    <article className="case-study" aria-labelledby="case-title">
      <CaseHero {...study.hero} backTo={backTo} externalHref={item.behance} />
      <CaseOverview {...study.overview} />
      <CaseRole {...study.role} domains={item.domains} tools={item.tools} />
      <CaseProblem kicker={num('Problem')} {...study.problem} />
      {study.research && (
        <CaseResearch kicker={num('Research')} {...study.research} />
      )}
      <CaseHypotheses
        kicker={num(
          study.hypotheses.items
            ? 'Hypotheses & ICE'
            : study.research
              ? 'Hypotheses & interviews'
              : 'Hypotheses',
        )}
        {...study.hypotheses}
      />
      <CaseSolution kicker={num('Solution')} {...study.solution} />
      <CaseFlow kicker={num('User flow')} {...study.flow} />
      <CaseImpact kicker={num('Impact')} {...study.impact} />
      <CaseLearnings kicker="Learnings" {...study.learnings} />

      <CaseNext
        next={
          study.next && {
            title: study.next.title,
            to: `/cases/${study.next.slug}`,
          }
        }
        backTo={backTo}
      />
    </article>
  );
}

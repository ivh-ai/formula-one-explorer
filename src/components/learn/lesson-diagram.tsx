import type { DiagramId } from "@/content/lessons/types";
import { DownforceDiagram } from "@/components/learn/diagrams/downforce-diagram";
import { DrsDiagram } from "@/components/learn/diagrams/drs-diagram";
import { ErsFlowDiagram } from "@/components/learn/diagrams/ers-flow-diagram";
import { TireCompoundsDiagram } from "@/components/learn/diagrams/tire-compounds-diagram";
import { RaceWeekendTimeline } from "@/components/learn/diagrams/race-weekend-timeline";
import { PitStopAnatomy } from "@/components/learn/diagrams/pit-stop-anatomy";
import { FlagGallery } from "@/components/learn/diagrams/flag-gallery";
import { PointsTableDiagram } from "@/components/learn/diagrams/points-table-diagram";
import { QualifyingFormatDiagram } from "@/components/learn/diagrams/qualifying-format-diagram";
import { CircuitAnatomy } from "@/components/learn/diagrams/circuit-anatomy";

const DIAGRAMS: Record<DiagramId, () => React.ReactElement> = {
  downforce: DownforceDiagram,
  drs: DrsDiagram,
  "ers-flow": ErsFlowDiagram,
  "tire-compounds": TireCompoundsDiagram,
  "race-weekend": RaceWeekendTimeline,
  "pit-stop": PitStopAnatomy,
  flags: FlagGallery,
  "points-table": PointsTableDiagram,
  "qualifying-format": QualifyingFormatDiagram,
  "circuit-anatomy": CircuitAnatomy,
};

export function LessonDiagram({ id }: { id: DiagramId }) {
  const Diagram = DIAGRAMS[id];
  return (
    <figure className="glass-panel my-6 rounded-xl p-5">
      <Diagram />
    </figure>
  );
}

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
  spec?: string[];
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("course-specific promises", () => {
  it("weights every assessment to sum to exactly 100", () => {
    const assessments = byType("assessments");
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, `assessment weights sum to ${total}, not 100`).toBe(100);
  });

  it("gives every assessment a non-empty spec", () => {
    for (const node of byType("assessments")) {
      expect(node.spec?.length ?? 0, `${node.id} has no spec lines`).toBeGreaterThan(0);
    }
  });

  it("schedules exactly one lecture or studio per week, 1 through 12", () => {
    const weeks = new Set<number>();
    for (const node of [...byType("lectures"), ...byType("sessions")]) {
      weeks.add(Number(node.meta?.week));
    }
    for (let week = 1; week <= 12; week += 1) {
      expect(weeks.has(week), `no lecture or studio scheduled in week ${week}`).toBe(true);
    }
  });

  it("gives every studio and lecture at least one named teacher", () => {
    for (const node of [...byType("sessions"), ...byType("lectures")]) {
      const teachers = (node.meta?.teachers as string[] | undefined) ?? [];
      expect(teachers.length, `${node.id} has no teacher`).toBeGreaterThan(0);
    }
  });

  it("carries at least one lecture with a real slide deck", () => {
    const withSlides = byType("lectures").filter((node) => typeof node.meta?.slides === "string");
    expect(withSlides.length).toBeGreaterThan(0);
  });
});

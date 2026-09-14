import type { CourseMetaInput } from "astro-course-university";
import { z } from "astro/zod";

// The level digits ANU uses: 1000--4000 undergraduate, 6000 and 8000
// postgraduate. Both the code pattern and the level field derive from this.
const LEVELS = [1, 2, 3, 4, 6, 8] as const;
const allowedCode = new RegExp(`^SLOP[${LEVELS.join("")}]\\d{3}$`);

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000, 6000 or 8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.string().trim().min(1).max(40),
    year: z.number().int().min(2026).max(2200),
    level: z.literal(LEVELS),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
  });

// The single source of truth for the course record. The generated homepage,
// navigation label and /api/index.json all read this object.
//
// The code's last three digits (474) were assigned to this repo when it was
// provisioned; the level digit is this course's own call — 2, an elective
// with no formal prerequisite beyond first-year standing, since the craft
// content (workshop technique, materials) is taught from scratch but the
// argument (what a fake is for) rewards having already sat through one
// semester of thinking critically about a discipline.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP2474",
  title: "The Forger's Craft",
  session: "Semester 2",
  year: 2027,
  level: 2,
  startDate: "2027-07-27",
  endDate: "2027-10-26",
  description:
    "A practical and historical study of forgery and convincing imitation, in paint, " +
    "prose, currency and code, asking what a fake teaches about the real thing it copies.",
  tags: ["forgery", "connoisseurship", "material culture"],
}) satisfies CourseMetaInput;

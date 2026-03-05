import { describe, expect, it } from "vitest";
import { DB } from "../../data/constants";
import { generateSampleDataSQL } from "./sampleData";

describe("generateSampleDataSQL", () => {
  it("creates a clean export payload with valid insert statement structure", () => {
    const sql = generateSampleDataSQL(
      {
        database: DB.POSTGRES,
        tables: [
          {
            id: "users",
            name: "users",
            fields: [
              { id: "id", name: "id", type: "INTEGER", increment: true },
              { id: "name", name: "name", type: "VARCHAR", size: "16" },
            ],
          },
        ],
        references: [],
      },
      { rowsPerTable: 2 },
    );

    expect(sql.startsWith("-- Sample data generated from diagram tables")).toBe(
      true,
    );
    expect(sql).toContain('INSERT INTO "users" ("id", "name") VALUES');
    expect(sql).toContain("(1, 'users_name_1')");
    expect(sql).toContain("(2, 'users_name_2')");
    expect(sql.trim().endsWith(";")).toBe(true);
  });

  it("uses database-specific identifier syntax (MySQL)", () => {
    const sql = generateSampleDataSQL(
      {
        database: DB.MYSQL,
        tables: [
          {
            id: "t1",
            name: "users",
            fields: [{ id: "f1", name: "id", type: "INTEGER", increment: true }],
          },
        ],
        references: [],
      },
      { rowsPerTable: 1 },
    );

    expect(sql).toContain("INSERT INTO `users` (`id`) VALUES");
    expect(sql).toContain("(1)");
  });

  it("returns a helpful message when the diagram has no tables", () => {
    const sql = generateSampleDataSQL({
      database: DB.GENERIC,
      tables: [],
      references: [],
    });

    expect(sql).toBe("-- No tables found. Add tables to generate sample data.");
  });
});

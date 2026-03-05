import { describe, expect, it } from "vitest";
import { DB } from "./constants";
import { dbToTypes } from "./datatypes";

describe("MYPRIMETYPE", () => {
  const dbModes = [
    DB.GENERIC,
    DB.MYSQL,
    DB.POSTGRES,
    DB.SQLITE,
    DB.MSSQL,
    DB.MARIADB,
    DB.ORACLESQL,
  ];

  it("appears in all DB modes", () => {
    dbModes.forEach((db) => {
      expect(dbToTypes[db].MYPRIMETYPE).toBeTruthy();
    });
  });

  it("accepts primes and rejects composites", () => {
    const accepted = ["2", "3", "5", "7", "11", "13"];
    const rejected = ["1", "4", "6", "8", "9", "10", "12", "15"];

    dbModes.forEach((db) => {
      const check = dbToTypes[db].MYPRIMETYPE.checkDefault;
      accepted.forEach((value) => expect(check({ default: value })).toBe(true));
      rejected.forEach((value) => expect(check({ default: value })).toBe(false));
    });
  });
});

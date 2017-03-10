DROP SEQUENCE IF EXISTS userid_seq;
CREATE SEQUENCE userid_seq;

DROP TABLE IF EXISTS "User";
CREATE TABLE "User"
(
  "id" integer NOT NULL PRIMARY KEY DEFAULT NEXTVAL('userid_seq'),
  "email" varchar(64),
  "passwordDigest" varchar(64) NOT NULL,
  "first_name" varchar(64),
  "last_name" varchar(64),
  "createdAt" date,
  "updatedAt"  date
);

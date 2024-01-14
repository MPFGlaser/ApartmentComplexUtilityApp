--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.3

-- Started on 2024-01-13 15:37:16 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3347 (class 1262 OID 16384)
-- Name: locationdb; Type: DATABASE; Schema: -; Owner: locationdb
--

CREATE DATABASE locationdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE locationdb OWNER TO locationdb;

\connect locationdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16385)
-- Name: Locations; Type: TABLE; Schema: public; Owner: locationdb
--

CREATE TABLE public."Locations" (
    id uuid NOT NULL,
    owner character varying(255),
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Locations" OWNER TO locationdb;

--
-- TOC entry 3341 (class 0 OID 16385)
-- Dependencies: 214
-- Data for Name: Locations; Type: TABLE DATA; Schema: public; Owner: locationdb
--

INSERT INTO public."Locations" (id, owner, name, "createdAt", "updatedAt", "deletedAt") VALUES ('816b96cd-94c7-4a6f-8d9c-eb412528c6f2', 'Avf0kdoKMZIBmGTe4XCX4vgTF845', 'DeleteMe''s Location', '2024-01-13 14:00:23.007+00', '2024-01-13 14:00:23.007+00', NULL);
INSERT INTO public."Locations" (id, owner, name, "createdAt", "updatedAt", "deletedAt") VALUES ('72fbb07a-3a03-488b-8edd-b2be6f033617', 'H1hXwnYHlk2hHC915kux69edYD6h', 'Admin''s Location', '2024-01-13 14:00:35.455+00', '2024-01-13 14:00:35.455+00', NULL);
INSERT INTO public."Locations" (id, owner, name, "createdAt", "updatedAt", "deletedAt") VALUES ('54f2b95e-8225-4b45-b304-75e7f3226d10', '15638FmHdEUxx3Dv7v3SyyEEIOkH', 'Tenant''s Location', '2024-01-13 14:00:50.861+00', '2024-01-13 14:00:50.861+00', NULL);


--
-- TOC entry 3198 (class 2606 OID 16391)
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: locationdb
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


-- Completed on 2024-01-13 15:37:16 CET

--
-- PostgreSQL database dump complete
--


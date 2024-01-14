--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.3

-- Started on 2024-01-13 15:44:21 CET

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
-- TOC entry 3350 (class 1262 OID 16384)
-- Name: ticketdb; Type: DATABASE; Schema: -; Owner: ticketdb
--

CREATE DATABASE ticketdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE ticketdb OWNER TO ticketdb;

\connect ticketdb

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
-- TOC entry 214 (class 1259 OID 16401)
-- Name: Tickets; Type: TABLE; Schema: public; Owner: ticketdb
--

CREATE TABLE public."Tickets" (
    id uuid NOT NULL,
    creator character varying(255),
    location character varying(255),
    title character varying(255),
    description character varying(255),
    status public."enum_Tickets_status" DEFAULT 'open'::public."enum_Tickets_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Tickets" OWNER TO ticketdb;

--
-- TOC entry 3344 (class 0 OID 16401)
-- Dependencies: 214
-- Data for Name: Tickets; Type: TABLE DATA; Schema: public; Owner: ticketdb
--

INSERT INTO public."Tickets" (id, creator, location, title, description, status, "createdAt", "updatedAt", "deletedAt") VALUES ('bfd24edc-56d2-408e-abf0-c1df12b5429a', '15638FmHdEUxx3Dv7v3SyyEEIOkH', '54f2b95e-8225-4b45-b304-75e7f3226d10', 'Tenant''s Ticket', 'Tenant''s Description', 'open', '2024-01-13 14:41:28.259+00', '2024-01-13 14:41:28.259+00', NULL);
INSERT INTO public."Tickets" (id, creator, location, title, description, status, "createdAt", "updatedAt", "deletedAt") VALUES ('a6153337-e874-4a76-9799-edc979715f1e', '15638FmHdEUxx3Dv7v3SyyEEIOkH', '54f2b95e-8225-4b45-b304-75e7f3226d10', 'Ticket to delete', 'Description of ticket to delete.', 'open', '2024-01-13 14:41:57.06+00', '2024-01-13 14:41:57.06+00', NULL);
INSERT INTO public."Tickets" (id, creator, location, title, description, status, "createdAt", "updatedAt", "deletedAt") VALUES ('9ebec943-04c0-4391-aa4f-4f74990edf1d', 'Avf0kdoKMZIBmGTe4XCX4vgTF845', '816b96cd-94c7-4a6f-8d9c-eb412528c6f2', 'DeleteMe''s Ticket', 'DeleteMe''s Ticket description', 'open', '2024-01-13 14:42:30.144+00', '2024-01-13 14:42:30.144+00', NULL);


--
-- TOC entry 3201 (class 2606 OID 16408)
-- Name: Tickets Tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: ticketdb
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_pkey" PRIMARY KEY (id);


-- Completed on 2024-01-13 15:44:21 CET

--
-- PostgreSQL database dump complete
--


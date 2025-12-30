--
-- PostgreSQL database dump
--

\restrict utlhQG0xqrvqJz1ajetsgzcDEBMJ4F3nPdET6ftqLbbu4m73zDs9IoO0GMW8Uxi

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    director character varying(255),
    release_year integer,
    genre character varying(100),
    duration integer,
    rating numeric(3,2),
    box_office numeric(15,2),
    production_cost numeric(15,2)
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: tvseries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tvseries (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    creator character varying(255),
    release_year integer,
    genre character varying(100),
    seasons integer,
    episodes integer,
    rating numeric(3,2),
    network character varying(100),
    status character varying(50)
);


ALTER TABLE public.tvseries OWNER TO postgres;

--
-- Name: tvseries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tvseries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tvseries_id_seq OWNER TO postgres;

--
-- Name: tvseries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tvseries_id_seq OWNED BY public.tvseries.id;


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: tvseries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tvseries ALTER COLUMN id SET DEFAULT nextval('public.tvseries_id_seq'::regclass);


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, director, release_year, genre, duration, rating, box_office, production_cost) FROM stdin;
1	Mad Max: Fury Road	George Miller	2015	Action	120	8.10	375200000.00	150000000.00
3	Super Mario Bros	Aaron Horvath, Michael Jelenic	2023	Animation	92	7.30	1300000000.00	100000000.00
4	Pride and Prejudice	Joe Wright	2005	Romance	129	7.80	121147947.00	28000000.00
5	Back to the Future	Robert Zemeckis	1985	Sci-Fi	116	8.50	381109762.00	19000000.00
6	The Godfather	Francis Ford Coppola	1972	Crime	175	9.20	246120974.00	6000000.00
7	The Lord of the Rings: The Return of the King	Peter Jackson	2003	Fantasy	201	9.00	1146030912.00	94000000.00
8	Treasure Planet	Ron Clements, John Musker	2002	Animation	95	7.20	109578115.00	140000000.00
9	Jurassic Park	Steven Spielberg	1993	Adventure	127	8.10	1043580597.00	63000000.00
10	About Time	Richard Curtis	2013	Romance	123	7.80	87100000.00	12000000.00
11	Transformers	Michael Bay	2007	Action	144	7.00	709709780.00	150000000.00
2	Star Wars: A New Hope	George Lucas	1977	Sci-Fi/Fantasy	121	8.60	775398007.00	11000000.00
\.


--
-- Data for Name: tvseries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tvseries (id, title, creator, release_year, genre, seasons, episodes, rating, network, status) FROM stdin;
1	Breaking Bad	Vince Gilligan	2008	Drama	5	62	9.50	AMC	Ended
2	Game of Thrones	David Benioff, D.B. Weiss	2011	Fantasy	8	73	9.30	HBO	Ended
6	Vikings	Michael Hirst	2013	Historical Drama	6	89	8.50	History Channel	Ended
7	Lost	J.J. Abrams, Damon Lindelof	2004	Mystery	6	121	8.40	ABC	Ended
8	Once Upon a Time	Edward Kitsis, Adam Horowitz	2011	Fantasy	7	155	7.70	ABC	Ended
9	The Mentalist	Bruno Heller	2008	Crime	7	151	8.10	CBS	Ended
10	Star Trek	Gene Roddenberry	1966	Sci-Fi	3	79	8.40	NBC	Ended
3	Stranger Things	The Duffer Brothers	2016	Sci-Fi	4	34	8.70	Netflix	Airing
11	Cobra Kai	Josh Heald, Jon Hurwitz, Hayden Schlossberg	2018	Action	6	50	8.60	Netflix	Airing
\.


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 11, true);


--
-- Name: tvseries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tvseries_id_seq', 11, true);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: tvseries tvseries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tvseries
    ADD CONSTRAINT tvseries_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict utlhQG0xqrvqJz1ajetsgzcDEBMJ4F3nPdET6ftqLbbu4m73zDs9IoO0GMW8Uxi


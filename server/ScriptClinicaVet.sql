--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-12-01 16:35:58

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
-- TOC entry 218 (class 1259 OID 16688)
-- Name: doctores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctores (
    id_doctor integer NOT NULL,
    nombre_doctor character varying(50),
    numero_telefono character varying(50),
    cedula_ciudadania character varying(50),
    id_horario integer,
    especialidad character varying(50),
    activo boolean DEFAULT true
);


--
-- TOC entry 217 (class 1259 OID 16687)
-- Name: doctores_id_doctor_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.doctores ALTER COLUMN id_doctor ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.doctores_id_doctor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16702)
-- Name: horarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.horarios (
    id_horario integer NOT NULL,
    id_doctor integer NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_final time without time zone NOT NULL,
    dia_semana integer
);


--
-- TOC entry 219 (class 1259 OID 16701)
-- Name: horarios_id_horario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.horarios ALTER COLUMN id_horario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.horarios_id_horario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16679)
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.solicitudes (
    id_solic integer NOT NULL,
    fecha_cita date NOT NULL,
    hora_cita time without time zone NOT NULL,
    paciente character varying(255) NOT NULL,
    tipo_mascota character varying(255) NOT NULL,
    propietario character varying(255) NOT NULL,
    cedula character varying NOT NULL,
    correo character varying(255) NOT NULL,
    telefono character varying NOT NULL,
    direccion character varying(255) NOT NULL,
    tipo_cliente character varying(255) NOT NULL,
    servicio character varying(255) NOT NULL,
    forma_pago character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    nombre_doctor character varying(30)
);


--
-- TOC entry 215 (class 1259 OID 16678)
-- Name: solicitudes_id_solic_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.solicitudes ALTER COLUMN id_solic ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.solicitudes_id_solic_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16707)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    _id character varying NOT NULL,
    username character varying,
    password character varying,
    nombre character varying,
    rol character varying DEFAULT USER,
    photo character varying
);


--
-- TOC entry 4708 (class 2606 OID 16692)
-- Name: doctores doctores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_pkey PRIMARY KEY (id_doctor);


--
-- TOC entry 4710 (class 2606 OID 16706)
-- Name: horarios horarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id_horario);


--
-- TOC entry 4706 (class 2606 OID 16686)
-- Name: solicitudes solicitudes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pkey PRIMARY KEY (id_solic);


--
-- TOC entry 4712 (class 2606 OID 16713)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


-- Completed on 2024-12-01 16:35:58

--
-- PostgreSQL database dump complete
--


SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.short_link (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    short text NOT NULL,
    visits integer DEFAULT 0 NOT NULL,
    long text NOT NULL
);
COMMENT ON TABLE public.short_link IS 'represents a shortened link';
ALTER TABLE ONLY public.short_link
    ADD CONSTRAINT short_link_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.short_link
    ADD CONSTRAINT short_link_short_key UNIQUE (short);
CREATE TRIGGER set_public_short_link_updated_at BEFORE UPDATE ON public.short_link FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_short_link_updated_at ON public.short_link IS 'trigger to set value of column "updated_at" to current timestamp on row update';

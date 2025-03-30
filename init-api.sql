-- Tạo role ẩn danh cho PostgREST nếu chưa tồn tại
DO $$ BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'api_anon_user') THEN
      CREATE ROLE api_anon_user NOLOGIN; RAISE NOTICE 'Role "api_anon_user" created.';
   ELSE RAISE NOTICE 'Role "api_anon_user" already exists.'; END IF;
END $$;

-- Cấp quyền sử dụng schema 'public'.
GRANT USAGE ON SCHEMA public TO api_anon_user;

-- Cấp quyền cho user 'postgres' để SET ROLE thành 'api_anon_user'.
DO $$ BEGIN
   GRANT api_anon_user TO postgres; RAISE NOTICE 'Granted role "api_anon_user" to user "postgres".';
EXCEPTION WHEN duplicate_object THEN RAISE NOTICE 'Role "api_anon_user" already granted to user "postgres".';
END $$;

-- ***** PHẦN QUAN TRỌNG *****
-- Cấp quyền mong muốn trên TẤT CẢ các bảng HIỆN CÓ trong schema public dev environment
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_anon_user;

-- Cấp quyền cho TẤT CẢ các sequence HIỆN CÓ (cần thiết nếu dùng SERIAL/IDENTITY và muốn INSERT)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api_anon_user;

-- Cấp quyền thực thi cho TẤT CẢ các function HIỆN CÓ (nếu cần gọi RPC)
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO api_anon_user;

-- Thiết lập quyền MẶC ĐỊNH cho các đối tượng TƯƠNG LAI được tạo bởi user 'postgres'
-- Điều này đảm bảo các bảng/sequence/function tạo bởi migration SAU NÀY cũng có quyền.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
   GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api_anon_user;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
   GRANT USAGE, SELECT ON SEQUENCES TO api_anon_user;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
   GRANT EXECUTE ON FUNCTIONS TO api_anon_user;
-- ***** KẾT THÚC PHẦN QUAN TRỌNG *****

--RAISE NOTICE 'Broad permissions granted to role "api_anon_user" on existing and future objects in schema public.';
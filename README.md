# Tiên Đạo Gia Tộc — Game H5

Bản thử nghiệm game tu tiên gia tộc trên trình duyệt và hướng tới APK Android.

## Đăng bản H5 lên GitHub Pages

1. Tải `TienDaoGiaToc_Sprint3F43_H5_Hosting_Fix.zip` từ thư mục **Tien Dao Gia Toc** trên Google Drive.
2. Đổi tên ZIP thành **`game-h5.zip`**; không giải nén.
3. Trong repository GitHub, chọn **Add file → Upload files**, tải `game-h5.zip` vào thư mục gốc, chọn **Commit changes** vào nhánh `main`.
4. Trong **Settings → Pages**, chọn **Build and deployment → Source: GitHub Actions** (một lần).
5. Trong **Actions**, xem workflow **Publish Tien Dao Gia Toc H5**. Nếu chưa chạy, chọn **Run workflow**.
6. Khi triển khai thành công, game sẽ có địa chỉ **https://haith1287.github.io/tien-dao-gia-toc/**.

Mỗi bản mới, thay file `game-h5.zip` trong repository để workflow tự cập nhật cùng địa chỉ.

## Lưu ý

- H5 nhiều file cần chạy trên máy chủ HTTP(S). Mở trực tiếp `index.html` qua `file://` hoặc `content://` có thể thiếu hình.
- Bản HTML đơn offline trên Google Drive là dự phòng trên Android.
- Xuất save JSON trước khi cập nhật lớn; chưa bảo đảm tương thích save giữa các thay đổi schema.
- Chỉ phát hành hình ảnh, âm thanh và mã nguồn mà bạn có quyền công khai.

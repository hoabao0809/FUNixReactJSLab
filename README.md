# Về việc hoàn thành các tiêu chí của dự án

## Tiêu chí cơ bản

- Tình huống 1: Xây dựng chức năng tìm kiếm nhân viên bằng tên NV bằng uncontrolled form, thông báo người dùng nếu không có kết quả, nếu ô tìm kiếm trống sẽ trả về full danh sách.
- Tình huống 2: Xây dựng chức năng nhiều nhân viên và hiển thị ra giao diện mà vẫn giữ được nhân viên mới được thêm trước đó (lưu array data vào localStorage và render đầy đủ danh sách mỗi khi load trang)
- Tình huống 3: Chuẩn hóa dữ liệu trong chức năng thêm nhân viên

## Tiêu chí nâng cao

- Cài đặt và cấu hình được react-redux, lấy dữ liệu từ store sử dụng trong Main Component
- Thêm thành công nhân viên mới và chuẩn hoá dữ liệu (validate) form sử dụng react-redux-form.

# Problems and solutions:

- Del staff - redirect to Staff Page:
  check param return matched item ? return detail staff : used "props.history.push" to redirect
  - useHistory / window.location = 'path' / window.history

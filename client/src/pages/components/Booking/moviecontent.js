import React from "react"

const MovieContent = ({ movies }) => {
  return (
    <div className="movie__content mt-3 lg:mt-0">
      <span className="border-l-4 border-solid border-[#034ea2] mr-2 "></span>
      <h1 className="mb-4 text-base inline-block capitalize font-bold">
        Nội dung phim
      </h1>
      <div className="block_wysiwyg text-[#333333] text-sm font-normal not-italic content-text content__data__full">
        <p>
          Được mời đến để sửa chữa hình ảnh của NASA trước công chúng, Kelly
          Jones vô tình phá hoại nhiệm vụ vốn đã khó khăn của giám đốc Cole
          Davis là đưa con người lên mặt trăng. Nhà Trắng không cho phép nhiệm
          vụ thất bại, buộc Jones phải chỉ đạo thực hiện một cuộc đổ bộ lên mặt
          trăng giả để dự phòng. Xem thêm tại:
          https://www.galaxycine.vn/dat-ve/fly-me-to-the-moon/
        </p>
        <p>Noi dung</p>
      </div>
    </div>
  )
}

export default MovieContent

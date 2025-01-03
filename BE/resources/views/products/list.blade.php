@extends('index')


@section('content')
    <div class="container mt-3  ">
        <a class="nav-link active" aria-current="true" href="">
            <button class="btn btn-success">Thêm mới sách</button>
        </a>

    </div>
    <table class="table table-bordered text-center mt-3 ">
        <thead>
            <tr>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
                <tr>
                    <td>{{ $product->product_name }}</td>
                    <td>
                        <img src="{{ asset('/storage/' . $product->product_thumbnail) }}" class="rounded mx-auto d-block"
                            alt="{{ $product->product_name }}">
                    </td>
                    <td>{{ $product->product_price }} $</td>
                    <td>

                        @if ($product->is_active == 0)
                            Hết hàng
                        @else
                            Còn hàng
                        @endif
                    </td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">
                                <a class="nav-link active" href="{{ route('product.detail', $product) }}">C.Tiết</a>
                            </button>
                            <button class="btn btn-warning">
                                <a class="nav-link active" aria-current="true" href="">Sửa</a>
                            </button>
                            <form action="" method="post">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger"
                                    onclick="return(confirm('Ban co chac muon xoa khong?'))">Xóa</button>
                            </form>

                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{ $products->links() }}
@endsection
